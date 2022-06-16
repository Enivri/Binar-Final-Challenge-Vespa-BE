const productService = require("../services/productcobaService");

const updateProductById = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category, description, picture, sold } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productService.updateProductById({
        id,
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

const deleteProductById = async (req, res, next) => {
    const { id } = req.params;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productcobaService.deleteProductById({
        id,
        user_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getProductByUserId = async (req, res, next) => {
    const { id } = req.params;

    const { status, status_code, message, data } =
        await productService.getProductByUserId({
            id,
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { create, updateProductById, deleteProductById, getProductByUserId };