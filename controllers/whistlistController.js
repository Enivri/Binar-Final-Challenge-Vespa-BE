const whistlistService = require("../services/whistlistService");

const create = async (req, res, next) => {
    const { product_id } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await whistlistService.create({
        user_id,
        product_id
    });
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getWhistlistByUserId = async (req, res, next) => {
    const { id } = req.params;
    const { sold } = req.query;

    const { status, status_code, message, data } =
        await whistlistService.getWhistlistByUserId({
            id,
            sold
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { create, getWhistlistByUserId  };