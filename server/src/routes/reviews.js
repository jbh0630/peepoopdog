const router = require("express").Router();

module.exports = db => {

  router.get("/reviews", (req, res) => {
    db.query(`SELECT * FROM reviews`)
    .then((reviews) => {
      res.json(reviews);
    });
  });

  router.post("/reviews", (req, res) => {

    db.query(`
      INSERT INTO reviews (date, rating, comment, user_id, washroom_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [req.body.date, req.body.rating, req.body.comment, req.body.user_id, req.body.washroom_id])
    .then((result) => {
      res.status(201).json(result.rows[0]);
    });
  }); 
  return router;
};