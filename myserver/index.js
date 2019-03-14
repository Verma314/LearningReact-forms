var express = require('express')
var app = express();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("customers", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.post('/post', function (request, response) {
    console.log('recieved data')
    console.log(request.body);
    // console.log(request.body);      
    //response.send('successful');    
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = request.body;
        dbo.collection("customers").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});

app.post('/login', function (request, response) {
    console.log('recieved data')
    console.log(request.body);
    // console.log(request.body);      
    //response.send('successful');    
    MongoClient.connect(url, function (err, db) {
        
        var dbo = db.db("mydb");
        dbo.collection("customers").find(request.body).toArray(function(err, result) {
            if (err) throw err;
            console.log('result is' , result);
            if (typeof result !== 'undefined' && result.length > 0) {
                console.log ( 'wer are here');
                result[0].status = true;
                console.log('sending' , result[0]);
                response.send( result[0]);
            } else {
                var array = [];
                array[0] = {status:false};
                console.log( 'sending', array[0]);
                response.send(array[0]);
            }
            db.close();
          });

    });
});




const port = 4000;
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
