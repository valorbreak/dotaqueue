var mongoose = require('mongoose');

var match = new mongoose.Schema( {
  result: mongoose.Schema.Types.Mixed
});

var matchModel = mongoose.model('matches', match);

module.exports = matchModel;
