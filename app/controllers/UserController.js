const { User, Tip, Tovar, Mijoz, Ishchilar, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz, Savdo2, Magazin } = require('../../models');
const { Op } = require("sequelize");
const UserController2 = require('./UserController2');
const e = require('express');

class UserController extends UserController2 {

    async User_Get(req, res){
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        return res.json([user]);
    }

    async User_Update(req, res){
        const userby = await User.update(req.body, { where: { id: req.body.id } });
        if (userby) {
            return res.json(200);
        } else {}
    }

    async User_Del_Clear(req, res){
        await Mijoz.destroy({ where: { userId: req.body.id } });
        await Savdo.destroy({ where: { userId: req.body.id } });
        await Savdo2.destroy({ where: { userId: req.body.id } });
        await Zaqaz.destroy({ where: { userId: req.body.id } });
        await Chiqim.destroy({ where: { userId: req.body.id } });
        await Karzina.destroy({ where: { userId: req.body.id } });
        await Magazin.destroy({ where: { userId: req.body.id } });
        await Sotuv.destroy({ where: { userId: req.body.id } });
        await Tip.destroy({ where: { userId: req.body.id } });
        await Tovar.destroy({ where: { userId: req.body.id } });
        await Yetkazuvchi.destroy({ where: { userId: req.body.id } });
        await Valyuta.destroy({ where: { userId: req.body.id } });
        await Ishchilar.destroy({ where: { userId: req.body.id } });
        await User.destroy({ where: { id: req.body.id } });
        return res.json(200);
    }

    async Verifiy (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (user) {
                const mijoz = await Mijoz.findAll({ where: { userId: { [Op.eq]: user.id }}});
                const savdo = await Savdo.findAll({ where: { userId: user.id }});
                const karz = await Savdo.findAll({ where: { userId: user.id , karz: { [Op.gt]: '0' }}});
                const srok = await Savdo.findAll({ where: { userId: user.id , karz: { [Op.gt]: '0' }, srok: { [Op.lt]: req.body.date }}});
                const savdo2 = await Savdo2.findAll({ where: { userId: user.id }});
                const zaqaz = await Zaqaz.findAll({ where: { userId: user.id }});
                const karzina = await Karzina.findAll({ where: { userId: user.id }});
                const magazin = await Magazin.findAll({ where: { userId: user.id }});
                return res.json({'code': 200, 'user': user, 'magazin': magazin, 'mijoz': mijoz, 'savdo': savdo, 'savdo2': savdo2, 'zaqaz': zaqaz, 'karz': karz, 'karzina': karzina, 'srok': srok});
            } else {
                return res.json({'code': 0});
            }
        } else {
            const ish = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            const mag = await Magazin.findByPk(ish.magazinId);
            if (mag) {
                const mijoz = await Mijoz.findAll({ where: { magazinId: { [Op.eq]: mag.id }}});
                const savdo = await Savdo.findAll({ where: { magazinId: mag.id }});
                const karz = await Savdo.findAll({ where: { magazinId: mag.id , karz: { [Op.gt]: '0' }}});
                const srok = await Savdo.findAll({ where: { magazinId: mag.id , karz: { [Op.gt]: '0' }, srok: { [Op.lt]: req.body.date }}});
                const savdo2 = await Savdo2.findAll({ where: { magazinId: mag.id }});
                const zaqaz = await Zaqaz.findAll({ where: { magazinId: mag.id }});
                const karzina = await Karzina.findAll({ where: { magazinId: mag.id }});
                const magazin = await Magazin.findAll({ where: { magazinId: mag.id }});
                return res.json({'code': 200, 'user': mag, 'magazin': magazin, 'mijoz': mijoz, 'savdo': savdo, 'savdo2': savdo2, 'zaqaz': zaqaz, 'karz': karz, 'karzina': karzina, 'srok': srok});
            } else {
                return res.json({'code': 0});
            }
        }
    }

    async Valyuta_Get (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Valyuta.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Valyuta.findAll({ where: { userId: user.id } });
                return res.json(data2);
            }
        } else {
            if (req.body.search) {
                const data1 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
                return res.json(data2);
            }
        }
    }

    async Valyuta_Create_Update(req, res){
        if (req.body.status == 'brend') {
            if (req.body.id) {
                await Valyuta.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa
                },
                {
                    where: { id: req.body.id }
                });
            } else {
                const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
                await Valyuta.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa
                });
            }
            return res.json(200);
        } else {
            if (req.body.id) {
                await Valyuta.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa
                },
                {
                    where: { id: req.body.id }
                });
            } else {
                const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
                await Valyuta.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa
                });
            }
            return res.json(200);
        }
    }

    async Valyuta_Delete(req, res){
        await Valyuta.destroy({
            where: { id: req.body.id }
        });
        return res.json(200);
    }

    async Login (req, res) {
        if (req.body.status == 'ish') {
            const data1 = await Ishchilar.findOne({ where: { login: req.body.login, password: req.body.password } });
             if (data1) {
                return res.json({'code': 200, 'typ': 'ish', 'data': data1});            
            } else {
                return res.json({'code': 0});
            }
        } else {
            const data = await User.findOne({ where: { login: req.body.login, password: req.body.password } });
            if (data) {
                return res.json({'code': 200, 'typ': 'brend', 'data': data});            
            } else {
                return res.json({'code': 0});
            }
        }
    }

    async Registration (req, res) {
        const data = await User.create(req.body)
        if (data) {
            return res.json({'code': 200, 'typ': 'brend', 'data': data});            
        } else {
            return res.json({'code': 0});
        }
    }

    async Magazin_Creat(req, res){
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (req.body.id) {
            await Magazin.update({
                name: req.body.name
            },
            {
                where: { id: req.body.id }
            });
        } else {
            await Magazin.create({
                userId: user.id,
                magazinId: req.body.magazinId,
                name: req.body.name
            });
        }
        return res.json(200);
    }

    async Kassa_Get(req, res) {
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        const kassa = await Ishchilar.findAll({ where: { userId: user.id }});
        return res.json(kassa);
    }

    async Kassa_Creat(req, res){
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        const magazin = await Magazin.findByPk(req.body.magazinId);
        if (req.body.id) {
            await Ishchilar.update({
                name: req.body.name,
                fam: req.body.fam,
                tel: req.body.tel,
                login: req.body.login2,
                password: req.body.password,
                token: req.body.token2,
                status: req.body.status2,
                magazinId: magazin.id,
                magazin: magazin.name,
            },
            {
                where: { id: req.body.id }
            });
        } else {
            await Ishchilar.create({
                userId: user.id,
                name: req.body.name,
                fam: req.body.fam,
                tel: req.body.tel,
                login: req.body.login2,
                password: req.body.password,
                token: req.body.token2,
                status: req.body.status2,
                magazinId: magazin.id,
                magazin: magazin.name,
            });
        }
        return res.json(200);
    }

    async Role_Peremes (req, res) {
        const ishchi = await Ishchilar.findByPk(req.body.id);
        if (req.body.typ == 'val') {
            ishchi.valyuta = req.body.typ2;
            await ishchi.save();
        } else if (req.body.typ == 'tip') {
            ishchi.tip = req.body.typ2;
            await ishchi.save();
        } else if (req.body.typ == 'yet') {
            ishchi.yetkazu = req.body.typ2;
            await ishchi.save();
        } else if (req.body.typ == 'mij') {
            ishchi.mijoz = req.body.typ2;
            await ishchi.save();
        } else if (req.body.typ == 'chiq') {
            ishchi.chiqim = req.body.typ2;
            await ishchi.save();
        } else if (req.body.typ == 'sql') {
            ishchi.sqlad = req.body.typ2;
            await ishchi.save();
        } else if (req.body.typ == 'foy') {
            ishchi.foyda = req.body.typ2;
            await ishchi.save();
        } else {}
        return res.json(200);
    }

    async MijozGet (req, res) {
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (req.body.search) {      
            const data1 = await Mijoz.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
            return res.json(data1);
        } else {
            const data2 = await Mijoz.findAll({ where: { userId: user.id } });
            for (let i = 0; i < data2.length; i++) {
                data2[i].karz = 0;
                await data2[i].save();
                var sav = await Savdo.findAll({ where: { mijozId: data2[i].id }});
                for (let p = 0; p < sav.length; p++) {
                    data2[i].karz += parseFloat(sav[p].karz);
                    await data2[i].save();
                }
            }
            return res.json(data2);
        }
    }

    async Mijozcreate (req, res) {
        if (req.body.status == 'brend') {
            if (req.body.id) {
                await Mijoz.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    firma: req.body.firma,
                    tel: req.body.tel,
                    telegram: req.body.telegram,
                    summa: req.body.summa,
                },
                {
                    where: { id: req.body.id }
                });
            } else {
                const user = await User.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                const data = await Mijoz.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    firma: req.body.firma,
                    tel: req.body.tel,
                    telegram: req.body.telegram,
                    summa: req.body.summa,
                    karz: 0
                });
            }
            return res.json(200);
        } else {
            if (req.body.id) {
                await Mijoz.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    firma: req.body.firma,
                    tel: req.body.tel,
                    telegram: req.body.telegram,
                    summa: req.body.summa,
                },
                {
                    where: { id: req.body.id }
                });
            } else {
                const user = await Ishchilar.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                const data = await Mijoz.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    firma: req.body.firma,
                    tel: req.body.tel,
                    telegram: req.body.telegram,
                    summa: req.body.summa,
                    karz: 0
                });
            }
            return res.json(200);
        }
    }

    async MijozDelete (req, res) {
        await Mijoz.destroy({
            where: { id: req.body.id }
        });
        return res.json(200);
    }

    async Gettip (req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Tip.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Tip.findAll({ where: { userId: user.id } });
                return res.json(data2);
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Tip.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Tip.findAll({ where: { magazinId: user.magazinId } });
                return res.json(data2);
            }
        }
    }

    async Post_Update_Tip (req, res) {
        if (req.body.status == 'brend') {
            if (req.body.id) {
                await Tip.update({
                    name: req.body.name,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    },
                    {
                    where: { id: req.body.id }
                });            
            } else {
                const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
                await Tip.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name
                });  
            }
            return res.json(200);
        } else {
            if (req.body.id) {
                await Tip.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    },
                    {
                    where: { id: req.body.id }
                });            
            } else {
                const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
                await Tip.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name
                });  
            }
            return res.json(200);
        }
    }

    async Tipsdelete(req, res) {
        await Tip.destroy({where: {id: req.body.id}});
        return res.json(200);
    }

    async Getyetkaz(req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Yetkazuvchi.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Yetkazuvchi.findAll({ where: { userId: user.id } });
                return res.json(data2);
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Yetkazuvchi.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Yetkazuvchi.findAll({ where: { magazinId: user.magazinId } });
                return res.json(data2);
            }
        }
        
    }

    async Yetkaz_Post_Update(req, res) {
        if (req.body.status == 'brend') {
            if (req.body.id) {
                await Yetkazuvchi.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa,
                    },
                    {
                    where: { id: req.body.id }
                });            
            } else {
                const user = await User.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                await Yetkazuvchi.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa
                });  
            }
            return res.json(200);
        } else {
            if (req.body.id) {
                await Yetkazuvchi.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa,
                    },
                    {
                    where: { id: req.body.id }
                });            
            } else {
                const user = await Ishchilar.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                await Yetkazuvchi.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa
                });  
            }
            return res.json(200);
        }
    }

    async Yetkaz_Delete(req, res) {
        await Yetkazuvchi.destroy({where: { id: req.body.id }});
        return res.json(200);
    }

    async Get_db(req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            const data = await Tip.findAll({ where: { userId: user.id } });
            const data2 = await Yetkazuvchi.findAll({ where: { userId: user.id } });
            const data3 = await Tovar.findAll({ where: { userId: user.id } });
            const data4 = await Valyuta.findAll({ where: { userId: user.id } });
            if (req.body.search) {      
                const data1 = await Tovar.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'data': data, 'data2': data2, 'data3': data1, 'data4': data4});
            } else {
                return res.json({'data': data, 'data2': data2, 'data3': data3, 'data4': data4});
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            const data = await Tip.findAll({ where: { magazinId: user.magazinId } });
            const data2 = await Yetkazuvchi.findAll({ where: { magazinId: user.magazinId } });
            const data3 = await Tovar.findAll({ where: { magazinId: user.magazinId } });
            const data4 = await Valyuta.findAll({ where: { magazinId: user.magazinId } });
            if (req.body.search) {      
                const data1 = await Tovar.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'data': data, 'data2': data2, 'data3': data1, 'data4': data4});
            } else {
                return res.json({'data': data, 'data2': data2, 'data3': data3, 'data4': data4});
            }
        }
    }

    async Sqlad(req, res){
        if (req.body.status == 'brend') {
            if (req.body.id) {
                await Tovar.update(req.body, {
                    where: { id: req.body.id }
                });
            } else {
                var valu = '';
                var valu2 = '';
                const user = await User.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                const valyuta = await Valyuta.findOne({
                    where: { userId: user.id, name: req.body.valyuta }
                });
                if (valyuta) {
                    valu = valyuta.name;
                    valu2 = valyuta.summa
                } else {
                    valu = '';
                    valu2 = '';
                }
                await Tovar.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    tip: req.body.tip,
                    adress: req.body.adress,
                    name: req.body.name,
                    ogoh: req.body.ogoh,
                    soni: req.body.soni,
                    olinish: req.body.olinish,
                    sotilish: req.body.sotilish,
                    sotilish2: req.body.sotilish2,
                    valyuta: valu,
                    summa: valu2,
                    kod: req.body.kod
                });
            }
            return res.json(200);
        } else {
            if (req.body.id) {
                await Tovar.update(req.body, {
                    where: { id: req.body.id }
                });
            } else {
                var valu = '';
                var valu2 = '';
                const user = await Ishchilar.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                const valyuta = await Valyuta.findOne({
                    where: { userId: user.userId, name: req.body.valyuta }
                });
                if (valyuta) {
                    valu = valyuta.name;
                    valu2 = valyuta.summa
                } else {
                    valu = '';
                    valu2 = '';
                }
                await Tovar.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    tip: req.body.tip,
                    adress: req.body.adress,
                    name: req.body.name,
                    ogoh: req.body.ogoh,
                    soni: req.body.soni,
                    olinish: req.body.olinish,
                    sotilish: req.body.sotilish,
                    sotilish2: req.body.sotilish2,
                    valyuta: valu,
                    summa: valu2,
                    kod: req.body.kod
                });
            }
            return res.json(200);
        }
    }
    
    async Sqlad_Delete(req, res){
        await Tovar.destroy({ where: { id: req.body.id } });
        return res.json(200);
    }

    async Chiqim_get(req, res){
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Chiqim.findAll({ where: { userId: user.id, [Op.or]: [{ qayerga: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Chiqim.findAll({ where: { userId: user.id } });
                return res.json(data2);
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Chiqim.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ qayerga: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json(data1);
            } else {
                const data2 = await Chiqim.findAll({ where: { magazinId: user.magazinId } });
                return res.json(data2);
            }
        }
    }

    async Chiqim_Post_Ppdate(req, res){
        if (req.body.status == 'brend') {
            if (req.body.id) {
                Chiqim.update(req.body,{
                    where: { id: req.body.id }
                });
            } else {
                const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
                await Chiqim.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    qayerga: req.body.qayerga,
                    sabap: req.body.sabap,
                    summa: req.body.summa,
                });
            }
            return res.json(200);
        } else {
            if (req.body.id) {
                Chiqim.update(req.body,{
                    where: { id: req.body.id }
                });
            } else {
                const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
                await Chiqim.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    qayerga: req.body.qayerga,
                    sabap: req.body.sabap,
                    summa: req.body.summa,
                });
            }
            return res.json(200);
        }
    }

    async Chiqim_Delet(req, res){
      await Chiqim.destroy({ where: {id: req.body.id} });
      return res.json(200)
    }

    async Live_Search(req, res){
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            const data4 = await Valyuta.findAll({ where: { userId: user.id } });
            const data5 = await Mijoz.findAll({ where: { userId: user.id } });
            if (req.body.search) {      
                const data1 = await Tovar.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'data2': data1, 'data4': data4});
            } else {
                const data2 = await Tovar.findAll({ where: { userId: user.id } });
                return res.json({'data2': data2, 'data4': data4, 'data5': data5});
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            const data4 = await Valyuta.findAll({ where: { magazinId: user.magazinId } });
            const data5 = await Mijoz.findAll({ where: { magazinId: user.magazinId } });
            if (req.body.search) {      
                const data1 = await Tovar.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'data2': data1, 'data4': data4});
            } else {
                const data2 = await Tovar.findAll({ where: { magazinId: user.magazinId } });
                return res.json({'data2': data2, 'data4': data4, 'data5': data5});
            }
        }
    }

    async Oplata(req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.mijozId) {
                const mijoz = await Mijoz.findByPk(req.body.mijozId);
                mijoz.karz = parseFloat(mijoz.karz) + parseFloat(req.body.karz);
                await mijoz.save()
                const savdo = await Savdo.create({
                    userId: user.id,
                    mijozId: mijoz.id,
                    mijoz: mijoz.name,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    karz: req.body.karz,
                    srok: req.body.srok,
                    valy: req.body.vname,
                    valyuta: req.body.vsumma,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.id,
                        savdoId: savdo.id,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        jami: req.body.local[i].jami,
                        valy: req.body.vname,
                        valyuta: req.body.vsumma,
                    });
                }
            } else {
                const savdo2 = await Savdo2.create({
                    userId: user.id,
                    sana: req.body.sana,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    valy: req.body.vname,
                    valyuta: req.body.vsumma,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.id,
                        savdo2Id: savdo2.id,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        jami: req.body.local[i].jami,
                        valy: req.body.vname,
                        valyuta: req.body.vsumma,
                    });
                }
            }
            return res.json(200);
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.mijozId) {
                const mijoz = await Mijoz.findByPk(req.body.mijozId);
                mijoz.karz = parseFloat(mijoz.karz) + parseFloat(req.body.karz);
                await mijoz.save()
                const savdo = await Savdo.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    mijozId: mijoz.id,
                    mijoz: mijoz.name,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    karz: req.body.karz,
                    srok: req.body.srok,
                    valy: req.body.vname,
                    valyuta: req.body.vsumma,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.userId,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        savdoId: savdo.id,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        jami: req.body.local[i].jami,
                        valy: req.body.vname,
                        valyuta: req.body.vsumma,
                    });
                }
            } else {
                const savdo2 = await Savdo2.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    sana: req.body.sana,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    valy: req.body.vname,
                    valyuta: req.body.vsumma,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.userId,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        savdo2Id: savdo2.id,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        jami: req.body.local[i].jami,
                        valy: req.body.vname,
                        valyuta: req.body.vsumma,
                    });
                }
            }
            return res.json(200);
        }
    }

    async Karzina(req, res){
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            const zaqaz = await Zaqaz.create({
                userId: user.id,
                name: req.body.name
            });
            for (let i = 0; i < req.body.local.length; i++) {  
                await Karzina.create({               
                    userId: user.id,
                    zaqazId: zaqaz.id,
                    tovar: req.body.local[i].id,
                    name: req.body.local[i].name,
                    soni: req.body.local[i].soni,
                    sotilish: req.body.local[i].sotilish,
                    chegrma: req.body.local[i].chegirma,
                    jami: req.body.local[i].jami,
                });
            }
            return res.json(200);
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            const zaqaz = await Zaqaz.create({
                userId: user.userId,
                magazinId: req.body.magazinId,
                magazin: req.body.magazin,
                name: req.body.name
            });
            for (let i = 0; i < req.body.local.length; i++) {  
                await Karzina.create({               
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    zaqazId: zaqaz.id,
                    tovar: req.body.local[i].id,
                    name: req.body.local[i].name,
                    soni: req.body.local[i].soni,
                    sotilish: req.body.local[i].sotilish,
                    chegrma: req.body.local[i].chegirma,
                    jami: req.body.local[i].jami,
                });
            }
            return res.json(200);
        }
    }

    async Tolov_Post(req, res) {
        var data = await Savdo.findByPk(req.body.id);
        data.karz = parseFloat(data.karz) - parseFloat(req.body.tolov);
        data.srok = req.body.srok;            
        await data.save();
        return res.json(200);
    }

    async Zaqaz_Delet(req, res) {
        await Zaqaz.destroy({ where: {id: req.body.id} });
        await Karzina.destroy({ where: {zaqazId: req.body.id} });
        return res.json(200);
    }
    async Sotuv_Post_Id(req, res) {
        if (req.body.savdoId == 1) {
            var savdo = await Sotuv.findAll({ where: { savdoId: req.body.id }});            
        } else {
            var savdo = await Sotuv.findAll({ where: { savdo2Id: req.body.id }});  
        }
        return res.json(savdo);
    }

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
module.exports = new UserController();