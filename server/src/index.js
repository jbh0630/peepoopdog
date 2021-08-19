const port = process.env.PORT || 8001;
const ENV = require("./environment");
const app = require("./application")(ENV);





app.listen(port, () => {
  console.log(`listening on port ${port}`);
});