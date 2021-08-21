const router = require("express").Router();

module.exports = db => {

  router.get("/washrooms", (req, res) => {
    db.query(`SELECT * FROM washrooms`)
    .then((washrooms) => {
      res.json(washrooms);
    });
  });
  return router;
};