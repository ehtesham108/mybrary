const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

authorSchema.pre(
//parameter 1
  'remove',       
    //Meaning: Before removing the author, perform the below function.
//parameter 2
  function(next) {  
    Book.find(
        { author: this.id }, 
        (err, bbb) => {
          if (err) {
            next(err)
          } else if (bbb.length > 0) {
            next(new Error('This author has books still'))
          } else {
            next()
          }
        }
    )
  }
)


module.exports = mongoose.model('Author', authorSchema)
// 'authorSchema is a schema
// It is exported by the name 'Author'