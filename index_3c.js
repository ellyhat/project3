//Initialisation - Set up the express app: add modules

const express = require('express')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')
const app = express()
app.use(morgan('dev'))

//Add PORT and import SQL database

const PORT = 3000
const database = require('./database.js')

//Test that connection to PORT is active

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})

// Set templating engine

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', './pages/layout.ejs')

//Static files - CSS and images in Mr Coffee Template

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

//Configure GET request to display SQL table "SCHEDULE"

app.get('/', (req, res) => {

    database.any('SELECT * from schedule;')

        .then((scheduleTable) => {
            console.log(scheduleTable)
            res.render('./pages/SQL-schedules', {
                title: 'Schedules List',
                layout: './pages/layout',
                scheduleTable: scheduleTable
            })
        })

        .catch((err) => {
            res.render('./pages/error', { title: 'Error', layout: './pages/layout', err: err.message })
        })
})

//Configure GET request to display form to enter in a new schedule

app.get('/new', (req, res) => {
    res.render('./pages/SQL-forms', { title: 'New Schedule Form', layout: './pages/layout' })
})

//Configure POST request to take new schedule data and add to existing SQL table schedule

app.use(express.urlencoded({ extended: true }))

app.post("/new", (req, res) => {

    const schedule = {
        user_name: req.body.user_name,
        day: req.body.day,
        start_time: req.body.start_at,
        end_time: req.body.end_at,
    }
    const query = 'INSERT INTO schedule (user_name, day, start_time, end_time) VALUES($1,$2,$3,$4)'
    database.any(query, [schedule.user_name, schedule.day, schedule.start_time, schedule.end_time])
        .catch((err) => {

            res.render('./pages/error', { title: 'Error', layout: './pages/layout', err: err.message })
        })

    //Display table with new schedule added

    database.any('SELECT * from schedule')

        .then((scheduleTable) => {
            console.log(scheduleTable)
            res.render('./pages/SQL-schedules', {
                title: 'Schedules List',
                layout: './pages/layout',
                scheduleTable: scheduleTable
            })
        })

        .catch((err) => {
            res.render('./pages/error', { title: 'Error', layout: './pages/layout', err: err.message })
        })
})