require('dotenv').config()
const express = require('express')
const app = express()
const sequelize = require('./utils/dbConn')
const routes = require('./routes/router')
// const connect = require('./utils/dbConn')

app.set('view engine', 'ejs')
app.set('views', './public/views')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: statusCode,
      message: error.message
    })
  })

sequelize.sync().then(()=> {
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log('Server is running at port '+ PORT)
    })  
}).catch((error) => {
    console.log(error)
})