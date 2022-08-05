function expressClone() {
  const http = require("http");

  const routes = { GET: [], POST: [], PUT: [], DELETE: [] };

  // Default configuration
  let PORT = 3000;
  let message = "";
  let httpStatusCode = 200;
  let responseType = "text/plain;charset=utf-8";

  const setRoute = (method, uri, func) => {
    func(reqInterface, resInterface);
    routes[method].push({ path: uri, data: message });
  };

  const reqInterface = {};
  const resInterface = {
    send: (any) => (message = any),
  };

  const lib = {
    logResponseType: () => console.log(responseType),
    json: () => () => (responseType = "application/json"),
    use: (fn) => fn(),

    get: (uri, callback) => setRoute("GET", uri, callback),
    post: (uri, callback) => setRoute("POST", uri, callback),
    put: (uri, callback) => setRoute("PUT", uri, callback),
    delete: (uri, callback) => setRoute("DELETE", uri, callback),

    logRoutes: () => console.log(routes),
    listen: (n) => {
      const port = n || PORT;

      return http
        .createServer((request, response) => {
          const method = request.method;
          const uri = request.url;

          let route = null;
          try {
            route = routes[method].find((route) => route.path === uri);
          } catch (e) {
            console.log(e);
            route = { data: { message: "Bad Request" } };
            console.log(route);
          }

          response.writeHead(httpStatusCode, { "Content-Type": responseType });
          response.end(JSON.stringify(route.data));
        })
        .listen(port, () => {
          console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    },
  };

  return lib;
}

module.exports = expressClone;
