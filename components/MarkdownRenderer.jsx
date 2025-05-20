import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        pre: ({ node, ...props }) => <pre style={{ background: '#111', padding: '0.75rem', borderRadius: '4px' }} {...props} />,
        code: ({ node, ...props }) => <code style={{ fontFamily: 'monospace' }} {...props} />,
      }}
    />
  );
}
