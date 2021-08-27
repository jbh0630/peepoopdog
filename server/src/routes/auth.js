const router = require("express").Router();

module.exports = db => {

  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1`,[req.body.email])
    .then((users) => {
      res.json(users);
    });
  });
  
  return router;
};