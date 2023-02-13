const ExcelController = require('./ExcelController');
const { User, Tip, Tovar, Mijoz, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz } = require('../../models');
const { Op } = require("sequelize");
class UserController2 extends ExcelController {
    
    async Serchtor_live (req, res) {
        const tovar = await Tovar.findAll({ where: { magazinId: req.body.magazinId }});
        if (tovar) {
            return res.json(tovar);
        } else {
            return res.json(404);
        }
    }
}
module.exports = UserController2;