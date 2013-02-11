/**
 * Module dependencies.
 */

var express = require('express'),
    stylus = require('stylus'),
    sqlite3 = require('sqlite3').verbose(),
    db_calls = require("./db_calls"),
    util = require("./util")
    ;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
/*----------------------------------------------------------------------------*/
app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.post('/inventory', function(req, res){
      console.log("adding a new glasses");
      db_calls.addGlasses(req);
      res.render('inventory', {
        title: 'Add/Update Inventory'
      });
    res.end();
});

app.get('/search', function(req, res){
    console.log("Search Params: " + req.query["od_sphere"] + " " + req.query["od_cylinder"]);
    db_calls.searchGlasses(
        req.query["od_sphere"],
        req.query["od_cylinder"],
        req.query["od_axis"],
        req.query["od_add"],
        req.query["os_sphere"],
        req.query["os_cylinder"],
        req.query["os_axis"],
        req.query["os_add"],
        function(rows){
            res.render('results', {
                    title: 'results',
                    items: rows
                  });
            res.end();
    });
});



app.get('/inventory', function(req, res){
      console.log("/inventory");
      res.render('inventory', {
            title: 'Add/Update Inventory'
        });
       res.end();
});

app.get('/inventoryall', function(req, res){
    db_calls.getAllGlasses(function(rows){
        res.render('inventoryall', {
                title: 'Inventory All',
                items: rows
              });
    });
});
/*----------------------------------------------------------------------------*/
app.get('/locations', function(req, res){
    //displayLocations(res);
});
/*
app.get('/del_location/:id', function(req, res){
    console.log("delete this ");
});
*/
function displayLocations(res)
{
    var db = new sqlite3.Database('reims.db3');

    db.serialize(function() {
          db.all("SELECT * FROM Locations ORDER BY ifnull(default_position,999999999)", function(err, rows) {

          rows.forEach(function(item) {
            console.log(item.Location_Name);
            });

         res.render('locations', {
            title: 'Inventory Locations',
            items:rows
          });
      });
    });
    db.close();
}




app.use(stylus.middleware(
{
    src: __dirname + '/views',
    dest: __dirname + '/public'
}));

app.use(express.static(__dirname + '/public'));

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(process.env.PORT);
  console.log("Express server listening on port %d", process.env.PORT);
}