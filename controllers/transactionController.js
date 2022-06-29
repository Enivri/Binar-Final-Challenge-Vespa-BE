const transactionService = require("../services/transactionService");

const createTransaction = async (req, res, next) => {
    const { owner_id, product_id, requestedPrice, accepted, rejected } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await transactionService.create({
        user_id,
        owner_id,
        product_id,
        requestedPrice,
        accepted,
        rejected
    });
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateTransactionById = async (req, res, next) => {
    const { id } = req.params;
    const { owner_id, product_id, requestedPrice, accepted, rejected } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await transactionService.updateTransactionById({
        id,
        user_id,
        owner_id,
        product_id,
        requestedPrice,
        accepted,
        rejected
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionByUserId = async (req, res, next) => {
    const { id } = req.params;
    const { accepted, rejected } = req.query;

    const { status, status_code, message, data } =
        await transactionService.getTransactionByUserId({
            id,
            accepted,
            rejected
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionByOwnerId = async (req, res, next) => {
    const { id } = req.params;
    const { accepted, rejected } = req.query;

    const { status, status_code, message, data } =
        await transactionService.getTransactionByOwnerId({
            id,
            accepted,
            rejected
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { createTransaction, getTransactionByUserId, updateTransactionById, getTransactionByOwnerId };