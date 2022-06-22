const transactionRepository = require("../repositories/transactionRepository");

class transactionService {
    static async create({ user_id, product_id, originalPrice, requestedPrice, accepted }) {
        try {
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

            if (!originalPrice) {
                return {
                    status: false,
                    status_code: 400,
                    message: "original price harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!requestedPrice) {
                return {
                    status: false,
                    status_code: 400,
                    message: "requested price harus diisi",
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

            const createdTransaction = await transactionRepository.create({
                user_id,
                product_id,
                originalPrice,
                requestedPrice,
                accepted
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
                data: {
                    registered_user: null,
                },
            };
        }
    }

    static async getTransactionByUserId({ id, accepted }) {
        try {
            const getTransaction = await transactionRepository.getTransactionByUserId({
                id,
                accepted,
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