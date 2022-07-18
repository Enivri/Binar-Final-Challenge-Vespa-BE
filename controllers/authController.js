const authService = require("../services/authService");


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { status, status_code, message, data } = await authService.register({
      name,
      email,
      password
    });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    })
  } catch (err) {
    return {
      status: false,
      status_code: 500,
      message: err.message,
      data: {},
    };
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, town, address, phone, picture } = req.body;
    const { status, status_code, message, data } = await authService.updateUsers({
      id,
      name,
      town,
      address,
      phone,
      picture: req.file,
    });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    })
  } catch (err) {
    return {
      status: false,
      status_code: 500,
      message: err.message,
      data: {},
    };
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { status, status_code, message, data } = await authService.deleteUsers({
      id,
    });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
  } catch (err) {
    return {
      status: false,
      status_code: 500,
      message: err.message,
      data: {},
    };
  }
};

const getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, status_code, message, data } = await authService.getUsersById({
      id,
    });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
  } catch (err) {
    return {
      status: false,
      status_code: 500,
      message: err.message,
      data: {},
    };
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { status, status_code, message, data } = await authService.getAllUsers({});

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
  } catch (err) {
    return {
      status: false,
      status_code: 500,
      message: err.message,
      data: {},
    };
  }
};

const login = async (req, res) => {
  try {
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
  } catch (err) {
    return {
      status: false,
      status_code: 500,
      message: err.message,
      data: {},
    };
  }
};

const getCurrentUsers = async (req, res) => {
  try {
    res.status(200).send({
      status: 200,
      message: "hi",
      data: req.user,
    })
  } catch (err) {
    return {
      status: false,
      status_code: 500,
      message: err.message,
      data: {},
    };
  }
};

// const loginGoogle = async (req, res) => {
//   try {
//     const { google_credential } = req.body;

//     const { status, status_code, message, data } = await authService.loginGoogle({
//       google_credential,
//     });

//     res.status(status_code).send({
//       status: status,
//       message: message,
//       data: data,
//     });
//   } catch (err) {
//     return {
//       status: false,
//       status_code: 500,
//       message: err.message,
//       data: {},
//     };
//   }
// };

module.exports = { register, login, getCurrentUsers, loginGoogle, updateUsers, deleteUsers, getUsersById, getAllUsers };
