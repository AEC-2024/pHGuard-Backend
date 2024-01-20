/* multer.js */
const multer = require('multer')

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.csv')
  }
})

module.exports = multerStorage
