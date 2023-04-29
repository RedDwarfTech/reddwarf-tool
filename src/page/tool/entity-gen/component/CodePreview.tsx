import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodePreview: React.FC = (props) => {

    const javaCode = `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, world!");
        }
    }`;

  const [selected, setSelected] = useState("java");

  return (
    <div>
      <ul>
        <li onClick={() => setSelected('java')} className={selected === 'java' ? 'active' : ''}>
          Java
        </li>
        <li onClick={() => setSelected('python')} className={selected === 'python' ? 'active' : ''}>
          Python
        </li>
      </ul>
      <SyntaxHighlighter language={selected} style={atomOneDark}>
        {javaCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodePreview;