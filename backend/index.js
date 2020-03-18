require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const User = mongoose.model('User', { email: String, password: String })

app.use(express.static(path.join(__dirname, '/../build')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/getList', (req, res) => {
  var list = ['item1', 'item2', 'item3', 'item4']
  res.json(list)
})

app.post('/api/signup', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  })
    .save()
    .then(() => {
      res.json({ ok: 'true' })
    })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
// console.log(process.env.MONGODB_URI)
