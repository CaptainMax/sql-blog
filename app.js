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
// Index route
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

// NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("new"); 
});
// CREATE ROUTE
app.post("/blogs",function(req, res){
   //create blogs
   var title = req.body.title;
   var image = req.body.image;
   var bodys = req.body.body;
    var ins = 'INSERT INTO blogSchema (title, image, body) VALUES ("'+ title +' "," '+ image +' ","' + bodys +'" )';
    connection.query(ins, function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            //then redirect to the index
            res.redirect("/");
        }
    })
   
   
});

//show route
app.get("/blogs/:id", function(req,res){
    var ids = req.params.id;
    var q = 'SELECT * FROM blogSchema where id = ("'+ ids +'")';
    connection.query(q, function(err, foundBlog){
        if(err) {
            res.redirect("/");
        } else{
            console.log(ids);
            res.render("show", {blog:foundBlog});
        }
    })
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
});