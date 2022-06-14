const { user } = require("../models");

class UsersRepository {
  static async getByEmail({ email }) {
    const getUser = await user.findOne({ where: { email: email } });

    return getUser;
  }

  static async create({ name, email, password, town, address, phone, picture, role }) {
    const createdUser = await user.create({
      name,
      email,
      password,
      town,
      address,
      phone,
      picture,
      role,
    });

    return createdUser;
  }

  static async updateUsers({ id, name, email, password, town, address, phone, picture, role }) {
    const deleteUsers = await user.update(
      {
        name,
        email,
        password,
        town,
        address,
        phone,
        picture,
        role,
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

  // static async getPostsByID({ id }) {
  //   const getPosts = await Post.findAll({ where: { user_id: id } });

  //   return getPosts;
  // }
}

module.exports = UsersRepository;
