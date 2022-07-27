const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../database");

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    let user;
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const query = await db.query(
      `SELECT * FROM USUARIOS WHERE USUARIOS.id_usuario = ${req.userId}`
      );
    user = query[0];
    if (!user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const idAdmin = async (req, res, next) => {
    let user;
    const query = await db.query(
      `SELECT * FROM USUARIOS WHERE USUARIOS.id_usuario = ${req.userId}`
      );
      user = query[0];
      const role = user.tipo_usuario;

  if (role == "admin") {
    next();
    return;
  }
  res.status(401).json({ message: "Admin rol is required" });
};

export const isUser = async (req, res, next) => {
  let user;
  const query = await db.query(
    `SELECT * FROM USUARIOS WHERE USUARIOS.id_usuario = ${req.userId}`
    );
    user = query[0];
    const role = user.tipo_usuario;

  if (!(role == "admin")) {
    next();
    return;
  }

  res.status(401).json({ message: "User rol is required" });
};
