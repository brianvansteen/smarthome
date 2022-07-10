module.exports = function(app) {

    app.get("/", function(req, res){ // main page
        res.render('index.html');
    });

    app.get("/about", function(req, res){ // about page
        res.render('about.html');
    });

    app.get("/adddevice", function(req, res){ // add device page
        res.render('adddevice.html');
    });

    app.post("/deviceadded", function(req, res){ // SQL code to add device to devices table
        // saving data in the database
        let sqlquery = "INSERT INTO devices (device_type, device_name, activation, locked, temperature) VALUES (?, ?, ?, ?, nullif(?, ''))";
        // execute sql query
        let newrecord = [req.body.device, req.body.name, req.body.activation, req.body.locking, req.body.temperature]; // columns in devices table
        db.query(sqlquery, newrecord, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else
            res.send(
                "Hello, your " + req.body.name + " device for " + req.body.device + "," + '<br/>'
            + " is set to: " + req.body.activation + "," + '<br/>'
            + " and locking of: " + req.body.locking + "," + '<br/>'
            + " with a temperature of " + req.body.temperature + "C," + '<br/>'
            + " and has been added to the MySmartHome application!" + '<br/>' + '<br/>'
            + "Return to main menu:" + '<br/>' + '<a href = "/">Home</a>');
        });
    });

    app.get("/control", function(req, res){ // control page
        // query database
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("control.html", {availableDevices: result});
        });
    });

    app.post("/controlactivation", function(req, res){ // SQL to control activation column in devices table
        // saving data in the database
        let sqlquery = "UPDATE devices SET activation = ? WHERE id = ?"
        let update = [req.body.activation, req.body.id];
        db.query(sqlquery, update, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else
            res.send(
                "Hello, your device " + req.body.id + "," + '<br/>'
            + " is now set to: " + req.body.activation + "," + '<br/>'
            + " and has been updated in the MySmartHome application!" + '<br/>' + '<br/>'
            + "Return to main menu:" + '<br/>' + '<a href = "/">Home</a>');
        });
    });

    app.post("/controllocking", function(req, res){// SQL to control locked column in devices table
        // saving data in the database
        let sqlquery = "UPDATE devices SET locked = ? WHERE id = ?"
        let update = [req.body.locking, req.body.id];
        db.query(sqlquery, update, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else
            res.send(
                "Hello, your device " + req.body.id + "," + '<br/>'
            + " is now set to: " + req.body.locking + "," + '<br/>'
            + " and has been updated in the MySmartHome application!" + '<br/>' + '<br/>'
            + "Return to main menu:" + '<br/>' + '<a href = "/">Home</a>');
        });
    });

    app.post("/controltemperature", function(req, res){// SQL to control temperature column in devices table
        // saving data in the database
        let sqlquery = "UPDATE devices SET temperature = ? WHERE id = ?"
        let update = [req.body.temperature, req.body.id];
        db.query(sqlquery, update, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else
            res.send(
                "Hello, your device " + req.body.id + "," + '<br/>'
            + " is now set to: " + req.body.temperature + "," + '<br/>'
            + " and has been updated in the MySmartHome application!" + '<br/>' + '<br/>'
            + "Return to main menu:" + '<br/>' + '<a href = "/">Home</a>');
        });
    });

    app.get("/deletedevice", function(req, res){ // delete device page
        // query database
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("deletedevice.html", {availableDevices: result});
        });
    });

    app.post("/delete-id", function (req, res){ // delete device by id column
        //searching the database
        let id = [req.body.id];
        let sqlquery = "DELETE FROM `devices` WHERE id = ?";
        //execute sql query
        db.query(sqlquery, id, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send(
                    "Hello, your device ID " + id + " has been deleted to the MySmartHome application!" + '<br/>' + '<br/>'
                + "Return to main menu:" + '<br/>' + '<a href = "/">Home</a>');
            }
        })
    });

    app.post("/delete-name", function (req, res){ // delete device by device_name column
        //searching the database
        let name = [req.body.name];
        let sqlquery = "DELETE FROM `devices` WHERE device_name = ?";
        //execute sql query
        db.query(sqlquery, name, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send(
                    "Hello, your device " + name + " has been deleted to the MySmartHome application!" + '<br/>' + '<br/>'
                + "Return to main menu:" + '<br/>' + '<a href = "/">Home</a>');
            }
        })
    });

    app.post("/delete-type", function (req, res){ // delete device by device_type column
        //searching the database
        let type = [req.body.type];
        let sqlquery = "DELETE FROM `devices` WHERE device_type = ?";
        //execute sql query
        db.query(sqlquery, type, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send(
                    "Hello, your device(s) " + type + " has been deleted to the MySmartHome application!" + '<br/>' + '<br/>'
                + "Return to main menu:" + '<br/>' + '<a href = "/">Home</a>');
            }
        })
    });

    app.get("/status", function(req, res){ // status page
        // query database
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("status.html", {availableDevices: result});
        });
    });

    app.get("/status-result-id", function (req, res){ // status by id column
        //searching the database
        let id = [req.query.id];
        let sqlquery = "SELECT * FROM `devices` WHERE id = ?";
        //execute sql query
        db.query(sqlquery, id, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.render('list.html', {availableDevices:result})
            }
        })
    });
    
    app.get("/status-result-name", function (req, res){ // status by device_name column
        //searching the database
        let name = [req.query.name];
        let sqlquery = "SELECT * FROM `devices` WHERE device_name LIKE ?";
        //execute sql query
        db.query(sqlquery, name, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.render('list.html', {availableDevices:result})
            }
        })
    });


    app.get("/status-result-type", function (req, res){ // status by device_type column
        //searching the database
        let type = [req.query.type];
        let sqlquery = "SELECT * FROM `devices` WHERE device_type = ?";
        //execute sql query
        db.query(sqlquery, type, (err,result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.render('list.html', {availableDevices:result})
            }
        })
    });

};