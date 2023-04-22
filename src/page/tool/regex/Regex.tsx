import { Breadcrumb, Card } from "antd";
import { useState } from "react";
import './Regex.css'
import TextArea from "antd/es/input/TextArea";
import { matching } from "@/service/tool/regex/RegexService";

const Regex: React.FC = (props) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [macthingValue, setMatchingValue] = useState<string>('');
    const [matchedValue, setMatchedValue] = useState<string>('');

    const handleMatchingChange = (e: any) => {
        setMatchingValue(e.target.value);
    };

    const match = (e: any) => {
        const regex = new RegExp(inputValue, 'g');
        const result = matching(regex, macthingValue);
        if (result) {
            const resultStr = result.join('\n');
            setMatchedValue(resultStr);
        }
    };

    const onInputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const renderPopularRegex = () => {
        const obj = [ {description: '数字：', regex: '^[0-9]$'}, {description: 'n位的数字：', regex: '^\d{n}$'}, {description: '至少n位的数字：', regex: '^\d{n,}$'}, {description: 'm-n位的数字：', regex: '^\d{m,n}$'}, {description: '零和非零开头的数字：', regex: '^(0|[1-9][0-9])$'}, {description: '非零开头的最多带两位小数的数字：', regex: '^([1-9][0-9])(.[0-9]{1,2})?$'}, {description: '带1-2位小数的正数或负数：', regex: '^(-)?\d(\.\d{1,2})$'}, {description: '正数、负数、和小数：', regex: '^(-| )?\d(\.\d)?$'}, {description: '有两位小数的正实数：', regex: '^0-9?$'}, {description: '有1~3位小数的正实数：', regex: '^0-9?$'}, {description: '非零的正整数：', regex: '^[1-9]\d$|^([1-9][0-9]){1,3}$|^ ?[1-9][0-9]$'}, {description: '非零的负整数：', regex: '^-[1-9][]0-9"$|^-[1-9]\d$'}, {description: '非负整数：', regex: '^\d$|^\d|[1-9]\d*|0$'}, {description: '非正整数：', regex: '^-?[1-9]\d*|0$|^((-\d)|(0))$'}, {description: '非负浮点数：', regex: '^\d(\.\d)?$|^\d|[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0|0$'}, {description: '非正浮点数：', regex: '^((-\d(\.\d)?)|(0(.0)?))$|^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)|0?\.0|0$'}, {description: '正浮点数：', regex: '^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$|^(([0-9]\.\d[1-9][0-9])|([0-9][1-9][0-9]\.[0-9])|([0-9][1-9][0-9]))$'}, {description: '负浮点数：', regex: '^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$|^(-(([0-9]\.\d[1-9][0-9])|([0-9][1-9][0-9]\.[0-9])|([0-9][1-9][0-9])))$'}, {description: '浮点数：', regex: '^(-?\d)(\.\d)?$|^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0|0)$'} ];
        const tagList: JSX.Element[] = [];
        obj.forEach(item=>{
            tagList.push(<li className="regex-item">{item.description}{item.regex}</li>)
        });
        return tagList;
    }


    return (
        <div className="regex-center-body">
            <Breadcrumb items={[
                {
                    title: '首页',
                    href: '/'
                },
                {
                    title: '正则表达式',
                }
            ]}>
            </Breadcrumb>
            <h3>正则表达式</h3>
            <div className="jwt-parse-tips jwt-parse-tips-danger"><strong>提示：</strong> 所有的表达式和数据都在客户端，可放心使用。</div>
            <div className="regex-container">
                <div className="regex-container-oper">
                    <input onChange={onInputChange} className="regex-input" placeholder="正则表达式"></input>
                    <TextArea onChange={handleMatchingChange} rows={4} className="match-context" placeholder="待匹配文本"></TextArea>
                    <button onClick={match}>匹配</button>
                    <TextArea rows={4} className="match-result" placeholder="匹配结果" value={matchedValue}></TextArea>
                </div>
                <div className="regex-container-tips">
                    <h4>常用正则表达式：</h4>
                    <Card title="校验数字的表达式">
                        <ul>
                            {renderPopularRegex()}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Regex
