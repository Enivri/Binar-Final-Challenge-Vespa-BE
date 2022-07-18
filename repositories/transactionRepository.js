const { transaction, product, user } = require("../models");
const Op = require('sequelize').Op;

class transactionRepository {
    static async create({ user_id, owner_id, product_id, requestedPrice, accepted, isOpen }) {
        const createdTransaction = transaction.create({
            user_id,
            owner_id,
            product_id,
            requestedPrice,
            accepted,
            isOpen
        });

        return createdTransaction;
    }

    static async getTransactionById({ id }) {
        const getTransaction = await transaction.findOne({ where: { id } });

        return getTransaction;
    }

    static async updateTransactionById({ id, requestedPrice, accepted, isOpen }) {
        console.log(id, requestedPrice, accepted, isOpen)
        const updatedTransaction = await transaction.update(
            {
                requestedPrice,
                accepted,
                isOpen
            },
            { where: { id } }
        );

        return updatedTransaction;
    }

    static async getTransactionByUserId({ id, accepted, isOpen }) {
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

        if (isOpen) {
            query.where = { ...query.where, isOpen }
        }

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }

    static async getTransactionByOwnerId({ id, accepted, isOpen }) {
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

        if (isOpen) {
            query.where = { ...query.where, isOpen }
        }

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }

    static async getTransactionNotif({ id, accepted, isOpen }) {
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
            query.where = {
                ...query.where,
                [Op.or]: [{ owner_id: { [Op.eq]: id } }, { user_id: { [Op.eq]: id } }]
            }
        }

        if (accepted) {
            query.where = { ...query.where, accepted }
        }

        if (isOpen) {
            query.where = { ...query.where, isOpen }
        }

        const getTransaction = await transaction.findAll(query);

        return getTransaction;
    }
}

module.exports = transactionRepository;