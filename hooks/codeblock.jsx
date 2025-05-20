import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export function CodeBlock({ content }) {
  const [copied, setCopied] = useState(false);
  const language = content.match(/```(\w+)/)?.[1] || 'text';

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="code-block-container">
      <div className="code-toolbar">
        <span className="language-tag">{language}</span>
        <CopyToClipboard 
          text={content.replace(/```(\w+)?/, '').replace(/```$/, '')}
          onCopy={() => setCopied(true)}
        >
          <button>{copied ? 'Copied!' : 'Copy'}</button>
        </CopyToClipboard>
      </div>
      
      <SyntaxHighlighter
        language={language}
        showLineNumbers
      >
        {content.replace(/```(\w+)?/, '').replace(/```$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}