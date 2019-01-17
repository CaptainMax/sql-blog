var express     = require("express");
var mysql       = require("mysql");
var methodOvrride = require("method-override");
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
app.use(methodOvrride("_method"));
app.use(bodyParser.urlencoded({extended:true}));

// RESTFUL ROUTES
// Index route
app.get("/", function(req, res){
    res.redirect("/blogs");
});
app.get("/blogs", function(req, res){
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
            res.redirect("/blogs");
        }
    })
   
   
});

//show route
app.get("/blogs/:id", function(req,res){
    var ids = req.params.id;
    var q = 'SELECT * FROM blogSchema where id = ("'+ ids +'")';
    connection.query(q, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else{
            //console.log(ids);
            res.render("show", {blog:foundBlog});
        }
    })
});

//edit route
/*app.get("/blogs/:id/edit",function(req, res){
    var ids = req.params.id;
    var tit = req.params.title;
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var q = "UPDATE blogSchema SET title = '" + title + "', image ='"+ image +"', body ='" + body +"' where (id = '"+ ids +"')";
    connection.query(q, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else{
            console.log(tit);
            res.render("edit", {blog:foundBlog});
        }
    });
});
*/
app.get("/blogs/:id/edit",function(req, res){
    var ids = req.params.id;
    var titl = req.params.title;
   /* 
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
*/
    
    var q = "SELECT * FROM blogSchema where id ='"+ ids +"' ";
    connection.query(q, function(err,result){
        if(err) {
            res.redirect("/blogs");
        } else{
            // console.log(ids);
            // console.log(req.params.title);
            // console.log(req.body.title);
           //console.log(result);
           
            res.render("edit", {blog:result});
            
        }
    });
});

//update route
app.put("/blogs/:id", function(req, res){
  var ids = req.params.id;
    var title = req.body.title;
    var image = req.body.image;
    var bodys = req.body.body;
    var q = "UPDATE blogSchema SET title = '" + title + "', image ='"+ image +"', body ='" + bodys +"' where id = '"+ ids +"'";
    connection.query(q, function(err, updatedBlog){
        if(err){
            console.log(ids);
            res.redirect("/blogs");
        } else {
            console.log(updatedBlog);
            console.log(ids);
            res.redirect("/blogs/" + req.params.id);
        }
    });
    //res.send("update route");
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
    //res.send("YOU HAVE REACHED THE DESTROY ROUTE");
    //destroy blog
    var ids = req.params.id;
    var q = 'DELETE FROM blogSchema where id = ("'+ ids +'")';
    connection.query(q, function(err){
        if(err){
            console.log("ERROR TO DELETE");
            res.redirect("/blogs");
        } else {
             res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
});