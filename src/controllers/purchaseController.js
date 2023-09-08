const { Product, Purchase, Client } = require("../db");
const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.findAll({
            include: [{model: Client}]
        });

        if (purchases.length === 0) {
            return res.status(404).json({message: "No se encontraron compras"});
    }

    return res.status(200).json(purchases);
} catch (error) {
    return res.status(500).json({message: error.message});
}
};

const postPurchase = async (req,res) => {
    try {
        const { client_id, products, date } = req.body;

        if( !products || !date  || !client_id) {
            return res.status(400).json({message: "Falta información"});
        }

        if(!regexUUID.test(client_id)) {
            return res.status(400).json({message: "El id no es válido"});
          }

        const client = await Client.findByPk(client_id);

        if(!client) {
          return res.status(404).json({message: `No existe cliente con el id: ${client_id}`});
        }

        const totalPrice = products.reduce((accumulator, product) => {
            return accumulator + (product.price * product.quantity);
          }, 0);

       const newPurchase = await Purchase.create ({
            date,
            total_amount: totalPrice,
            products
        })

        await newPurchase.setClient(client);

        return res.status(201).json({message: "Tu venta fue creada con éxito!"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}



module.exports = {
    getAllPurchases,
    postPurchase
}
