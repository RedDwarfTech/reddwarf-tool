import ToolHeader from "@/component/header/ToolHeader";
import withConnect from "@/redux/hoc/withConnect";
import { Row, Col, Card } from "antd";
import { useState } from "react";
import About from "../about/About";
import AppIcon from "../tool/appicon/AppIcon";
import CronTab from "../tool/crontab/CronTab";
import JwtParse from "../tool/jwt/JwtParse";
import "./Home.css";

const Home: React.FC = (props) => {

    const [showPage, setShowPage] = useState('tools');

    const handleToolTitleClick = (e: any, tab: string) => {
        setShowPage(tab);
    }

    const onMenuClick =(menu:string)=> {
        setShowPage(menu);
    }

    const renderContainer = () => {
        if (showPage === 'tools') {
            return (
                <div className="center">
                    <Card className="tool-card" title="JWT解析" onClick={(e) => handleToolTitleClick(e, "jwt")}>
                        <div>查看JSON Web Tokens的内容</div>
                    </Card>
                    <Card className="tool-card" title="crontab时间计算" onClick={(e) => handleToolTitleClick(e, "crontab")}>
                        <div>cron表达式执行时间计算</div>
                    </Card>
                    <Card className="tool-card" title="app icon在线制作" onClick={(e) => handleToolTitleClick(e, "appicon")}>
                    </Card>
                    
                </div>
            );
        } else if (showPage === 'crontab') {
            return (<CronTab></CronTab>);
        } else if (showPage === 'appicon') {
            return (<AppIcon></AppIcon>);
        } else if (showPage === 'jwt') {
            return (<JwtParse></JwtParse>);
        } else if(showPage === "about"){
            return (<About></About>);
        } else {
            return (<div></div>);
        }
    }


    return (
        <div>
            <ToolHeader onMenuClick={(value)=>onMenuClick(value.toString())}></ToolHeader>
            <div className="tool-container">
                <div className="left"></div>
                {renderContainer()}
                <div className="right"></div>
            </div>
        </div>
    );
}

export default withConnect(Home);