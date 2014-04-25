var mongoose = require('mongoose');

var test = new mongoose.Schema( {
  title: { type: String }
});

var testTitle = mongoose.model('testTitle', test);

module.exports = testTitle;
