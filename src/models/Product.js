const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      width: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
      },

      height: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
      },

      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      earning_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
