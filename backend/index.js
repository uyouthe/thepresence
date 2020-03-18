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

const User = mongoose.model('User', {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

app.use(express.static(path.join(__dirname, '/../build')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/getList', (req, res) => {
  var list = ['item1', 'item2', 'item3', 'item4']
  res.json(list)
})

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.json({
      ok: false,
      errors: 'You have to provide email and password',
    })
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.json({
        ok: false,
        ...err,
      })
    } else if (user) {
      res.json({
        ok: false,
        errors: 'User with that email already exists',
      })
    } else {
      const newUser = new User({ email, password })
        .save()
        .then(() => {
          res.json({ ok: 'true' })
        })
        .catch(error => {
          res.json({ ok: false, ...error })
        })
    }
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
// console.log(process.env.MONGODB_URI)
