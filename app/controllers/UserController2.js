const ExcelController = require('./ExcelController');
const { User, Tip, Tovar, Mijoz, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz } = require('../../models');
const { Op } = require("sequelize");
class UserController2 extends ExcelController {

    async Tester (req, res) {
        return res.json("Dadaxon");
    }

    async Serchtor_live (req, res) {
        const tovar = await Tovar.findAll({ where: { magazinId: req.body.magazinId }});
        if (tovar) {
            return res.json(tovar);
        } else {
            return res.json(404);
        }
    }

    async Foyda_Post_Bugun (req, res) {
        var sav = 0;
        var ol = 0;
        var qarz = 0;
        var chiq = 0;
        var foyda = 0;    
        const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId }});
        const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
        const chiqim = await Chiqim.findAll({ where: { magazinId: req.body.magazinId }});
        for (let i = 0; i < sotuv.length; i++) {
            if (sotuv[i].valyuta) {
                sav += parseFloat(sotuv[i].jami) * parseFloat(sotuv[i].kurs);
            } else {
                sav += parseFloat(sotuv[i].jami);
            }
        }
        for (let i0 = 0; i0 < sotuv.length; i0++) {
            if (sotuv[i0].valyuta) {
                ol += parseFloat(sotuv[i0].olinish) * parseFloat(sotuv[i0].kurs) * parseFloat(sotuv[i0].soni);
            } else {
                ol += parseFloat(sotuv[i0].olinish) * parseFloat(sotuv[i0].soni);
            }
        }
        for (let i2 = 0; i2 < savdo.length; i2++) {
            if (savdo[i2].valyuta) {
                qarz += parseFloat(savdo[i2].karz) * parseFloat(savdo[i2].kurs);
            } else {
                qarz += parseFloat(savdo[i2].karz);
            }
        }
        for (let i3 = 0; i3 < chiqim.length; i3++) {;
            if (chiqim[i3].valyuta) {
                chiq += parseFloat(chiqim[i3].summa) * parseFloat(chiqim[i3].kurs);   
            } else {
                chiq += parseFloat(chiqim[i3].summa);
            }
        }      
        foyda = sav - qarz - chiq - ol;
        return res.json({ 'code': 200, 'sav': sav, 'qarz': qarz, 'chiq': chiq, 'foyda': foyda })
    }
}
module.exports = UserController2;