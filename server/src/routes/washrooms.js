const router = require("express").Router();

module.exports = db => {

  router.get("/washrooms", (req, res) => {
    db.query(`SELECT * FROM washrooms`)
    .then((washrooms) => {
      res.json(washrooms);
    });
  });

  router.post("/washrooms", (req, res) => {
    db.query(`
      INSERT INTO washrooms (name, latitude, longitude)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [req.body.name, req.body.lat, req.body.lng])
    .then((result) => {
      res.status(201).json(result.rows[0]);
    });
  });
  return router;
};