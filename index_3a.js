const express = require('express') //add module
const morgan = require('morgan') //add morgan, logs HTTPS codes

const app = express()

app.set('view engine', 'ejs')
app.use(morgan('dev'))

var crypto = require("crypto-js")
const PORT = 3000
const db = require('./data.js')

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`) 
})

app.get('/', (req,res) => {
res.send('Welcome to our schedule website')
})

//Step 2

app.get('/users', (req, res) => {
    res.json(db.users)
})

app.get('/schedules', (req, res) => {
    res.json(db.schedules)
})

//Define specific patterns in URL - Step 3
app.get('/users/:userNum', (req,res) => {
    const id = req.params.userNum
    res.json(db.users[id])
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
    res.send(arr)
    }
    else res.send('No schedule for that user number')   
}) 

app.use(express.urlencoded({ extended: true }))

app.post('/users', (req, res)=> {
    
    const newUser = req.body
    newUser.password = crypto.SHA256(`${req.body.password}`).toString()
    db.users.push(newUser)
    res.json(db.users)
  
})

app.post('/schedules', (req, res)=> {
    
    const newSchedule = req.body
    console.log(newSchedule)
    newSchedule.user_id = Number(req.body.user_id)
    console.log(typeof(newSchedule.user_id))
    newSchedule.day = Number(req.body.day)
    db.schedules.push(newSchedule)
    res.json(db.schedules)
})



// Step 4 - queries
