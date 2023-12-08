// reference
// https://velog.io/@pikadev1771/Next.js-%EB%A1%9C%EC%BB%AClocalhost%EC%97%90-https-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
// https://satisfactoryplace.tistory.com/369
// https://velog.io/@cloudlee711/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-https-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EC%9D%84-%EC%8D%A8%EB%B3%B4%EC%9E%90-feat.React-mkcert

const http = require("http");
const { parse } = require("url");
const next = require("next");

const https = require("https");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

const httpsOptions = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost-cert.pem"),
};

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });

  // https 서버 추가
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT + 1, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on https://localhost:${PORT + 1}`);
    });
});
