const { whistlist, product } = require("../models");

class whistlistRepository {
    static async create({ user_id, product_id }) {
        const createdWhistlist = whistlist.create({
            user_id,
            product_id
        });

        return createdWhistlist;
    }

    static async getWhistlistByUserId({ id, sold }) {
        const query = {
            where: {},
            include:[{
                model: product,
                attributes:["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        if (sold) {
            query.where = { ...query.where, sold }
        }

        const getWhistlist = await whistlist.findAll(query);

        return getWhistlist;
    }

}

module.exports = whistlistRepository;