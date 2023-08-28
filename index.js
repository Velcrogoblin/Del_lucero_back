const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const productsFiller = require("./src/dbFillers/products.js");
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    // productsFiller();
    console.log(`listening at port: ${PORT}`);
  });
});
