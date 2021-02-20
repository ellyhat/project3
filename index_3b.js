//Initialisation - Set up the express app: add modules

const express = require('express')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')
var crypto = require("crypto-js")
const app = express()
app.use(morgan('dev'))

//Add PORT and import data

const PORT = 3000
const db = require('./data.js')

//Test that connection to PORT is active

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})

// Step 1: Set templating engine

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', './pages/layout.ejs')


//Static files - CSS and images in Mr Coffee Template

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

//Configure GET routes to display info or forms

app.get('/', (req, res) => {
    res.render('./pages/index', { title: 'Schedule Website', layout: './pages/layout' })
})

app.get('/users', (req, res) => {
    let userList = db.users
    res.render('./pages/users', { title: 'Users', layout: './pages/layout', userList: userList })
})

app.get('/schedules', (req, res) => {
    let schedules = db.schedules
    res.render('./pages/schedules', { title: 'Schedules', layout: './pages/layout', schedules: schedules })
})

app.get('/users/new', (req, res) => {
    res.render('./pages/users-new', { title: 'New User Form', layout: './pages/layout' })
})

//Define specific patterns in URL

app.get('/users/:userNum', (req, res) => {
    const id = req.params.userNum
    let specificUser = db.users[id]
    res.render('./pages/specific-user', { title: 'Specific User Request', layout: './pages/layout', specificUser: specificUser })
})


app.get('/users/:userNum/schedules', (req, res) => {
    const id = req.params.userNum
    let arr = []
    for (i = 0; i < db.schedules.length; i++) {
        if (db.schedules[i].user_id == id) {
            arr.push(db.schedules[i])
        }
    }
    if (arr.length > 0) {
        res.render('./pages/specific-schedule', { title: 'Specific Schedule Request', layout: './pages/layout', specificSchedule: arr })
    }
    else {
        const err = "No schedule for that user number"
        res.render('./pages/error', { title: 'Error message', layout: './pages/layout', err: err })
    }
})

app.get('/schedules/new', (req, res) => {
    res.render('./pages/schedules-new', { title: 'New Schedule Form', layout: './pages/layout' })
})

//Step 4: Create POST route to update users and schedules after filling in forms

app.use(express.urlencoded({ extended: true }))

app.post('/users', (req, res) => {

    const newUser = req.body
    newUser.password = crypto.SHA256(`${req.body.password}`).toString()
    db.users.push(newUser)
    let userList = db.users
    res.render('./pages/users', { title: 'Users', layout: './pages/layout', userList: userList })

})

app.post('/schedules', (req, res) => {

    const newSchedule = req.body
    newSchedule.user_id = Number(req.body.user_id)
    newSchedule.day = Number(req.body.day)
    db.schedules.push(newSchedule)
    let schedules = db.schedules
    res.render('./pages/schedules', { title: 'New Schedule Form', layout: './pages/layout', schedules: schedules })
})
