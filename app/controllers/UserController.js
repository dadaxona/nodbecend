const { User, Tip, Tovar, Mijoz, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz, Savdo2 } = require('../../models');
const { Op } = require("sequelize");
const UserController2 = require('./UserController2');

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
        await User.destroy({
            where: { id: req.body.id }
        });
        return res.json(200);
    }

    async Verifiy (req, res) {
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (user) {
            const mijoz = await Mijoz.findAll({ where: { userId: { [Op.eq]: user.id }}});
            const savdo = await Savdo.findAll({ where: { userId: user.id }});
            const karz = await Savdo.findAll({ where: { userId: user.id , karz: { [Op.gt]: '0' }}});
            const srok = await Savdo.findAll({ where: { userId: user.id , karz: { [Op.gt]: '0' }, srok: { [Op.lt]: req.body.date }}});
            const savdo2 = await Savdo2.findAll({ where: { userId: user.id }});
            const zaqaz = await Zaqaz.findAll({ where: { userId: user.id }});
            const karzina = await Karzina.findAll({ where: { userId: user.id }});
            return res.json({'code': 200, 'user':user, 'mijoz': mijoz, 'savdo': savdo, 'savdo2': savdo2, 'zaqaz': zaqaz, 'karz': karz, 'karzina': karzina, 'srok': srok});            
        } else {
            return res.json({'code': 0});
        }
    }

    async Valyuta_Get (req, res) {

        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (req.body.search) {      
            const data1 = await Valyuta.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
            return res.json(data1);
        } else {
            const data2 = await Valyuta.findAll({ where: { userId: user.id } });
            return res.json(data2);
        }
    }

    async Valyuta_Create_Update(req, res){
        if (req.body.id) {
            await Valyuta.update({
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
                name: req.body.name,
                summa: req.body.summa
            });
        }
        return res.json(200)
    }

    async Valyuta_Delete(req, res){
        await Valyuta.destroy({
            where: { id: req.body.id }
        });
        return res.json(200);
    }

    async Login (req, res) {
        const data = await User.findOne({  
            where: { login: req.body.login, password: req.body.password }
        });
        if (data) {
            return res.json({'code': 200, 'data': data});            
        } else {
            return res.json({'code': 0});
        }
    }

    async Registration (req, res) {
        const data = await User.create(req.body)
        if (data) {
            return res.json({'code': 200, 'data': data});            
        } else {
            return res.json({'code': 0});
        }
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
        if (req.body.id) {
            await Mijoz.update({
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

    async MijozDelete (req, res) {
        await Mijoz.destroy({
            where: { id: req.body.id }
        });
        return res.json(200);
    }

    async Gettip (req, res) {
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (req.body.search) {      
            const data1 = await Tip.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
            return res.json(data1);
        } else {
            const data2 = await Tip.findAll({ where: { userId: user.id } });
            return res.json(data2);
        }
    }

    async Post_Update_Tip (req, res) {
        if (req.body.id) {
            await Tip.update({
                name: req.body.name,
                },
                {
                where: { id: req.body.id }
            });            
        } else {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            await Tip.create({
                userId: user.id,
                name: req.body.name
            });  
        }
        return res.json(200);
    }

    async Tipsdelete(req, res) {
        await Tip.destroy({where: {id: req.body.id}});
        return res.json(200);
    }

    async Getyetkaz(req, res) {
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (req.body.search) {      
            const data1 = await Yetkazuvchi.findAll({ where: { userId: user.id, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
            return res.json(data1);
        } else {
            const data2 = await Yetkazuvchi.findAll({ where: { userId: user.id } });
            return res.json(data2);
        }
    }

    async Yetkaz_Post_Update(req, res) {
        if (req.body.id) {
            await Yetkazuvchi.update({
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
                name: req.body.name,
                summa: req.body.summa
            });  
        }
        return res.json(200);
    }

    async Yetkaz_Delete(req, res) {
        await Yetkazuvchi.destroy({where: { id: req.body.id }});
        return res.json(200);
    }

    async Get_db(req, res) {

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
    }

    async Sqlad(req, res){
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
            });
        }
        return res.json(200);
    }
    
    async Sqlad_Delete(req, res){
        await Tovar.destroy({ where: { id: req.body.id } });
        return res.json(200);
    }

    async Chiqim_get(req, res){
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (req.body.search) {      
            const data1 = await Chiqim.findAll({ where: { userId: user.id, [Op.or]: [{ qayerga: {[ Op.iRegexp ]: req.body.search }}]}});
            return res.json(data1);
        } else {
            const data2 = await Chiqim.findAll({ where: { userId: user.id } });
            return res.json(data2);
        }
    }

    async Chiqim_Post_Ppdate(req, res){
        if (req.body.id) {
            Chiqim.update(req.body,{
                where: { id: req.body.id }
            });
        } else {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            await Chiqim.create({
                userId: user.id,
                qayerga: req.body.qayerga,
                sabap: req.body.sabap,
                summa: req.body.summa,
            });
        }
        return res.json(200);
    }

    async Chiqim_Delet(req, res){
      await Chiqim.destroy({ where: {id: req.body.id} });
      return res.json(200)
    }

    async Live_Search(req, res){
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
    }

    async Oplata(req, res) {
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
        return res.json(200)
    }

    async Karzina(req, res){
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
}
module.exports = new UserController();