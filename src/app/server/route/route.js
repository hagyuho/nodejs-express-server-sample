const router = require('express').Router();
const aflistController = require('../controller/ifListController.js');
const excelController = require('../controller/excelController.js')
const upload = require("../middlewares/upload")

router.post('/api/aflist',aflistController.create);

router.get('/api/aflist',aflistController.findAll);

router.get('/api/aflist/:id',aflistController.findOne);

router.put('/api/aflist/:id',aflistController.update);

router.delete('/api/aflist/:id',aflistController.delete);

router.post('/api/excel/upload', upload.single("file"), excelController.upload);

module.exports = router;
