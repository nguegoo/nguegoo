var multer = require('multer')

module.exports = (destination) => {
    let storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, destination)
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    })

    return multer({ storage: storage })
}