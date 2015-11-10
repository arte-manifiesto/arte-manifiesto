var express = require('express');
var router = express.Router();
router.mergeParams = true;

var controller = require(global.cf.controllers + "/user-account");

router.get('/', controller.index);
router.get('/photo', controller.photo);
router.get('/addresses', controller.addresses);
router.get('/password', controller.password);

router.post('/', controller.update);
router.post('/photo', controller.photoUpdate);
router.post('/address/add', controller.addressAdd);
router.post('/address/update', controller.addressUpdate);
router.post('/password', controller.passwordUpdate);
router.post('/update_cover', controller.updateCover);

module.exports = router;
