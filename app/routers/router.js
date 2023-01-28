const { Router } = require('express')
const UsweController = require('../controllers/UsweController')
const route = Router()

// route.post('/userbyid', UsweController.UserById)

route.post('/loginauth', UsweController.Login)
route.post('/register', UsweController.Registration)
route.post('/virfiy', UsweController.Verifiy)

route.post('/gettip', UsweController.Gettip)
route.post('/post_update', UsweController.Post_Update_Tip)
route.post('/tipsdelete', UsweController.Tipsdelete)

route.post('/mijozget', UsweController.MijozGet)
route.post('/mijozcreate', UsweController.Mijozcreate)
route.post('/mijozdelete', UsweController.MijozDelete)

route.post('/getvalyuta', UsweController.Valyuta_Get)
route.post('/post_update_valyuta', UsweController.Valyuta_Create_Update)
route.post('/valyuta_delete', UsweController.Valyuta_Delete)

route.post('/getyetkaz', UsweController.Getyetkaz)
route.post('/post_update_yetkaz', UsweController.Yetkaz_Post_Update)
route.post('/yetkaz_delete', UsweController.Yetkaz_Delete)

route.post('/getdb', UsweController.Get_db)
route.post('/sqlad_post_update', UsweController.Sqlad)
route.post('/sqlad_delete', UsweController.Sqlad_Delete)

route.post('/chiqim_get', UsweController.Chiqim_get)
route.post('/chiqim_post_update', UsweController.Chiqim_Post_Ppdate)
route.post('/chiqim_delet', UsweController.Chiqim_Delet)

route.post('/live_search', UsweController.Live_Search)
route.post('/oplata', UsweController.Oplata)
route.post('/karzina', UsweController.Karzina)

module.exports = route