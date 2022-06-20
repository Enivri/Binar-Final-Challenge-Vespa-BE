const { user, product } = require("../models");
const { Op } = require("sequelize");

class productRepository {
    static async create({ user_id, name, price, category, description, picture, sold, isPublished }) {
        const createdProduct = product.create({
            user_id,
            name,
            price,
            category,
            description,
            picture,
            sold,
            isPublished
        });

        return createdProduct;
    }

    static async getProductById({ id }) {
        const getProduct = await product.findOne({ where: { id } });

        return getProduct;
    }

    static async updateProductById({ id, name, price, category, description, picture, sold, isPublished }) {
        const updatedProduct = await product.update(
            {
                name,
                price,
                category,
                description,
                picture,
                sold,
                isPublished
            },
            { where: { id } }
        );

        return updatedProduct;
    }

    static async deleteProductById({ id }) {
        const deletedProduct = await product.destroy({ where: { id } });

        return deletedProduct;
    }

    static async getProductByUserId({ id, sold }) {
        const query = {
            where: {}
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        if (sold) {
            query.where = { ...query.where, sold }
        }

        const getProduct = await product.findAll(query);

        return getProduct;
    }

    static async getAllProduct({ sold, category, name }) {
        const query = {
            where: {},
            like: {}
        }

        if (sold) {
            query.where = { ...query.where, sold }
        }

        if (category) {
            query.where = { ...query.where, category }
        }

        if (name) {
            query.like = { ...query.like, name }
        }

        const getAllProduct = await product.findAll(query);

        return getAllProduct;
    }

}

module.exports = productRepository;