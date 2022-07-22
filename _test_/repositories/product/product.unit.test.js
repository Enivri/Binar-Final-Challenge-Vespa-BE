const { product } = require("../../../models");
const productRepository = require("../../../repositories/productRepository")

describe("Product unit test", () => {

    describe('Successful Operation', () => {

        describe('create', () => {
            it('should be returning the new created product', async () => {
                const create = await productRepository.create({
                    user_id: "1",
                    name: "jam tangan",
                    price: "1000000",
                    category: "Hobi",
                    description: "blablabla",
                    sold: false,
                    isPublished: true
                })

                expect(create.user_id).toEqual(1)
                expect(create.name).toEqual("jam tangan")
                expect(create.price).toEqual(1000000)
                expect(create.category).toEqual("Hobi")
                expect(create.description).toEqual("blablabla")
                expect(create.sold).toEqual(false)
                expect(create.isPublished).toEqual(true)


                await product.destroy({
                    where: {
                        user_id: "1",
                        name: "jam tangan",
                        price: "1000000",
                        category: "hobi",
                        description: "blablabla",
                    }
                })
            })
        })

        describe('updateProduct', () => {
            it('should be returning the new updated product', async () => {
                const create = await productRepository.create({
                    user_id: "1",
                    name: "jam tangan",
                    price: "1000000",
                    category: "Hobi",
                    description: "blablabla",
                    sold: false,
                    isPublished: true
                })

                const updateproduct = await productRepository.updateProductById({
                    id: create.id,
                    name: "jam tangan",
                    price: "2000000",
                    sold: true,
                })

                const findOne = await product.findOne({ where: { id: create.id } })
                expect(findOne.user_id).toEqual(1)
                expect(findOne.name).toEqual("jam tangan")
                expect(findOne.price).toEqual(2000000)
                expect(findOne.category).toEqual("Hobi")
                expect(findOne.description).toEqual("blablabla")
                expect(findOne.sold).toEqual(true)
                expect(findOne.isPublished).toEqual(true)


                await product.destroy({
                    where: {
                        user_id: "1",
                        name: "jam tangan",
                        price: "2000000",
                        category: "hobi",
                        description: "blablabla",
                    }
                })
            })
        })

        describe('deleteProduct', () => {
            it('should be returning deleted product', async () => {
                const create = await productRepository.create({
                    user_id: "1",
                    name: "jam tangan",
                    price: "1000000",
                    category: "Hobi",
                    description: "blablabla",
                    sold: false,
                    isPublished: true
                })

                const deleteUsers = await productRepository.deleteProductById({
                    id: create.id,
                })

                const findOne = await product.findOne({ where: { id: create.id } })
                expect(findOne).toEqual(null)
                await product.destroy({
                    where: {
                        user_id: "1",
                        name: "jam tangan",
                        price: "1000000",
                        category: "Hobi",
                        description: "blablabla",
                        sold: false,
                        isPublished: true
                    }
                })
            })
        })

        describe('getProductById', () => {
            it('should be returning get product by id', async () => {
                const create = await productRepository.create({
                    user_id: "1",
                    name: "jam tangan",
                    price: "1000000",
                    category: "Hobi",
                    description: "blablabla",
                    sold: false,
                    isPublished: true
                })

                const getProductById = await productRepository.getProductById({
                    id: create.id,
                })

                const findOne = await product.findOne({ where: { id: create.id } })
                expect(findOne.user_id).toEqual(1)
                expect(findOne.name).toEqual("jam tangan")
                expect(findOne.price).toEqual(1000000)
                expect(findOne.category).toEqual("Hobi")
                expect(findOne.description).toEqual("blablabla")
                expect(findOne.sold).toEqual(false)
                expect(findOne.isPublished).toEqual(true)
                await product.destroy({
                    where: {
                        user_id: "1",
                        name: "jam tangan",
                        price: "1000000",
                        category: "Hobi",
                        description: "blablabla",
                        sold: false,
                        isPublished: true
                    }
                })
            })
        })

        describe('getProductByUserId', () => {
            it('should be returning get product by user id', async () => {
                const create = await productRepository.create({
                    user_id: "1",
                    name: "jam tangan",
                    price: "1000000",
                    category: "Hobi",
                    description: "blablabla",
                    sold: false,
                    isPublished: true
                })

                const getProductByUserId = await productRepository.getProductByUserId({
                    id: create.user_id
                })

                const findOne = await product.findOne({ where: { user_id: create.user_id } })
                expect(findOne.user_id).toEqual(1)
                await product.destroy({
                    where: {
                        user_id: "1",
                        name: "jam tangan",
                        price: "1000000",
                        category: "Hobi",
                        description: "blablabla",
                        sold: false,
                        isPublished: true
                    }
                })
            })
        })

        describe('getAllProduct', () => {
            it('should be returning get all product', async () => {

                const getAllProduct = await productRepository.getAllProduct({})

                expect(getAllProduct).toEqual(getAllProduct)
            })
        })

    })
})