"use client";
import { useEffect, useRef, useState } from "react";
import { Headphones, Loader2, Pause, Play, RotateCcw } from "lucide-react";

const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
export function ArticleAudio({ slug, title, duration }: { slug: string; title: string; duration: number }) {
  const audio = useRef<HTMLAudioElement>(null);
  const request = useRef<AbortController | null>(null);
  const [hasSource, setHasSource] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [length, setLength] = useState(duration);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState("");
  const retry = useRef(false);
  const pending = useRef(false);
  useEffect(() => {
    const player = audio.current;
    return () => { request.current?.abort(); player?.pause(); player?.removeAttribute("src"); player?.load(); };
  }, []);
  async function toggle() {
    const player = audio.current;
    if (!player || pending.current) return;
    if (!player.paused) { player.pause(); return; }
    pending.current = true; setLoading(true); setError("");
    try {
      if (!player.getAttribute("src") || retry.current) {
        request.current?.abort(); request.current = new AbortController();
        const response = await fetch(`/api/articles/${encodeURIComponent(slug)}/audio`, { signal: request.current.signal, cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw Error(data.error || "Audio could not be loaded.");
        player.src = data.url; retry.current = false; setHasSource(true);
      }
      if (player.ended) player.currentTime = 0;
      player.playbackRate = speed;
      await player.play();
    } catch (error) {
      if (request.current?.signal.aborted) return;
      const blocked = error instanceof Error && error.name === "NotAllowedError";
      if (!blocked) retry.current = true;
      setError(blocked ? "Audio is ready. Tap Play once more to listen." : error instanceof Error ? error.message : "Audio could not be loaded. Tap Play to retry.");
    } finally { pending.current = false; if (!request.current?.signal.aborted) setLoading(false); }
  }
  return <section className="article-audio" aria-label="Listen to this article">
    <div className="article-audio-heading">
      <span className="article-audio-icon"><Headphones size={20} aria-hidden="true" /></span>
      <div><h2>Listen with NOVA</h2><p>Her voice. Your next discovery.</p></div>
      <span className="article-audio-disclosure">AI narration</span>
    </div>
    <audio ref={audio} preload="none" aria-label={`Narration of ${title}`}
      onPlay={() => { setPlaying(true); setLoading(false); }} onPause={() => setPlaying(false)}
      onEnded={() => { setPlaying(false); setPosition(length); }}
      onTimeUpdate={() => setPosition(audio.current?.currentTime ?? 0)}
      onLoadedMetadata={() => { if (Number.isFinite(audio.current?.duration)) setLength(audio.current!.duration); }}
      onError={() => { retry.current = true; setPlaying(false); setLoading(false); setError("Audio could not be loaded. Tap Play to retry."); }} />
    <div className="article-audio-controls">
      <button className="article-audio-play" onClick={() => void toggle()} disabled={loading} aria-label={loading ? "Loading narration" : playing ? "Pause narration" : "Play narration"}>
        {loading ? <Loader2 size={20} className="audio-loading" /> : playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
      </button>
      <button className="article-audio-back" disabled={!hasSource} aria-label="Rewind 10 seconds" onClick={() => { if (audio.current) audio.current.currentTime = Math.max(0, audio.current.currentTime - 10); }}><RotateCcw size={18} /><span>10</span></button>
      <div className="article-audio-timeline">
        <input aria-label="Article audio position" type="range" min={0} max={length} step={0.1} value={Math.min(position, length)} disabled={!hasSource} onChange={event => { const value = Number(event.target.value); if (audio.current) audio.current.currentTime = value; setPosition(value); }} />
        <div><span>{time(position)}</span><span>{time(length)}</span></div>
      </div>
      <select aria-label="Playback speed" value={speed} onChange={event => { const value = Number(event.target.value); setSpeed(value); if (audio.current) audio.current.playbackRate = value; }}>
        {[0.75, 1, 1.25, 1.5, 2].map(value => <option key={value} value={value}>{value}×</option>)}
      </select>
    </div>
    {error && <p className="article-audio-error" role="status">{error}</p>}
  </section>;
}
