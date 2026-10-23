/* eslint-disable @typescript-eslint/no-require-imports -- Isolated public audio boundary tests. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ts = require('typescript');
function load(file, mocks = {}, extras = {}) {
  const loaded = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  vm.runInNewContext(code,{module:loaded,exports:loaded.exports,require:name=>name in mocks?mocks[name]:require(name),Response,Request,URL,AbortController,Error,console,...extras});
  return loaded.exports;
}
const helper = load('lib/articleNarration.ts');
const id = '22222222-2222-2222-2222-222222222222';
function article() {
  const post={id,status:'published',title:'Moon',content:'The Moon orbits Earth.'};
  post.narration={version:1,sourceHash:createHash('sha256').update(JSON.stringify([post.title,post.content])).digest('hex'),approved:true,path:`11111111-1111-1111-1111-111111111111/${id}/33333333-3333-3333-3333-333333333333.wav`,duration:20,totalParts:1,parts:[{}]};
  return post;
}
test('Only a complete, approved recording of the current published text gets a player',()=>{
  assert(helper.publishedNarration(article()));
  for(const change of [p=>p.status='draft',p=>p.narration.approved=false,p=>p.narration.parts=[],p=>p.content='Changed facts',p=>p.title='Changed title',p=>p.narration.path='https://evil.test/audio.wav',p=>p.narration.path=p.narration.path.replace(id,'44444444-4444-4444-4444-444444444444'),p=>p.narration.duration=NaN,p=>delete p.narration]){const post=article();change(post);assert.equal(helper.publishedNarration(post),null);}
});
test('Public playback signs only the stored approved path, never generates speech, and is not cached',async()=>{
  let signed=[];const post=article();
  const route=load('app/api/articles/[slug]/audio/route.ts',{'@/lib/articleNarration':helper,'@/lib/supabase':{getPostBySlug:async slug=>slug==='moon'?post:null,supabase:{storage:{from:bucket=>({createSignedUrl:async(path,ttl)=>{signed.push({bucket,path,ttl});return{data:{signedUrl:'https://audio.test/signed'},error:null};}})}}}});
  const response=await route.GET(new Request('https://discovery.test'),{params:Promise.resolve({slug:'moon'})});
  assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');assert.equal(signed[0].path,post.narration.path);assert.equal(signed[0].bucket,'astronomy-audio');
  for(const slug of ['missing','moon']){post.narration.approved=false;assert.equal((await route.GET(new Request('https://discovery.test'),{params:Promise.resolve({slug})})).status,404);}
  assert.equal(signed.length,1);
});
test('Storage failure is a retryable error and does not advertise a broken audio URL',async()=>{
  const route=load('app/api/articles/[slug]/audio/route.ts',{'@/lib/articleNarration':helper,'@/lib/supabase':{getPostBySlug:async()=>article(),supabase:{storage:{from:()=>({createSignedUrl:async()=>({data:null,error:{}})})}}}});
  const response=await route.GET(new Request('https://discovery.test'),{params:Promise.resolve({slug:'moon'})});assert.equal(response.status,503);assert.equal((await response.json()).url,undefined);
});

function playerHarness(fetcher, blockFirstPlay=false) {
  const states=[], refs=[], effects=[];let s=0,r=0,first=true,plays=0,pauses=0,loads=0;
  const react={useState(initial){const i=s++;if(!(i in states))states[i]=initial;return[states[i],value=>{states[i]=typeof value==='function'?value(states[i]):value;}];},useRef(initial){const i=r++;return refs[i]??=( {current:initial} );},useEffect(effect){if(first)effects.push(effect);}};
  const jsx=(type,props)=>({type,props});
  const player=load('components/ArticleAudio.tsx',{react,'react/jsx-runtime':{jsx,jsxs:jsx},'lucide-react':new Proxy({},{get:(_,key)=>key})},{fetch:fetcher});
  const element={src:'',paused:true,ended:false,currentTime:0,duration:20,playbackRate:1,getAttribute(){return this.src;},removeAttribute(){this.src='';},load(){loads++;},async play(){plays++;if(blockFirstPlay&&plays===1){const error=Error('Blocked');error.name='NotAllowedError';throw error;}this.paused=false;},pause(){pauses++;this.paused=true;}};
  const render=()=>{s=0;r=0;const tree=player.ArticleAudio({slug:'moon',title:'Moon',duration:20});refs[0].current=element;first=false;return tree;};
  function find(tree,predicate){if(!tree)return null;if(Array.isArray(tree)){for(const n of tree){const found=find(n,predicate);if(found)return found;}return null;}if(typeof tree!=='object')return null;if(predicate(tree))return tree;return find(tree.props?.children,predicate);}
  const named=(name)=>find(render(),node=>node.props?.['aria-label']===name);
  render();const cleanup=effects[0]();
  return{named,element,cleanup,render,find,async click(name){named(name).props.onClick();await new Promise(setImmediate);},get plays(){return plays;},get pauses(){return pauses;},get loads(){return loads;}};
}
test('Player starts only on request, supports pause, seek, rewind and speed, and stops on navigation',async()=>{
  let fetches=0;const h=playerHarness(async()=>{fetches++;return Response.json({url:'https://audio.test/file'});});
  assert.equal(h.plays,0);assert.equal(fetches,0);
  await h.click('Play narration');h.named('Narration of Moon').props.onPlay();assert.equal(h.plays,1);assert.equal(fetches,1);
  h.named('Article audio position').props.onChange({target:{value:'15'}});assert.equal(h.element.currentTime,15);
  h.named('Rewind 10 seconds').props.onClick();assert.equal(h.element.currentTime,5);
  h.named('Playback speed').props.onChange({target:{value:'1.5'}});assert.equal(h.element.playbackRate,1.5);
  await h.click('Pause narration');assert.equal(h.pauses,1);
  h.cleanup();assert.equal(h.element.src,'');assert.equal(h.loads,1);assert.equal(h.pauses,2);
});
test('A browser autoplay block offers another tap without fetching or generating audio again',async()=>{
  let fetches=0;const h=playerHarness(async()=>{fetches++;return Response.json({url:'https://audio.test/file'});},true);
  await h.click('Play narration');assert(h.find(h.render(),n=>n.props?.role==='status'));
  await h.click('Play narration');assert.equal(h.plays,2);assert.equal(fetches,1);h.cleanup();
});
