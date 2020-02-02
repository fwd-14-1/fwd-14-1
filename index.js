var express = require('express');
var app = express();

app.use('/public', express.static('public'));
app.set('view engine', 'html');

app.get('/index',function(req,res){
    res.sendFile(__dirname+'/views/index.html');
  });
  app.get('/basket',function(req,res){
    res.render(__dirname+'/views/basket.ejs');
  });
  app.get('/goods',function(req,res){
    res.sendFile(__dirname+'/views/goods.html');
  });
  app.get('/gallery',function(req,res){
    res.sendFile(__dirname+'/views/gallery.html');
  });
  app.listen(3002);