import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var message = "";

app.use(bodyParser.urlencoded({ extended: true }));

function calculateDay(req, res, next) {
  var day = new Date().getDay();
  if (day === 0 || day === 6) {
    message = "Yay, It's weekend! It's time to have fun!";
  } else {
    message = "Boo, It's weeday! I have to work!";
  }
  next();
}

app.use(calculateDay);

app.get("/", (req, res) => {
  res.render("index.ejs", { message: message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
