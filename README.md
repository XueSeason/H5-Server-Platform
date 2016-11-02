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

### GET /static/:appId/:version

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
| dev      | text  | dev env host map link      | true     |
| pre      | text  | dev pre host map link      | true     |
| prod     | text  | prod env host map link     | true     |
| version  | text  | hybrid page version        | true     |

#### POST /pack/update

update pack

post JSON params

| Params   | Type  | Desc                       | required |
| -------- |:-----:| :--------------------------|:--------:|
| app_id   | text  | pack id                    | true     |
| version  | text  | hybrid page version        | true     |
| name     | text  | hybrid page name           | false    |
| dev      | text  | dev env host map link      | false    |
| pre      | text  | dev pre host map link      | false    |
| prod     | text  | prod env host map link     | false    |
| version  | text  | hybrid page version        | false    |

#### POST /pack/remove

remove pack

post JSON params

| Params   | Type  | Desc                       | required |
| -------- |:-----:| :--------------------------|:--------:|
| app_id   | text  | pack id                    | true     |
| version  | text  | hybrid page version        | true     |

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
