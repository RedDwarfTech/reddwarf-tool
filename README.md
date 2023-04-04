
### 介绍

Reddwarf tool是一个集合了常用小工具的网站。

### 开始开发

```bash
npm install
npm run start
```

macOS本机Nginx配置（/System/Volumes/Data/opt/homebrew/etc/nginx/conf.d/tool-web.conf）：

```
server {
        listen 8092;
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }
        location ^~ /tool/ {
            proxy_pass  http://127.0.0.1:11014/tool/;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location ^~ /post/ {
            proxy_pass  http://127.0.0.1:11014/post/;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

重新加载本地Nginx配置：

```bash
# 停止nginx
sudo kill -9 `ps -ef|grep nginx  |grep -v grep|awk '{print $2}'`
# 启动nginx
/opt/homebrew/opt/nginx/bin/nginx -c /System/Volumes/Data/opt/homebrew/etc/nginx/nginx.conf
```



