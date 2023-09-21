const admin = require("../static/admin");

const isAdmin = async (req, res, next) => {
  const { credentials } = req.body;

  if (!credentials || !credentials.user || !credentials.password)
    return res
      .status(500)
      .json({ message: "Falta ingresar datos de administrador" });

  if (
    credentials.user === admin.user &&
    credentials.password === admin.password
  ) {
    return true;
  } else {
    return res.status(500).json({ message: "usuario no autorizado" });
  }
};

module.exports = isAdmin;
