const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
/* ************* Request parsing in json format ************* */
app.use(express.json());
/* ************************************************ */

/* ************* CORS configuration ************* */

const roomsImagesPath = path.join(__dirname, "../public/images/rooms");
app.use("/static", express.static(roomsImagesPath));

// CORS configuration for only client connexion with available HTTP methods GET, POST, DELET.
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST",
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
