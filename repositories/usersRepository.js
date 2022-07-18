const { user } = require("../models");

class userRepository {
  static async getByEmail({ email }) {
    try {
      const getUser = await user.findOne({ where: { email: email } });

      return getUser;
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {},
      };
    }
  }

  static async create({ name, email, password }) {
    try {
      const createdUser = await user.create({
        name,
        email,
        password
      });

      return createdUser;
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {},
      };
    }
  }

  static async updateUsers({ id, name, town, address, phone, picture }) {
    try {
      const deleteUsers = await user.update(
        {
          name,
          town,
          address,
          phone,
          picture,
        },
        { where: { id } }
      );

      return deleteUsers;
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {},
      };
    }
  }

  static async deleteUsers({ id }) {
    try {
      const deleteUsers = await user.destroy({ where: { id } });

      return deleteUsers;
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {},
      };
    }
  }

  static async getUsersById({ id }) {
    try {
      const getUsers = await user.findOne({ where: { id } });

      return getUsers;
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {},
      };
    }
  }

  static async getAllUsers({ }) {
    try {
      const getAllUsers = await user.findAll({});

      return getAllUsers;
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {},
      };
    }
  }

}

module.exports = userRepository;
