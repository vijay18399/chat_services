var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  return res.send("chat services working in http://localhost:" + port);
});

var routes = require("./routes");
app.use("/api", routes);


app.listen(port, function() {
  console.log("chat services working in http://localhost:" + port);
});
