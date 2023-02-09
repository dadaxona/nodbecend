const { User, Tip, Tovar, Mijoz, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz } = require('../../models');
const { Op } = require("sequelize");
class ExcelController {
    async Post_Tip_Exsel (req, res) {
        for (let i = 0; i < req.body.massivname.length; i++) {
            await Tip.create(req.body.massivname[i]);
        }
        return res.json(200);
    }

    async Post_Update_Exsel (req, res) {
        for (let i = 0; i < req.body.massivname.length; i++) {
            await Valyuta.create(req.body.massivname[i]);
        }
        return res.json(200);
    }

    async Post_update_yetkaz_exsel (req, res) {
        for (let i = 0; i < req.body.massivname.length; i++) {
            await Yetkazuvchi.create(req.body.massivname[i]);
        }
        return res.json(200);
    }

    async Post_update_mijoz_exsel (req, res) {
        for (let i = 0; i < req.body.massivname.length; i++) {
            await Mijoz.create(req.body.massivname[i]);
        }
        return res.json(200);
    }

    
    async Post_update_sqlad_exsel (req, res) {
        for (let i = 0; i < req.body.massivname.length; i++) {
            await Tovar.create(req.body.massivname[i]);
        }
        return res.json(200);
    }

    async Post_update_chiqim_exsel (req, res) {
        for (let i = 0; i < req.body.massivname.length; i++) {
            await Chiqim.create(req.body.massivname[i]);
        }
        return res.json(200);
    }
}
module.exports = ExcelController;