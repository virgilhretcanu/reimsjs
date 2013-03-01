/**
 * Module dependencies.
 */

var express = require('express'),
    stylus = require('stylus'),
    sqlite3 = require('sqlite3').verbose(),
    db_calls = require("./db_calls"),
    util = require("./util"),
    fs = require("fs");

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
    db_calls.getNextSku(function(sku){
        console.log(sku);
        res.render('inventory', {
            title: 'Add/Update Inventory',
            reserved_sku: sku
            });
    });
});

app.post('/inventory', function(req, res){
    db_calls.addGlasses(req,function(){
        db_calls.getNextSku(function(sku){
            res.render('inventory', {
                title: 'Add/Update Inventory',
                reserved_sku: sku
            });
        });
    });
});

app.get('/inventory_list', function(req, res){
     db_calls.getAllGlasses(function(rows){
                res.render('partials/inventory_list', {
                   glasses:rows
                });
     });
});

app.post('/inventoryadd', function(req, res){
    db_calls.getNextSku(function(sku){
         db_calls.addGlassesBySKU(req, sku, function(){
             console.log("Glasses Added");
             res.json({new_sku: sku});
        });
    });
});

app.post('/inventoryupdate', function(req, res){
     db_calls.updateGlasses(req,  function(){
             console.log("Glasses Updated");
             res.json({new_sku: null});
        });
});

app.post('/inventorydelete', function(req, res){
    db_calls.deleteGlassesById(req.body.glasses_id,function(){
            console.log("Glasses deleted");
            res.json({new_sku: null});//have to send a response
    });
});

app.get('/inventoryadd', function(req, res){
    res.render('inventory_multi_add', {
                title: 'Inventory Add(2)'
    });
});

app.get('/inventoryall', function(req, res){
    db_calls.getAllGlasses(function(rows){
        res.render('inventoryall', {
                title: 'Inventory All',
                items: rows
              });
    });
});

app.post('/backupdatabase', function(req, res){
    console.log("Copying database file... ");
    copyFile('reims.db3','reims_bk.db3',function(){
        res.json({newfile: null});//have to send a response
    })
 });
/*----------------------------------------------------------------------------*/
/*Functions */

function copyFile(source, destination, callback){
  fs.readFile(source, function(err, buf){
    if (err)
    {
        return callback(err)
    }
    fs.writeFile(destination, buf, callback);
  })
}
/*-----------------------------------------------------------------------------*/

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