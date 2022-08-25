const category = require('../models')

async function validateProductdata(req, res, next) {
    const productData = req.body
    if (!productData.name) {
        res.status(400).send("name mandatory")
        return;
    }
    if (productData.CategoryId) {
        const result = await Categories.findByPk(productData.CategoryId);
        if (result) {
            next()
        } else {
            res.status(400).send({ msg: "CategoryID does not exist in category table" })
            return;
        }

    }
    else {
        res.status(400).send({ msg: "Category id is misssing in product " })
        return;
    }

}

module.exports = { validateProductdata }
