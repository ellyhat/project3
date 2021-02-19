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
        res.render('./pages/SQL-schedules', {
            title: 'Schedules List', 
            layout: './pages/layout', 
            scheduleTable: scheduleTable}
        )
    }) 

        .catch((err) => {
           
            res.render('./pages/error', {title: 'Error',  layout: './pages/layout', err: err})
        }) 
    
    

})

app.get('/new', (req,res) => {
    res.render('./pages/SQL-forms', {title: 'New Schedule Form',  layout: './pages/layout'})
})

app.use(express.urlencoded({ extended: true }))


app.post("/new",(req,res)=>{
    
    const schedule = {
        user_name: req.body.user_name,
        day: req.body.day,
        start_time: req.body.start_at,
        end_time: req.body.end_at,
      }
    const query = 'INSERT INTO schedule (user_name, day, start_time, end_time) VALUES($1,$2,$3,$4)'
    database.any(query, [schedule.user_name, schedule.day, schedule.start_time,schedule.end_time]);
      //res.send(schedule)

      database.any('SELECT * from schedule')
      //we are about to do a PROMISE
      
          .then((scheduleTable) => {
          console.log(scheduleTable)
          res.render('./pages/SQL-schedules', {
              title: 'Schedules List', 
              layout: './pages/layout', 
              scheduleTable: scheduleTable}
          )
      }) 
  
          .catch((err) => {
             
              res.render('./pages/error', {title: 'Error',  layout: './pages/layout', err: err})
          }) 
      
    
    })


/*app.post('/new', (req,res) => {
    const newSchedule = req.body
    console.log(newSchedule)
   // database.any(('INSERT INTO schedule (user_name, day, start_time, end_time);')
    
   // console.log(newSchedule)
    res.send(newSchedule)
})*/









 /*  database.any('SELECT * from schedule;')
    //we are about to do a PROMISE
    
        .then((scheduleTable) => {
        console.log(scheduleTable)
        res.render('./pages/SQL-schedules', {
            title: 'Schedule Website', 
            layout: './pages/layout', 
            scheduleTable: scheduleTable}
        )
    }) 

        .catch((err) => {
           
            res.render('./pages/error', {title: 'Error',  layout: './pages/layout', err: err})
        }) */
    