import { Typography } from "antd";
import React from "react";
import "./About.css"
const { Paragraph} = Typography;


const About: React.FC = (props) => {
  return (
    <div className="about-container">
      <div className="about-intro">
      这是一个在线编程工具网站，可以方便开发人员进行各种编程相关的操作。这个网站集合了许多实用的小工具，包括代码转换工具、格式化工具、代码压缩工具、字符串处理工具、JSON解析工具、正则表达式测试工具等等。

      这个网站的界面简洁清晰，操作也非常简单易懂。用户只需要选择需要使用的工具，并输入相应的参数，就可以轻松地完成操作。同时，网站还提供了实时预览功能，用户可以随时查看操作结果，并进行调整和修改。

      除此之外，网站还提供了一些实用的代码片段，方便用户使用。用户可以在这里找到各种编程语言的代码片段，并进行修改和学习。

      总之，这个在线编程工具网站是非常实用的，可以帮助开发人员更加高效地进行编程操作，节省时间和精力。欢迎各位开发人员前来使用和体验！
      </div>
    </div>
  );
}

export default About;