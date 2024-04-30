const http = require("http");
const getUsers = require("./modules/users");
const port = 3003;
const host = "127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const userName = url.searchParams.get("hello");

  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, ${userName}`);
    response.end();
    return;
  } else {
    switch (request.url) { 
      case "/?hello":
        response.status = 400;
        response.statusMessage = "Bad Request";
        response.header = "Content-Type: text/plain";
        response.write("Enter a name");
        response.end();
        break;

      case "/?users":
        response.status = 200;
        response.statusMessage = "OK";
        response.header = "Content-Type: application/json";
        response.write(getUsers());
        response.end();
        break;

      case "/":
        response.status = 200;
        response.statusMessage = "OK";
        response.header = "Content-Type: text/plain";
        response.write("Hello, world");
        response.end();
        break;

      default:
        response.status = 500;
        response.statusMessage = "Internal Server Error";
        response.header = "Content-Type: text/plain";
        response.write("");
        response.end();
        break;
    }
  }
});

server.listen(port, host, () => {
  console.log(`Сервер запущен по адресу http://${host}:${port}`);
});
