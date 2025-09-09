const express = require ('express')
const route = require('./app/routers/router')
const cors = require("cors");
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', route)

app.listen(process.env.PORT || 1122)

// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// npx sequelize-cli db:migrate
// npx sequelize-cli db:migrate:undo:all
