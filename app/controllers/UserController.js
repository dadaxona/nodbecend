const { User, Tip, Tovar, Mijoz, Ishchilar, Yetkazuvchi, Valyuta, Chiqim, Savdo, Sotuv, Karzina, Zaqaz, Magazin, Yetkazuvchiarxiv } = require('../../models');
const { Op } = require("sequelize");
const UserController2 = require('./UserController2');
const e = require('express');
const axios = require('axios');
class UserController extends UserController2 {

    async User_Get(req, res){
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        return res.json([user]);
    }

    async UsergetPrint (req, res){
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            return res.json(user);
        } else {
            const ish = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            const user = await User.findByPk(ish.userId);
            return res.json(user);
        }
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
            if (req.body.magazinId) {
                if (user) {
                    const mijoz = await Mijoz.findAll({ where: { magazinId: { [Op.eq]: req.body.magazinId }}});
                    const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId }});
                    const karz = await Savdo.findAll({ where: { magazinId: req.body.magazinId , karz: { [Op.gt]: '0' }}});
                    const srok = await Savdo.findAll({ where: { magazinId: req.body.magazinId , karz: { [Op.gt]: '0' }, srok: { [Op.lt]: req.body.date }}});
                    const zaqaz = await Zaqaz.findAll({ where: { magazinId: req.body.magazinId }});
                    const karzina = await Karzina.findAll({ where: { magazinId: req.body.magazinId }});
                    const magazin = await Magazin.findAll({ where: { userId: user.id }});
                    return res.json({'code': 200, 'user': user, 'magazin': magazin, 'mijoz': mijoz, 'savdo': savdo, 'zaqaz': zaqaz, 'karz': karz, 'karzina': karzina, 'srok': srok});
                } else {
                    return res.json({'code': 0});
                }                
            } else {
                const magazin = await Magazin.findAll({ where: { userId: user.id }});
                return res.json({'code': 200, 'user': user, 'magazin': magazin, 'mijoz': [], 'savdo': [], 'savdo2': [], 'zaqaz': [], 'karz': [], 'karzina': [], 'srok': []});
            }
        } else {
            const ish = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (ish) {
                const mijoz = await Mijoz.findAll({ where: { magazinId: { [Op.eq]: ish.magazinId }}});
                const savdo = await Savdo.findAll({ where: { magazinId: ish.magazinId }});
                const karz = await Savdo.findAll({ where: { magazinId: ish.magazinId , karz: { [Op.gt]: '0' }}});
                const srok = await Savdo.findAll({ where: { magazinId: ish.magazinId , karz: { [Op.gt]: '0' }, srok: { [Op.lt]: req.body.date }}});
                const zaqaz = await Zaqaz.findAll({ where: { magazinId: ish.magazinId }});
                const karzina = await Karzina.findAll({ where: { magazinId: ish.magazinId }});
                const magazin = await Magazin.findAll({ where: { id: ish.magazinId }});
                return res.json({'code': 200, 'user': ish, 'magazin': magazin, 'mijoz': mijoz, 'savdo': savdo, 'zaqaz': zaqaz, 'karz': karz, 'karzina': karzina, 'srok': srok});
            } else {
                return res.json({'code': 0});
            }
        }
    }

    // async DolgiCilent (req, res) {
    //     const srok = await Savdo.findAll({ where: { magazinId: req.body.magazinId, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: req.body.date }}});
    //     if (srok.length > 0) {
    //         for (let i = 0; i < srok.length; i++) {
    //             var tekshir = '';
    //             var msg = '';
    //             const mijoz = await Mijoz.findByPk(srok[i].mijozId);
    //             if (mijoz.summa > 0) {
    //                 if (mijoz.valyuta) {
    //                     if (srok[i].valyuta) {
    //                         tekshir = srok[i].karz * srok[i].kurs / mijoz.kurs;
    //                         if (mijoz.summa > tekshir) {
    //                             mijoz.summa = mijoz.summa - tekshir;
    //                             await mijoz.save();
    //                             srok[i].karz = 0;
    //                             await srok[i].save();
    //                             if (req.body.magazinchat && mijoz.telegram) {
    //                                 const karz2 =  await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: mijoz.id, karz: { [Op.gt]: '0' }}});
    //                                 if (karz2) {
    //                                     var tk = '';
    //                                     for (let k = 0; k < karz2.length; k++) {
    //                                         if (karz2[k].valyuta) {
    //                                             tk += karz2[k].karz * karz2[k].kurs;
    //                                         } else {
    //                                             tk += karz2[k].karz;
    //                                         }
    //                                     }
    //                                 } else { 
    //                                     tk = 0;
    //                                 }
    //                                 msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                                 axios({
    //                                     method: 'post',
    //                                     url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                     data: {
    //                                         chat_id: mijoz.telegram,
    //                                         text: msg
    //                                     },
    //                                 }); 
    //                             } else { }    
    //                         } else {
    //                             var teksh = '';
    //                             var mjsum = mijoz.summa;
    //                             teksh = tekshir - mijoz.summa;
    //                             mijoz.summa = 0;
    //                             await mijoz.save();
    //                             srok[i].karz = teksh;
    //                             await srok[i].save();                                
    //                             msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${teksh} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                             axios({
    //                                 method: 'post',
    //                                 url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                 data: {
    //                                     chat_id: mijoz.telegram,
    //                                     text: msg
    //                                 },
    //                             });
    //                         }
    //                     } else {
    //                         tekshir = srok[i].karz / mijoz.kurs;
    //                         if (mijoz.summa > tekshir) {
    //                             mijoz.summa = mijoz.summa - tekshir;
    //                             await mijoz.save();
    //                             srok[i].karz = 0;
    //                             await srok[i].save();
    //                             if (req.body.magazinchat && mijoz.telegram) {
    //                                 const karz2 =  await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: mijoz.id, karz: { [Op.gt]: '0' }}});
    //                                 if (karz2) {
    //                                     var tk3 = '';
    //                                     for (let k = 0; k < karz2.length; k++) {
    //                                         if (karz2[k].valyuta) {
    //                                             tk3 += karz2[k].karz * karz2[k].kurs;
    //                                         } else {
    //                                             tk3 += karz2[k].karz;
    //                                         }
    //                                     }
    //                                 } else { 
    //                                     tk3 = 0;
    //                                 }
    //                                 msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk3} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                                 axios({
    //                                     method: 'post',
    //                                     url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                     data: {
    //                                         chat_id: mijoz.telegram,
    //                                         text: msg
    //                                     },
    //                                 }); 
    //                             } else { }    
    //                         } else {
    //                             var teksh = '';
    //                             var mjsum = mijoz.summa;
    //                             teksh = tekshir - mijoz.summa;
    //                             mijoz.summa = 0;
    //                             await mijoz.save();
    //                             srok[i].karz = teksh;
    //                             await srok[i].save();                                
    //                             msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${teksh} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                             axios({
    //                                 method: 'post',
    //                                 url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                 data: {
    //                                     chat_id: mijoz.telegram,
    //                                     text: msg
    //                                 },
    //                             });
    //                         }
    //                     }
    //                 } else {
    //                     if (srok[i].valyuta) {
    //                         tekshir = srok[i].karz * srok[i].kurs;
    //                         if (mijoz.summa > tekshir) {
    //                             mijoz.summa = mijoz.summa - tekshir;
    //                             await mijoz.save();
    //                             srok[i].karz = 0;
    //                             await srok[i].save();
    //                             if (req.body.magazinchat && mijoz.telegram) {
    //                                 const karz2 =  await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: mijoz.id, karz: { [Op.gt]: '0' }}});
    //                                 if (karz2) {
    //                                     var tk2 = '';
    //                                     for (let k = 0; k < karz2.length; k++) {
    //                                         if (karz2[k].valyuta) {
    //                                             tk2 += karz2[k].karz * karz2[k].kurs;
    //                                         } else {
    //                                             tk2 += karz2[k].karz;
    //                                         }
    //                                     }
    //                                 } else { 
    //                                     tk2 = 0;
    //                                 }
    //                                 msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${tk2} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                                 axios({
    //                                     method: 'post',
    //                                     url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                     data: {
    //                                         chat_id: mijoz.telegram,
    //                                         text: msg
    //                                     },
    //                                 }); 
    //                             } else { }    
    //                         } else {
    //                             var teksh = '';
    //                             var mjsum = mijoz.summa;
    //                             teksh = tekshir - mijoz.summa;
    //                             mijoz.summa = 0;
    //                             await mijoz.save();
    //                             srok[i].karz = teksh;
    //                             await srok[i].save();                                
    //                             msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${teksh} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                             axios({
    //                                 method: 'post',
    //                                 url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                 data: {
    //                                     chat_id: mijoz.telegram,
    //                                     text: msg
    //                                 },
    //                             });
    //                         }
    //                     } else {
    //                         tekshir = srok[i].karz;
    //                         if (mijoz.summa > tekshir) {
    //                             mijoz.summa = mijoz.summa - tekshir;
    //                             await mijoz.save();
    //                             srok[i].karz = 0;
    //                             await srok[i].save();
    //                             if (req.body.magazinchat && mijoz.telegram) {
    //                                 const karz2 =  await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: mijoz.id, karz: { [Op.gt]: '0' }}});
    //                                 if (karz2) {
    //                                     var tk3 = '';
    //                                     for (let k = 0; k < karz2.length; k++) {
    //                                         if (karz2[k].valyuta) {
    //                                             tk3 += karz2[k].karz * karz2[k].kurs;
    //                                         } else {
    //                                             tk3 += karz2[k].karz;
    //                                         }
    //                                     }
    //                                 } else { 
    //                                     tk3 = 0;
    //                                 }
    //                                 msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${tk3} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                                 axios({
    //                                     method: 'post',
    //                                     url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                     data: {
    //                                         chat_id: mijoz.telegram,
    //                                         text: msg
    //                                     },
    //                                 }); 
    //                             } else { }    
    //                         } else {
    //                             var teksh = '';
    //                             var mjsum = mijoz.summa;
    //                             teksh = tekshir - mijoz.summa;
    //                             mijoz.summa = 0;
    //                             await mijoz.save();
    //                             srok[i].karz = tekshir;
    //                             await srok[i].save();                                
    //                             msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${teksh} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
    //                             axios({
    //                                 method: 'post',
    //                                 url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                                 data: {
    //                                     chat_id: mijoz.telegram,
    //                                     text: msg
    //                                 },
    //                             });
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 var mk = '';
    //                 const srok3 = await Savdo.findAll({ where: { magazinId: req.body.magazinId, mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: req.body.date }}});
    //                 for (let m = 0; m < srok3.length; m++) {
    //                     if (srok3.valyuta) {
    //                         mk += srok3[m].karz * srok3[m].kurs;
    //                     } else {
    //                         mk += srok3[m].karz;
    //                     }
    //                 }
    //                 msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kon dan qarzinggizni belgilangan muddati keldi.To'lov summasi ${mk} UZS`
    //                 axios({
    //                     method: 'post',
    //                     url: "https://api.telegram.org/bot" + req.body.magazinchat + "/sendMessage",
    //                     data: {
    //                         chat_id: mijoz.telegram,
    //                         text: msg
    //                     },
    //                 });
    //             }                
    //         }
    //     } else { }
    //     return res.json(200);
    // }
    
    async DolgiCilent (date) {
        const srok = await Savdo.findAll({ where: { karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
        if (srok.length > 0) {
            for (let i = 0; i < srok.length; i++) {
                var tekshir = '';
                var msg = '';
                const maga = await Magazin.findByPk(srok[i].magazinId);
                const mijoz = await Mijoz.findByPk(srok[i].mijozId);
                if (mijoz.summa > 0) {
                    if (mijoz.valyuta) {
                        if (srok[i].valyuta) {
                            tekshir = srok[i].karz * srok[i].kurs / mijoz.kurs;
                            if (mijoz.summa >= parseFloat(tekshir)) {
                                mijoz.summa = mijoz.summa - tekshir;
                                await mijoz.save();
                                srok[i].karz = 0;
                                await srok[i].save();
                                if (maga.telegram && mijoz.telegram) {
                                    const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                    if (karz2) {
                                        var tk = '';
                                        for (let k = 0; k < karz2.length; k++) {
                                            if (karz2[k].valyuta) {
                                                tk += karz2[k].karz * karz2[k].kurs;
                                            } else {
                                                tk += karz2[k].karz;
                                            }
                                        }
                                    } else { 
                                        tk = 0;
                                    }
                                    msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                    axios({
                                        method: 'post',
                                        url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                        data: {
                                            chat_id: mijoz.telegram,
                                            text: msg
                                        },
                                    }); 
                                } else { }
                            } else {
                                var teks = '';
                                var mjsum = mijoz.summa;
                                teks = tekshir - mijoz.summa;
                                mijoz.summa = 0;
                                await mijoz.save();
                                srok[i].karz = teks;
                                await srok[i].save();
                                const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                if (karz2) {
                                    var tk = '';
                                    for (let k = 0; k < karz2.length; k++) {
                                        if (karz2[k].valyuta) {
                                            tk += karz2[k].karz * karz2[k].kurs;
                                        } else {
                                            tk += karz2[k].karz;
                                        }
                                    }
                                } else { 
                                    tk = 0;
                                }
                                msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${mjsum} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                axios({
                                    method: 'post',
                                    url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                    data: {
                                        chat_id: mijoz.telegram,
                                        text: msg
                                    },
                                });
                            }
                        } else {
                            tekshir = srok[i].karz / mijoz.kurs;
                            if (mijoz.summa >= parseFloat(tekshir)) {
                                mijoz.summa = mijoz.summa - tekshir;
                                await mijoz.save();
                                srok[i].karz = 0;
                                await srok[i].save();
                                if (maga.telegram && mijoz.telegram) {
                                    const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                    if (karz2) {
                                        var tk3 = '';
                                        for (let k = 0; k < karz2.length; k++) {
                                            if (karz2[k].valyuta) {
                                                tk3 += karz2[k].karz * karz2[k].kurs;
                                            } else {
                                                tk3 += karz2[k].karz;
                                            }
                                        }
                                    } else { 
                                        tk3 = 0;
                                    }
                                    msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk3} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                    axios({
                                        method: 'post',
                                        url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                        data: {
                                            chat_id: mijoz.telegram,
                                            text: msg
                                        },
                                    }); 
                                } else { }    
                            } else {
                                var teks = '';
                                var mjsum = mijoz.summa;
                                teks = tekshir - mijoz.summa;
                                mijoz.summa = 0;
                                await mijoz.save();
                                srok[i].karz = teks;
                                await srok[i].save();
                                const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                if (karz2) {
                                    var tk = '';
                                    for (let k = 0; k < karz2.length; k++) {
                                        if (karz2[k].valyuta) {
                                            tk += karz2[k].karz * karz2[k].kurs;
                                        } else {
                                            tk += karz2[k].karz;
                                        }
                                    }
                                } else { 
                                    tk = 0;
                                }
                                msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${mjsum} ${mijoz.valyuta} yechib olindi. Hozirda xisobinggizda ${mijoz.summa} ${mijoz.valyuta} qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                axios({
                                    method: 'post',
                                    url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                    data: {
                                        chat_id: mijoz.telegram,
                                        text: msg
                                    },
                                });
                            }
                        }
                    } else {
                        if (srok[i].valyuta) {
                            tekshir = srok[i].karz * srok[i].kurs;
                            if (mijoz.summa >= parseFloat(tekshir)) {
                                mijoz.summa = mijoz.summa - tekshir;
                                await mijoz.save();
                                srok[i].karz = 0;
                                await srok[i].save();
                                if (maga.telegram && mijoz.telegram) {
                                    const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                    if (karz2) {
                                        var tk2 = '';
                                        for (let k = 0; k < karz2.length; k++) {
                                            if (karz2[k].valyuta) {
                                                tk2 += karz2[k].karz * karz2[k].kurs;
                                            } else {
                                                tk2 += karz2[k].karz;
                                            }
                                        }
                                    } else { 
                                        tk2 = 0;
                                    }
                                    msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${tk2} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                    axios({
                                        method: 'post',
                                        url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                        data: {
                                            chat_id: mijoz.telegram,
                                            text: msg
                                        },
                                    }); 
                                } else { }    
                            } else {
                                var teks = '';
                                var mjsum = mijoz.summa;
                                teks = tekshir - mijoz.summa;
                                mijoz.summa = 0;
                                await mijoz.save();
                                srok[i].karz = parseFloat(teks) / srok[i].kurs;
                                await srok[i].save();
                                const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                if (karz2) {
                                    var tk = 0;
                                    for (let k = 0; k < karz2.length; k++) {
                                        if (karz2[k].valyuta) {
                                            tk += karz2[k].karz * karz2[k].kurs;
                                        } else {
                                            tk += karz2[k].karz;
                                        }
                                    }
                                } else { 
                                    tk = 0;
                                }
                                msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${mjsum} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${tk} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                axios({
                                    method: 'post',
                                    url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                    data: {
                                        chat_id: mijoz.telegram,
                                        text: msg
                                    },
                                });
                            }
                        } else {
                            tekshir = srok[i].karz;
                            if (mijoz.summa >= parseFloat(tekshir)) {
                                mijoz.summa = mijoz.summa - tekshir;
                                await mijoz.save();
                                srok[i].karz = 0;
                                await srok[i].save();
                                if (maga.telegram && mijoz.telegram) {
                                    const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                    if (karz2) {
                                        var tk3 = '';
                                        for (let k = 0; k < karz2.length; k++) {
                                            if (karz2[k].valyuta) {
                                                tk3 += karz2[k].karz * karz2[k].kurs;
                                            } else {
                                                tk3 += karz2[k].karz;
                                            }
                                        }
                                    } else {
                                        tk3 = 0;
                                    }
                                    msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${tekshir} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${tk3} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                    axios({
                                        method: 'post',
                                        url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                        data: {
                                            chat_id: mijoz.telegram,
                                            text: msg
                                        },
                                    }); 
                                } else { }    
                            } else {
                                var teks = '';
                                var mjsum = mijoz.summa;
                                teks = tekshir - mijoz.summa;
                                mijoz.summa = 0;
                                await mijoz.save();
                                srok[i].karz = teks;
                                await srok[i].save();
                                const karz2 =  await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                                if (karz2) {
                                    var tk = '';
                                    for (let k = 0; k < karz2.length; k++) {
                                        if (karz2[k].valyuta) {
                                            tk += karz2[k].karz * karz2[k].kurs;
                                        } else {
                                            tk += karz2[k].karz;
                                        }
                                    }
                                } else { 
                                    tk = 0;
                                }
                                msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggiz muddati kelganligi uchun xisobinggizdan ${mjsum} UZS yechib olindi. Hozirda xisobinggizda ${mijoz.summa} UZS qoldi. Qolgan qarzinggiz ${teks} UZS. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${maga.name} jamosi`
                                axios({
                                    method: 'post',
                                    url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                                    data: {
                                        chat_id: mijoz.telegram,
                                        text: msg
                                    },
                                });
                            }
                        }
                    }
                } else {
                    var mk = '';
                    const srok3 = await Savdo.findAll({ where: { mijozId: mijoz.id, karz: { [Op.gt]: '0' }, srok: { [Op.lt]: date }}});
                    for (let m = 0; m < srok3.length; m++) {
                        if (srok3[m].valyuta) {
                            mk += srok3[m].karz * srok3[m].kurs;
                        } else {
                            mk += srok3[m].karz;
                        }
                    }
                    msg = `Assalomu alaykum hurmatli mijoz sizning ${maga.name} do'kon dan qarzinggizni belgilangan muddati keldi.To'lov summasi ${mk}`
                    axios({
                        method: 'post',
                        url: "https://api.telegram.org/bot" + maga.telegram + "/sendMessage",
                        data: {
                            chat_id: mijoz.telegram,
                            text: msg
                        },
                    });
                }                
            }                
        } else { }
    }

    async Valyuta_Get (req, res) {
        if (req.body.status == 'brend') {
            if (req.body.search) {      
                const data1 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'obj': data1, 'valyuta': []});
            } else {
                const data2 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
                return res.json({'obj': data2, 'valyuta': []});
            }
        } else {
            if (req.body.search) {
                const data1 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'obj': data1, 'valyuta': []});
            } else {
                const data2 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
                return res.json({'obj': data2, 'valyuta': []});
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
        const auth = await User.findOne({ where: { login: req.body.login } });
        if (auth) {
            return res.json({'code': 100, 'msg': 'Bunday login royxatga olingan'});
        } else {
            const data = await User.create(req.body);
            if (data) {
                return res.json({'code': 200, 'typ': 'brend', 'data': data});            
            } else {
                return res.json({'code': 0});
            }            
        }
    }

    async Magazin_Creat(req, res){
        const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        if (req.body.id) {
            await Magazin.update({
                name: req.body.name,
                telegram: req.body.telegram
            },
            {
                where: { id: req.body.id }
            });
        } else {
            const magazin = await Magazin.findOne({ where: { name: req.body.name}});
            if (magazin) {
                return res.json({'code': 100, 'msg': 'Bunday nom royxatga olingan'});
            } else {
                await Magazin.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    name: req.body.name,
                    telegram: req.body.telegram
                });
            }
        }
        return res.json({'code': 200});
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
            const ishc = await Ishchilar.findOne({ where: { login: req.body.login2 }});
            if (ishc) {
                return res.json({'code': 100, 'msg': 'Bunday login royxatga olingan'});
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
        return res.json({'code': 200});            
        }
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

    async Telv (req, res) {
        if (req.body.search) {
            const data1 = await Tovar.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
            return res.json(data1);
        } else {
            const data2 = await Tovar.findAll({ where: { magazinId: req.body.magazinId } });
            return res.json(data2);
        }   
    }

    async MijozTelv (req, res) {
        const data2 = await Mijoz.findAll({ where: { magazinId: req.body.magazinId } });
        return res.json(data2);  
    }

    async MijozGet (req, res) {
        if (req.body.status == 'brend') {
            if (req.body.search) {
                const data1 = await Mijoz.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data1, 'valyuta': valyuta});
            } else {
                const data2 = await Mijoz.findAll({ where: { magazinId: req.body.magazinId } });
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });                
                for (let i = 0; i < data2.length; i++) {
                    data2[i].karz = 0;
                    await data2[i].save();
                    var sav = await Savdo.findAll({ where: { mijozId: data2[i].id }});
                    for (let p = 0; p < sav.length; p++) {
                        if (sav[p].valyuta) {
                            data2[i].karz += parseFloat(sav[p].karz) * parseFloat(sav[p].kurs);
                            await data2[i].save();                            
                        } else {
                            data2[i].karz += parseFloat(sav[p].karz);
                            await data2[i].save();  
                        }
                    }
                }
                return res.json({'obj': data2, 'valyuta': valyuta});
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Mijoz.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data1, 'valyuta': valyuta});
            } else {
                const data2 = await Mijoz.findAll({ where: { magazinId: user.magazinId } });
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
                for (let i = 0; i < data2.length; i++) {
                    data2[i].karz = 0;
                    await data2[i].save();
                    var sav = await Savdo.findAll({ where: { magazinId: data2[i].magazinId }});
                    for (let p = 0; p < sav.length; p++) {
                        if (sav[p].valyuta) {
                            data2[i].karz += parseFloat(sav[p].karz) * parseFloat(sav[p].kurs);
                            await data2[i].save();                            
                        } else {
                            data2[i].karz += parseFloat(sav[p].karz);
                            await data2[i].save();  
                        }
                    }
                }
                return res.json({'obj': data2, 'valyuta': valyuta});
            }
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
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
                },
                {
                    where: { id: req.body.id }
                });
            } else {
                const user = await User.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                await Mijoz.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    firma: req.body.firma,
                    tel: req.body.tel,
                    telegram: req.body.telegram,
                    summa: req.body.summa,
                    karz: 0,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
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
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
                },
                {
                    where: { id: req.body.id }
                });
            } else {
                const user = await Ishchilar.findOne({  
                    where: { login: req.body.login, token: req.body.token }
                });
                await Mijoz.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    firma: req.body.firma,
                    tel: req.body.tel,
                    telegram: req.body.telegram,
                    summa: req.body.summa,
                    karz: 0,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
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
            if (req.body.search) {      
                const data1 = await Tip.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'obj': data1, 'valyuta': []});
            } else {
                const data2 = await Tip.findAll({ where: { magazinId: req.body.magazinId } });
                return res.json({'obj': data2, 'valyuta': []});
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Tip.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'obj': data1, 'valyuta': []});
            } else {
                const data2 = await Tip.findAll({ where: { magazinId: user.magazinId } });
                return res.json({'obj': data2, 'valyuta': []});
            }
        }
    }

    async Variant(req, res) {
        if (req.body.tip) {
            const data1 = await Tip.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.tip }}]}});
            return res.json(data1);
        } else {
            return res.json([]);
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
            if (req.body.search) {      
                const data1 = await Yetkazuvchi.findAll({ where: {magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data1, 'valyuta': valyuta});
            } else {
                const data2 = await Yetkazuvchi.findAll({ where: {magazinId: req.body.magazinId } });
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data2, 'valyuta': valyuta});
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Yetkazuvchi.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data1, 'valyuta': valyuta});
            } else {
                const data2 = await Yetkazuvchi.findAll({ where: { magazinId: user.magazinId } });
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data2, 'valyuta': valyuta});
            }
        }
    }

    async GetyetkazArxiv(req, res) {
        if (req.body.sana) {
            const yetk = await Yetkazuvchiarxiv.findAll({ where: { yetkazuvchiId: req.body.yetkazuvchiId, sana: req.body.sana } });
            return res.json(yetk);
        } else {
            const yetk = await Yetkazuvchiarxiv.findAll({ where: { yetkazuvchiId: req.body.yetkazuvchiId } });
            return res.json(yetk);
        }
    }

    async Update_Arxive(req, res) {
        await Yetkazuvchiarxiv.update({
                soni: req.body.soni,
                summa: req.body.summa,
                jami: req.body.soni * req.body.summa
            },
            { where: { id: req.body.id }
        });
        const yetk = await Yetkazuvchiarxiv.findAll({ where: { yetkazuvchiId: req.body.yetkazuvchiId } });
        return res.json(yetk);
    }

    async Yetkaz_Post_Update(req, res) {
        if (req.body.status == 'brend') {
            if (req.body.id) {
                const yetk = await Yetkazuvchiarxiv.findOne({ where: { yetkazuvchiId: req.body.id } });
                if (yetk) {
                    yetk.name = req.body.name;
                    await yetk.save();
                } else { }
                await Yetkazuvchi.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
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
                    summa: req.body.summa,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
                });  
            }
            return res.json(200);
        } else {
            if (req.body.id) {
                const yetk = await Yetkazuvchiarxiv.findOne({ where: { yetkazuvchiId: req.body.id } });
                if (yetk) {
                    yetk.name = req.body.name;
                    await yetk.save();
                } else { }
                await Yetkazuvchi.update({
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    name: req.body.name,
                    summa: req.body.summa,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
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
                    summa: req.body.summa,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
                });
            }
            return res.json(200);
        }
    }

    async Yetkaz_Delete(req, res) {
        var yet = await Yetkazuvchiarxiv.findAll({ where: { yetkazuvchiId: req.body.id }});
        if (yet.length > 0) {
            await yet.destroy();
        } else {
        }
        await Yetkazuvchi.destroy({where: { id: req.body.id }});
        return res.json(200);
    }

    async Get_db(req, res) {
        if (req.body.status == 'brend') {
            const data = await Tip.findAll({ where: { magazinId: req.body.magazinId } });
            const data2 = await Yetkazuvchi.findAll({ where: { magazinId: req.body.magazinId } });
            const data3 = await Tovar.findAll({ where: { magazinId: req.body.magazinId } });
            const data4 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
            if (req.body.search) {      
                const data1 = await Tovar.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
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
            if (req.body.id) {
                if (req.body.adress) {
                    const user = await User.findOne({  
                        where: { login: req.body.login, token: req.body.token }
                    });
                    var so = '';
                    var javob = '';
                    const tasq = await Tovar.findByPk(req.body.id);
                    so = parseFloat(req.body.soni) - parseFloat(tasq.soni);
                    javob = so * parseFloat(req.body.olinish);
                    const adress = await Yetkazuvchi.findOne({ where: { name: req.body.adress }})
                    await Yetkazuvchiarxiv.create({
                        userId: user.id,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        yetkazuvchiId: adress.id,
                        name: adress.name,
                        soni: so,
                        summa: req.body.olinish,
                        jami: javob,
                        sana: req.body.date,
                        kurs: valu2,
                        valyuta: valu,
                    });
                } else {}
                await Tovar.update(req.body, {
                    where: { id: req.body.id }
                });
            } else {
                const rbt = await Tip.findOne({ where: { name: req.body.tip }});
                if (rbt) {
                } else {
                    await Tip.create({
                        userId: user.id,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        name: req.body.tip
                    }); 
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
            if (req.body.id) {
                if (req.body.adress) {
                    const user = await Ishchilar.findOne({  
                        where: { login: req.body.login, token: req.body.token }
                    });
                    var so = '';
                    var javob = '';
                    const tasq = await Tovar.findByPk(req.body.id);
                    so = parseFloat(req.body.soni) - parseFloat(tasq.soni);
                    javob = so * parseFloat(req.body.olinish);
                    const adress = await Yetkazuvchi.findOne({ where: { name: req.body.adress }})
                    await Yetkazuvchiarxiv.create({
                        userId: user.userId,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        yetkazuvchiId: adress.id,
                        name: adress.name,
                        soni: so,
                        summa: req.body.olinish,
                        jami: javob,
                        sana: req.body.date,
                        kurs: valu2,
                        valyuta: valu,
                    });
                } else {}
                await Tovar.update(req.body, {
                    where: { id: req.body.id }
                });
            } else {
                const rbt = await Tip.findOne({ where: { name: req.body.tip }});
                if (rbt) {
                } else {
                    await Tip.create({
                        userId: user.userId,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        name: req.body.tip
                    }); 
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

    async Update_Key (req, res) {
        if (req.body.id) {
            await Tovar.update(req.body, {
                where: { id: req.body.id }
            });
        } else {}
        return res.json(200);
    }

    async Update_Chang_Val (req, res) {
        if (req.body.valyuta) {
            const val = await Valyuta.findOne({ where: { magazinId: req.body.magazinId , name: req.body.valyuta } });
            await Tovar.update({
                valyuta: val.name,
                summa: val.summa
            }, {
                where: { id: req.body.id }
            });
            return res.json(200);            
        } else {
            await Tovar.update({
                valyuta: '',
                summa: ''
            }, {
                where: { id: req.body.id }
            });
            return res.json(200);   
        }
    }
    
    async Sqlad_Delete(req, res){
        await Tovar.destroy({ where: { id: req.body.id } });
        return res.json(200);
    }

    async Chiqim_get(req, res){
        if (req.body.status == 'brend') {
            if (req.body.search) {      
                const data1 = await Chiqim.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ qayerga: {[ Op.iRegexp ]: req.body.search }}]}});
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data1, 'valyuta': valyuta});
            } else {
                const data2 = await Chiqim.findAll({ where: { magazinId: req.body.magazinId } });
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data2, 'valyuta': valyuta});
            }
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.search) {      
                const data1 = await Chiqim.findAll({ where: { magazinId: user.magazinId, [Op.or]: [{ qayerga: {[ Op.iRegexp ]: req.body.search }}]}});
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data1, 'valyuta': valyuta});
            } else {
                const data2 = await Chiqim.findAll({ where: { magazinId: user.magazinId } });
                const valyuta = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });    
                return res.json({'obj': data2, 'valyuta': valyuta});
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
                    sotivchi: user.name,
                    qayerga: req.body.qayerga,
                    sabap: req.body.sabap,
                    summa: req.body.summa,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
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
                    sotivchi: user.name,
                    qayerga: req.body.qayerga,
                    sabap: req.body.sabap,
                    summa: req.body.summa,
                    kurs: req.body.kurs,
                    valyuta: req.body.valyuta,
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
            const data4 = await Valyuta.findAll({ where: { magazinId: req.body.magazinId } });
            const data5 = await Mijoz.findAll({ where: { magazinId: req.body.magazinId } });
            if (req.body.search) {      
                const data1 = await Tovar.findAll({ where: { magazinId: req.body.magazinId, [Op.or]: [{ name: {[ Op.iRegexp ]: req.body.search }}]}});
                return res.json({'data2': data1, 'data4': data4});
            } else {
                const data2 = await Tovar.findAll({ where: { magazinId: req.body.magazinId } });
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
    // shor
    async Oplata(req, res) {
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.mijozId) {
                const mijoz = await Mijoz.findByPk(req.body.mijozId);
                if (req.body.qaytim) {
                    if (mijoz.valyuta) {
                        if (req.body.vname) {
                            mijoz.summa = req.body.qaytim * req.body.vsumma / mijoz.kurs;
                            await mijoz.save();  
                        } else {
                            mijoz.summa = req.body.qaytim / mijoz.kurs;
                            await mijoz.save(); 
                        }                        
                    } else {
                        if (req.body.vname) {
                            mijoz.summa = req.body.qaytim * req.body.vsumma;
                            await mijoz.save();  
                        } else {
                            mijoz.summa = req.body.qaytim;
                            await mijoz.save(); 
                        }  
                    }
                } else {
                    mijoz.summa = 0;
                    await mijoz.save();                    
                }
                const savdo = await Savdo.create({
                    userId: user.id,
                    mijozId: mijoz.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    sotivchi: user.name,
                    mijoz: mijoz.name,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    karz: req.body.karz,
                    srok: req.body.srok,
                    sana: req.body.sana,
                    kurs: req.body.vsumma,
                    valyuta: req.body.vname,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.id,
                        savdoId: savdo.id,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        sotivchi: user.name,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        shtrix: req.body.local[i].shtrix, 
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        skidka: req.body.local[i].skidka,
                        jami: req.body.local[i].jami,
                        kurs: req.body.vsumma,
                        valyuta: req.body.vname,
                    });
                }
            } else {
                const savdo = await Savdo.create({
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    sotivchi: user.name,
                    mijozId: 0,
                    mijoz: req.body.mijozId,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    karz: req.body.karz,
                    srok: req.body.srok,
                    sana: req.body.sana,
                    kurs: req.body.vsumma,
                    valyuta: req.body.vname,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.id,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        sotivchi: user.name,
                        savdoId: savdo.id,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        shtrix: req.body.local[i].shtrix, 
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        skidka: req.body.local[i].skidka,
                        jami: req.body.local[i].jami,
                        kurs: req.body.vsumma,
                        valyuta: req.body.vname,
                    });
                }
            }
            return res.json(200);
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            if (req.body.mijozId) {
                const mijoz = await Mijoz.findByPk(req.body.mijozId);
                if (req.body.qaytim) {
                    if (mijoz.valyuta) {
                        if (req.body.vname) {
                            mijoz.summa = req.body.qaytim * req.body.vsumma / mijoz.kurs;
                            await mijoz.save();  
                        } else {
                            mijoz.summa = req.body.qaytim / mijoz.kurs;
                            await mijoz.save(); 
                        }                        
                    } else {
                        if (req.body.vname) {
                            mijoz.summa = req.body.qaytim * req.body.vsumma;
                            await mijoz.save();  
                        } else {
                            mijoz.summa = req.body.qaytim;
                            await mijoz.save(); 
                        }  
                    }
                } else {
                    mijoz.summa = 0;
                    await mijoz.save();                    
                }
                const savdo = await Savdo.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    sotivchi: user.name,
                    mijozId: mijoz.id,
                    mijoz: mijoz.name,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    karz: req.body.karz,
                    srok: req.body.srok,
                    sana: req.body.sana,
                    kurs: req.body.vsumma,
                    valyuta: req.body.vname,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.userId,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        sotivchi: user.name,
                        savdoId: savdo.id,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        shtrix: req.body.local[i].shtrix, 
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        skidka: req.body.local[i].skidka,
                        jami: req.body.local[i].jami,
                        kurs: req.body.vsumma,
                        valyuta: req.body.vname,
                    });
                }
            } else {
                const savdo = await Savdo.create({
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    sotivchi: user.name,
                    mijozId: 0,
                    mijoz: req.body.mijozId,
                    jamisumma: req.body.jamisum,
                    naqt: req.body.naqt,
                    plastik: req.body.plastik,
                    bank: req.body.bank,
                    karz: req.body.karz,
                    srok: req.body.srok,
                    sana: req.body.sana,
                    kurs: req.body.vsumma,
                    valyuta: req.body.vname,
                });
                for (let i = 0; i < req.body.local.length; i++) {
                    var tovar = await Tovar.findByPk(req.body.local[i].id);
                    tovar.soni = tovar.soni - req.body.local[i].soni;
                    await tovar.save()
                    await Sotuv.create({
                        userId: user.userId,
                        magazinId: req.body.magazinId,
                        magazin: req.body.magazin,
                        sotivchi: user.name,
                        savdoId: savdo.id,
                        tovar: req.body.local[i].id,
                        name: req.body.local[i].name,
                        shtrix: req.body.local[i].shtrix, 
                        olinish: req.body.local[i].olinish,
                        soni: req.body.local[i].soni,
                        sotilish: req.body.local[i].sotilish,
                        chegrma: req.body.local[i].chegirma,
                        skidka: req.body.local[i].skidka,
                        jami: req.body.local[i].jami,
                        kurs: req.body.vsumma,
                        valyuta: req.body.vname,
                    });
                }
            }
            return res.json(200);
        }
    }

    async Vazvrad_Post(req, res) {
        var son = '';
        var jami = '';
        var jami2 = '';
        const sotu = await Sotuv.findOne({ where: { id: req.body.id2 }});
        son = sotu.soni - req.body.soni2;
        sotu.soni = sotu.soni - req.body.soni2;
        sotu.jami = sotu.sotilish * parseFloat(son);
        await sotu.save();
        const savd = await Savdo.findByPk(sotu.savdoId);
        jami = sotu.sotilish * parseFloat(req.body.soni2);
        if (savd.karz > 0) {
            if (savd.karz >= parseFloat(jami)) {
                savd.karz = savd.karz - parseFloat(jami);
                savd.jamisumma = savd.jamisumma - parseFloat(jami);
                await savd.save();
            } else {
                jami2 = parseFloat(jami) - savd.karz;
                if (parseFloat(jami2) > savd.jamisumma) {
                    savd.karz = 0;
                    savd.jamisumma = 0;
                    await savd.save();
                } else {
                    savd.karz = 0;
                    savd.jamisumma = savd.jamisumma - parseFloat(jami);
                    await savd.save();
                }
            }
        } else {
            savd.jamisumma = savd.jamisumma - parseFloat(jami);
            await savd.save();
        }
        return res.json(200);
    }

    async Karzina(req, res){
        if (req.body.status == 'brend') {
            const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
            const zaqaz = await Zaqaz.create({
                userId: user.id,
                magazinId: req.body.magazinId,
                magazin: req.body.magazin,
                sotivchi: user.name,
                name: req.body.name,
            });
            for (let i = 0; i < req.body.local.length; i++) {  
                await Karzina.create({               
                    userId: user.id,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    sotivchi: user.name,
                    zaqazId: zaqaz.id,
                    tovar: req.body.local[i].id,
                    name: req.body.local[i].name,
                    shtrix: req.body.local[i].shtrix,
                    soni: req.body.local[i].soni,
                    olinish: req.body.local[i].olinish,
                    sotilish: req.body.local[i].sotilish,
                    sotilish_prise: req.body.local[i].sotilish_prise,
                    chegrma: req.body.local[i].chegirma,
                    skidka: req.body.local[i].skidka,
                    jami: req.body.local[i].jami,
                    kurs: req.body.local[i].summa,
                    valyuta: req.body.local[i].valyuta,
                });
            }
            return res.json(200);
        } else {
            const user = await Ishchilar.findOne({ where: { login: req.body.login, token: req.body.token }});
            const zaqaz = await Zaqaz.create({
                userId: user.userId,
                magazinId: req.body.magazinId,
                magazin: req.body.magazin,
                sotivchi: user.name,
                name: req.body.name
            });
            for (let i = 0; i < req.body.local.length; i++) {  
                await Karzina.create({               
                    userId: user.userId,
                    magazinId: req.body.magazinId,
                    magazin: req.body.magazin,
                    sotivchi: user.name,
                    zaqazId: zaqaz.id,
                    tovar: req.body.local[i].id,
                    name: req.body.local[i].name,
                    shtrix: req.body.local[i].shtrix,
                    soni: req.body.local[i].soni,
                    olinish: req.body.local[i].olinish,
                    sotilish: req.body.local[i].sotilish,
                    sotilish_prise: req.body.local[i].sotilish_prise,
                    chegrma: req.body.local[i].chegirma,
                    skidka: req.body.local[i].skidka,
                    jami: req.body.local[i].jami,
                    kurs: req.body.local[i].summa,
                    valyuta: req.body.local[i].valyuta,
                });
            }
            return res.json(200);
        }
    }

    async Tolov_Post(req, res) {
        var msg = '';
        var sum = 0;
        var val = '';
        const data = await Savdo.findByPk(req.body.id);
        const mijoz = await Mijoz.findByPk(data.mijozId);
        if (data.valyuta) {
            val = data.valyuta;
        } else {
            val = 'UZS'
        }
        if (req.body.tolov == data.karz) {
            msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kondagi qarzinggiz to'landi. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
        } else {
            sum = parseFloat(data.karz) - parseFloat(req.body.tolov);
            msg = `Assalomu alaykum hurmatli mijoz sizning ${req.body.magazin} do'kondagi qarzinggizning ${req.body.tolov} ${val} miqdori to'landi. Qolgan summa ${sum} ${val}. Biz bilan savdo qilganinggiz uchun tashakkur. Hurmat bilan ${req.body.magazin} jamosi`
        }
        data.karz = parseFloat(data.karz) - parseFloat(req.body.tolov);
        data.srok = req.body.srok;            
        await data.save();
        axios({
            method: 'post',
            url: "https://api.telegram.org/bot" + req.body.telegram + "/sendMessage",
            data: {
                chat_id: mijoz.telegram,
                text: msg
            },
        }); 
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
        // const user = await User.findOne({ where: { login: req.body.login, token: req.body.token }});
        // if (user) {            
            const savdo = await Savdo.findAll({ where: { magazinId: req.body.magazinId }});
            const sotuv = await Sotuv.findAll({ where: { magazinId: req.body.magazinId }});
            const chiqim = await Chiqim.findAll({ where: { magazinId: req.body.magazinId }});
            const yetkazuvchi = await Yetkazuvchi.findAll({ where: { magazinId: req.body.magazinId }});
            const tovar = await Tovar.findAll({ where: { magazinId: req.body.magazinId }});
            const mijoz = await Mijoz.findAll({ where: { magazinId: req.body.magazinId }});
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
            for (let i4 = 0; i4 < yetkazuvchi.length; i4++) {
                if (yetkazuvchi[i4].valyuta) {
                    yet += parseFloat(yetkazuvchi[i4].summa) * parseFloat(yetkazuvchi[i4].kurs);   
                } else {
                    yet += parseFloat(yetkazuvchi[i4].summa);
                }
            }
            for (let i5 = 0; i5 < tovar.length; i5++) {
                if (tovar[i5].valyuta) {
                    sql += parseFloat(tovar[i5].olinish) * parseFloat(tovar[i5].summa) * parseFloat(tovar[i5].soni);   
                } else {
                    sql += parseFloat(tovar[i5].olinish) * parseFloat(tovar[i5].soni);                    
                }
            }
            for (let i6 = 0; i6 < mijoz.length; i6++) {
                if (mijoz[i6].valyuta) {
                    mij += parseFloat(mijoz[i6].summa) * parseFloat(mijoz[i6].kurs);   
                } else {
                    mij += parseFloat(mijoz[i6].summa);
                }
            }
            foyda = sav - qarz - chiq - yet - ol + mij;
            return res.json({ 'sav': sav, 'qarz': qarz, 'chiq': chiq, 'yet': yet, 'sql': sql, 'foyda': foyda })
        // } else {

        // }
    }
}
module.exports = new UserController();