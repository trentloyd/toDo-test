const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = [];
var workItems = [];

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

//Set Day
var today = new Date();

var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

var day = today.toLocaleDateString("en-US", options);

app.get("/", function (req, res) {
  res.render("list", { listTitle: day, newListItem: items });
});

app.post("/", function(req, res){
  //console.log(req.body);

  var item = req.body.newItem;   
  
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req,res){
  res.render("list",  { listTitle: "Work List", newListItem: workItems });
});

// app.post("/work", function(req,res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });


app.listen(3000, function () {
  console.log("Server started on port 3000 local");
});
