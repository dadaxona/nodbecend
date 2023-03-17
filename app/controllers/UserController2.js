const ExcelController = require('./ExcelController');
const { User, Tip, Tovar, Mijoz, Ishchilar, Yetkazuvchi, Oylikdata, Oyliklar, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz, Magazin, Jonatma, Yetkazuvchiarxiv } = require('../../models');
const { Op } = require("sequelize");
class UserController2 extends ExcelController {

    async Tester (req, res) {
        return res.json("Node");
    }

    async Filtrsotuv(req, res){
        if (req.body.clent) {
            if (req.body.date) {
                const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: req.body.clent, sana: req.body.date }});
                const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
                return res.json({'savdo': savdo, 'sotuv': sotuv});  
            } else {
                const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: req.body.clent }});
                const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
                return res.json({'savdo': savdo, 'sotuv': sotuv});                
            }
        } else if (req.body.date) {
            if (req.body.clent) {
                const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: req.body.clent, sana: req.body.date }});
                const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
                return res.json({'savdo': savdo, 'sotuv': sotuv});  
            } else {
                const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId, sana: req.body.date }});
                const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
                return res.json({'savdo': savdo, 'sotuv': sotuv});                
            }
        } else if (req.body.ishchi) {

            if (req.body.date) {
                const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId, sotivchi: req.body.ishchi, sana: req.body.date }});
                const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
                return res.json({'savdo': savdo, 'sotuv': sotuv});  
            } else {
                const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId, sotivchi: req.body.ishchi }});
                const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
                return res.json({'savdo': savdo, 'sotuv': sotuv});             
            }
        } else {
            const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId }});
            const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
            return res.json({'savdo': savdo, 'sotuv': sotuv});
        }
    }

    async Ishchiget_get (req, res) {
        const ishchilar = await Ishchilar.findAll({ where: { magazinId: req.body.magazinId }});
        return res.json(ishchilar);
    }

    async Serchtor_live (req, res) {
        const tovar = await Tovar.findAll({ where: { magazinId: req.body.magazinId }});
        if (tovar) {
            return res.json(tovar);
        } else {
            return res.json(404);
        }
    }

    async Oylik_create (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            const date = await Oylikdata.findOne({ where: { ishchilarId: req.body.id, sana: req.body.date2 }});
            const oyl = await Ishchilar.findByPk(req.body.id);
            if (req.body.ishchilarId) {
                date.oylik = oyl.oylik;
                await date.save();
                await Oyliklar.update({ 
                    userId: user.id,
                    magazinId: date.magazinId,
                    magazin: date.magazin,
                    oylikdataId: date.id,
                    ishchilarId: date.ishchilarId,
                    name: req.body.name,
                    sana: req.body.sana,
                    koment: req.body.koment,
                    summa: req.body.summa,
                    valyuta: req.body.valyuta,
                    kurs: req.body.kurs
                    },
                    { where: {id: req.body.ishchilarId}
                });
            } else {
                if (date) {
                    date.oylik = oyl.oylik;
                    await date.save();
                    await Oyliklar.create({
                        userId: user.id,
                        magazinId: date.magazinId,
                        magazin: date.magazin,
                        oylikdataId: date.id,
                        ishchilarId: date.ishchilarId,
                        name: req.body.name,
                        sana: req.body.sana,
                        koment: req.body.koment,
                        summa: req.body.summa,
                        valyuta: req.body.valyuta,
                        kurs: req.body.kurs
                    });
                } else {
                    const date2 = await Oylikdata.create({
                        userId: user.id,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        ishchilarId: req.body.id,
                        sana: req.body.date2,
                        oylik: oyl.oylik
                    });
                    await Oyliklar.create({
                        userId: user.id,
                        magazinId: date2.magazinId,
                        magazin: date2.magazin,
                        oylikdataId: date2.id,
                        ishchilarId: date2.ishchilarId,
                        name: req.body.name,
                        sana: req.body.sana,
                        koment: req.body.koment,
                        summa: req.body.summa,
                        valyuta: req.body.valyuta,
                        kurs: req.body.kurs
                    });
                }
            }
        } else {}
        return res.json(200);
    }

    async Oylikget (req, res) {
        if (req.body.filtre) {
            const oylikdataf = await Oylikdata.findOne({ where: { magazinId: req.body.magazinId, ishchilarId: req.body.id, sana: req.body.filtre }});
            if (oylikdataf) {
                const oyliklar = await Oyliklar.findAll({ where: { magazinId: req.body.magazinId, oylikdataId: oylikdataf.id, ishchilarId: req.body.id }});
                await Oylikdata.update({ jami: 0 },{ where: {ishchilarId: req.body.id }});
                for (let i = 0; i < oyliklar.length; i++) {
                    const oylikdata = await Oylikdata.findByPk(oyliklar[i].oylikdataId);
                    if (oyliklar[i].valyuta) {
                        oylikdata.jami = parseFloat(oylikdata.jami) + parseFloat(oyliklar[i].summa) * parseFloat(oyliklar[i].kurs);
                        await oylikdata.save();
                    } else {
                        oylikdata.jami = parseFloat(oylikdata.jami) + parseFloat(oyliklar[i].summa);
                        await oylikdata.save();
                    }            
                }
                const oylikdata2 = await Oylikdata.findAll({ where: { ishchilarId: req.body.id }});
                const data2 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
                return res.json({'oylikdata': oylikdata2, 'oyliklar': oyliklar, 'valyuta':data2});
            } else { }
        } else {
            const oyliklar = await Oyliklar.findAll({ where: { magazinId: req.body.magazinId, ishchilarId: req.body.id }});
            await Oylikdata.update({ jami: 0 },{ where: {ishchilarId: req.body.id }});
            for (let i = 0; i < oyliklar.length; i++) {
                const oylikdata = await Oylikdata.findByPk(oyliklar[i].oylikdataId);
                if (oyliklar[i].valyuta) {
                    oylikdata.jami = parseFloat(oylikdata.jami) + parseFloat(oyliklar[i].summa) * parseFloat(oyliklar[i].kurs);
                    await oylikdata.save();
                } else {
                    oylikdata.jami = parseFloat(oylikdata.jami) + parseFloat(oyliklar[i].summa);
                    await oylikdata.save();
                }            
            }
            const oylikdata2 = await Oylikdata.findAll({ where: { ishchilarId: req.body.id }});
            const data2 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
            return res.json({'oylikdata': oylikdata2, 'oyliklar': oyliklar, 'valyuta':data2});            
        }
    }

    async Oy_delet (req, res) {
        await Oyliklar.destroy({
            where: { id: req.body.ishchilarId }
        });
        return res.json(200);
    }

    async Zaqazlar(req, res){
        const zaqaz = await Zaqaz.findAll({ where: { magazinId: req.body.magazinId }});
        const karzina = await Karzina.findAll({ where: { magazinId: req.body.magazinId }});
        const jonatma = await Jonatma.findAll({ where: { magazinId: req.body.magazinId }});
        var sav = 0;
        var ol = 0;
        var chiq = 0;
        var bugun = 0;
        const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId, sana: req.body.date }});
        const chiqim = await Chiqim.findAll({ where: { magazinId: req.body.magazinId, sana: req.body.date }});
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
        for (let i3 = 0; i3 < chiqim.length; i3++) {
            if (chiqim[i3].valyuta) {
                chiq += parseFloat(chiqim[i3].summa) * parseFloat(chiqim[i3].kurs);   
            } else {
                chiq += parseFloat(chiqim[i3].summa);
            }
        }
        bugun = sav - ol - chiq;
        return res.json({'code': 200, 'zaqaz': zaqaz, 'karzina': karzina, 'jonatma': jonatma, 'jami': sav , 'foyda': bugun });
    }

    async Magadb (req, res) {
        const dbsql = await Magazin.findByPk(req.body.sql);
        if (dbsql) {
            const user = await User.findByPk(dbsql.userId);
            for (let i = 0; i < req.body.databd.length; i++) {
                const tovars = await Tovar.findByPk(req.body.databd[i].id);
                tovars.soni = parseFloat(tovars.soni) - parseFloat(req.body.databd[i].soni);
                await tovars.save();
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
                        var javob = '';
                        javob = parseFloat(db[i].soni) * parseFloat(db[i].olinish);
                        await Yetkazuvchiarxiv.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            yetkazuvchiId: yetkazuvchi.id,
                            name: yetkazuvchi.name,
                            soni: db[i].soni,
                            summa: db[i].olinish,
                            jami: javob,
                            sana: req.body.date,
                            kurs: db[i].summa,
                            valyuta: db[i].valyuta,
                        });           
                    } else {
                        const ye = await Yetkazuvchi.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            name: db[i].adress,
                            summa: 0,
                        });
                        var javob = '';
                        javob = parseFloat(db[i].soni) * parseFloat(db[i].olinish);
                        await Yetkazuvchiarxiv.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            yetkazuvchiId: ye.id,
                            name: ye.name,
                            soni: db[i].soni,
                            summa: db[i].olinish,
                            jami: javob,
                            sana: req.body.date,
                            kurs: db[i].summa,
                            valyuta: db[i].valyuta,
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
                        var javob = '';
                        javob = parseFloat(db[i].soni) * parseFloat(db[i].olinish);
                        await Yetkazuvchiarxiv.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            yetkazuvchiId: yetkazuvchi.id,
                            name: yetkazuvchi.name,
                            soni: db[i].soni,
                            summa: db[i].olinish,
                            jami: javob,
                            sana: req.body.date,
                            kurs: db[i].summa,
                            valyuta: db[i].valyuta,
                        });
                    } else {
                        const ye = await Yetkazuvchi.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            name: db[i].adress,
                            summa: 0,
                        });
                        var javob = '';
                        javob = parseFloat(db[i].soni) * parseFloat(db[i].olinish);
                        await Yetkazuvchiarxiv.create({
                            userId: db[i].userId,
                            magazinId: db[i].magazinId,
                            magazin: db[i].magazin,
                            yetkazuvchiId: ye.id,
                            name: ye.name,
                            soni: db[i].soni,
                            summa: db[i].olinish,
                            jami: javob,
                            sana: req.body.date,
                            kurs: db[i].summa,
                            valyuta: db[i].valyuta,
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

    async Getagazin_fn(req, res){
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (user) {
            const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId }});
            const db = await Magazin.findAll({ where: { userId: user.id }});
            const mij = await Mijoz.findAll({ where: { userId: user.id, magazinId: req.body.magazinId }});
            const ish = await Ishchilar.findAll({ where: { userId: user.id }});
            const rasxod = await Chiqim.findAll({ where: { userId: user.id, magazinId: req.body.magazinId }});
            return res.json({'savdo': savdo, 'mag': db, 'ish': ish, 'prad': mij, 'rasxod': rasxod});
        } else {}
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
        for (let i3 = 0; i3 < chiqim.length; i3++) {
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