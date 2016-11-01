# H5 Server Platform

A static web resource release platform for hybrid development.

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

## API

### GET /:appId/:version

get static resource pack config

### Pack

#### GET /pack

get all packs

#### POST /pack/add

add new pack

post JSON params

| Params   | Type  | Desc                       | required |
| -------- |:-----:| :--------------------------|:--------:|
| name     | text  | hybrid page name           | true     |
| version  | text  | hybrid page version        | true     |
| dev      | text  | dev env download link      | true     |
| pre      | text  | dev pre download link      | true     |
| prod     | text  | prod env download link     | true     |
| version  | text  | hybrid page version        | true     |
| fallback | text  | cdn fallback download link | true     |

#### POST /pack/update

update pack

post JSON params

| Params   | Type  | Desc                       | required |
| -------- |:-----:| :--------------------------|:--------:|
| id       | text  | pack id                    | true     |
| name     | text  | hybrid page name           | false    |
| version  | text  | hybrid page version        | false    |
| dev      | text  | dev env download link      | false    |
| pre      | text  | dev pre download link      | false    |
| prod     | text  | prod env download link     | false    |
| version  | text  | hybrid page version        | false    |
| fallback | text  | cdn fallback download link | false    |

#### POST /pack/remove

remove pack

post JSON params

| Params   | Type  | Desc                       | required |
| -------- |:-----:| :--------------------------|:--------:|
| id       | text  | pack id                    | true     |

### GET /resource/:branch/:appId/:version/:filename

get specify file.

### POST /upload/:branch

| Params  | Type  | Desc                  | required |
| ------- |:-----:| :---------------------|:--------:|
| appId   | text  | hybrid app id         | true     |
| name    | text  | hybrid page name      | true     |
| version | text  | hybrid page version   | true     |
| upload  | file  | file must is tar file | true     |

post specify tar file or you can open / to upload file by friendly view.

## Static resource structure

```markdown
- ${appId}
  - ${version}
    - ${appId}.tar
    - CERT.json
    - Manifest.xml
```

## Project structure and workflow

![](http://ww2.sinaimg.cn/large/aa0fbcc4gw1f980kccqxnj20gs0cut9j.jpg)

![](http://ww4.sinaimg.cn/large/aa0fbcc4gw1f980lews5bj20ew0k4wf5.jpg)

## Author

@XueSeason
