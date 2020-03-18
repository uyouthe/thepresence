require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static(path.join(__dirname, '/../build')))

app.get('/api/getList', (req, res) => {
  var list = ['item1', 'item2', 'item3', 'item4']
  res.json(list)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
// console.log(process.env.MONGODB_URI)
