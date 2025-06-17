const asyncHandler = require('express-async-handler')
const Query = require('../models/queryModel')
const Document = require('../models/documentModel')
const Workspace = require('../models/workspaceModel')

/**
 * @desc Save documents
 * @route POST /api/workspaces/document/
 * @params {req, res} - The request and response object.
 * @return {object} - success state and query object.
 */
const addDocumentToQuery = async (req, res) => {
    console.log('... add doc')
    try {
        const { title, doc_type, doc_authors, doc_abstract, doc_date, documentId, userId, workspaceId, queryId, doc_thumbnail, thumbnail_type, doc_partof, doc_peerreview, doc_openaccess, doc_fulltext,doc_url  } = req.body;
        
        const query = await Query.findById(queryId);
        console.log("queryId exist:: ", query)

        if (!query) {
            return res.status(404).json({ success: false, error: 'Query not found' });            
        }

        // Save document into query
        const newDocument = await Document.create({ title, doc_type, doc_authors, doc_abstract, doc_date, documentId, userId, workspaceId, queryId, doc_thumbnail, thumbnail_type, doc_partof, doc_peerreview, doc_openaccess, doc_fulltext ,doc_url});
        console.log('...', newDocument)
        // Append the new document to the documents array of the query
        //query.documents.push(newDocument);
        // await query.save();

        res.status(201).json({ success: true, data: newDocument });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};

// const addDocumentToQuery = async (req, res) => {
//     try {
//         const { title, userId, workspaceId, queryId } = req.body;

//         // Create the document
//         const newDocument = await Document.create({ title, userId, workspaceId, queryId });

//         res.status(201).json({ success: true, data: newDocument });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

/**
 * @desc Remove documents
 * @route POST /api/workspaces/document/
 * @params {req, res} - The request and response object.
 * @return {object} - success state and query object.
 */
const removeDocumentFromQuery = async (req, res) => {    
    const { docId } = req.params;
    try {        
        // const quries = await Query.findById(queryId);
        // console.log("quries", quries)
        // if (!quries) {
        //     return res.status(404).json({ success: false, error: "Document not found" });
        // }        

        // const documentIndex = quries.documents.findIndex(doc => doc._id.toString() === docId);

        // if (documentIndex === -1) {
        //     return res.status(404).json({ success: false, error: "Document not found in query" });
        // }

        // quries.documents.splice(documentIndex, 1);
        // await quries.save();

        const result = await Document.deleteOne({ _id: docId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, error: "Document not found in ril" });
        }

        res.status(200).json({ success: true });

        // res.status(201).json({ success: true, data: quries });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = {
    addDocumentToQuery,
    removeDocumentFromQuery
}