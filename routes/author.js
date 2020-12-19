const express = require('express')
const router = express.Router()
const Author = require('../models/author')
// 'Author' is a model of schema 'authorSchema'

//All Authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const authors = await Author.find(searchOptions)
      res.render('authors/index', {
        authors: authors,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })
// http://localhost:3000/authors/new


// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
  // the reason we declared 'author' object above is that when there's error creating author in "create authpr route,"
  // the "create author route" wants to render the authors/new ejs while retaining the value entered in the input field and
  // it(the create author route) does that by sending 'author' object to authors/new ejs so that it can render the value. 
  // So authors/new ejs has reference to 'author' object as a value of the input field. If "new author route" renders authors/new ejs 
  // without defining the 'author' object, authors/new would show the error that 'author.name' is not defined. 
})

//Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })
module.exports = router