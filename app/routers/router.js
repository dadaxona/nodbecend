const { Router } = require('express')
const UserController = require('../controllers/UserController')
const route = Router()

route.post('/loginauth', UserController.Login)
route.post('/register', UserController.Registration)
route.post('/virfiy', UserController.Verifiy)
route.post('/userget', UserController.User_Get)
route.post('/user_update_any', UserController.User_Update)
route.post('/user_del_clear', UserController.User_Del_Clear)
route.post('/magazin_creat', UserController.Magazin_Creat)
route.post('/kassa_creat', UserController.Kassa_Creat)
route.post('/kassa_get', UserController.Kassa_Get)
route.post('/role_peremes', UserController.Role_Peremes)

route.post('/gettip', UserController.Gettip)
route.post('/post_update', UserController.Post_Update_Tip)
route.post('/tipsdelete', UserController.Tipsdelete)

route.post('/mijozget', UserController.MijozGet)
route.post('/mijozcreate', UserController.Mijozcreate)
route.post('/mijozdelete', UserController.MijozDelete)

route.post('/getvalyuta', UserController.Valyuta_Get)
route.post('/post_update_valyuta', UserController.Valyuta_Create_Update)
route.post('/valyuta_delete', UserController.Valyuta_Delete)

route.post('/getyetkaz', UserController.Getyetkaz)
route.post('/post_update_yetkaz', UserController.Yetkaz_Post_Update)
route.post('/yetkaz_delete', UserController.Yetkaz_Delete)

route.post('/getdb', UserController.Get_db)
route.post('/sqlad_post_update', UserController.Sqlad)
route.post('/update_key', UserController.Update_Key)
route.post('/update_chang_val', UserController.Update_Chang_Val)
route.post('/sqlad_delete', UserController.Sqlad_Delete)

route.post('/chiqim_get', UserController.Chiqim_get)
route.post('/chiqim_post_update', UserController.Chiqim_Post_Ppdate)
route.post('/chiqim_delet', UserController.Chiqim_Delet)

route.post('/live_search', UserController.Live_Search)
route.post('/oplata', UserController.Oplata)
route.post('/karzina', UserController.Karzina)

route.post('/tolovpost', UserController.Tolov_Post)
route.post('/zaqaz_delet', UserController.Zaqaz_Delet)
route.post('/sotuv_post_id', UserController.Sotuv_Post_Id)
route.post('/foyda_post', UserController.Foyda_Post)


route.post('/post_tip_exsel', UserController.Post_Tip_Exsel)
route.post('/post_update_exsel', UserController.Post_Update_Exsel)
route.post('/post_update_yetkaz_exsel', UserController.Post_update_yetkaz_exsel)
route.post('/post_update_mijoz_exsel', UserController.Post_update_mijoz_exsel)
route.post('/post_update_sqlad_exsel', UserController.Post_update_sqlad_exsel)
route.post('/post_update_chiqim_exsel', UserController.Post_update_chiqim_exsel)

module.exports = route