var express = require("express"),
    Storage = require("./storage"),
    app = express();

var storage = new Storage();
storage.setup().then(function() {
  app.listen(process.env.PORT || 3000, function() {
    console.log('Express listening on port 3000');
  });
});

app.get("/", function (req, res) {
  storage.populate(1234).then(storage.score.bind(storage)).then(function(score) {
    res.send("Hello world, " + score + "!");
  });
});
