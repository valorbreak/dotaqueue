"use strict";
var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/testupdate/:title', function(req,res) {
   var testModel = new testTitle({title: req.params.title});
   testModel.save();
   console.log(testModel,'testmodel');
   res.render('index', { title: 'Success' });
});
router.get('/players/:userID', function(req,res) {
  
});
function censor(censor){
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 

    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;  
  }
}
router.get('/update', function(req,res){
  
  //mongoose.model('Cat', { name: String });
  
  var dbjson = JSON.stringify(mongoose, censor(mongoose));
  res.json(dbjson);
});

module.exports = router;
