require('dotenv').config();
const express = require('express');
const app = express();
const upload = require('./src/multer')

const { server_port, server_name, server_scheme } = process.env;

app.use('/download', express.static('src/storage-pool'));

app.post('/upload', upload.single('file'), (req, res) => { 

    const wd = req.file.destination.split('\\');
    const last = wd[wd.length - 1];
    return res.json({ "filename": `${server_scheme}://${server_name}/download/${last}/${req.file.filename}` }) 
});

const listener = app.listen(server_port, () => { console.log(`[Express] ${listener.address().port}`) });