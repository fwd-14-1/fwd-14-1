var express = require('express');
var app = express();

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render('index');
  });
  app.get('/basket',function(req,res){
    res.render('basket');
  });
  app.listen(3000);