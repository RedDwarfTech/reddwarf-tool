import ToolHeader from "@/component/header/ToolHeader";
import withConnect from "@/redux/hoc/withConnect";
import { Card } from "antd";
import { useState } from "react";
import About from "../about/About";
import AppIcon from "../tool/appicon/AppIcon";
import CronTab from "../tool/crontab/CronTab";
import JsonTool from "../tool/json/JsonTool";
import JwtParse from "../tool/jwt/JwtParse";
import Yaml from "../tool/yaml/Yaml";
import "./Home.css";
import Regex from "../tool/regex/Regex";
import jwtImg from "@/asset/icon/jwt_logo.png";
import cronImg from "@/asset/icon/crontab.jpeg";
import yamlImg from "@/asset/icon/yaml.jpeg";
import jsonImg from "@/asset/icon/json.jpeg";
import regexImg from "@/asset/icon/regex.png";
import RemoveBackground from "../tool/rembg/RemoveBackground";
import Password from "antd/es/input/Password";
import PasswordTool from "../tool/pwd/PasswordTool";

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
                        <div className="tool-title">
                            <img width={30} height={30} src={jwtImg}/><div>JWT解析</div>
                        </div>
                        <div>查看JSON Web Tokens的内容</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "crontab")}>
                        <div className="tool-title">
                            <img width={35} height={35} src={cronImg}/>
                            <div>Crontab时间计算</div>
                        </div>
                        <div>cron表达式执行时间计算</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "yaml")}>
                        <div className="tool-title">
                            <img width={35} height={35} src={yamlImg}/>
                            <div>Yaml工具</div>
                        </div>
                        <div>Yaml与其他格式的互转</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "json")}>
                        <div className="tool-title">
                            <img width={35} height={35} src={jsonImg}/>
                            <div>Json工具</div>
                        </div>
                        <div>Json格式化校验</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "regex")}>
                        <div className="tool-title">
                            <img width={35} height={35} src={regexImg}/>
                            <div>正则表达式</div>
                        </div>
                        <div>正则表达式</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "rembg")}>
                        <div className="tool-title">
                            <img width={35} height={35} src={regexImg}/>
                            <div>一键抠图</div>
                        </div>
                        <div>一键抠图</div>
                    </Card.Grid>
                    <Card.Grid style={gridStyle} onClick={(e) => handleToolTitleClick(e, "pwd")}>
                        <div className="tool-title">
                            <img width={35} height={35} src={regexImg}/>
                            <div>密码工具</div>
                        </div>
                        <div>密码工具</div>
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
        } else if (showPage === 'regex') {
            return (<Regex></Regex>);
        } else if (showPage === 'rembg') {
            return (<RemoveBackground></RemoveBackground>);
        }else if (showPage === 'pwd') {
            return (<PasswordTool></PasswordTool>);
        }else {
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