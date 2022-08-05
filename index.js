const expressClone = require("./express-clone.js");

const app = expressClone();
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

app.post("/", (req, res) => {
  res.send({ message: "POST /" });
});

app.put("/", (req, res) => {
  res.send({ message: "PUT /" });
});

app.delete("/", (req, res) => {
  res.send({ message: "DELETE /" });
});

app.logRoutes();

app.listen(3001);
