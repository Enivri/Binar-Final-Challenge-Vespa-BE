const cobatransactionRepository = require("../repositories/cobatransactionRepository");

class cobatransactionService {
    static async create({ user_id, product_id, originalPrice, requestedPrice, accepted  }) {
        try {
            if (!product_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!originalPrice) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Harga wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!requestedPrice) {
                return {
                    status: false,
                    status_code: 400,
                    message: "kategori wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!accepted) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Deskripsi wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            // if (!picture.length) {
            //     return {
            //         status: false,
            //         status_code: 400,
            //         message: "Gambar wajib diisi",
            //         data: {
            //             registered_user: null,
            //         },
            //     };
            // }

            // if (!sold) {
            //     return {
            //         status: false,
            //         status_code: 400,
            //         message: "status kejual barang harus diisi",
            //         data: {
            //             registered_user: null,
            //         },
            //     };
            // }

            // if (!isPublished) {
            //     return {
            //         status: false,
            //         status_code: 400,
            //         message: "status isPublished harus diisi",
            //         data: {
            //             registered_user: null,
            //         },
            //     };
            // }

            const createdcobatransaction = await cobatransactionRepository.create({
                user_id,
                product_id,
                originalPrice,
                requestedPrice,
                accepted
            });

            return {
                status: true,
                status_code: 201,
                message: "cobatransaction created successfully",
                data: {
                    created_cobatransaction: createdcobatransaction,
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

    static async updatecobatransactionById({ id, user_id, product_id, originalPrice, requestedPrice, accepted  }) {
        try {
            const getcobatransaction = await cobatransactionRepository.getcobatransactionById({ id });

            if (getcobatransaction.user_id == user_id) {
                const updatedPost = await cobatransactionRepository.updatecobatransactionById({
                    id,
                    product_id,
                    originalPrice,
                    requestedPrice,
                    accepted
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "cobatransaction updated successfully",
                    data: {
                        updated_post: updatedPost,
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
                data: {
                    registered_user: null,
                },
            };
        }
    }

    static async deletecobatransactionById({ id, user_id }) {
        try {
            const getcobatransaction = await cobatransactionRepository.getcobatransactionById({ id });

            if (getcobatransaction.user_id == user_id) {
                const deletedcobatransaction = await cobatransactionRepository.deletecobatransactionById({
                    id,
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "cobatransaction deleted successfully",
                    data: {
                        deleted_cobatransaction: deletedcobatransaction,
                    },
                };
            } else {
                return {
                    status: true,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deleted_post: null,
                    },
                };
            }
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

    static async getcobatransactionById({ id }) {
        try {
            const getcobatransaction = await cobatransactionRepository.getcobatransactionById({
                id,
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getcobatransaction,
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

    static async getcobatransactionByUserId({ id }) {
        try {
            const getcobatransaction = await cobatransactionRepository.getcobatransactionByUserId({
                id
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getcobatransaction,
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

    static async getAllcobatransaction({ requestedPrice, product_id }) {

        const getAllcobatransaction = await cobatransactionRepository.getAllcobatransaction({
            requestedPrice,
            product_id
        });
        return {
            status: true,
            status_code: 200,
            message: "get All cobatransaction successfully",
            data: {
                result: getAllcobatransaction,
            },
        };
    }

}

module.exports = cobatransactionService;