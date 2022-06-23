const authService = require("../services/authService");


const register = async (req, res) => {
  const { name, email, password, town, address, phone, picture } = req.body;

  const { status, status_code, message, data } = await authService.register({
    name,
    email,
    password,
    town,
    address,
    phone,
    picture: req.uploaded_picture,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  })
};

const updateUsers = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, town, address, phone, picture } = req.body;

  const { status, status_code, message, data } = await authService.updateUsers({
    id,
    name,
    email,
    password,
    town,
    address,
    phone,
    picture: req.uploaded_picture,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  })
};

const deleteUsers = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await authService.deleteUsers({
    id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getUsersById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await authService.getUsersById({
    id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllUsers = async (req, res, next) => {
  const { status, status_code, message, data } = await authService.getAllUsers({
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, status_code, message, data } = await authService.login({
    email,
    password,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  })
};

const getCurrentUsers = async (req, res) => {

  res.status(200).send({
    status: 200,
    message: "hi",
    data: req.user,
  })
};

const loginGoogle = async (req, res) => {
  const { google_credential } = req.body;

  const { status, status_code, message, data } = await authService.loginGoogle({
    google_credential,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { register, login, getCurrentUsers, loginGoogle, updateUsers, deleteUsers, getUsersById, getAllUsers };
