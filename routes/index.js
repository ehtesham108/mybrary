const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})
// http://localhost:3000/

module.exports = router