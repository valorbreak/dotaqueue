"use strict";
var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');
var chest = require('./chest');
var mongoose = require('mongoose');

// Custom Controllers 
var dota = require('../controllers/match-controller-2.js');

// Custom Models
var testTitle = require('../models/test');

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
router.get('/matches/:matchID', function(req,res) {
  var key = chest.key;
  var dotaGet = dota(req.params.matchID,key);
  var options = dotaGet.getMatchDetails();

  function callbackHell(_res) {
    console.log('STATUS: ' + _res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(_res.headers));
    _res.setEncoding('utf8');
    var str = '';
    _res.on('data', function (chunk) {
      str += chunk;
    });
    _res.on('end', function() {
      //res.render('index', {"title":str});
      
      var matchData = JSON.parse(str);
      var testModel = new testTitle({title: matchData.results});
      testModel.save();
      res.json(JSON.parse(str));

    });
  }
  
  // Request Starts here  
  var exReq = http.request(options, callbackHell);
  exReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  exReq.end();

});

module.exports = router;
