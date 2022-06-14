const db = require("../database");
let roles = await db.query("SELECT tipo_usuario FROM USUARIOS")

export const checkExist = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).json({ message: "The User already exist" });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "The email already exist" });

  next();
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
      return res.status(400).json({
        message: "Role ${req.body.roles} does not exist",
      });
    }
  }
  next();
};
