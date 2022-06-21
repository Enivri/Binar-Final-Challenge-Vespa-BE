const whistlistRepository = require("../repositories/whistlistRepository");

class whistlistService {
    static async create({ user_id, product_id }) {
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

            const createdWhistlist = await whistlistRepository.create({
                user_id,
                product_id
            });

            return {
                status: true,
                status_code: 201,
                message: "whistlist added successfully",
                data: {
                    created_whistlist: createdWhistlist,
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

    static async getWhistlistByUserId({ id, sold }) {
        try {
            const getWhistlist = await whistlistRepository.getWhistlistByUserId({
                id,
                sold
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getWhistlist,
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

module.exports = whistlistService;