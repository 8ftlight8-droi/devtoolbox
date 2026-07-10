"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";

const SAMPLE = `# Hello Markdown

This is a **live preview** tool. Start typing on the left!

## Features

- **Bold** and *italic* text
- [Links](https://devtoolbox-henna-three.vercel.app)
- Inline \`code\` and code blocks
- Lists (ordered and unordered)
- Headings (h1-h6)
- Blockquotes
- Horizontal rules

## Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a blockquote. It can span multiple lines.

---

1. First item
2. Second item
3. Third item

That's it! All rendered client-side.`;

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (must be first to avoid inner parsing)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<pre class="code-block"><code class="language-${lang}">${escaped}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr/>');

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

  // Paragraphs
  html = html.replace(/^(?!<[a-z])(.*\S.*)$/gm, (match) => {
    if (match.startsWith('<')) return match;
    return `<p>${match}</p>`;
  });

  // Clean up double line breaks
  html = html.replace(/\n\n+/g, '\n');

  return html;
}

export function MarkdownTool() {
  const [input, setInput] = useState(SAMPLE);

  const rendered = useMemo(() => parseMarkdown(input), [input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setInput(SAMPLE)} className="btn-secondary text-xs">Load Sample</button>
        <button onClick={() => setInput("")} className="btn-secondary text-xs">Clear</button>
        <CopyButton text={rendered} className="ml-auto" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Editor */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">Markdown Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="textarea-field h-[500px] font-mono text-sm"
            spellCheck={false}
            placeholder="# Start typing Markdown..."
          />
        </div>

        {/* Preview */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">Preview</label>
          <div
            className="h-[500px] overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 p-4 prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        </div>
      </div>
    </div>
  );
}
