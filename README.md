# H5 Server Platform

Hybrid 静态资源包发布平台

## How to started

### 0.install dependencies

```bash
npm install
```

### 1.create directory

```bash
node deploy.js
```

### 2.generate ssl

```bash
cd rsa
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

### 3.start app

```bash
node app.js
open http://localhost:4000
```

## 测试

采用 postman，需要全局安装 newman

```bash
npm i -g newman

node app.js

npm run test
```

## API

### GET /sr/:appId

获取指定 appId 所有版本号

### GET /sr/:appId/latest

获取指定 appId 最新版本号

### GET /sr/:appId/:version

获取静态资源配置接口

请求参数：

| Params   | Type  | Desc         | required |
| -------- |:-----:| :------------|:--------:|
| appId    | text  | 前端项目 ID   | true     |
| version  | text  | 前端版本号    | true     |

返回参数：

| Params   | Type  | Desc |
| -------- |:-----:| :----|
| name     | text  | 前端项目名 |
| params   | text  | JSBridge 启动参数 |
| appUrl   | text  | 离线资源包地址 包含开发、预发布、生产环境 |
| host     | text  | 域名映射 包含开发、预发布、生产环境 |
| fallback | text  | 离线资源包 cdn 地址 |
| cert     | text  | 离线资源包 cert 地址 |
| manifest | text  | 离线资源包 manifest 地址 |

出错情况：

| Params   | Type  | Desc    |
| -------- |:-----:| :-------|
| err      | text  | 错误信息 |

### Account

POST /login

用户认证

请求参数：

| Params   | Type  | required |
| -------- |:-----:|:--------:|
| username | text  | true     |
| password | text  | true     |

返回参数：

| Params   | Type  | required |
| -------- |:-----:|:--------:|
| token    | text  | true     |

POST /register

用户注册

请求参数：

| Params   | Type  | required |
| -------- |:-----:|:--------:|
| username | text  | true     |
| password | text  | true     |
| mail     | text  | true     |

返回参数：

| Params   | Type  | required |
| -------- |:-----:|:--------:|
| token    | text  | true     |

---
**后续接口涉及到安全问题，需要认证**

### Pack

#### GET /pack

获取包信息，不带参数默认返回全部包信息

请求参数

| Params   | Type  | Desc              | required |
| -------- |:-----:| :-----------------|:--------:|
| name     | text  | 前端项目名          | false    |
| appId    | text  | 前端项目 ID         | false    |
| version  | text  | 前端版本号          | false    |

#### POST /pack/add

新增包到服务器

post JSON params

| Params   | Type  | Desc              | required |
| -------- |:-----:| :-----------------|:--------:|
| name     | text  | 前端项目名          | true     |
| appId    | text  | 前端项目 ID         | true     |
| version  | text  | 前端版本号          | true     |
| params   | text  | JSBridge 启动参数   | true     |
| dev      | text  | 开发链接 host 映射   | true     |
| pre      | text  | 预发布链接 host 映射 | true     |
| prod     | text  | 生产链接 host 映射   | true     |


#### POST /pack/update

更新包参数

post JSON params

| Params   | Type  | Desc              | required |
| -------- |:-----:| :-----------------|:--------:|
| name     | text  | 前端项目名          | false     |
| appId    | text  | 前端项目 ID         | true     |
| version  | text  | 前端版本号          | true     |
| params   | text  | JSBridge 启动参数   | false     |
| dev      | text  | 开发链接 host 映射   | false     |
| pre      | text  | 预发布链接 host 映射 | false     |
| prod     | text  | 生产链接 host 映射   | false     |

#### POST /pack/remove

移除包

post JSON params

| Params   | Type  | required |
| -------- |:-----:|:--------:|
| appId    | text  | true     |
| version  | text  | true     |

### GET /resource/:branch/:appId/:version/:filename

得到服务器上指定资源文件，该接口供内部使用，App 端获取资源，请走 CDN 线路。

### GET /resource/group

获取可配置的资源组

| Params  | Type  |
| ------- |:-----:|
| group   | array |

### POST /upload/:branch

| Params  | Type  | required |
| ------- |:-----:|:--------:|
| appId   | text  | true     |
| name    | text  | true     |
| version | text  | true     |
| upload  | file  | true     |

上传包到指定环境

## 静态资源包目录结构

包目录结构

```markdown
- ${appId}
  - ${version}
    - ${appId}.tar
    - CERT.json
    - Manifest.xml
```

## 安全验证

出于安全因素的考虑，需要对 tar 包进行签名认证。

我们会在本地生成**私钥**和**证书**

服务端通过私钥对 tar 包进行签名，生成数字签名（signature）保存到 CERT.json 文件中。

App 端从给定的证书中取出公钥，同时获取到服务器传来的数字签名，对 tar 进行验证。

## 项目架构和实现流程

![](http://ww2.sinaimg.cn/large/aa0fbcc4gw1f980kccqxnj20gs0cut9j.jpg)

![](http://ww4.sinaimg.cn/large/aa0fbcc4gw1f980lews5bj20ew0k4wf5.jpg)

## Author

[@XueSeason](<mailto:jijie.xue@quvide.com/>)
