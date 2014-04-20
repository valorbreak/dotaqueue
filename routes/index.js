"use strict";
var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');
var chest = require('./chest');

// Custom Controllers 
var dota = require('../controllers/match-controller-2.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/players/:userID', function(req,res) {
  
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
