const productRepository = require("../repositories/productRepository");
const cloudinary = require("../cloudinary/cloudinary");

class productService {
    static async create({ user_id, name, price, category, description, picture, sold, isPublished }) {
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

            if (!isPublished) {
                return {
                    status: false,
                    status_code: 400,
                    message: "status isPublished harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            const images = [];

            await Promise.all(picture.picture.map(async (img) => {
                const fileBase64 = img.buffer.toString("base64");
                const file = `data:${img.mimetype};base64,${fileBase64}`;
                const cloudinaryImage = await cloudinary.uploader.upload(file);
                images.push(cloudinaryImage.url);
            }))

            const createdProduct = await productRepository.create({
                user_id,
                name,
                price,
                category,
                description,
                picture: images,
                sold,
                isPublished
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

    static async updateProductById({ id, user_id, name, price, category, description, picture, sold, isPublished }) {
        try {
            const getProduct = await productRepository.getProductById({ id });

            if (getProduct.user_id == user_id) {

                let images = [];

                if (picture.picture) {
                    await Promise.all(picture.picture.map(async (img) => {
                        const fileBase64 = img.buffer.toString("base64");
                        const file = `data:${img.mimetype};base64,${fileBase64}`;
                        const cloudinaryImage = await cloudinary.uploader.upload(file);
                        images.push(cloudinaryImage.url);
                    }))
                } else {
                    images = getProduct.picture
                }

                if(!name){
                    name = getProduct.name
                }

                if(!price){
                    price = getProduct.price
                }

                if(!category){
                    category = getProduct.category
                }

                if(!description){
                    description = getProduct.description
                }

                if(!sold){
                    sold = getProduct.sold
                }

                if(!isPublished){
                    isPublished = getProduct.isPublished
                }

                const updatedPost = await productRepository.updateProductById({
                    id,
                    name,
                    price,
                    category,
                    description,
                    picture: images,
                    sold,
                    isPublished
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
            const getProduct = await productRepository.getProductById({ id });

            if (getProduct.user_id == user_id) {
                const deletedProduct = await productRepository.deleteProductById({
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

    static async getProductById({ id }) {
        try {
            const getProduct = await productRepository.getProductById({
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

    static async getProductByUserId({ id, sold, isPublished }) {
        try {
            const getProduct = await productRepository.getProductByUserId({
                id,
                sold,
                isPublished
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

    static async getAllProduct({ sold, category, name, isPublished }) {

        const getAllProduct = await productRepository.getAllProduct({
            sold,
            category,
            name,
            isPublished
        });
        return {
            status: true,
            status_code: 200,
            message: "get All Product successfully",
            data: {
                result: getAllProduct,
            },
        };
    }

}

module.exports = productService;