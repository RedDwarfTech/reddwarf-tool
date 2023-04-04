import { Breadcrumb, Button, Checkbox } from "antd";
import * as cronParser from 'cron-parser';
import LinuxParser from 'cron-parser';
import dayjs from "dayjs";
import { useState } from "react";
import "./CronTab.css";
import { v4 as uuid } from 'uuid';

const CronTab: React.FC = (props) => {

    const [checkedValue, setCheckedValue] = useState<string>('linux');
    const [cronExpression, setCronExpression] = useState<string>('');
    const [options, setOptions] = useState({
        iterator: true,
        cronParser: 'quartz',
        tz: 'Asia/Shanghai', // 设置时区
    });

    const exeCheck = () => {
        
    }

    const renderResult = () => {
        if(!cronExpression){
            return;
        }
        const tagList: JSX.Element[] = [];
        const interval = cronParser.parseExpression(cronExpression, options);
        let count = 0;
        const next10Dates: Date[] = [];
        while (count < 10) {
            const nextDate:any = interval.next();
            next10Dates.push(nextDate.value.toDate());
            count++;
            const dString = nextDate.value.toDate().toString();
            const fmtTime= dayjs(dString).format('YYYY-MM-DD HH:mm:ss');
            tagList.push(<div key={uuid()} className="exe-time">{fmtTime}</div>);
        }
        return tagList;
    }

    const handleOnCheck = (value: string) => {
        setOptions({
            iterator: true,
            cronParser: value,
            tz: 'Asia/Shanghai', // 设置时区
        })
        setCheckedValue(value);
    }

    const handleInputChange = (e: any) =>{
        const inputVal = e.target.value;
        setCronExpression(inputVal);
    }

    return (
        <div className="cron-container">
            <Breadcrumb items={[
                    {
                        title: '首页',
                        href: '/'
                    },
                    {
                        title: 'JCrontab执行时间计算',
                    }
                ]}>
            </Breadcrumb>
            <h4>Crontab执行时间计算</h4>
            <div>类型：
                <Checkbox onClick={()=>handleOnCheck("linux")} checked ={checkedValue === "linux"?true:false}>Linux</Checkbox>
                <Checkbox onClick={()=>handleOnCheck("spring")} checked ={checkedValue === "spring"?true:false}>Java(Spring)</Checkbox>
                <Checkbox onClick={()=>handleOnCheck("quartz")} checked ={checkedValue === "quartz"?true:false}>Java(Quartz)</Checkbox>
            </div>
            <div className="cron-expr">CRON表达式：
                <input onChange={(e:any)=>handleInputChange(e)}></input>
                <Button type="primary" onClick={() => exeCheck()}>查看执行时间</Button>
            </div>
            <div>接下来10次的执行时间：</div>
            <div className="exe-result-box">
                {renderResult()}
            </div>
        </div>
    );
}

export default CronTab
