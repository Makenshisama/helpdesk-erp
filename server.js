require('dotenv').config()
const path = require('path');

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.NODEuPORT, () => {
  console.log(`Servidor rodando na porta ${process.env.NODEuPORT}`);
});
