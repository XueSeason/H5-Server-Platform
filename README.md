# H5 Server Platform

A static web resource release platform for hybrid development.

# How to started

### 0.install dependencies

```
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

# API

## GET /resource/:appId/:version/:filename

get specify file.

## POST /upload

| Params  | Type  | Desc                  |
| ------- |:-----:| :---------------------|
| appId   | text  | hybrid app id         |
| name    | text  | hybrid page name      |
| version | text  | hybrid page version   |
| upload  | file  | file must is tar file |

post specify tar file or you can open / to upload file by friendly view.

# static resource structure

```markdown
- ${appId}
  - ${version}
    - ${appId}.tar
    - CERT.json
    - Manifest.xml
```
