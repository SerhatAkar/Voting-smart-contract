
const express = require("express");
const path = require("path");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

const Router = express.Router();

module.exports = app;