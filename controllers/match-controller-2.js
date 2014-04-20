
function dotaMatchController(matchID,key){
  function getMatchDetails(){
    var link = {
      host: 'api.steampowered.com',
      port: 80,
      path: '/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + matchID + '&key=' + key,
      method: 'GET'
    };
    return link;
  }
  function getMatchHistory(){
  	var link = {
      host: 'api.steampowered.com',
      port: 80,
      path: '/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + matchID + '&key=' + key,
      method: 'GET'
    };
    return link;
  }
  return {
    "getMatchDetails": getMatchDetails,
    "getMatchHistory": getMatchHistory
  }
}


module.exports = dotaMatchController;
