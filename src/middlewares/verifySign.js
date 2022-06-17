const db = require("../database");

export const checkExist = async (req, res, next) => {
  const result = await db.query("SELECT * FROM USUARIOS WHERE nombre = ?", [
    req.body.username,
  ]);
  const user = result[0];
  if (user) return res.status(400).json({ message: "The User already exist" });

  next();
};
