const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Purchase",
    {
      purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,  
      },

      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
