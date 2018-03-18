const mysql = require('mysql')
const express = require('express')

const portNumber = 3001
const app = express()
const prefix = '/api/'

app.use(express.static('public'))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'spraying',
})

app.get(prefix + 'sections', (req, res) => {
  db.query(`select * from section`, null, (error, rows) => {
    const payload = []
    rows.map(row => {
      payload.push({
        id: row.id,
        distance: row.distance,
      })
    })
    res.send(payload)
  })
})

app.listen(portNumber, function () {
  console.log('Root listening on port ' + portNumber + '...')
})
