var express     = require("express");
var mysql       = require("mysql");
var bodyParser  = require("body-parser");
var app         = express();

/*
what we need to add to the database
title
image
body
created
*/

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'captainmax',
    database : 'blog'
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// RESTFUL ROUTES
app.get("/", function(req, res){
    var q = "SELECT * FROM blogSchema"
    connection.query(q, function(err, blogs){
        if(err) {
            console.log("ERROR!");
        } else {
            //var tit = blogs[1].title;
            res.render("index",{data:blogs});
        }
    });
    
})

app.get("/blogs", function(req,res){
    res.render("index");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
})