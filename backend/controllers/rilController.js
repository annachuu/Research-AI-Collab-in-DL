const asyncHandler = require('express-async-handler')
const RILDocument = require('../models/rilModel')

/**
 * @desc Save documents to RIL
 * @route POST /api/ril/document/
 * @params {req, res} - The request and response object.
 * @return {object} - success state and query object.
 */
const addDocumentToRil = async (req, res) => {
    const { title, doc_type, doc_authors, doc_abstract, doc_date, documentId, userId, queryName, queryId, doc_thumbnail, thumbnail_type, doc_partof, doc_peerreview, doc_openaccess, doc_fulltext,doc_url } = req.body;
    try {                                                
        const rilDocument = await RILDocument.create({ title, doc_type, doc_authors, doc_abstract, doc_date, documentId, userId, queryId, queryName, doc_thumbnail, thumbnail_type, doc_partof, doc_peerreview, doc_openaccess, doc_fulltext , doc_url});
        
        res.status(201).json({ success: true, data: rilDocument });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc Remove documents from RIL
 * @route POST /api/ril/document/
 * @params {req, res} - The request and response object.
 * @return {object} - success state and query object.
 */
const removeDocumentFromRil = async (req, res) => {    
    const { id } = req.params;
    
    try {   
        const result = await RILDocument.deleteOne({ _id: id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, error: "Document not found in ril" });
        }

        res.status(200).json({ success: true});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getAllDocumentsFromRil =  asyncHandler(async (req, res) => {
    const { userId } = req.params;    
    
    const ril_lists = await RILDocument
        .find({ userId: userId })
        .sort({ createdAt: -1 });
    
    if (!ril_lists || ril_lists.length === 0) {    
        return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: ril_lists }); 
})

const getAllDocumentsFromRil1 =  asyncHandler(async (req, res) => {
    const listings = await RILDocument.find()
    res.status(200).json({ success: true, data: listings });
})

const getRilCount = async (req, res) => {  
    const { userId } = req.params;
    try {      
    //   const count = await RILDocument.countDocuments();
      const count = await RILDocument.countDocuments({ userId });

      res.status(200).json({ success: true, data: count });
    } catch (error) {      
      res.status(500).json({ success: false, error: error.message });
    }
};

// const getSimilarityScore = async (req, res) => {  
//     const { documentTitle, documentAbstract, folders } = req.body;

//     if (!documentTitle) {
//         return res.status(400).json({ error: 'Document is required' });
//     }

//     const tfidf = new TfIdf();
//     const folderScores = [];

//     const newDocument = documentTitle + " " + documentAbstract;
//     tfidf.addDocument(newDocument);

//     folders.forEach(folder => {
//         folder[Object.keys(folder)[1]].forEach(doc => {
//             const combinedDoc = doc.title + " " + doc.abstract;
//             tfidf.addDocument(combinedDoc);
//         });
//     });
    
//     const allTerms = new Set();
//     tfidf.documents.forEach(doc => {
//         Object.keys(doc).forEach(term => allTerms.add(term));
//     });

//     const termArray = Array.from(allTerms);
//     const termIndex = {};
//     termArray.forEach((term, index) => termIndex[term] = index);
    
//     const getTfIdfVector = (docIndex) => {
//         const vector = Array(termArray.length).fill(0);
//         tfidf.listTerms(docIndex).forEach(item => {
//             vector[termIndex[item.term]] = item.tfidf;
//         });
//         return vector;
//     };

//     const newDocVector = getTfIdfVector(0);
    
//     let docIndex = 1;
//     folders.forEach(folder => {
//         const folderName = Object.keys(folder)[1];
//         const folderDocs = folder[folderName];

//         if (folderDocs.length === 0) {
//             folderScores.push({ workspaceId: folder.id, workspace: folderName, score: 0 });
//             return;
//         }

//         let totalScore = 0;
//         folderDocs.forEach(() => {
//             const docVector = getTfIdfVector(docIndex);
//             const score = cosineSimilarity(newDocVector, docVector);

//             if (!isNaN(score)) {
//                 totalScore += score;
//             }
//             docIndex++;
//         });

//         const averageScore = totalScore / folderDocs.length;
//         folderScores.push({ workspaceId: folder.id, workspace: folderName, score: averageScore });
//     });

//     folderScores.sort((a, b) => b.score - a.score);

//     res.json({ similarityScores: folderScores });
// };

// function cosineSimilarity(a, b) {
//     const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
//     const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
//     const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
//     return normA && normB ? dotProduct / (normA * normB) : 0;
// }

module.exports = {
    addDocumentToRil,
    removeDocumentFromRil,
    getAllDocumentsFromRil,
    getRilCount
}