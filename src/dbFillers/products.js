const { Product, Client, Order } = require("../db.js");

const products = [
  {
    name: "velita",
    width: 22.5,
    height: 50.4,
    weight: 150,
    stock: 1,
    price: 150,
    img: "https://th.bing.com/th/id/OIP.Osnlr5em3s5K4ekISfwZAwAAAA?pid=ImgDet&rs=1",
    duration: 150,
  },
  {
    name: "velota",
    width: 22.5,
    height: 50.4,
    weight: 150,
    stock: 1,
    price: 150,
    img: "https://th.bing.com/th/id/OIP.Osnlr5em3s5K4ekISfwZAwAAAA?pid=ImgDet&rs=1",
    duration: 150,
  },
  {
    name: "otra vela",
    width: 22.5,
    height: 50.4,
    weight: 150,
    stock: 1,
    price: 150,
    img: "https://th.bing.com/th/id/OIP.Osnlr5em3s5K4ekISfwZAwAAAA?pid=ImgDet&rs=1",
    duration: 150,
  },
  {
    name: "otra vela mas",
    width: 22.5,
    height: 50.4,
    weight: 150,
    stock: 1,
    price: 150,
    img: "https://th.bing.com/th/id/OIP.Osnlr5em3s5K4ekISfwZAwAAAA?pid=ImgDet&rs=1",
    duration: 150,
  },
  {
    name: "faa cuantas velas hay",
    width: 22.5,
    height: 50.4,
    weight: 150,
    stock: 1,
    price: 150,
    img: "https://th.bing.com/th/id/OIP.Osnlr5em3s5K4ekISfwZAwAAAA?pid=ImgDet&rs=1",
    duration: 150,
  },
];

const clients = [
  {
    name: "nico",
    phone: "123456789",
    address: "av. de los incas 789",
    active: true,
    Purchases: [],
    Orders: [],
  },
  {
    name: "Alan",
    phone: "1131054628",
    address: "Cordoba 120",
    active: true,
    Purchases: [],
    Orders: [],
  },
  {
    name: "david",
    phone: "145756789",
    address: "velez sarsfield 45",
    active: true,
    Purchases: [],
    Orders: [],
  },
];

const orders = [
  {
    products: [
      {
        product_id: 2,
        quantity: 2,
        price: 100,
      },
      {
        product_id: 1,
        quantity: 3,
        price: 400,
      },
    ],
    date: "2023-01-10T03:00:00.000Z",
    delivery_date: "2023-01-10T03:00:00.000Z",
    delivery_method: "Envio",
    status: "pendiente",
    active: true,
    client_id: null,
    Products: [],
  },
  {
    products: [
      {
        product_id: 2,
        quantity: 2,
        price: 100,
      },
      {
        product_id: 1,
        quantity: 3,
        price: 400,
      },
    ],
    date: "2023-01-10T03:00:00.000Z",
    delivery_date: "2023-01-10T03:00:00.000Z",
    delivery_method: "Envio",
    status: "pendiente",
    active: true,
    client_id: null,
    Products: [],
  },
  {
    products: [
      {
        product_id: 2,
        quantity: 2,
        price: 100,
      },
      {
        product_id: 1,
        quantity: 3,
        price: 400,
      },
    ],
    date: "2023-01-10T03:00:00.000Z",
    delivery_date: "2023-01-10T03:00:00.000Z",
    delivery_method: "Envio",
    status: "pendiente",
    active: true,
    client_id: null,
    Products: [],
  },
  {
    products: [
      {
        product_id: 2,
        quantity: 2,
        price: 100,
      },
      {
        product_id: 1,
        quantity: 3,
        price: 400,
      },
    ],
    date: "2023-01-10T03:00:00.000Z",
    delivery_date: "2023-01-10T03:00:00.000Z",
    delivery_method: "Envio",
    status: "pendiente",
    active: true,
    client_id: null,
    Products: [],
  },
  {
    products: [
      {
        product_id: 2,
        quantity: 2,
        price: 100,
      },
      {
        product_id: 1,
        quantity: 3,
        price: 400,
      },
    ],
    date: "2023-01-10T03:00:00.000Z",
    delivery_date: "2023-01-10T03:00:00.000Z",
    delivery_method: "Envio",
    status: "pendiente",
    active: true,
    client_id: null,
    Products: [],
  },
];

const productsFiller = () => {
  products.forEach((p) => Product.create(p));
  clients.forEach((c) => Client.create(c));
  orders.forEach((o) => Order.create(o));
};

module.exports = productsFiller;
