const express = require("express");
const router = require("./src/router/allRouter");
const path = require("path");
const app = express();
var cors = require("cors");

const port = 3000;
const pathAPI = "/";

app.use(cors());
app.use(express.static(path.join(__dirname, "WWW")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "WWW", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello!");
});
app.use(pathAPI, router);

app.listen(port, () => {
  console.log(`Le serveur tourne sur http://localhost:${port}`);
});
