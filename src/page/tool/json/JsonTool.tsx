import { Breadcrumb, Button, Checkbox, Input } from "antd";
import { useState } from "react";
import './JsonTool.css'
import { JsonViewer } from '@textea/json-viewer';

import 'highlight.js/styles/monokai-sublime.css';

const JsonTool: React.FC = (props) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const syntaxHighlight = (json: string) => {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function(match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                   if (/:$/.test(match)) {
                       cls = 'key';
                   } else {
                       cls = 'string';
                   }
                } else if (/true|false/.test(match)) {
                   cls = 'boolean';
                } else if (/null/.test(match)) {
                   cls = 'null';
                }
               return '<span class="' + cls + '">' + match + '</span>';
           }
       );
    }

    const verifyJsonFormat = () => {
        const element = document.getElementById("message-container");
        try {
            const jsonObject = JSON.parse(inputValue);
            const elementInput = document.getElementById("input-json");
            if (elementInput) {
                debugger
                const formatted = syntaxHighlight(inputValue);
                var pretty = JSON.stringify(jsonObject, undefined, 4);

                (elementInput as HTMLInputElement).value = pretty;
            }
            if (element) {
                element.innerHTML = "正确的Json格式";
            }
        } catch (e) {
            if (element) {
                debugger
                element.innerHTML = "错误的Json格式";
            }
        }
    }

    

    return (
        <div className="yaml-container">
            <Breadcrumb items={[
                {
                    title: '首页',
                    href: '/'
                },
                {
                    title: 'Json格式化',
                }
            ]}>
            </Breadcrumb>
            <h3>Json格式化</h3>
            <div className="jwt-parse-tips jwt-parse-tips-danger"><strong>提示：</strong>Json及其他相互转换的所有步骤都在客户端进行，请放心使用。</div>
            <div className="yaml-parse-container">
                <div className="json-parse-src">
                    <div>
                        <span style={{ fontSize: '14px', color: 'gray' }}>请在以下文本框粘贴</span>
                    </div>
                    <Input.TextArea id="input-json" onChange={handleChange}>
                        
                    </Input.TextArea>
                    
                </div>
                <div className="json-action">
                    <Button onClick={verifyJsonFormat}>格式化校验</Button>
                </div>
                <div id="message-container" className="message"></div>
                <div className="json-formatted">
                    <JsonViewer 
                    rootName={false} 
                    indentWidth={3}
                    editable={true}
                    value={inputValue}></JsonViewer>
                </div>
            </div>
        </div>
    );
}

export default JsonTool
