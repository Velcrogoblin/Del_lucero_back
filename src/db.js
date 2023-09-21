require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_URL } = process.env;

const sequelize = new Sequelize(
 // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  DB_URL, 
  {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Client, Order, Product, Purchase, User, Supplier, Supply, Expense } = sequelize.models;

Purchase.belongsToMany(Product, { through: "product_purchase" });
Product.belongsToMany(Purchase, { through: "product_purchase" });

Order.belongsToMany(Product, { through: "product_order" });
Product.belongsToMany(Order, { through: "product_order" });

Supply.belongsToMany(Product, {through: "product_supply"});
Product.belongsToMany(Supply, {through: "product_supply"});

Client.hasMany(Purchase, { foreignKey: "client_id" });
Purchase.belongsTo(Client, { foreignKey: "client_id" });

Client.hasMany(Order, { foreignKey: "client_id" });
Order.belongsTo(Client, { foreignKey: "client_id" });

Supply.belongsToMany(Supplier, { through: "supply_supplier"});
Supplier.belongsToMany(Supply, { through: "supply-supplier"});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
