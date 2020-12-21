const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
// 'Author' is a schema and its instaces are called its models 


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

// View Author
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({ author: author.id }).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch {
    res.redirect('/')
  }
})


// Edit Author
router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', { author: author })
  } catch {
    res.redirect('/authors')
  }
})

// Submit Edit
router.put('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save()
    res.redirect(`/authors/${author.id}`)
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  }
})

// Delete Author
router.delete('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    await author.remove()
    res.redirect('/authors')
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      console.log("Delete all books of the author first")
      res.redirect(`/authors/${author.id}`)
    }
  }
})

  
  // req.params is an object containing parameter values parsed from the URL path.
  // For example if you have the route /user/:name, then the "name" from the URL path wil be available as req.params.name.
  // This object defaults to {}.
  // Note:
  // When a route address is defined using a regular expression, each capture group match from the regex is available as
  // req.params[0], req.params[1], etc. This strategy is also applied to unnamed wild-card matches in string routes such as /file/*.
  // https://sailsjs.com/documentation/reference/request-req/req-params

  
  module.exports = router