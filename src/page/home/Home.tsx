import ToolHeader from "@/component/header/ToolHeader";
import withConnect from "@/redux/hoc/withConnect";
import { Row, Col, Card, Breadcrumb } from "antd";
import { useState } from "react";
import About from "../about/About";
import AppIcon from "../tool/appicon/AppIcon";
import CronTab from "../tool/crontab/CronTab";
import JsonTool from "../tool/json/JsonTool";
import JwtParse from "../tool/jwt/JwtParse";
import Yaml from "../tool/yaml/Yaml";
import "./Home.css";

const Home: React.FC = (props) => {

    const [showPage, setShowPage] = useState('tools');

    const handleToolTitleClick = (e: any, tab: string) => {
        setShowPage(tab);
    }

    const onMenuClick = (menu: string) => {
        setShowPage(menu);
    }

    const gridStyle: React.CSSProperties = {
        width: '12%',
        textAlign: 'center',
        marginLeft: '20px',
        marginTop: '20px',
    };

    const renderContainer = () => {
        if (showPage === 'tools') {
            return (
                <Card className="tool-card" title="小工具">
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "jwt")}>
                        <div className="tool-title">JWT解析</div>
                        <div>查看JSON Web Tokens的内容</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "crontab")}>
                        <div className="tool-title">Crontab时间计算</div>
                        <div>cron表达式执行时间计算</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "yaml")}>
                        <div className="tool-title">Yaml工具</div>
                        <div>Yaml与其他格式的互转</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "json")}>
                        <div className="tool-title">Json工具</div>
                        <div>Json格式化校验</div>
                    </Card.Grid>
                </Card>
            );
        } else if (showPage === 'crontab') {
            return (<CronTab></CronTab>);
        } else if (showPage === 'appicon') {
            return (<AppIcon></AppIcon>);
        } else if (showPage === 'jwt') {
            return (<JwtParse></JwtParse>);
        } else if (showPage === "about") {
            return (<About></About>);
        } else if (showPage === 'yaml') {
            return (<Yaml></Yaml>);
        } else if (showPage === 'json') {
            return (<JsonTool></JsonTool>);
        } else {
            return (<div></div>);
        }
    }


    return (
        <div>
            <ToolHeader onMenuClick={(value) => onMenuClick(value.toString())}></ToolHeader>
            <div className="tool-container">
                <div className="left"></div>
                <div className="center">
                    {renderContainer()}
                </div>
                <div className="right"></div>
            </div>
        </div>

    );
}

export default withConnect(Home);