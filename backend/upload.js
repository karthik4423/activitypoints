const randomfile = require("./random.js");

module.exports = function (app) {
  app.get("/docs", function (req, res) {
    res.send(randomfile);
  });

  app.get("/docs/:key", (req, res) => {
    res.send(randomfile.filter((rfile) => rfile.id == req.params.key)[0]);
  });
};
