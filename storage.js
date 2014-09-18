var mongoose = require('mongoose'),
    when = require('when'),
    nodefn = require('when/node');

var scoreSchema = new mongoose.Schema({
  score: Number
});
var Score = mongoose.model("Score", scoreSchema);

function Storage() {}

Storage.prototype.setup = function() {
  return nodefn.call(mongoose.connect.bind(mongoose), 'localhost');
}

Storage.prototype.disconnect = function() {
  mongoose.disconnect();
}

Storage.prototype.populate = function(score) {
  var model = new Score();
  model.score = score;
  return nodefn.call(model.save.bind(model));
}

Storage.prototype.score = function() {
  var deferred = when.defer();
  Score.where().findOneAndRemove(nodefn.createCallback(deferred.resolver));
  return deferred.promise.then(function(doc) {
    return doc.score;
  });
}

module.exports = Storage;




