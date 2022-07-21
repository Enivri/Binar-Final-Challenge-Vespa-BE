const transactionRepository = require("../repositories/transactionRepository");
const productRepository = require("../repositories/productRepository");

class transactionService {
    static async create({ user_id, owner_id, product_id, requestedPrice, accepted, isOpen }) {
        try {
            if (!owner_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "owner id harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!product_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "product id harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!accepted) {
                return {
                    status: false,
                    status_code: 400,
                    message: "accepted harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!isOpen) {
                return {
                    status: false,
                    status_code: 400,
                    message: "isOpen harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            const createdTransaction = await transactionRepository.create({
                user_id,
                owner_id,
                product_id,
                requestedPrice,
                accepted,
                isOpen
            });

            return {
                status: true,
                status_code: 201,
                message: "transaction created successfully",
                data: {
                    created_transaction: createdTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {},
            };
        }
    }

    static async updateTransactionById({ id, user_id, requestedPrice, accepted, isOpen, sold }) {
        try {
            const getTransaction = await transactionRepository.getTransactionById({ id });

            if (getTransaction.owner_id == user_id) {
                const updatedTransaction = await transactionRepository.updateTransactionById({
                    id,
                    requestedPrice,
                    accepted,
                    isOpen
                });
                const updatedProduct = await productRepository.updateProductById({
                    id: getTransaction.product_id,
                    sold
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Transaction updated successfully",
                    data: {
                        updated_post: updatedTransaction,
                        updated_product: updatedProduct
                    },
                };
            } else {
                return {
                    status: true,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        updated_post: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {},
            };
        }
    }

    static async getTransactionById({ id, accepted, isOpen }) {
        try {
            const getTransaction = await transactionRepository.getTransactionById({
                id,
                accepted,
                isOpen
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {},
            };
        }
    }

    static async getTransactionByUserId({ id, accepted, isOpen }) {
        try {
            const getTransaction = await transactionRepository.getTransactionByUserId({
                id,
                accepted,
                isOpen
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {},
            };
        }
    }

    static async getTransactionByOwnerId({ id, accepted, isOpen }) {
        try {
            const getTransaction = await transactionRepository.getTransactionByOwnerId({
                id,
                accepted,
                isOpen
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }

    static async getTransactionNotif({ id, accepted, isOpen }) {
        try {
            const getTransaction = await transactionRepository.getTransactionNotif({
                id,
                accepted,
                isOpen
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }

}

module.exports = transactionService;