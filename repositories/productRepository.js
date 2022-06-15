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

    static async getProductById({ id }) {
        const getProduct = await product.findOne({ where: { id } });

        return getProduct;
    }

    static async updateProductById({ id, name, price, category, description, picture, sold }) {
        const updatedProduct = await product.update(
            {
                name,
                price,
                category,
                description,
                picture,
                sold,
            },
            { where: { id } }
        );

        return updatedProduct;
    }

    static async deleteProductById({ id }) {
        const deletedProduct = await product.destroy({ where: { id } });

        return deletedProduct;
    }

}

module.exports = productRepository;