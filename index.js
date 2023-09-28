const server = require("./src/app.js");
const cors = require("cors");
const app = express();
const { conn } = require("./src/db.js");
const { PORT } = process.env;

app.use(cors({
  origin: "https://dellucero.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"]
}))



conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`listening at port: ${PORT}`);
  });
});
