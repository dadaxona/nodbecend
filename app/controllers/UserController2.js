const { User, Tip, Tovar, Mijoz, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz } = require('../../models');
const { Op } = require("sequelize");
class UserController2 {

    async Foyda_Post(req, res){
        var sav = 0;
        var ol = 0;
        var qarz = 0;
        var chiq = 0;
        var yet = 0;
        var sql = 0;
        var foyda = 0;
        var mij = 0;
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (user) {            
            const savdo = await Savdo.findAll({ where: { userId: user.id }});
            const sotuv = await Sotuv.findAll({ where: { userId: user.id }});
            const chiqim = await Chiqim.findAll({ where: { userId: user.id }});
            const yetkazuvchi = await Yetkazuvchi.findAll({ where: { userId: user.id }});
            const tovar = await Tovar.findAll({ where: { userId: user.id }});
            const mijoz = await Mijoz.findAll({ where: { userId: user.id }});
            for (let i = 0; i < sotuv.length; i++) {
                if (sotuv[i].valyuta == 1) {
                    sav += parseFloat(sotuv[i].jami);
                } else {
                    sav += parseFloat(sotuv[i].jami) * parseFloat(sotuv[i].valyuta);
                }
            }
            for (let i0 = 0; i0 < sotuv.length; i0++) {
                if (sotuv[i0].valyuta == 1) {
                    ol += parseFloat(sotuv[i0].olinish) * parseFloat(sotuv[i0].soni);
                } else {
                    ol += parseFloat(sotuv[i0].olinish) * parseFloat(sotuv[i0].valyuta) * parseFloat(sotuv[i0].soni);
                }
            }
            for (let i2 = 0; i2 < savdo.length; i2++) {
                qarz += parseFloat(savdo[i2].karz);
            }
            for (let i3 = 0; i3 < chiqim.length; i3++) {
                chiq += parseFloat(chiqim[i3].summa);
            }
            for (let i4 = 0; i4 < yetkazuvchi.length; i4++) {
                yet += parseFloat(yetkazuvchi[i4].summa);
            }
            for (let i5 = 0; i5 < tovar.length; i5++) {
                if (tovar[i5].valyuta) {
                    sql += parseFloat(tovar[i5].olinish) * parseFloat(tovar[i5].summa) * parseFloat(tovar[i5].soni);   
                } else {
                    sql += parseFloat(tovar[i5].olinish) * parseFloat(tovar[i5].soni);                    
                }
            }
            for (let i6 = 0; i6 < mijoz.length; i6++) {
                mij += parseFloat(mijoz[i6].summa);
            }
            foyda = sav - qarz - chiq - ol + mij;
            return res.json({ 'sav': sav, 'qarz': qarz, 'chiq': chiq, 'yet': yet, 'sql': sql, 'foyda': foyda })
        } else {

        }
    }
}
module.exports = UserController2;