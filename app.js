const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = [];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
      weekday: "long",
      day: "numeric",
      month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  //   var currentDay = today.getDay();
  //   var day = "";

  // if (currentDay === 6 || currentDay === 0){
  //     day = "Weekend";
  // } else{
  //     day = "Weekday";
  // }
  //   day = weekday[d.getDay()];

  res.render("list", { kindOfDay: day, newListItem: items });
});

app.post("/", function(req, res){
    var item = req.body.newItem;   
    items.push(item);
    res.redirect("/");
})

app.listen(3000, function () {
  console.log("Server started on port 3000 local");
});
