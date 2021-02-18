const express = require('express') //add module
const morgan = require('morgan') //add morgan, logs HTTPS codes
const expressLayouts = require('express-ejs-layouts')
const database = require('./database.js')

const app = express()
app.use(morgan('dev'))

//Static files - CSS
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))


// Set templating engine
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', './pages/layout.ejs')

var crypto = require("crypto-js")
const PORT = 3001


app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`) 
})

//let myBestFriends = []


/**SQL Version */

app.get('/', (req,res) => {

    database.any('SELECT * from schedule;')
    //we are about to do a PROMISE
    
        .then((scheduleTable) => {
        console.log(scheduleTable)
        res.render('./pages/test', {
            title: 'Schedule Website', 
            layout: './pages/layout', 
            myBestFriends: scheduleTable}
        )
    }) 

        .catch((err) => {
           
            res.render('./pages/error', {title: 'Error',  layout: './pages/layout', err: err})
        }) 
    
    

})