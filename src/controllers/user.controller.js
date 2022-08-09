import db from "../database";
const bcrypt = require("bcrypt");

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  await db.query(
    "INSERT INTO `USUARIOS` (`nombre`, `contrasenia`, `tipo_usuario`) VALUES (?,?,?)",
    [username, await encryptPass(password), role]
  );
  return username;
};

export const userCreate = async (req, res) => {
  const { username, password, role } = req.body;
  const founduser = await userExists(username);
  if (!founduser) {
    console.log("usuario nuevo");
    await db.query(
      "INSERT INTO USUARIOS (nombre, contrasenia, tipo_usuario) VALUES (?,?,?)",
      [username, await encryptPass(password), role]
    );
    res.status(200).json({ message: "User was created succesfuly" });
  } else {
    res.status(400).json({ message: "The User already exist" });
  }
};

export const findUser = async (req, res) => {
  const result = await db.query("SELECT * FROM USUARIOS WHERE nombre = ?", [
    req.body.username,
  ]);
  const foundUser = result[0];
  if (!foundUser) {
    res.status(400).json({ message: "User not found" });
    return false;
  }
  const matchPass = await comparePass(req.body.password, foundUser.contrasenia);
  if (!matchPass) {
    res.status(401).json({ message: "Invalid Password" });
    return false;
  }
  return foundUser;
};

const encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePass = async (password, receivedPass) => {
  return await bcrypt.compare(password, receivedPass);
};

export const getUserByID = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(201).json(user);
};

export const removeUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.status(204);
};

export const editUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });
  res.status(201).json(user);
};

export const userExists = async (name) => {
  const result = await db.query("SELECT * FROM USUARIOS WHERE nombre = ?", [
    name,
  ]);
  if (!result[0]) return false;
  return result[0];
};
