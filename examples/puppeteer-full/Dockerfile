FROM alanway/puppeteer

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

COPY src/ ./src
COPY package.json package-lock.json ./

RUN npm install
