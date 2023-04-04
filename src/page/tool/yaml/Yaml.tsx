import { Checkbox, Input } from "antd";
import { useState } from "react";
import './Yaml.css'
import { JsonViewer } from '@textea/json-viewer';

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
            if(selectTrans === 'yp'){
                return convertYamlToProperties();
            }else{
                var payload = parseJwt(inputValue);
                return (<div className="jwt-payload"><JsonViewer value={payload} /></div>);
            }
        }
        return (<div></div>);
    }

    const onCBChanged = (checked: string) => {
        setSelectTrans(checked);
    }

    const convertYamlToProperties = () => {
        return (<div></div>);
    }

    return (
        <div className="yaml-container">
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
