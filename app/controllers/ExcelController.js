const { User, Ishchilar, Tip, Tovar, Mijoz, Yetkazuvchi, Valyuta, Chiqim } = require('../../models');
const { Op } = require("sequelize");
class ExcelController {
    async Post_Tip_Exsel (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const tip = await Tip.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name }});
                if (tip) {
                } else {
                    await Tip.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].tip,
                    });
                }
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const tip = await Tip.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name }});
                if (tip) {
                } else {
                    await Tip.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].tip,
                    });
                }
            }
        }
        return res.json(200);
    }

    async Post_Update_Exsel (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const valyuta = await Valyuta.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name }});
                if (valyuta) {
                } else {
                    await Valyuta.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].valyuta,
                        summa: req.body.massivname[i].summa,
                    });
                }
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const valyuta = await Valyuta.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name }});
                if (valyuta) {
                } else {
                    await Valyuta.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].valyuta,
                        summa: req.body.massivname[i].summa,
                    });
                }
            }
        }
        return res.json(200);
    }

    async Post_update_yetkaz_exsel (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const yetkaz = await Yetkazuvchi.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name }});
                if (yetkaz) {
                } else {
                    await Yetkazuvchi.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].name,
                        summa: req.body.massivname[i].summa,
                        kurs: req.body.massivname[i].kurs,
                        valyuta: req.body.massivname[i].valyuta,
                    });
                }
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const yetkaz = await Yetkazuvchi.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name }});
                if (yetkaz) {
                } else {
                    await Yetkazuvchi.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].name,
                        summa: req.body.massivname[i].summa,
                        kurs: req.body.massivname[i].kurs,
                        valyuta: req.body.massivname[i].valyuta,
                    });
                }
            }
        }
        return res.json(200);
    }

    async Post_update_mijoz_exsel (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const mijoz = await Mijoz.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name, tel: req.body.massivname[i].tel, telegram: req.body.massivname[i].telegram }});
                if (mijoz) {
                } else {
                    await Mijoz.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].name,
                        firma: req.body.massivname[i].firma,
                        tel: req.body.massivname[i].tel,
                        telegram: req.body.massivname[i].telegram,
                        karz: 0,
                        summa: req.body.massivname[i].summa,
                        kurs: req.body.massivname[i].kurs,
                        valyuta: req.body.massivname[i].valyuta,
                    });
                }
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const mijoz = await Mijoz.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].name, tel: req.body.massivname[i].tel, telegram: req.body.massivname[i].telegram }});
                if (mijoz) {
                } else {
                    await Mijoz.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].name,
                        firma: req.body.massivname[i].firma,
                        tel: req.body.massivname[i].tel,
                        telegram: req.body.massivname[i].telegram,
                        karz: 0,
                        summa: req.body.massivname[i].summa,
                        kurs: req.body.massivname[i].kurs,
                        valyuta: req.body.massivname[i].valyuta,
                    });
                }
            }
        }
        return res.json(200);
    }
    
    async Post_update_chiqim_exsel (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const chiqim = await Chiqim.findOne({ where: { magazinId: req.body.massivname[i].magazinId, qayerga: req.body.massivname[i].qayerga, sabap: req.body.massivname[i].sabap }});
                if (chiqim) {
                } else {
                    await Chiqim.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        sotivchi: user.name,
                        qayerga: req.body.massivname[i].qayerga,
                        sabap: req.body.massivname[i].sabap,
                        summa: req.body.massivname[i].summa,
                        sana: req.body.massivname[i].sana,
                        kurs: req.body.massivname[i].kurs,
                        valyuta: req.body.massivname[i].valyuta,
                    });
                }
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const chiqim = await Chiqim.findOne({ where: { magazinId: req.body.massivname[i].magazinId, qayerga: req.body.massivname[i].qayerga, sabap: req.body.massivname[i].sabap }});
                if (chiqim) {
                } else {
                    await Chiqim.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        sotivchi: user.name,
                        qayerga: req.body.massivname[i].qayerga,
                        sabap: req.body.massivname[i].sabap,
                        summa: req.body.massivname[i].summa,
                        sana: req.body.massivname[i].sana,
                        kurs: req.body.massivname[i].kurs,
                        valyuta: req.body.massivname[i].valyuta,
                    });
                }
            }
        }
        return res.json(200);
    }

    async Post_update_sqlad_exsel (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const valyuta = await Valyuta.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].valyuta }});
                if (valyuta) {
                } else {
                    await Valyuta.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].valyuta,
                        summa: req.body.massivname[i].summa,
                    });
                }
                const tip = await Tip.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].tip }});
                if (tip) {
                } else {
                    await Tip.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].tip,
                    });
                }
                const yetkaz = await Yetkazuvchi.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].adress }});
                if (yetkaz) {
                } else {
                    await Yetkazuvchi.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].adress,
                        summa: 0,
                        kurs: '',
                        valyuta: '',  
                    });
                }                
                const tovar = await Tovar.findOne({ where: { magazinId: req.body.massivname[i].magazinId, tip: req.body.massivname[i].tip, adress: req.body.massivname[i].adress, name: req.body.massivname[i].name }});
                if (tovar) {
                    tovar.ogoh = req.body.massivname[i].ogoh;
                    if (tovar.soni == 0) {
                        tovar.soni = req.body.massivname[i].soni;
                    } else {
                        tovar.soni = tovar.soni + parseFloat(req.body.massivname[i].soni);                        
                    }
                    tovar.olinish = req.body.massivname[i].olinish;
                    tovar.sotilish = req.body.massivname[i].sotilish;
                    tovar.sotilish2 = req.body.massivname[i].sotilish2;
                    tovar.valyuta = req.body.massivname[i].valyuta;
                    tovar.summa = req.body.massivname[i].summa;
                    tovar.kod = req.body.massivname[i].kod;
                    await tovar.save();
                } else {
                    await Tovar.create({
                        userId: user.id,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        tip: req.body.massivname[i].tip,
                        adress: req.body.massivname[i].adress,
                        name: req.body.massivname[i].name,
                        ogoh: req.body.massivname[i].ogoh,
                        soni: req.body.massivname[i].soni,
                        olinish: req.body.massivname[i].olinish,
                        sotilish: req.body.massivname[i].sotilish,
                        sotilish2: req.body.massivname[i].sotilish2,
                        valyuta: req.body.massivname[i].valyuta,
                        summa: req.body.massivname[i].summa,
                        kod: req.body.massivname[i].kod,
                    });
                }
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            for (let i = 0; i < req.body.massivname.length; i++) {
                const valyuta = await Valyuta.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].valyuta }});
                if (valyuta) {
                } else {
                    await Valyuta.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].valyuta,
                        summa: req.body.massivname[i].summa,
                    });
                }
                const tip = await Tip.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].tip }});
                if (tip) {
                } else {
                    await Tip.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].tip,
                    });
                }
                const yetkaz = await Yetkazuvchi.findOne({ where: { magazinId: req.body.massivname[i].magazinId, name: req.body.massivname[i].adress }});
                if (yetkaz) {
                } else {
                    await Yetkazuvchi.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        name: req.body.massivname[i].adress,
                        summa: 0,
                        kurs: '',
                        valyuta: '',  
                    });
                }
                
                const tovar = await Tovar.findOne({ where: { magazinId: req.body.massivname[i].magazinId, tip: req.body.massivname[i].tip, adress: req.body.massivname[i].adress, name: req.body.massivname[i].name }});
                if (tovar) {
                    tovar.ogoh = req.body.massivname[i].ogoh;
                    if (tovar.soni == 0) {
                        tovar.soni = req.body.massivname[i].soni;
                    } else {
                        tovar.soni = tovar.soni + parseFloat(req.body.massivname[i].soni);                        
                    }
                    tovar.olinish = req.body.massivname[i].olinish;
                    tovar.sotilish = req.body.massivname[i].sotilish;
                    tovar.sotilish2 = req.body.massivname[i].sotilish2;
                    tovar.valyuta = req.body.massivname[i].valyuta;
                    tovar.summa = req.body.massivname[i].summa;
                    tovar.kod = req.body.massivname[i].kod;
                    await tovar.save();
                } else {
                    await Tovar.create({
                        userId: user.userId,
                        magazinId: req.body.massivname[i].magazinId,
                        magazin: req.body.massivname[i].magazin,
                        tip: req.body.massivname[i].tip,
                        adress: req.body.massivname[i].adress,
                        name: req.body.massivname[i].name,
                        ogoh: req.body.massivname[i].ogoh,
                        soni: req.body.massivname[i].soni,
                        olinish: req.body.massivname[i].olinish,
                        sotilish: req.body.massivname[i].sotilish,
                        sotilish2: req.body.massivname[i].sotilish2,
                        valyuta: req.body.massivname[i].valyuta,
                        summa: req.body.massivname[i].summa,
                        kod: req.body.massivname[i].kod,
                    });
                }
            }
        }
        return res.json(200);
    }
}
module.exports = ExcelController;