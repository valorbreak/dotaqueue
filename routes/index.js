var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/matches/:matchID', function(req,res) {
  var key = '9FBDC7E293CD7E6F00D1F6E578CB3516';
  var options = {
    host: 'api.steampowered.com',
    port: 80,
    path: '/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + req.params.matchID + '&key=' + key,
    method: 'GET'
  };
 
  var renderThis = function() {
    res.render('index',{"title": str});
  };
  var callbackHell = function(_res) {
    //console.log('STATUS: ' + _res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(_res.headers));
    _res.setEncoding('utf8');
    var str = '';
    _res.on('data', function (chunk) {
      //console.log('BODY: ' + chunk);
      str += chunk;
    });
    _res.on('end', function() {
      res.render('index', {"title":str});
    });
  };
    
  var exReq = http.request(options, callbackHell);

  exReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });  
  
  exReq.end();
  //res.render('index', {"title": req.params.matchID});
});

module.exports = router;
