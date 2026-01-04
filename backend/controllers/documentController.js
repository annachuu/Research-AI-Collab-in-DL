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
        
        // const query = await Query.findById(queryId);
        // console.log("queryId exist:: ", query)

        // if (!query) {
        //     return res.status(404).json({ success: false, error: 'Query not found' });            
        // }

        // // Save document into query
        // const newDocument = await Document.create({ title, doc_type, doc_authors, doc_abstract, doc_date, documentId, userId, workspaceId, queryId, doc_thumbnail, thumbnail_type, doc_partof, doc_peerreview, doc_openaccess, doc_fulltext ,doc_url});
        // console.log('...', newDocument)
        // // Append the new document to the documents array of the query
        // //query.documents.push(newDocument);
        // // await query.save();

        // res.status(201).json({ success: true, data: newDocument });

        const existingDoc = await Document.findOne({ documentId, userId, workspaceId, queryId});

        if (existingDoc) 
        {
            // If it exists and was removed → restore it
            if (existingDoc.doc_isRemoved) 
            {
                existingDoc.doc_isRemoved = false;
                await existingDoc.save();
            }

            return res.status(200).json({
                success: true,
                data: existingDoc
            });
        }

        const newDocument = await Document.create({
            title,
            doc_type,
            doc_authors,
            doc_abstract,
            doc_date,
            documentId,
            userId,
            workspaceId,
            queryId,
            doc_thumbnail,
            thumbnail_type,
            doc_partof,
            doc_peerreview,
            doc_openaccess,
            doc_fulltext,
            doc_url,
            doc_isRemoved: false
        });

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

        // const result = await Document.deleteOne({ _id: docId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, error: "Document not found in ril" });
        }

        res.status(200).json({ success: true });

        // res.status(201).json({ success: true, data: quries });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


// New toggle document controller
/**
 * @desc Toggle document save / unsave
 * @route PATCH /api/workspaces/document/toggle/:documentId
 */
const toggleDocumentSave = asyncHandler(async (req, res) => {
    const { documentId } = req.params;

    const document = await Document.findById(documentId);

    if (!document) 
    {
        return res.status(404).json({ success: false, error: "Document not found" });
    }

    document.doc_isRemoved = !document.doc_isRemoved;
    await document.save();

    res.status(200).json({
        success: true,
        data: document
    });
});


/**
 * @desc Get all documents from all users
 * @route GET /api/workspaces/document/all
 * @return {array} - Array of all documents with user information
 */
const getAllDocuments = asyncHandler(async (req, res) => {
    try 
    {
        const documents = await Document.find({ doc_isRemoved: false })
        .populate('userId', 'username')
        .sort({ createdAt: 1 });
        
        res.status(200).json(documents);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});


/**
 * @desc Get all documents for queries with the same query topic from all users
 * @route GET /api/workspaces/document/query/:queryId
 * @return {array} - Array of documents for queries with the same query topic with user information
 */
const getDocumentsByQueryId = asyncHandler(async (req, res) => {
    try 
    {
        const { queryId } = req.params;
    
        if (!queryId) 
        {
            return res.status(400).json({ success: false, error: 'Query ID is required' });
        }

        // First, get the current query to find its query string and workspaceId
        const currentQuery = await Query.findById(queryId);
        
        if (!currentQuery) 
        {
            return res.status(404).json({ success: false, error: 'Query not found' });
        }

        // Normalize the query string for matching (trim and case-insensitive)
        const normalizedQueryString = (currentQuery.query || '').trim().toLowerCase();

        if (!normalizedQueryString) 
        {
            return res.status(400).json({ success: false, error: 'Query string is empty' });
        }

        // Find ALL queries with the same topic across ALL workspaces (not just same workspace)
        // This allows users in different workspaces to see each other's documents for the same search topic
        const allQueries = await Query.find({});

        console.log(`Total queries in database: ${allQueries.length}`);
        console.log(`Current query: "${currentQuery.query}" (normalized: "${normalizedQueryString}")`);
        console.log(`Current workspaceId: ${currentQuery.workspaceId}`);

        // Filter queries with the same normalized query string (case-insensitive) across all workspaces
        const queriesWithSameTopic = allQueries.filter(q => {
            const qNormalized = (q.query || '').trim().toLowerCase();
            return qNormalized === normalizedQueryString;
        });

        console.log(`Found ${queriesWithSameTopic.length} queries with topic "${currentQuery.query}" across all workspaces`);
        console.log(`Query details:`, queriesWithSameTopic.map(q => ({ 
            id: q._id.toString(), 
            query: q.query, 
            userId: q.userId?.toString(),
            workspaceId: q.workspaceId?.toString()
        })));

        // Extracting all queryIds from queries with the same topic
        const queryIds = queriesWithSameTopic.map(q => q._id);
        if (queryIds.length === 0) 
        {
            console.log('No queries found with same topic, returning empty array');
            return res.status(200).json([]);
        }

        // Get all documents from all queries with the same topic (including removed ones)
        const documents = await Document.find({ 
        queryId: { $in: queryIds }
        })

        .populate({
            path: 'userId',
            select: 'username',
            model: 'User'
        })
        .sort({ createdAt: 1 });
        
        console.log(`Found ${documents.length} documents from ${queryIds.length} queries`);
        console.log(`Documents breakdown:`, {
            total: documents.length,
            byUser: documents.reduce((acc, d) => {
                const username = d.userId?.username || 'Unknown';
                acc[username] = (acc[username] || 0) + 1;
                return acc;
            }, {}),
            removed: documents.filter(d => d.doc_isRemoved).length,
            active: documents.filter(d => !d.doc_isRemoved).length
        });
        
        res.status(200).json(documents);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = {
    addDocumentToQuery,
    // removeDocumentFromQuery,
    toggleDocumentSave,
    getAllDocuments,
    getDocumentsByQueryId
}