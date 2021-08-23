const router = require("express").Router();

module.exports = db => {

  router.get("/reviews", (req, res) => {
    db.query(`SELECT * FROM reviews`)
    .then((reviews) => {
      res.json(reviews);
    });
  });
  return router;
};