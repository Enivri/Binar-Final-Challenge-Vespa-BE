const { user, transaction } = require("../models");
const { Op } = require("sequelize");

class cobatransactionRepository {
    static async create({ user_id, product_id, originalPrice, requestedPrice, accepted }) {
        const createdProduct = transaction.create({
            user_id,
            product_id,
            originalPrice,
            requestedPrice,
            accepted
        });

        return createdProduct;
    }

    static async getcobatransactionById({ id }) {
        const getcobatransaction = await transaction.findOne({ where: { id } });

        return getcobatransaction;
    }

    static async updatecobatransactionById({ id, product_id, originalPrice, requestedPrice, accepted }) {
        const updatedcobatransaction = await transaction.update(
            {
                product_id,
                originalPrice,
                requestedPrice,
                accepted
            },
            { where: { id } }
        );

        return updatedcobatransaction;
    }

    static async deletecobatransactionById({ id }) {
        const deletedcobatransaction = await transaction.destroy({ where: { id } });

        return deletedcobatransaction;
    }

    static async getcobatransactionByUserId({ id }) {
        const query = {
            where: {}
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        // if (sold) {
        //     query.where = { ...query.where, sold }
        // }

        // if (isPublished) {
        //     query.where = { ...query.where, isPublished }
        // }

        const getcobatransaction = await transaction.findAll(query);

        return getcobatransaction;
    }

    static async getAllcobatransaction({  requestedPrice, product_id }) {
        const query = {
            where: {},
            like: {}
        }

        // if (sold) {
        //     query.where = { ...query.where, sold }
        // }

        if (requestedPrice) {
            query.where = { ...query.where, requestedPrice }
        }
        
        // if (isPublished) {
        //     query.where = { ...query.where, isPublished }
        // }

        if (product_id) {
            query.like = { ...query.like, product_id }
        }

        const getAllcobatransaction = await transaction.findAll(query);

        return getAllcobatransaction;
    }

}

module.exports = cobatransactionRepository;