var express = require("express")
var app = express();
var path = require('path');
var routes = require('./routes/routes');

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);

app.listen(3000,function () {
    console.log("server start!!");
});