var express = require("express");
var app = express();
app.use(express.static("build"));
app.get("/", function (req, res, next) {
  res.redirect("/");
});
app.listen(process.env.APP_PORT || 8080);
