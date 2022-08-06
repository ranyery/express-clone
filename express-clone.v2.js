// @ts-check
function expressClone() {
  const http = require("http");
  const server = http.createServer();

  const DEFAULT_PORT = 3001;
  let DEFAULT_RESPONSE_TYPE = "text/plain;charset=utf-8";

  let tempAny = "";

  const ROUTES = {};

  /**
   * @param { "GET" | "POST" | "PUT" | "DELETE" } method
   * @param { string } uri
   * @param { any } any
   */
  const addRoute = (method, uri, any) => {
    ROUTES[method] ||= [];
    const methodRoutes = ROUTES[method];
    methodRoutes.push({ path: uri, data: any });
  };

  const setRouteConfig = (method, uri, fn) => {
    fn(requestObjectInterface, responseObjectInterface);
    addRoute(method, uri, tempAny);
    server.on(uri, (data) => {
      const { request, response } = data;
      const routeData = ROUTES[method].find((route) => route.path === uri);
      response.writeHead(200, { "Content-Type": DEFAULT_RESPONSE_TYPE });
      response.end(JSON.stringify(routeData["data"]));
    });
  };

  const requestObjectInterface = {};
  const responseObjectInterface = {
    send: (any) => (tempAny = any),
  };

  const lib = {
    logRoutes: () => console.log(ROUTES),
    json: () => () => (DEFAULT_RESPONSE_TYPE = "application/json"),
    use: (fn) => fn(),

    get: (uri, fn) => setRouteConfig("GET", uri, fn),
    post: (uri, fn) => setRouteConfig("POST", uri, fn),
    put: (uri, fn) => setRouteConfig("PUT", uri, fn),
    delete: (uri, fn) => setRouteConfig("DELETE", uri, fn),

    listen: (port) => {
      const serverPort = port || DEFAULT_PORT;
      return server
        .on("request", (request, response) => {
          const { url } = request;
          server.emit(url || "/", { request, response });
        })
        .listen(serverPort, () => {
          console.log(`🚀 Server is running on http://localhost:${serverPort}`);
        });
    },
  };

  return lib;
}

module.exports = expressClone;
