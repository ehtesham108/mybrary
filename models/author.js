const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Author', authorSchema)
// 'authorSchema is a schema
// 'Author' is a model of schema 'authorSchema'