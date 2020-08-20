
var express = require('express');
var app = express();
var data = require("./data.json");

////set up mongo

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mean.psu.ac.th:27017/";
var options = { useUnifiedTopology: true, useNewUrlParser: true };


//set the view engine
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('pages/index', { info: data });
});


//get mongo
app.get('/product', function (req, res) {
  MongoClient.connect(url, options, function (err, db) {
    if (err) throw err;
    var dbo = db.db("fullstack");
    var query = {};
    dbo.collection("products").find(query).toArray(function (err, result) {

      if (err) throw err;
      console.log(result);

      res.render('pages/product', { product: result });
      db.close();
    });
  });

});
app.get('/productDetail/:productID', function (req, res) {

  var productsID = req.params.productID;
  ///////////////get the class
  MongoClient.connect(url, options, function (err, db) {
    if (err) throw err;
    var dbo = db.db("fullstack");
    var query = { ProductID: productsID };
    dbo.collection("products").find(query).toArray(function (err, result) {

      if (err) throw err;
      console.log(result);

      res.render('pages/productDetail', { detail: result });
      db.close();
    });
  });


});


app.listen(8080);
console.log('8080 is the magic port');