import { Breadcrumb, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { SHA512 } from 'crypto-js';
import './PasswordTool.css';
import React from "react";

const PasswordTool: React.FC = (props) => {

    const [originalPwd, setOriginalPwd] = useState<string>('');
    const [salt, setSalt] = useState<string>('');
    const [encrypted, setEncrypted] = useState<string>('');
    const [encryptAlgorithm, setEncryptAlgorithm] = useState<string>('sha512');

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

    return (
        <div className="pwd-body">
            <Breadcrumb items={[
                {
                    title: '首页',
                    href: '/'
                },
                {
                    title: '生成密码',
                }
            ]}>
            </Breadcrumb>
            <h3>生成密码</h3>
            <div className="pwd-container">
                <div><span>原始密码：</span>
                    <Input placeholder="请输入原始密码" onChange={(value) => handlePwdChange(value)}></Input>
                </div>
                <div><span>盐：</span><Input onChange={(value) => handleSaltChange(value)} placeholder="请输入盐值"></Input></div>
                <div><span>加密算法：</span> <Select
                    defaultValue="sha512"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'sha512', label: 'sha512' },
                    ]}
                /></div>
                <div><span>加密结果：</span>
                    <TextArea className="encrypt-result" value={encrypted}>
                    </TextArea>
                </div>
            </div>
        </div>
    );
}

export default PasswordTool