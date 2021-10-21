const express = require("express");
const path = require("path");
var app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 5000;
const { MONGOURI } = require("./keys");

var socket_io = require("socket.io");
var io = socket_io();

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Connected to mongo", err);
});

//views

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//Body parser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./models/drivers");
require("./models/driversLocations");
require("./models/bookings");
require("./models/address");
app.use(express.json());
app.use(require("./routes/index"));

app.use(require("./routes/drivers"));
app.use(require("./routes/driverLocation"));
app.use(require("./routes/bookings"));
// app.listen(PORT, () => {
//   console.log("Server is running on" + PORT);
// });
io.listen(
  app.listen(PORT, function () {
    console.log("Server running on port", PORT);
  })
);

app.io = io.on("connection", function (socket) {
  console.log("Socket connected: " + socket.id);
});
