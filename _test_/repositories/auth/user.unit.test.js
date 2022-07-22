const { user } = require("../../../models");
const userRepository = require("../../../repositories/usersRepository")

describe("Auth unit test", () => {

    describe('Successful Operation', () => {

        describe('create', () => {
            it('should be returning the new created user', async () => {
                const create = await userRepository.create({
                    name: "testingunit",
                    email: "testingUnit@gmail.com",
                    password: "testing123"
                })

                expect(create.name).toEqual("testingunit")
                expect(create.email).toEqual("testingUnit@gmail.com")
                expect(create.password).toEqual("testing123")

                await user.destroy({
                    where: {
                        name: "testingUnit",
                        email: "testingUnit@gmail.com"
                    }
                })
            })
        })

        describe('getByEmail', () => {
            it('should be returning get email', async () => {
                await userRepository.create({
                    name: "testingunit",
                    email: "testingUnit@gmail.com",
                    password: "testing123"
                })

                const getByEmail = await userRepository.getByEmail({
                    email: "testingUnit@gmail.com"
                })

                expect(getByEmail.email).toEqual("testingUnit@gmail.com")
                await user.destroy({
                    where: {
                        name: "testingUnit",
                        email: "testingUnit@gmail.com"
                    }
                })
            })
        })

        describe('updateUsers', () => {
            it('should be returning updated users', async () => {
                const create = await userRepository.create({
                    name: "testingunit",
                    email: "testingUnit@gmail.com",
                    password: "testing123"
                })

                const updateUsers = await userRepository.updateUsers({
                    id: create.id,
                    name: "testingUpdate",
                    town: "jakarta",
                    address: "jalan raya no.1",
                    phone: "081234567"
                })

                const findOne = await user.findOne({ where: { id: create.id } })
                expect(findOne.name).toEqual("testingUpdate")
                expect(findOne.town).toEqual("jakarta")
                expect(findOne.address).toEqual("jalan raya no.1")
                expect(findOne.phone).toEqual("081234567")
                await user.destroy({
                    where: {
                        name: "testingUpdate",
                        email: "testingUnit@gmail.com"
                    }
                })
            })
        })

        describe('deleteUsers', () => {
            it('should be returning deleted users', async () => {
                const create = await userRepository.create({
                    name: "testingunit",
                    email: "testingUnit@gmail.com",
                    password: "testing123"
                })

                const deleteUsers = await userRepository.deleteUsers({
                    id: create.id,
                })

                const findOne = await user.findOne({ where: { id: create.id } })
                expect(findOne).toEqual(null)
                await user.destroy({
                    where: {
                        name: "testingUpdate",
                        email: "testingUnit@gmail.com"
                    }
                })
            })
        })

        describe('getUsersById', () => {
            it('should be returning get users by id', async () => {
                const create = await userRepository.create({
                    name: "testingunit",
                    email: "testingUnit@gmail.com",
                    password: "testing123"
                })

                const getUsersById = await userRepository.getUsersById({
                    id: create.id,
                })

                const findOne = await user.findOne({ where: { id: create.id } })
                expect(findOne.name).toEqual("testingunit")
                expect(findOne.email).toEqual("testingUnit@gmail.com")
                await user.destroy({
                    where: {
                        name: "testingUpdate",
                        email: "testingUnit@gmail.com"
                    }
                })
            })
        })

        describe('getAllUsers', () => {
            it('should be returning get all users', async () => {

                const getAllUsers = await userRepository.getAllUsers({})

                expect(getAllUsers).toEqual(getAllUsers)
            })
        })

    })

})