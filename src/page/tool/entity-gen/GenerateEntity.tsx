import { Breadcrumb, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { SHA512 } from 'crypto-js';
import './GenerateEntity.css';
import React from "react";
import CodePreview from "./component/CodePreview";

const GenerateEntity: React.FC = (props) => {

    const [originalPwd, setOriginalPwd] = useState<string>('');
    const [salt, setSalt] = useState<string>('');
    const [encrypted, setEncrypted] = useState<string>('');
    const [encryptAlgorithm, setEncryptAlgorithm] = useState<string>('sha512');

    React.useEffect(() => {

    }, []);

    React.useEffect(() => {
        calcResult();
    }, [originalPwd, salt, encryptAlgorithm]);


    const handleChange = (value: string) => {
        setEncryptAlgorithm(value);
    };

    const handlePwdChange = (value: any) => {
        const targetValue = value.target.value;
        setOriginalPwd(targetValue);
    }

    const handleSaltChange = (value: any) => {
        const targetValue = value.target.value;
        setSalt(targetValue);
    }

    const calcResult = () => {
        if (originalPwd && salt && encryptAlgorithm) {
            const hash = SHA512(salt + originalPwd);
            const encryptResult = hash.toString();
            setEncrypted(encryptResult);
        } else {
            setEncrypted("");
        }
    }

    function generateJavaEntityFromJson(json: string, className: string): string {
        const jsonObject = JSON.parse(json);

        let javaEntity = `public class ${className} {\n`;

        for (const key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                const value = jsonObject[key];
                const type = typeof value;

                if (type === "number") {
                    if (Number.isInteger(value)) {
                        javaEntity += `    private int ${key};\n\n`;
                    } else {
                        javaEntity += `    private double ${key};\n\n`;
                    }
                } else if (type === "string") {
                    javaEntity += `    private String ${key};\n\n`;
                } else if (Array.isArray(value)) {
                    const firstElement = value[0];
                    const arrayType = typeof firstElement;

                    if (arrayType === "number") {
                        if (Number.isInteger(firstElement)) {
                            javaEntity += `    private int[] ${key};\n\n`;
                        } else {
                            javaEntity += `    private double[] ${key};\n\n`;
                        }
                    } else if (arrayType === "string") {
                        javaEntity += `    private String[] ${key};\n\n`;
                    } else {
                        javaEntity += `    // unsupported array type for ${key}\n\n`;
                    }
                } else {
                    javaEntity += `    // unsupported type for ${key}\n\n`;
                }
            }
        }

        javaEntity += `}`;

        return javaEntity;
    }

    const javaCode = `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, world!");
        }
    }`;

    return (
        <div className="pwd-body">
            <Breadcrumb items={[
                {
                    title: '首页',
                    href: '/'
                },
                {
                    title: '生成实体',
                }
            ]}>
            </Breadcrumb>
            <h3>生成实体</h3>
            <div className="pwd-container">
                <div><span>原始Json：</span>
                    <TextArea placeholder="请输入原始密码" onChange={(value) => handlePwdChange(value)}></TextArea>
                </div>
                <div className="code-wrapper">
                    <ul className="tab-menu">
                        <li className="active">Java</li>
                        <li>Python</li>
                    </ul>
                    <div className="code-preview">
                        <pre><code className="java">// 这里是Java代码</code></pre>
                        <pre><code className="python"># 这里是Python代码</code></pre>
                    </div>
                    <span>生成结果：</span>
                    <TextArea className="encrypt-result" value={encrypted}>
                    </TextArea>
                    <CodePreview />
                </div>
            </div>
        </div>
    );
}

export default GenerateEntity