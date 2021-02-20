//Step 1 - Set up the express app: add modules
const express = require('express')
const app = express()
var crypto = require("crypto-js")

//Add PORT and import data
const PORT = 3000
const db = require('./data.js')

//Test that PORT is working
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})

//Step 2: Configure GET requests to display info
app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})


app.get('/users', (req, res) => {
    res.json(db.users)
})

app.get('/schedules', (req, res) => {
    res.json(db.schedules)
})

//Step 3: Create parameterized routes
app.get('/users/:userNum', (req, res) => {
    const id = req.params.userNum
    res.json(db.users[id])
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
        res.send(arr)
    }
    else res.send('No schedule for that user number')
})

//Step 4: Create POST route to update data

app.use(express.urlencoded({ extended: true }))

//Add a new user, encrypt password

app.post('/users', (req, res) => {

    const newUser = req.body
    newUser.password = crypto.SHA256(`${req.body.password}`).toString()
    db.users.push(newUser)
    res.json(db.users)

})

//Add a new schedule

app.post('/schedules', (req, res) => {

    const newSchedule = req.body
    console.log(newSchedule)
    newSchedule.user_id = Number(req.body.user_id)
    console.log(typeof (newSchedule.user_id))
    newSchedule.day = Number(req.body.day)
    db.schedules.push(newSchedule)
    res.json(db.schedules)
})
