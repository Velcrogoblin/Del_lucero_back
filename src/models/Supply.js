const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Supply",
    {
      supply_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      cost: {
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
