const multer  = require('multer');
const path = require('path');
const { mkdirSync } = require('fs');

const upload = multer({    
    limits: { fileSize: 25000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const currentPath = path.join(__dirname, 'src', 'storage-pool', `${Date.now()}`);
            mkdirSync(currentPath);
            cb(null, path.join(currentPath))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    })
}).single('file');

module.exports = upload;