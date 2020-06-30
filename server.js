const express = require('express')
const mongoose = require('mongoose')
const modelA = require('./models/models')
const mainRouter = require('./routes/routes')
const app = express()


mongoose.connect('mongodb://localhost/testschema-2', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const all_items = await modelA.find().sort({ date: 'desc' })
  res.render('templates/list', { all_items: all_items })
})

// main url.. more like project's url
// that you can use include on
app.use('/', mainRouter)

app.listen(5000)