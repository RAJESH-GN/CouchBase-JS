// Import everything from express and assign it to the express variable
import express from "express";
const config = require("config");
var bodyParser = require("body-parser");
const helmet = require("helmet");
const couchbase = require("couchbase");
const db = require("./config.couchbase");

// Import WelcomeController from controllers entry point
import { WelcomeController } from "./controllers";

// Create a new express application instance
const app: express.Application = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The port the express app will listen on
const port = process.env.PORT || 3000;

console.log("App name:" + config.get("name"));
console.log("App mail:" + config.get("mail"));
console.log("App mail:" + config.get("password"));

// Mount the WelcomeController at the /welcome route
app.use("/welcome", WelcomeController);
// Serve the application at the given port

app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});
