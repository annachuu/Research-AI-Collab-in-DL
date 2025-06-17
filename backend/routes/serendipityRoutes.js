const express = require('express');
const router = express.Router();
const {

    insertAISerendipity,
    insertHCISerendipity,
    getHCISerendipity,
    getAISerendipity
} = require('../controllers/SerendipityController');

router.get('/AISerendipitySave', insertAISerendipity);
router.get('/HCISerendipitySave', insertHCISerendipity);
router.get('/getHCISerendipity', getHCISerendipity);
router.get('/getAISerendipity', getAISerendipity);


module.exports = router;