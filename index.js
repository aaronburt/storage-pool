require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const multer  = require('multer');
const upload = require('./multer');
const app = express();
const { server_port, server_name, default_protocol, default_download_path } = process.env;

app.use(helmet());
app.disable('etag');
app.use(`/${default_download_path}`, express.static('src/storage-pool'));

app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.sendStatus(400);
        } else if (err) {
            return res.sendStatus(400);
        }

        const { filename } = req.file;
        const protocol = req.protocol || default_protocol;
        const host_name = req.headers.host || server_name;
    
        const wrkd = req.file.destination.replaceAll('\\', '/').split('/');
        const last = wrkd[wrkd.length - 1];
    
        return res.json({ 
            "filename": `${protocol}://${host_name}/${default_download_path}/${last}/${filename}`
        }); 
    });
});

app.all('*', (req, res) => { return res.sendStatus(404) })

const listener = app.listen(server_port, () => { console.log(`[Express] ${listener.address().port}`) });