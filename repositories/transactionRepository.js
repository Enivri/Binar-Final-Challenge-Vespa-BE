const { transaction, product } = require("../models");

class transactionRepository {
    static async create({ user_id, owner_id, product_id, requestedPrice, accepted, rejected }) {
        const createdTransaction = transaction.create({
            user_id,
            owner_id,
            product_id,
            requestedPrice,
            accepted,
            rejected
        });

        return createdTransaction;
    }

    static async getTransactionById({ id }) {
        const getTransaction = await transaction.findOne({ where: { id } });

        return getTransaction;
    }

    static async updateTransactionById({ id, user_id, owner_id, product_id, requestedPrice, accepted, rejected }) {
        const updatedTransaction = await transaction.update(
            {
                user_id,
                owner_id,
                product_id,
                requestedPrice,
                accepted,
                rejected
            },
            { where: { id } }
        );

        return updatedTransaction;
    }

    static async getTransactionByUserId({ id, accepted, rejected }) {
        const query = {
            where: {},
            include: [{
                model: product,
                attributes: ["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        if (accepted) {
            query.where = { ...query.where, accepted }
        }

        if (rejected) {
            query.where = { ...query.where, rejected }
        }

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }

    static async getTransactionByOwnerId({ id, accepted, rejected }) {
        const query = {
            where: {},
            include: [{
                model: product,
                attributes: ["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = { ...query.where, owner_id: id }
        }

        if (accepted) {
            query.where = { ...query.where, accepted }
        }

        if (rejected) {
            query.where = { ...query.where, rejected }
        }

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }
}

module.exports = transactionRepository;