const express = require("express");
var app = express();
const path = require("path");

app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "/public/index.html"));
 });
app.listen(process.env.APP_PORT || 8080);
