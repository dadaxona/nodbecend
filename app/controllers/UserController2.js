const ExcelController = require('./ExcelController');
const { User, Tip, Tovar, Mijoz, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz, Magazin, Jonatma } = require('../../models');
const { Op } = require("sequelize");
class UserController2 extends ExcelController {

    async Tester (req, res) {
        return res.json("Node");
    }

    async Serchtor_live (req, res) {
        const tovar = await Tovar.findAll({ where: { magazinId: req.body.magazinId }});
        if (tovar) {
            return res.json(tovar);
        } else {
            return res.json(404);
        }
    }

    async Zaqazlar(req, res){
        const zaqaz = await Zaqaz.findAll({ where: { magazinId: req.body.magazinId }});
        const karzina = await Karzina.findAll({ where: { magazinId: req.body.magazinId }});
        return res.json({'code': 200, 'zaqaz': zaqaz, 'karzina': karzina});
    }

    async Magadb (req, res) {
        const dbsql = await Magazin.findByPk(req.body.sql);
        if (dbsql) {
            const user = User.findByPk(dbsql.userId);
            for (let i = 0; i < req.body.databd.length; i++) {
                await Jonatma.create({
                    userId: user.id,
                    magazinId: dbsql.id,
                    magazin: dbsql.name,
                    tip: req.body.databd[i].tip,
                    adress: req.body.magazin,
                    name: req.body.databd[i].name,
                    ogoh: req.body.databd[i].ogoh,
                    soni: req.body.databd[i].soni,
                    olinish: req.body.databd[i].olinish,
                    sotilish: "",
                    sotilish2: "",
                    valyuta: req.body.databd[i].valyuta,
                    summa: req.body.databd[i].summa,
                    kod: req.body.databd[i].kod                
                });
            }
            return res.json({'code': 200});
        } else {}
    }

    async Sqldbpost (req, res) {
        const db = await Jonatma.findAll({ where: { magazinId: req.body.magazinId }});
        for (let i = 0; i < db.length; i++) {
            const tov = await Tovar.findOne({ where: { magazinId: req.body.magazinId, tip: db[i].tip, adress: db[i].adress, name: db[i].name }});
            if (tov) {
                if (db[i].sotilish && db[i].sotilish2) {
                    const rbt = await Tip.findOne({ where: { magazinId: req.body.magazinId, name: db[i].tip }});
                    const yetkazuvchi = await Yetkazuvchi.findOne({ where: { magazinId: req.body.magazinId, name: db[i].adress }});
                    if (rbt) {
                    } else {
                        await Tip.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            name: db[i].tip
                        }); 
                    }
                    if (yetkazuvchi) {                        
                    } else {
                        await Yetkazuvchi.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            name: db[i].adress,
                            summa: 0,
                        }); 
                    }
                    tov.soni = parseFloat(tov.soni) + parseFloat(db[i].soni);
                    tov.ogoh = db[i].ogoh,
                    tov.olinish = db[i].olinish,
                    tov.sotilish = db[i].sotilish,
                    tov.sotilish2 = db[i].sotilish2,
                    tov.valyuta = db[i].valyuta,
                    tov.summa = db[i].summa,
                    tov.kod = db[i].kod
                    await tov.save();
                    await db[i].destroy();
                } else {}
            } else {
                if (db[i].sotilish && db[i].sotilish2) {
                    const rbt = await Tip.findOne({ where: { magazinId: req.body.magazinId, name: db[i].tip }});
                    const yetkazuvchi = await Yetkazuvchi.findOne({ where: { magazinId: req.body.magazinId, name: db[i].adress }});
                    if (rbt) {
                    } else {
                        await Tip.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            name: db[i].tip
                        }); 
                    }
                    if (yetkazuvchi) {                        
                    } else {
                        await Yetkazuvchi.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            name: db[i].adress,
                            summa: 0,
                        }); 
                    }
                    await Tovar.create({
                        userId: db[i].userId,
                        magazinId: db[i].magazinId,
                        magazin: db[i].magazin,
                        tip: db[i].tip,
                        adress: db[i].adress,
                        name: db[i].name,
                        ogoh: db[i].ogoh,
                        soni: db[i].soni,
                        olinish: db[i].olinish,
                        sotilish: db[i].sotilish,
                        sotilish2: db[i].sotilish2,
                        valyuta: db[i].valyuta,
                        summa: db[i].summa,
                        kod: db[i].kod
                    });
                    await db[i].destroy();
                } else {}
            }
        }
        const db2 = await Jonatma.findAll({ where: { magazinId: req.body.magazinId }});
        return res.json(db2)
    }

    async Olishdb (req, res) {
        const db = await Jonatma.findAll({ where: { magazinId: req.body.magazinId }});
        if (db) {
            return res.json(db);
        } else {}
    }

    async Sqlad_dbpost (req, res) {
        await Jonatma.update(req.body,
        { where: { id: req.body.id} }
        );
        const db = await Jonatma.findAll({ where: { magazinId: req.body.magazinId }});
        return res.json(db);
    }

    async Sqlad_deletedb (req, res) {
        await Jonatma.destroy({
            where: { id: req.body.id }
        });
        const db = await Jonatma.findAll({ where: { magazinId: req.body.magazinId }});
        return res.json(db);
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