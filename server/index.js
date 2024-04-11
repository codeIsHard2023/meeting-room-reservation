// Import the express application from src/app.js
const app = require("./src/app");

// Server port to listen
const port = 3310;

// Start the server and listen on the defined port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
