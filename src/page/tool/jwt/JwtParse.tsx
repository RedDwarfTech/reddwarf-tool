import { Breadcrumb, Input, Image } from "antd";
import { useState } from "react";
import './JwtParse.css'
import { JsonViewer,createDataType } from '@textea/json-viewer';
import { TimeUtils } from "js-wheel";

const JwtParse: React.FC = (props) => {
    var Buffer = require('buffer/').Buffer
    const [inputValue, setInputValue] = useState<string>('');
    const [formattedTime, setFormattedTime] = useState<string>('');

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const parseJwtPayload = (token: string) => {
        var base64Payload = token.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    }

    const parseJwtSys = (token: string) => {
        var base64Payload = token.split('.')[2];
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    }

    const parseJwtHeader = (token: string) => {
        var base64Payload = token.split('.')[0];
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    }

    const renderParsedPayload = () => {
        try {
            if (inputValue && inputValue.length > 0 && inputValue.split('.').length > 1) {
                var payload = parseJwtPayload(inputValue);
                return (<div className="jwt-payload"><JsonViewer rootName={false} value={payload} /></div>);
            }
        } catch (e) {

        }
        return (<div></div>);
    }

    const renderSystem = () => {
        try {
            if (inputValue && inputValue.length > 0 && inputValue.split('.').length > 2) {
                var payload = parseJwtSys(inputValue);
                return (<div className="jwt-payload"><JsonViewer value={payload} /></div>);
            }
        } catch (e) {

        }
        return (<div></div>);
    }

    const renderParsedHeader = () => {
        try {
            if (inputValue && inputValue.length > 0 && inputValue.split('.').length > 0) {
                var header = parseJwtHeader(inputValue);
                return (
                <div className="jwt-header-content">
                    <JsonViewer rootName={false} 
                    valueTypes={[
                        createDataType(
                            (value,path) => {
                                return false;
                            },
                            (props) => {
                                return(<div></div>);
                            }
                          )
                    ]}
                    value={header} />
                </div>);
            }
        } catch (e) {

        }
        return (<div></div>);
    }

    const onChange = (e:any) => {
        try{
            const fmt = TimeUtils.getFormattedTime(Number(e.target.value));
            setFormattedTime(fmt);
        }catch(e){

        }
    }

    return (
        <div>
            <Breadcrumb items={[
                {
                    title: '首页',
                    href: '/'
                },
                {
                    title: 'JWT解析',
                }
            ]}>
            </Breadcrumb>
            <h3>JSON Web Tokens (JWT) 在线解密</h3>
            <div className="jwt-parse-tips jwt-parse-tips-danger"><strong>提示：</strong> JWT是目前最流行的跨域认证解决方案, 是一个开放式标准(<a href="https://tools.ietf.org/html/rfc7519">RFC 7519</a>), 用于在各方之间以JSON对象安全传输信息。我们不记录令牌，所有验证和调试都在客户端进行。</div>
            <div className="jwt-parse-container">
                <div className="jwt-parse-left">
                    <div>
                        <span style={{ fontSize: '18px' }}>Encoded</span>
                        <span style={{ fontSize: '14px', color: 'gray' }}>请在以下文本框粘贴令牌</span>
                    </div>
                    <Input.TextArea onChange={handleChange}
                    ></Input.TextArea>
                </div>
                <div className="jwt-parse-right">
                    <div style={{ fontSize: '18px' }}>Decoded</div>
                    <div className="jwt-parse-result">
                        <div>Header</div>
                        <div className="jwt-header">
                            {renderParsedHeader()}
                        </div>
                        <div>Payload</div>
                        {renderParsedPayload()}
                        {renderSystem()}
                    </div>
                </div>
            </div>
            <div>
                <span>Unix时间戳：</span>
                <input onChange={onChange}></input>
                <span>格式化后时间戳：{formattedTime}</span>
            </div>
        </div>
    );
}

export default JwtParse
