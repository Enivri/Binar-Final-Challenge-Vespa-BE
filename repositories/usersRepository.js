const { user } = require("../models");

class userRepository {
  static async getByEmail({ email }) {
    const getUser = await user.findOne({ where: { email: email } });

    return getUser;
  }

  static async create({ name, email, password, town, address, phone, picture }) {
    const createdUser = await user.create({
      name,
      email,
      password,
      town,
      address,
      phone,
      picture,
    });

    return createdUser;
  }

  static async updateUsers({ id, name, town, address, phone, picture}) {
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
  }

  static async deleteUsers({ id }) {
    const deleteUsers = await user.destroy({ where: { id } });

    return deleteUsers;
  }

  static async getUsersById({ id }) {
    const getUsers = await user.findOne({ where: { id } });

    return getUsers;
  }

  static async getAllUsers({ }) {
    const getAllUsers = await user.findAll({});

    return getAllUsers;
  }

}

module.exports = userRepository;
