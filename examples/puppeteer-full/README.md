# puppeteer 示例

## Dockerfile 注意事项

* 使用 `alanway/puppeteer` 镜像, 
* 设置环境变量 `ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true` 跳过 Chromium 的下载. (因为`alanway/puppeteer`里已经下载配置好Chromium了)

以下是[参考示例](./Dockerfile):

```Dockerfile
FROM alanway/puppeteer

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

COPY src/ ./src
COPY package.json package-lock.json ./

RUN npm install
```

## Node 代码注意事项

* puppeteer 启动时注意设置以下选项:
  * `headless: true` Docker 环境必须无头浏览
  * `executablePath: 'google-chrome-stable'` 设置Chrome的的路径
  * `args: ['--no-sandbox', '--disable-setuid-sandbox']` 禁用Chrome的沙盒特性，否则使用本镜像是会出现异常: `Failed to move to new namespace: PID namespaces supported, Network namespace supported, but failed: errno = Operation not permitted`

以下是[参考代码](./src/test.js):

```javascript
const puppeteer = require("puppeteer");
const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    "userDataDir": "logs/chrome", // 设置 Chrome 数据存储路径, 可忽略
});
```