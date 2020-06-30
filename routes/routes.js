const express = require('express')
const modelA = require('./../models/models')
const router = express.Router()

// for localhost:8000/main
router.get('/form', (req, res) => {
  res.render('templates/form', { form: new modelA() })
})


router.post('/post/form', async (req, res, next) => {
  req.modelA = new modelA()
  next()
}, saveArticleAndRedirect('main'))



function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let instance = req.modelA
    console.log(req.body)
    instance.title = req.body.title
    instance.date = req.body.date
    instance.draft = req.body.draft
    instance.age = req.body.age
    instance.status = req.body.status
    try {
      instance = await instance.save()
      res.redirect('/')
    } catch (e) {
      res.send(`Error ocurred :: ${e}`)
    }
  }
}


module.exports = router


