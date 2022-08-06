const expresClose = require("./express-clone.v2.js");
const app = expresClose();

app.use(app.json());

const books = [
  {
    title: "Meu Pé de Laranja Lima",
    author: "José Mauro de Vasconcelos",
  },
  {
    title: "O Mundo de Sofia",
    author: "Jostein Gaarder",
  },
  {
    title: "A História sem fim",
    author: "Michael Ende",
  },
];

app.get("/", (request, response) => {
  response.send(books);
});

app.get("/livros", (request, response) => {
  response.send({ message: "Aqui deve conter uma lista de livros" });
});

app.get("/autores", () => {});
app.get("/editoras", () => {});

app.logRoutes();

app.listen(3001);
