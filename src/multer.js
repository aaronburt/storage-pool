const { mkdirSync } = require('fs');
const multer  = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {

            const currentPath = path.join(__dirname, 'storage-pool', `${Date.now()}`);
            mkdirSync(currentPath);
            
            cb(null, path.join(currentPath))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
});

module.exports = upload;