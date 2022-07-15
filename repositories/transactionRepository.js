const { transaction, product, user } = require("../models");

class transactionRepository {
    static async create({ user_id, owner_id, product_id, requestedPrice, accepted }) {
        const createdTransaction = transaction.create({
            user_id,
            owner_id,
            product_id,
            requestedPrice,
            accepted
        });

        return createdTransaction;
    }

    static async getTransactionById({ id }) {
        const getTransaction = await transaction.findOne({ where: { id } });

        return getTransaction;
    }

    static async updateTransactionById({ id, user_id, owner_id, product_id, requestedPrice, accepted }) {
        const updatedTransaction = await transaction.update(
            {
                user_id,
                owner_id,
                product_id,
                requestedPrice,
                accepted
            },
            { where: { id } }
        );

        return updatedTransaction;
    }

    static async getTransactionByUserId({ id, accepted }) {
        const query = {
            where: {},
            include: [{
                model: product,
                attributes: ["picture", "name", "category", "price"]
            }, {
                model: user,
                attributes: ["picture", "name", "town", "phone"]
            }]
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        if (accepted) {
            query.where = { ...query.where, accepted }
        }

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }

    static async getTransactionByOwnerId({ id, accepted }) {
        const query = {
            where: {},
            include: [{
                model: product,
                attributes: ["picture", "name", "category", "price"]
            }, {
                model: user,
                attributes: ["picture", "name", "town", "phone"]
            }]
        }

        if (id) {
            query.where = { ...query.where, owner_id: id }
        }

        if (accepted) {
            query.where = { ...query.where, accepted }
        }

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }
}

module.exports = transactionRepository;