const { user, product } = require("../models");
const { Op } = require("sequelize");

class productRepository {
    static async create({ user_id, name, price, category, description, picture, sold }) {
        const createdProduct = product.create({
            user_id,
            name,
            price,
            category,
            description,
            picture,
            sold,
        });

        return createdProduct;
    }

}

module.exports = productRepository;