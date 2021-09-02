const router = require('express').Router();
const aflist = require('../controller/controller.js');

router.post('/api/aflist',aflist.create);

router.get('/api/aflist',aflist.findAll);

router.get('/api/aflist/:id',aflist.findOne);

router.put('/api/aflist/:id',aflist.update);

router.delete('/api/aflist/:id',aflist.delete);

module.exports = router;
