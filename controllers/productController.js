const productService = require("../services/productService");

const create = async (req, res, next) => {
    const { name, price, category, description, picture_1, picture_2, picture_3, picture_4, sold } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productService.create({
        user_id,
        name,
        price,
        category,
        description,
        picture_1: req.uploaded_picture,
        picture_2: req.uploaded_picture,
        picture_3: req.uploaded_picture,
        picture_4: req.uploaded_picture,
        sold,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateProductById = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category, description, picture_1, picture_2, picture_3, picture_4, sold } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productService.updateProductById({
        id,
        user_id,
        name,
        price,
        category,
        description,
        picture_1: req.uploaded_picture,
        picture_2: req.uploaded_picture,
        picture_3: req.uploaded_picture,
        picture_4: req.uploaded_picture,
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

    const { status, status_code, message, data } = await productService.deleteProductById({
        id,
        user_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;

    const { status, status_code, message, data } =
        await productService.getProductById({
            id,
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

module.exports = { create, updateProductById, deleteProductById, getProductById, getProductByUserId };