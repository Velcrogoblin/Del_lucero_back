const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "APIKEY123456789";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1w",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Debes completar todos los campos" });
  }

  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      return res.status(409).json({ message: "El usuario ya está registrado" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: createdUser.id }, JWT_SECRET, {
      expiresIn: "1w",
    });

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro de usuario" });
  }
};

const verifyToken = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado: Token inválido o expirado" });
  }
};

module.exports = {
  login,
  register,
  verifyToken,
};
