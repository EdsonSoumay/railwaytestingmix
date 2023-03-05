const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT;

console.log("port:",PORT);
const app = express();
app.use(cors())


connectDB();

app.use(bodyParser.json());


app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
