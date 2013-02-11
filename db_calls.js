var sqlite3 = require('sqlite3').verbose(),
    util = require("./util");
    
/*    
exports.getNextLocation = function(callback)
{
    var db = new sqlite3.Database('reims.db3');
    var stmt =  " SELECT location1, location2, count(1) AS count" +
                    " FROM glasses " + 
                    " WHERE ifnull(dispensed, 0) = 0 " +
                    " GROUP BY location1,location2" + 
                    " HAVING count(1) < (SELECT location1_capacity*location2_capacity FROM settings)" +
                    " ORDER BY location1, location2 "
                    ;
        db.get(stmt,
               function(err, row) {
                    console.log("Location1  Location2 Used");
                    console.log(row.location1 + " " + row.location2 + " " + row.count);
                    db.close();
                    //return callback(row);
            });
}

function getSettings(callback)
{
    var db = new sqlite3.Database('reims.db3');
    var sql_stmt = "SELECT * " +
                   " FROM settings";
    db.get(sql_stmt, function(err, row) {
                console.log(row.location1_name + "(" + row.location1_capacity +")" +
                            row.location2_name + "(" + row.location2_capacity +")" 
                            );
                db.close();
                callback(row);
        });
}
*/

exports.addGlasses = function(req) {
    
    var now = new Date();
    var db = new sqlite3.Database('reims.db3');
    var insert_stmt = db.prepare("INSERT INTO glasses VALUES (null,? ,?,?,?,?,? ,?,?,?,?,?,?,?,? ,?,null ,0,0)");
    
    var v_sku = req.body.sku,
    
        v_type = req.body.type,
        v_gender = req.body.gender,
        v_size = req.body.size,
        v_tint = req.body.tint,
        v_material = req.body.material,
        
        v_od_sphere = req.body.od_sphere == "undefined" ? null : req.body.od_sphere,
        v_od_cylinder = req.body.od_cylinder == "undefined" ? null : req.body.od_cylinder,
        v_od_axis = req.body.od_axis == "undefined" ? null : req.body.od_axis,
        v_od_add = req.body.od_add == "undefined" ? null : req.body.od_add,
        
        v_os_sphere = req.body.os_sphere == "undefined" ? null : req.body.os_sphere,
        v_os_cylinder = req.body.os_cylinder == "undefined" ? null : req.body.os_cylinder,
        v_os_axis = req.body.os_axis == "undefined" ? null : req.body.os_axis,
        v_os_add = req.body.os_add == "undefined" ? null : req.body.os_add;
       
    
    console.log("[Insert]" + 
        " - SKU: " + v_sku + 
        
        " - Type: " + v_type + 
        " - Gender: " + v_gender + 
        " - Size: " + v_size + 
        " - Tint: " + v_tint + 
        " - Material: " + v_material + 
        
        " - OD Sphere: " + v_od_sphere + 
        " - OD Cylinder: " + v_od_cylinder + 
        " - OD Axis: " + v_od_axis + 
        " - OD Add: " + v_od_add + 
        " - OS Sphere: " + v_os_sphere + 
        " - OS Cylinder: " + v_os_cylinder + 
        " - OS Axis: " + v_os_axis + 
        " - OS Add: " + v_os_add + 
        
        " - Create Date: " + util.formatDate(now));
    insert_stmt.run(v_sku,
    
                    v_type,
                    v_gender,
                    v_size,
                    v_tint,
                    v_material,
                    
                    v_od_sphere,
                    v_od_cylinder,
                    v_od_axis,
                    v_od_add,
                    v_os_sphere,
                    v_os_cylinder,
                    v_os_axis,
                    v_os_add,
                    
                    util.formatDate(now)
            );
    insert_stmt.finalize();
    db.close();
}

exports.getAllGlasses = function(callback) {
    var db = new sqlite3.Database('reims.db3');
    var sql = "SELECT * FROM glasses ORDER BY sku";
    db.serialize(function() {
          db.all(sql, function(err, rows) {
              /*
              rows.forEach(function(item) {
                console.log(item.glasses_id);
              });
              */
              db.close();  
              callback(rows);
          });
    });
}

exports.searchGlasses = function(od_sphere, od_cylinder, od_axis, od_add, os_sphere, os_cylinder, os_axis, os_add, callback) {
    console.log(
        "ODS:" + od_sphere +
        " ODC:" + od_cylinder +
        " ODA:" + od_axis +
        " ODD:" + od_add +
        
        " OSS:" + os_sphere +
        " OSC:" + os_cylinder +
        " OSA:" + os_axis +
        " OSD:" + os_add
    );    
    var db = new sqlite3.Database('reims.db3');
    var sql = "SELECT * FROM glasses ORDER BY sku";
    
    console.log("ODCylinder: " + od_cylinder + " Axis Tol: " + util.REIMS_Axis_Tolerance(od_cylinder));
    console.log("OSCylinder: " + os_cylinder + " Axis Tol: " + util.REIMS_Axis_Tolerance(os_cylinder));
    
    var od_sphere_tolerance = 0.50;
    var od_cylinder_tolerance = 0.50;
    var od_axis_tolerance = util.REIMS_Axis_Tolerance(od_cylinder);
    var od_add_tolerance = 0.25;
    
    var os_sphere_tolerance = 0.50;
    var os_cylinder_tolerance = 0.50;
    var os_axis_tolerance = util.REIMS_Axis_Tolerance(os_cylinder);
    var os_add_tolerance = 0.25;
    
    sql = "SELECT    g.*, " + 
                   /*" abs(g.od_sphere-ifnull(?, 0)) + " + 
                   " abs(g.od_cylinder-ifnull(?, 0)) + " + 
                   " abs(g.od_axis-ifnull(?, 0)) + " +   
                   " abs(g.od_add-ifnull(?, 0)) + " + 
                   " abs(g.os_sphere-ifnull(?, 0)) +  " + 
                   " abs(g.os_cylinder-ifnull(?, 0)) + " + 
                   " abs(g.os_axis-ifnull(?, 0)) + " + 
                   " abs(g.os_add-ifnull(?, 0)) vscore, " +
                   */
                   /*
                   " abs(g.od_sphere-ifnull(?, 0))/ (abs(g.od_sphere)+0.00000000001) + " + 
                   " abs(g.od_cylinder-ifnull(?, 0))/(abs(g.od_cylinder)+0.00000000001) + " + 
                   " abs(g.od_axis-ifnull(?, 0))/(abs(g.od_axis)+0.00000000001) + " +   
                   " abs(g.od_add-ifnull(?, 0))/(abs(g.od_add)+0.00000000001) + " + 
                   " abs(g.os_sphere-ifnull(?, 0))/(abs(g.os_sphere)+0.00000000001) +  " + 
                   " abs(g.os_cylinder-ifnull(?, 0))/(abs(g.os_cylinder)+0.00000000001) + " + 
                   " abs(g.os_axis-ifnull(?, 0))/(abs(g.os_axis)+0.00000000001) + " + 
                   " abs(g.os_add-ifnull(?, 0))/(abs(g.os_add)+0.00000000001) vscore, " +
                   */
                   /*
                   " (abs(g.od_sphere-ifnull(?, g.od_sphere)) - 0.05 )/ (SELECT abs(max(g1.od_sphere)-min(g1.od_sphere))+0.000000000000001 from glasses g1) + " + 
                   " (abs(g.od_cylinder-ifnull(?, g.od_cylinder)))/(SELECT abs(max(g1.od_cylinder)-min(g1.od_cylinder))+0.000000000000001 FROM glasses g1) + " + 
                   " (abs(g.od_axis-ifnull(?, g.od_axis)) + 0.05 )/(SELECT abs(max(g1.od_axis)-min(g1.od_axis))+0.000000000000001 FROM glasses g1) + " +   
                   " (abs(g.od_add-ifnull(?, g.od_add)))/(SELECT abs(max(g1.od_add)-min(g1.od_add))+0.000000000000001 FROM glasses g1) + " + 
                   " (abs(g.os_sphere-ifnull(?, g.os_sphere)))/(SELECT abs(max(g1.os_sphere)-min(g1.os_sphere))+0.000000000000001 FROM glasses g1) +  " + 
                   " (abs(g.os_cylinder-ifnull(?, g.os_cylinder)) )/(SELECT abs(max(g1.os_cylinder)-min(g1.os_cylinder))+0.000000000000001 FROM glasses g1) + " + 
                   " (abs(g.os_axis-ifnull(?, g.os_axis)) + 0.05 )/(SELECT abs(max(g1.os_axis)-min(g1.os_axis))+0.000000000000001 FROM glasses g1) + " + 
                   " (abs(g.os_add-ifnull(?, g.os_add)))/(SELECT abs(max(g1.os_add)-min(g1.os_add))+0.000000000000001 FROM glasses g1) vscore, " +
                   */
                   /* Feb 5th 2013*/
                   "( (abs(g.od_sphere-ifnull(?, g.od_sphere))/(SELECT abs(max(g1.od_sphere)-min(g1.od_sphere))+0.000000000000001 from glasses g1)) + " + 
                   " (abs(g.od_cylinder-ifnull(?, g.od_cylinder))/(SELECT abs(max(g1.od_cylinder)-min(g1.od_cylinder))+0.000000000000001 FROM glasses g1)) + " + 
                   " (abs(g.od_axis-ifnull(?, g.od_axis))/(SELECT abs(max(g1.od_axis)-min(g1.od_axis))+0.000000000000001 FROM glasses g1)) + " +   
                   " (abs(g.od_add-ifnull(?, g.od_add))/(SELECT abs(max(g1.od_add)-min(g1.od_add))+0.000000000000001 FROM glasses g1)) + " + 
                   
                   " (abs(g.os_sphere-ifnull(?, g.os_sphere))/(SELECT abs(max(g1.os_sphere)-min(g1.os_sphere))+0.000000000000001 FROM glasses g1)) +  " + 
                   " (abs(g.os_cylinder-ifnull(?, g.os_cylinder))/(SELECT abs(max(g1.os_cylinder)-min(g1.os_cylinder))+0.000000000000001 FROM glasses g1)) + " + 
                   " (abs(g.os_axis-ifnull(?, g.os_axis))/(SELECT abs(max(g1.os_axis)-min(g1.os_axis))+0.000000000000001 FROM glasses g1)) + " + 
                   " (abs(g.os_add-ifnull(?, g.os_add))/(SELECT abs(max(g1.os_add)-min(g1.os_add))+0.000000000000001 FROM glasses g1))) vscore, " +
                   
                   " abs(g.od_sphere-ifnull(?, g.od_sphere))/ (SELECT abs(max(g1.od_sphere)-min(g1.od_sphere))+0.000000000000001 from glasses g1) od_s, " + 
                   " abs(g.od_cylinder-ifnull(?, g.od_cylinder))/(SELECT abs(max(g1.od_cylinder)-min(g1.od_cylinder))+0.000000000000001 FROM glasses g1) od_c,  " + 
                   " abs(g.od_axis-ifnull(?, g.od_axis))/(SELECT abs(max(g1.od_axis)-min(g1.od_axis))+0.000000000000001 FROM glasses g1) od_x, " +   
                   " abs(g.od_add-ifnull(?, g.od_add))/(SELECT abs(max(g1.od_add)-min(g1.od_add))+0.000000000000001 FROM glasses g1)  od_d," + 
                   " abs(g.os_sphere-ifnull(?, g.os_sphere))/(SELECT abs(max(g1.os_sphere)-min(g1.os_sphere))+0.000000000000001 FROM glasses g1) os_s," + 
                   " abs(g.os_cylinder-ifnull(?, g.os_cylinder))/(SELECT abs(max(g1.os_cylinder)-min(g1.os_cylinder))+0.000000000000001 FROM glasses g1) os_c, " + 
                   " abs(g.os_axis-ifnull(?, g.os_axis))/(SELECT abs(max(g1.os_axis)-min(g1.os_axis))+0.000000000000001 FROM glasses g1) os_x, " + 
                   " abs(g.os_add-ifnull(?, g.os_add))/(SELECT abs(max(g1.os_add)-min(g1.os_add))+0.000000000000001 FROM glasses g1) os_d " +
            "FROM glasses g " +
            
            "WHERE g.od_sphere BETWEEN ?-? AND ?+? " +
            "   AND g.od_cylinder BETWEEN ? AND ?+? " +
            "   AND g.od_axis BETWEEN ?-? AND ?+? " +
            "   AND g.od_add BETWEEN ? AND ?+? " +

            "   AND g.os_sphere BETWEEN ?-? AND ?+? " +
            "   AND g.os_cylinder BETWEEN ? AND ?+? " +
            "   AND g.os_axis BETWEEN ?-? AND ?+? " +
            "   AND g.os_add BETWEEN ? AND ?+? " +
                       
            "ORDER BY vscore " +
            "LIMIT 100 ";        
    
    db.serialize(function() {
          db.all(sql,
                od_sphere, 
                od_cylinder, 
                od_axis, 
                od_add, 
                os_sphere, 
                os_cylinder, 
                os_axis, 
                os_add, 
                
                od_sphere, 
                od_cylinder, 
                od_axis, 
                od_add, 
                os_sphere, 
                os_cylinder, 
                os_axis, 
                os_add, 
               
                od_sphere, od_sphere_tolerance, od_sphere, od_sphere_tolerance,
                od_cylinder, od_cylinder, od_cylinder_tolerance,
                od_axis, od_axis_tolerance, od_axis, od_axis_tolerance,
                od_add, od_add, od_add_tolerance,
                
                os_sphere,os_sphere_tolerance, os_sphere, os_sphere_tolerance,
                os_cylinder, os_cylinder, od_cylinder_tolerance,
                os_axis, os_axis_tolerance, os_axis, os_axis_tolerance,
                os_add, os_add, os_add_tolerance,
                
                function(err, rows) {
                      console.log(err);
                      db.close();  
                      callback(rows);
                  });
    });
}