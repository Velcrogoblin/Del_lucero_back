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

      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      delivery_method: {
        type: DataTypes.STRING,
        defaultValue: "Retiro",
      },

      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "pendiente",
      },

      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
