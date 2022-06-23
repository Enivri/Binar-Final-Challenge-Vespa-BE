const transactionService = require("../services/transactionService");

const createTransaction = async (req, res, next) => {
    const { product_id, originalPrice, requestedPrice, accepted } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await transactionService.create({
        user_id,
        product_id,
        originalPrice,
        requestedPrice,
        accepted
    });
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionByUserId = async (req, res, next) => {
    const { id } = req.params;
    const { accepted} = req.query;

    const { status, status_code, message, data } =
        await transactionService.getTransactionByUserId({
            id,
            accepted,
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { createTransaction, getTransactionByUserId };