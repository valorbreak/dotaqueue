"use strict";

var dotaMatchController = {
  getMatchDetails : function (matchID,key){
    var link = {
      host: 'api.steampowered.com',
      port: 80,
      path: '/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + matchID + '&key=' + key,
      method: 'GET'
    };
    return link;
  },
  getMatchHistory : function (matchID,key){
    var link = {
      host: 'api.steampowered.com',
      port: 80,
      path: '/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + matchID + '&key=' + key,
      method: 'GET'
    };
    return link;
  }
};

module.exports = dotaMatchController;
