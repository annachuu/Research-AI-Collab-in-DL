const express = require('express')
const router = express.Router()
const {
    getWorkspaces,
    getWorkspaceByUserId,
    getWorkspaceDetail,
    createWorkspace,    
    updateWorkspace,
    deleteWorkspace,
    createQuery,
    getQuery,
    getDocumentByQuery,
    getQueryIdsLists,
    insertAISerendipity,
    insertHCISerendipity,
    getWorkspaceCollections,
    getArchivesByUserId
} = require('../controllers/workspaceController')

const {
    addDocumentToQuery,
    removeDocumentFromQuery,
    getAllDocuments,
    getDocumentsByQueryId,
    toggleDocumentSave
} = require('../controllers/documentController')

/**
 * Register routes for workspace
 */
router.get('/', getWorkspaces)
router.get('/user/:userId', getWorkspaceByUserId)
router.get('/:workspaceId', getWorkspaceDetail)
router.get('/user/:userId/wpcollections', getWorkspaceCollections)
router.post('/', createWorkspace)
router.put('/:id', updateWorkspace)
router.delete('/:id', deleteWorkspace)
router.get('/user/:userId/archives/', getArchivesByUserId)

/**
 * Register route for creating query
 */
router.post('/query', createQuery)
router.get('/query/:workspaceId/:queryId', getQuery)
router.get('/:workspaceId/query', getQueryIdsLists)

/**
 * Register route for saving document to workspace
 */
router.post('/document', addDocumentToQuery)
// router.put('/document/:workspaceId/:queryId/:docId', removeDocumentFromQuery);
router.get('/document/all', getAllDocuments);
router.get('/document/query/:queryId', getDocumentsByQueryId);      // Get documents by queryId with user info
router.patch('/document/toggle/:documentId', toggleDocumentSave);   // Toggle document save/unsave
router.get('/document/:workspaceId/:queryId/', getDocumentByQuery);


module.exports = router