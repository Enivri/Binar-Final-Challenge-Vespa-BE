const { user, product } = require("../models");
const { Op } = require("sequelize");

class productRepository {
    static async create({ user_id, name, price, category, description, picture_1, picture_2, picture_3, picture_4, sold }) {
        const createdProduct = product.create({
            user_id,
            name,
            price,
            category,
            description,
            picture_1,
            picture_2,
            picture_3,
            picture_4,
            sold,
        });

        return createdProduct;
    }

    static async getProductById({ id }) {
        const getProduct = await product.findOne({ where: { id } });

        return getProduct;
    }

    static async updateProductById({ id, name, price, category, description, picture_1, picture_2, picture_3, picture_4, sold }) {
        const updatedProduct = await product.update(
            {
                name,
                price,
                category,
                description,
                picture_1,
                picture_2,
                picture_3,
                picture_4,
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

    static async getProductByUserId({ id }) {
        const getProduct = await product.findAll({ where: { user_id: id } });

        return getProduct;
    }

    static async getAllProduct({ sold }) {
        const getAllProduct = await product.findAll({ where: { sold: false } });

        return getAllProduct;
    }

}

module.exports = productRepository;