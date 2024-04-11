const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

/* ************* CORS configuration ************* */

/* ************* Request parsing in json format ************* */
app.use(express.json());
/* ************************************************ */

app.use("/static", express.static(`${__dirname}/rooms`));

// CORS configuration for only client connexion with available HTTP methods GET, POST, DELET.
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE",
    Credential: true,
    optionsSuccessStatus: 200,
  })
);

/* ************************************************ */

/* ************* Routes configuraiton ************* */

// Import the API routes from router module
const router = require("./router");
// Mount the API routes under the "/api endpoint"
app.use("/api", router);

/* ************************************************ */

module.exports = app;
