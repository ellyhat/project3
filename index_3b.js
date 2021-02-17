const express = require('express') //add module
const morgan = require('morgan') //add morgan, logs HTTPS codes
const expressLayouts = require('express-ejs-layouts')

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
const PORT = 3000
const db = require('./data.js')

//Recycled functions
/*function collectInfo (arg) {
    let arrNew = []
    for (i = 0; i < arg.length; i++) {
        arrNew.push(arg[i])
    }
    return arrNew
}*/

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`) 
})

app.get('/', (req,res) => {
res.render('./pages/index', {title: 'Schedule Website', layout: './pages/layout'})
})

//Step 2

app.get('/users', (req, res) => {
    let userList = db.users
    res.render('./pages/users', {title: 'Users', layout: './pages/layout', userList: userList})
}) //this works

app.get('/schedules', (req, res) => {
    let schedules = db.schedules
    res.render('./pages/schedules', {title: 'Schedules', layout: './pages/layout', schedules: schedules})
}) //works

//Define specific patterns in URL - Step 3 - TO ADD IF ELSE STATEMENT
app.get('/users/new', (req, res) => {
    res.render('./pages/users-new', {title: 'New User Form', layout: './pages/layout'})
})

app.get('/users/:userNum', (req,res) => {
    const id = req.params.userNum
    let specificUser = db.users[id]
    res.render('./pages/specific-user', {title: 'Specific User Request', layout: './pages/layout', specificUser: specificUser})
    //res.json(db.users[id])
})


app.get('/users/:userNum/schedules', (req,res) => {
    const id = req.params.userNum
        let arr = []
        for (i = 0; i < db.schedules.length; i++) {
                if (db.schedules[i].user_id == id) {
               arr.push(db.schedules[i]) 
                }
        }
        if (arr.length > 0) {
            res.render('./pages/specific-schedule', {title: 'Specific Schedule Request', layout: './pages/layout', specificSchedule: arr})    
            //res.send(arr)
        }
        else res.send('No schedule for that user number')  
    })
  //  else res.send('You have not entered a number')  
    /*else if (id === "new") {
        res.render('./pages/users-new', {title: 'New User Form', layout: './pages/layout'})
    }*/ 


app.use(express.urlencoded({ extended: true }))

app.post('/users', (req, res)=> {
    
    const newUser = req.body
    newUser.password = crypto.SHA256(`${req.body.password}`).toString()
    db.users.push(newUser)
    let userList = db.users
    res.render('./pages/users', {title: 'Users', layout: './pages/layout', userList: userList})
  
})

app.get('/schedules/new', (req, res) => {
    res.render('./pages/schedules-new', {title: 'New Schedule Form', layout: './pages/layout'})
})

app.post('/schedules', (req, res)=> {
    
    const newSchedule = req.body
    newSchedule.user_id = Number(req.body.user_id)
    newSchedule.day = Number(req.body.day)
    db.schedules.push(newSchedule)
    let schedules = db.schedules
    res.render('./pages/schedules', {title: 'New Schedule Form', layout: './pages/layout', schedules: schedules})
})
