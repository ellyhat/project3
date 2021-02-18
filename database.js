//Initialise Database
const pgp = require('pg-promise')()
const connection = 'postgres://postgres:butzy@localhost:5432/mrcoffee_app'
const db = pgp(connection)
module.exports = db