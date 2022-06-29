const productService = require("../services/cobatransactionService");

//create 
const create = async (req, res, next) => {
    const { product_id, originalPrice, requestedPrice, accepted } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await cobatransactionService.create({
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

//update
const updatecobatransactionById = async (req, res, next) => {
    const { id } = req.params;
    const { product_id, originalPrice, requestedPrice, accepted } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await cobatransactionService.updatecobatransactionById({
        id,
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

// delete
const deletecobatransactionById = async (req, res, next) => {
    const { id } = req.params;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await cobatransactionService.deletecobatransactionById({
        id,
        user_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

//gettransaction
const getcobatransactionById = async (req, res, next) => {
    const { id } = req.params;

    const { status, status_code, message, data } =
        await cobatransactionService.getcobatransactionById({
            id,
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

//gettransactionbyuserid
const getcobatransactionByUserId = async (req, res, next) => {
    const { id } = req.params;

    const { status, status_code, message, data } =
        await cobatransactionService.getcobatransactionByUserId({
            id
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getAllcobatransaction = async (req, res, next) => {
    const { requestedPrice, product_id } = req.query;

    const { status, status_code, message, data } = await cobatransactionService.getAllcobatransaction({
        requestedPrice,
        product_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { create, updatecobatransactionById, deletecobatransactionById, getcobatransactionById, getcobatransactionByUserId, getAllcobatransaction };