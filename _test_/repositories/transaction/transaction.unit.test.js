const { transaction } = require("../../../models");
const transactionRepository = require("../../../repositories/transactionRepository")
const Op = require('sequelize').Op;

describe("Transaction unit test", () => {

    describe('Successful Operation', () => {

        describe('create', () => {
            it('should be returning the new created transaction', async () => {
                const create = await transactionRepository.create({
                    user_id: "1",
                    owner_id: "2",
                    product_id: "2",
                    requestedPrice: "10000",
                    accepted: "pending",
                    isOpen: false
                })

                expect(create.user_id).toEqual(1)
                expect(create.owner_id).toEqual(2)
                expect(create.product_id).toEqual(2)
                expect(create.requestedPrice).toEqual(10000)
                expect(create.accepted).toEqual("pending")
                expect(create.isOpen).toEqual(false)


                await transaction.destroy({
                    where: {
                        user_id: "1",
                        owner_id: "2",
                        product_id: "2",
                        requestedPrice: "10000",
                        accepted: "pending",
                        isOpen: false
                    }
                })
            })
        })

        describe('updateTransactionById', () => {
            it('should be returning the new updated transaction', async () => {
                const create = await transactionRepository.create({
                    user_id: "1",
                    owner_id: "2",
                    product_id: "2",
                    requestedPrice: "10000",
                    accepted: "pending",
                    isOpen: false
                })

                const updateTransactionById = await transactionRepository.updateTransactionById({
                    id: create.id,
                    requestedPrice: "10000",
                    accepted: "waiting",
                    isOpen: true
                })

                const findOne = await transaction.findOne({ where: { id: create.id } })
                expect(findOne.user_id).toEqual(1)
                expect(findOne.owner_id).toEqual(2)
                expect(findOne.product_id).toEqual(2)
                expect(findOne.requestedPrice).toEqual(10000)
                expect(findOne.accepted).toEqual("waiting")
                expect(findOne.isOpen).toEqual(true)


                await transaction.destroy({
                    where: {
                        user_id: "1",
                        owner_id: "2",
                        product_id: "2",
                        requestedPrice: "10000",
                        accepted: "waiting",
                        isOpen: true
                    }
                })
            })
        })

        describe('getTransactionById', () => {
            it('should be returning get transaction by id', async () => {
                const create = await transactionRepository.create({
                    user_id: "1",
                    owner_id: "2",
                    product_id: "2",
                    requestedPrice: "10000",
                    accepted: "pending",
                    isOpen: false
                })

                const getTransactionById = await transactionRepository.getTransactionById({
                    id: create.id
                })

                const findOne = await transaction.findOne({ where: { id: create.id } })
                expect(findOne.user_id).toEqual(1)
                expect(findOne.owner_id).toEqual(2)
                expect(findOne.product_id).toEqual(2)
                expect(findOne.requestedPrice).toEqual(10000)
                expect(findOne.accepted).toEqual("pending")
                expect(findOne.isOpen).toEqual(false)
                await transaction.destroy({
                    where: {
                        user_id: "1",
                        owner_id: "2",
                        product_id: "2",
                        requestedPrice: "10000",
                        accepted: "pending",
                        isOpen: false
                    }
                })
            })
        })

        describe('getTransactionByUserId', () => {
            it('should be returning get transaction by user id', async () => {
                const create = await transactionRepository.create({
                    user_id: "1",
                    owner_id: "2",
                    product_id: "2",
                    requestedPrice: "10000",
                    accepted: "pending",
                    isOpen: false
                })

                const getTransactionByUserId = await transactionRepository.getTransactionByUserId({
                    id: create.user_id
                })

                const findOne = await transaction.findOne({ where: { user_id: create.user_id } })
                expect(findOne.user_id).toEqual(1)
                await transaction.destroy({
                    where: {
                        user_id: "1",
                        owner_id: "2",
                        product_id: "2",
                        requestedPrice: "10000",
                        accepted: "pending",
                        isOpen: false
                    }
                })
            })
        })

        describe('getTransactionByOwnerId', () => {
            it('should be returning get transaction by owner id', async () => {
                const create = await transactionRepository.create({
                    user_id: "1",
                    owner_id: "2",
                    product_id: "2",
                    requestedPrice: "10000",
                    accepted: "pending",
                    isOpen: false
                })

                const getTransactionByOwnerId = await transactionRepository.getTransactionByOwnerId({
                    id: create.owner_id
                })

                const findOne = await transaction.findOne({ where: { owner_id: create.owner_id } })
                expect(findOne.user_id).toEqual(1)
                await transaction.destroy({
                    where: {
                        user_id: "1",
                        owner_id: "2",
                        product_id: "2",
                        requestedPrice: "10000",
                        accepted: "pending",
                        isOpen: false
                    }
                })
            })
        })

        describe('getTransactionNotif', () => {
            it('should be returning get transaction where Owner_id/User_id = id', async () => {
                const create = await transactionRepository.create({
                    user_id: "1",
                    owner_id: "2",
                    product_id: "2",
                    requestedPrice: "10000",
                    accepted: "pending",
                    isOpen: false
                }
                )

                const getTransactionNotif = await transactionRepository.getTransactionNotif({
                    id: 1
                })

                const findOne = await transaction.findOne({ where: { [Op.or]: [{ owner_id: { [Op.eq]: 1 } }, { user_id: { [Op.eq]: 1 } }] } })
                expect(findOne.user_id).toEqual(1)
                expect(findOne.owner_id).toEqual(2)
                await transaction.destroy({
                    where: {
                        user_id: "1",
                        owner_id: "2",
                        product_id: "2",
                        requestedPrice: "10000",
                        accepted: "pending",
                        isOpen: false
                    },
                })
            })
        })

    })
})