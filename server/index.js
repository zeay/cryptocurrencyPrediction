const express = require('express');
const formData = require('express-form-data');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.NODE_ENV || '3000';
const app = express();

(async () => {
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(formData.parse());
    try {
        app.use('/api/v1', require('./routers/api'));
    } catch (err) {
        console.log(err);
    }

    app.use((req, res) => {
        res.status(400).json({message: 'Not Found', status: false});
    });
    app.listen(PORT, () => {
        console.log("===============================");
        console.log('KCA SErver');
        console.log('Server is running:', PORT);
        console.log("===============================");
    });

})();