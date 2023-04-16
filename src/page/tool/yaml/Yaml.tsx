import { Breadcrumb, Button, Checkbox, Input } from "antd";
import { useState } from "react";
import './Yaml.css'
import { JsonViewer } from '@textea/json-viewer';
import { yamlToJson, jsonToProperties, parseProperties, stringifyYaml } from "@/service/yaml/YamlService";


const Yaml: React.FC = (props) => {
    var Buffer = require('buffer/').Buffer
    const [inputValue, setInputValue] = useState<string>('');
    const [selectTrans, setSelectTrans] = useState<string>('yp');

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const parseJwt = (token: string) => {
        var base64Payload = token.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    }

    const renderParsed = () => {
        if (inputValue && inputValue.length > 0) {
            if (selectTrans === 'yp') {
                return convertYamlToProperties();
            } else if (selectTrans === 'py') {
                return convertPropertiesToYml();
            } else {
                var payload = parseJwt(inputValue);
                return (<div className="jwt-payload"><JsonViewer value={payload} /></div>);
            }
        }
        return (<div></div>);
    }

    const onCBChanged = (checked: string) => {
        setSelectTrans(checked);
    }

    const convertPropertiesToYml = () => {
        const config = parseProperties(inputValue);
        const yamlStr = stringifyYaml(config);
        return (
            <div>
                <pre>{yamlStr}</pre>
            </div>
        );
    }

    const convertYamlToProperties = () => {
        const jsonString = yamlToJson(inputValue);
        const properties = jsonToProperties(jsonString as Object, '');
        return (
            <div>
                <pre>{properties}</pre>
            </div>
        );
    }

    return (
        <div className="yaml-container">
            <Breadcrumb items={[
                {
                    title: '首页',
                    href: '/'
                },
                {
                    title: 'Yaml转换',
                }
            ]}>
            </Breadcrumb>
            <h3>Yaml转换</h3>
            <div className="jwt-parse-tips jwt-parse-tips-danger"><strong>提示：</strong>Yaml及其他相互转换的所有步骤都在客户端进行，请放心使用。</div>
            <div className="yaml-parse-container">
                <div>
                    <Checkbox onClick={() => onCBChanged('yp')} checked={selectTrans === 'yp' ? true : false}>Yaml转Properties</Checkbox>
                    <Checkbox onClick={() => onCBChanged('py')} checked={selectTrans === 'py' ? true : false}>Properties转Yaml</Checkbox>
                </div>
                <div className="jwt-parse-src">
                    <div>
                        <span style={{ fontSize: '14px', color: 'gray' }}>请在以下文本框粘贴</span>
                    </div>
                    <Input.TextArea onChange={handleChange}></Input.TextArea>
                </div>
                <Button onClick={convertYamlToProperties}>转换</Button>
                <div className="jwt-parse-dist">
                    <div style={{ fontSize: '15px' }}>转换结果</div>
                    <div className="jwt-parse-result">
                        {renderParsed()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Yaml