import { Avatar, Button } from "antd";
import React, { useEffect, useState } from "react";
import "./ToolHeader.css"
import { doLoginOut, getCurrentUser, userLoginByPhoneImpl, userLoginImpl } from "@/service/user/UserService";
import { IUserModel, WheelGlobal, AuthHandler } from "js-wheel";
import { readConfig } from "@/config/app/config-reader";
import { useSelector } from "react-redux";
import withConnect from "../hoc/withConnect";
import { ControlOutlined, LogoutOutlined, PayCircleOutlined } from "@ant-design/icons";

export type HeaderFormProps = {
  onMenuClick: (menu: String) => void;
};

const ToolHeader: React.FC<HeaderFormProps> = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [isGetUserLoading, setIsGetUserLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserModel>();
  const { loginUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (loginUser && Object.keys(loginUser).length > 0) {
      saveLoginUserInfo(loginUser);
    }
  }, [loginUser]);

  React.useEffect(() => {
    document.addEventListener("click", handleMenuClose);
    return () => {
      document.removeEventListener("click", handleMenuClose);
    };
  }, []);

  const handleMenuClose = (event: any) => {
    const menu = document.getElementById('user-menu');
    const dropdown = document.getElementById('dropdown');
    if (menu && dropdown) {
      const target = event.target;
      if (!menu.contains(target)) {
        dropdown.style.display = 'none';
      }
    }
  }

  const saveLoginUserInfo = (userInfo: any) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem(WheelGlobal.ACCESS_TOKEN_NAME, userInfo.accessToken);
    localStorage.setItem(WheelGlobal.REFRESH_TOKEN_NAME, userInfo.refreshToken);
    localStorage.setItem('avatarUrl', userInfo.avatarUrl);
    localStorage.setItem(WheelGlobal.BASE_AUTH_URL, readConfig("baseAuthUrl"));
    localStorage.setItem(WheelGlobal.ACCESS_TOKEN_URL_PATH, readConfig("accessTokenUrlPath"));
    loadCurrentUser();
    setIsLoggedIn(true);
  }

  const handleMenuClick = (menu: string) => {
    props.onMenuClick(menu);
  };

  const userLogin = () => {
    if (process.env.NODE_ENV === 'production') {
      let param = {
        appId: readConfig("appId")
      };
      userLoginImpl(param).then((data: any) => {
        window.location.href = data.result;
      });
    } else {
      let param = {
        appId: readConfig("appId"),
        phone: readConfig("phone"),
        password: readConfig("password"),
        loginType: 1,
        deviceId: 1,
        deviceType: 1,
        deviceName: readConfig("deviceName")
      };
      userLoginByPhoneImpl(param);
    }
  }

  const avatarClick = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
      if (dropdown.style.display == "none" || dropdown.style.display == "") {
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    }
  }

  const showUserProfile = (event: any) => {
    handleMenuClick('profile');
    handleMenuClose(event);
  }

  const showSubscribe = (event: any) => {
    handleMenuClick('vip');
    handleMenuClose(event);
  }

  const renderLogin = () => {
    if (isLoggedIn) {
      var avatarUrl = localStorage.getItem('avatarUrl');
      return (
        <a id="user-menu">
          {avatarUrl ? <Avatar size={40} src={avatarUrl} onClick={avatarClick} /> : <Avatar onClick={avatarClick} size={40} >Me</Avatar>}
          <div id="dropdown" className="dropdown-content">
            <div onClick={showSubscribe}><PayCircleOutlined /><span>订阅</span></div>
            <div onClick={showUserProfile}><ControlOutlined /><span>控制台</span></div>
            <div onClick={doLoginOut}><LogoutOutlined /><span>登出</span></div>
          </div>
        </a>);
    }
    const accessTokenOrigin = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    if (accessTokenOrigin) {
      AuthHandler.storeCookieAuthInfo(accessTokenOrigin, readConfig("baseAuthUrl"), readConfig("accessTokenUrlPath"));
      loadCurrentUser();
      setIsLoggedIn(true);
    }
    return (<Button name='loginBtn' onClick={userLogin}>登录</Button>);
  }

  const loadCurrentUser = () => {
    if (!localStorage.getItem("userInfo") && isGetUserLoading === false) {
      setIsGetUserLoading(true);
      getCurrentUser().then((data: any) => {
        setUserInfo(data.result);
        localStorage.setItem("userInfo", JSON.stringify(data.result));
        setIsGetUserLoading(false);
      });
    }
  }

  return (<header>
    <div className="header-container">
      <nav>
        <a onClick={() => handleMenuClick('tools')}>工具</a>
        <a onClick={() => handleMenuClick('about')}>关于</a>
        {renderLogin()}
      </nav>
    </div>
  </header>);
}

export default withConnect(ToolHeader);

