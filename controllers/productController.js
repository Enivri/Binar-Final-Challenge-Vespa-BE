const productService = require("../services/productService");

const create = async (req, res, next) => {
    const { name, price, category, description, picture, sold, isPublished } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productService.create({
        user_id,
        name,
        price,
        category,
        description,
        picture: req.files,
        sold,
        isPublished
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateProductById = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category, description, picture, sold, isPublished } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productService.updateProductById({
        id,
        user_id,
        name,
        price,
        category,
        description,
        picture: req.files,
        sold,
        isPublished
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
    const { sold, isPublished } = req.query;

    const { status, status_code, message, data } =
        await productService.getProductByUserId({
            id,
            sold,
            isPublished
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getAllProduct = async (req, res, next) => {
    const { sold, category, name, isPublished } = req.query;

    const { status, status_code, message, data } = await productService.getAllProduct({
        sold,
        category,
        name,
        isPublished
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { create, updateProductById, deleteProductById, getProductById, getProductByUserId, getAllProduct };