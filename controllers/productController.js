const productService = require("../services/productService");

const create = async (req, res, next) => {
    const { name, price, category, description, picture, sold } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productService.create({
        user_id,
        name,
        price,
        category,
        description,
        picture: req.uploaded_picture,
        sold,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};


module.exports = { create, };