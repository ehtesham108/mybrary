const mongoose = require('mongoose')

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
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
})


bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})


// this is a virtual property. It works exactly same as the properties above, except that it derives its value from the above properties.
// Basically what this doing is, when we call 'coverImagePath' from books/index.ejs in order to view the uploaded image, it calls the get()
// function above, i.e ".get(function(){"
// 'return' of this function is taken by the 'src' attribute of html element '<img>' and it gets the image.

module.exports = mongoose.model('Book', bookSchema)