const asyncHandler = require('express-async-handler')
const natural = require('natural');
const TfIdf = natural.TfIdf;

const axios = require('axios');

const getSimilarityScore = async (req, res) => {
    const { documentTitle, documentAbstract, folders } = req.body;
    if (!documentTitle) {
        return res.status(400).json({ error: 'Document is required' });
    }

    // Combine title and abstract
    const newDocText = documentTitle + " " + documentAbstract;

    // Prepare an array to hold scores for each folder.
    const folderScores = [];

    // For each folder, create a workspace request object.
    // We assume each folder is an object where one key (other than "id")
    // is the workspace title, and its value is an array of docs.
    const workspaceRequests = folders.map(folder => {
        const folderKeys = Object.keys(folder).filter(k => k !== 'id');
        const workspaceName = folderKeys[0];
        const workspaceDocs = folder[workspaceName].map(doc => doc.title + " " + doc.abstract);
        return {
            workspaceId: folder.id,
            workspace: workspaceName,
            workspace_docs: workspaceDocs
        };
    });

    // For each workspace, call the Python similarity service.
    // If the workspace has no documents, fall back to using the workspace title.
    for (let ws of workspaceRequests) {
        // Use workspace title if there are no documents.
        const docsForSimilarity = ws.workspace_docs.length > 0 ? ws.workspace_docs : [ws.workspace];
        try {
            const response = await axios.post(
                'http://127.0.0.1:5002/compute_similarity',
                {
                    new_doc: newDocText,
                    workspace_docs: docsForSimilarity
                }
            );
            const average_similarity = response.data.average_similarity;
            folderScores.push({ workspaceId: ws.workspaceId, workspace: ws.workspace, score: average_similarity });
        } catch (error) {
            console.error('Error computing similarity for workspace', ws.workspace, error);
            folderScores.push({ workspaceId: ws.workspaceId, workspace: ws.workspace, score: 0 });
        }
    }

    // Optionally, sort folderScores descending
    folderScores.sort((a, b) => b.score - a.score);

    res.json({ similarityScores: folderScores });
};

function cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return normA && normB ? dotProduct / (normA * normB) : 0;
}

module.exports = {    
    getSimilarityScore
}