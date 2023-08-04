const AdminModel = require('../models/admin.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addAdmin = async (req, res) => {
  // Check if username already exists
  const findUsername = await AdminModel.findOne({
    where: { username: req.body.username },
  });
  if (!findUsername) {
    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create account
    new AdminModel({
      username: req.body.username,
      password: hashedPassword,
    })
      .save()
      .then((data) => {
        res.status(200).send(`New Admin : ${data}`);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    res.status(500).send('username already exists');
  }
};

const loginAdmin = async (req, res) => {
  // Verify username
  const findUsername = await AdminModel.findOne({
    where: { username: req.body.username },
  });
  if (findUsername) {
    // Verify password
    const comparePassword = bcrypt.compareSync(
      req.body.password,
      findUsername.password
    );
    if (comparePassword) {
      // Generate token
      jwt.sign(
        { id: comparePassword.id, username: comparePassword.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' },
        (err, token) => {
          if (token) return res.json({ token: `Bearer ${token}` });
          return res.status(500).send('token generation failed : ', err);
        }
      );
    } else {
      return res.status(500).send('invalid credentials');
    }
  } else return res.status(404).send('invalid credentials');
};

// Testing Purpose
const getAllAdmins = async (req, res) => {
  await AdminModel.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err.message));
};

const removeAdmin = async (req, res) => {
  await AdminModel.destroy({ where: { id: req.params.id } });
};
// Testing Purpose

module.exports = {
  addAdmin,
  loginAdmin,
  getAllAdmins,
  removeAdmin,
};
