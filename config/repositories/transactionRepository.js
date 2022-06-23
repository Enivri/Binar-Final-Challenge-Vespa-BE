const { transaction, product } = require("../models");

class transactionRepository {
    static async create({ user_id, product_id, originalPrice, requestedPrice, accepted }) {
        const createdTransaction = transaction.create({
            user_id,
            product_id,
            originalPrice,
            requestedPrice,
            accepted
        });

        return createdTransaction;
    }

    static async getTransactionByUserId({ id, accepted }) {
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

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }

}

module.exports = transactionRepository;