const express = require('express')
const router = express.Router()
const {
    addDocumentToRil,
    removeDocumentFromRil,
    getAllDocumentsFromRil,
    getRilCount,
    // getSimilarityScore
} = require('../controllers/rilController')
const {
    getSimilarityScore
} = require('../controllers/similarityController')

/**
 * Register route for saving document to RIL
 */
// router.get('/', getAllDocumentsFromRil)
router.get('/user/:userId/rildocuments', getAllDocumentsFromRil)
router.post('/document', addDocumentToRil)
router.put('/document/:id', removeDocumentFromRil);
router.get('/user/:userId/rilcount', getRilCount)
router.post('/similarity', getSimilarityScore)
// router.get('/document/:queryId/', getDocumentByQuery);

module.exports = router