import { Avatar, Button, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from 'antd';
import "./ToolHeader.css"
import { doLoginOut, getCurrentUser, userLoginByPhoneImpl, userLoginImpl } from "@/service/user/UserService";
import { IUserModel, WheelGlobal } from "js-wheel";
import { readConfig } from "@/config/app/config-reader";
import withConnect from "@/redux/hoc/withConnect";
import { useSelector } from "react-redux";

export type HeaderFormProps = {
  onMenuClick: (menu: String) => void;
};

const ToolHeader: React.FC<HeaderFormProps> = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [isGetUserLoading, setIsGetUserLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserModel>();
  const { loginUser }  = useSelector((state: any) => state.user);

  useEffect(() => {
    if(loginUser && Object.keys(loginUser).length > 0) {
      saveLoginUserInfo(loginUser);
    }
  }, [loginUser]);


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

  const items: MenuProps['items'] = [
    {
      key: '2',
      onClick: doLoginOut,
      label: (
        <a>
          登出
        </a>
      )
    }]


  const renderLogin = () => {
    if (isLoggedIn) {
      var avatarUrl = localStorage.getItem('avatarUrl');
      if (avatarUrl) {
        return (<a>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Avatar size={40} src={avatarUrl} />
          </Dropdown>
        </a>);
      } else {
        return (<a>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Avatar size={40} >Me</Avatar>
          </Dropdown>
        </a>);
      }
    }
    const accessTokenOrigin = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    if (accessTokenOrigin) {
      const accessTokenCookie = accessTokenOrigin.split("=")[1];
      const refreshTokenCookie = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split("=")[1];
      const avatarUrlCookie = document.cookie.split('; ').find(row => row.startsWith('avatarUrl='))?.split("=")[1];
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem(WheelGlobal.ACCESS_TOKEN_NAME, accessTokenCookie);
      localStorage.setItem(WheelGlobal.REFRESH_TOKEN_NAME, refreshTokenCookie ? refreshTokenCookie : "");
      localStorage.setItem('avatarUrl', avatarUrlCookie ? avatarUrlCookie : "");
      localStorage.setItem(WheelGlobal.BASE_AUTH_URL, readConfig("baseAuthUrl"));
      localStorage.setItem(WheelGlobal.ACCESS_TOKEN_URL_PATH, readConfig("accessTokenUrlPath"));
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
    <div>
      <nav>
        <a onClick={() => handleMenuClick('tools')}>工具</a>
        <a onClick={() => handleMenuClick('about')}>关于</a>
        {renderLogin()}
      </nav>
    </div>
  </header>);
}

export default withConnect(ToolHeader);

