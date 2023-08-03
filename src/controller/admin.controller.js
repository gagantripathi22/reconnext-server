const AdminModel = require('../models/admin.model.js');
const bcrypt = require('bcryptjs');

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
  await AdminModel.findOne({
    where: { username: req.body.username },
  })
    .then((data) => {
      console.log();
      res.status(200).send(`Admin logged in : ${data.username}`);
    })
    .catch((err) => {
      res.status(500).send(`Login Failed ${err.message}`);
    });
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
