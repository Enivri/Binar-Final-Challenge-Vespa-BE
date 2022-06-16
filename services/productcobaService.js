const productRepository = require("../repositories/productcobaRepository");

class productService {
    static async create({ user_id, name, price, category, description, picture, sold }) {
        try {
            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!price) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Harga wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!category) {
                return {
                    status: false,
                    status_code: 400,
                    message: "kategori wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!description) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Deskripsi wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            // if (!picture) {
            //     return {
            //         status: false,
            //         status_code: 400,
            //         message: "Gambar wajib diisi",
            //         data: {
            //             registered_user: null,
            //         },
            //     };
            // }

            if (!sold) {
                return {
                    status: false,
                    status_code: 400,
                    message: "status kejual barang harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            const createdProduct = await productcobaRepository.create({
                user_id,
                name,
                price,
                category,
                description,
                picture,
                sold,
            });

            return {
                status: true,
                status_code: 201,
                message: "Product created successfully",
                data: {
                    created_product: createdProduct,
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

    static async updateProductById({ id, user_id, name, price, category, description, picture, sold }) {
        try {
            const getProduct = await productcobaRepository.getProductById({ id });

            if (getProduct.user_id == user_id) {
                const updatedPost = await productcobaRepository.updateProductById({
                    id,
                    name,
                    price,
                    category,
                    description,
                    picture,
                    sold,
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Product updated successfully",
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

    static async deleteProductById({ id, user_id }) {
        try {
            const getProduct = await productcobaRepository.getProductById({ id });

            if (getProduct.user_id == user_id) {
                const deletedProduct = await productcobaRepository.deleteProductById({
                    id,
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Product deleted successfully",
                    data: {
                        deleted_product: deletedProduct,
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

    static async getProductByUserId({ id }) {
        try {
            const getProduct = await productcobaRepository.getProductByUserId({
                id,
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    posts: getProduct,
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

module.exports = productcobaService;