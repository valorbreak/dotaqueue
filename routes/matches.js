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
var dotaMatchModel = require('../models/dota-match');

// GET home page
router.get('/:matchID', function(req,res) {
  var key = chest.key;
  var matchID = req.params.matchID;
  var dotaGet = dota(req.params.matchID,key);
  var options = dotaGet.getMatchDetails();

  
  // matchID must be int for mongodb to find it
  var findThis = {'result.match_id': parseInt(matchID)};

  // Find if the match exist on the database
  // return Data from the database
  // else create 
  dotaMatchModel.find(findThis).exec(function(err,match) {
    if(!err){
      console.log(match,'match');
      if(match.length === 0){
        var exReq = http.request(options, function (_res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(_res.headers));
          _res.setEncoding('utf8');
          var str = '';
          _res.on('data', function (chunk) {
            str += chunk;
          });
          _res.on('end', function() {
            var matchData = JSON.parse(str);
            //var dotaMatch = new dotaMatchModel({result: matchData.result});
            var dotaMatch = new dotaMatchModel(matchData);
            dotaMatch.save();
            res.json(matchData);
          });      
        });
        exReq.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
        exReq.end(); 

      }
      else{
        console.log('from db');
        res.json(match);
      }
    }
    else{
       res.json({'error':'error'});
    }
  });
  
});

module.exports = router;