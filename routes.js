var express         = require('express'),
   routes          =  express.Router();
var msgController  = require('./controller/msgController');


routes.get('/', (req, res) => {
    return res.send(' API Services End point');
});


routes.post('/url', msgController.Url);
routes.post('/detect', msgController.Detect);
routes.post('/translate', msgController.Translate);
module.exports = routes;
