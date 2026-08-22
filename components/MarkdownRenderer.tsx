import React from "react";

// Simple markdown-to-HTML renderer for article content.
// Handles headings, bold, italic, paragraphs, lists, code, links.

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="article-link">$1</a>',
    );
}

function renderMarkdown(markdown: string): string {
  const lines = markdown.split("\n");
  const html: string[] = [];
  let inList = false;
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        html.push(`<pre class="code-block"><code>${codeLines.join("\n")}</code></pre>`);
        codeLines = [];
        inCodeBlock = false;
      } else {
        if (inList) { html.push("</ul>"); inList = false; }
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) { codeLines.push(escapeHtml(line)); continue; }

    // Close list if needed
    if (inList && !line.startsWith("- ") && !line.startsWith("* ")) {
      html.push("</ul>");
      inList = false;
    }

    if (line.startsWith("# ")) {
      html.push(`<h1 class="article-h1">${renderInline(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      html.push(`<h2 class="article-h2">${renderInline(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      html.push(`<h3 class="article-h3">${renderInline(line.slice(4))}</h3>`);
    } else if (line.startsWith("#### ")) {
      html.push(`<h4 class="article-h4">${renderInline(line.slice(5))}</h4>`);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) { html.push("<ul class='article-list'>"); inList = true; }
      html.push(`<li>${renderInline(line.slice(2))}</li>`);
    } else if (line.startsWith("> ")) {
      html.push(`<blockquote class="article-blockquote">${renderInline(line.slice(2))}</blockquote>`);
    } else if (line.trim() === "" || line.trim() === "---") {
      if (line.trim() === "---") html.push("<hr class='article-hr' />");
    } else {
      html.push(`<p class="article-p">${renderInline(line)}</p>`);
    }
  }

  if (inList) html.push("</ul>");
  return html.join("\n");
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = renderMarkdown(content);

  return (
    <>
      <style>{`
        .article-h1 { font-size: 1.875rem; font-weight: 700; color: #fff; margin: 2rem 0 1rem; line-height: 1.3; }
        .article-h2 { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 2rem 0 0.75rem; line-height: 1.35; }
        .article-h3 { font-size: 1.25rem; font-weight: 600; color: #e5e7eb; margin: 1.5rem 0 0.5rem; }
        .article-h4 { font-size: 1.1rem; font-weight: 600; color: #d1d5db; margin: 1.25rem 0 0.5rem; }
        .article-p { color: #9ca3af; line-height: 1.8; margin-bottom: 1.25rem; font-size: 1.0625rem; }
        .article-list { color: #9ca3af; line-height: 1.8; margin: 1rem 0 1.25rem 1.5rem; list-style: disc; }
        .article-list li { margin-bottom: 0.4rem; font-size: 1.0625rem; }
        .article-blockquote { border-left: 3px solid #a78bfa; padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: rgba(167,139,250,0.05); border-radius: 0 0.75rem 0.75rem 0; color: #c4b5fd; font-style: italic; }
        .article-hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2rem 0; }
        .inline-code { background: rgba(255,255,255,0.08); color: #c4b5fd; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.9em; }
        .code-block { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; padding: 1.25rem; margin: 1.5rem 0; overflow-x: auto; }
        .code-block code { color: #c4b5fd; font-family: monospace; font-size: 0.9rem; line-height: 1.6; }
        .article-link { color: #a78bfa; text-decoration: underline; text-underline-offset: 3px; }
        .article-link:hover { color: #c4b5fd; }
        strong { color: #f3f4f6; font-weight: 600; }
        em { color: #d1d5db; }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
