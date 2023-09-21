import User from "../models/user.model.js";

export const register = (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });

  console.log(newUser);
  res.send("registrado" + email);
};

export const login = (req, res) => {
  res.send("login");
};
