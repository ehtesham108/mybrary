const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
})


// this is a virtual property. It works exactly same as the properties above, except that it derives its value from the above properties.
// Basically what this doing is, when we call 'coverImagePath' from books/index.ejs in order to view the uploaded image, it calls the get()
// function below.
bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
    // this address is returned to the 'src' attribute of html element '<img>' and it gets the image that we uploaded in that address
    // through multer
  }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath