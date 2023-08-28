const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },

      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      delivery_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      delivery_method: {
        type: DataTypes.STRING,
        defaultValue: "Retiro",
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "pendiente",
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
