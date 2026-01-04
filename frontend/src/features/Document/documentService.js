import axios from 'axios'
import { API_URL } from "../../config/env";

const API = API_URL + 'workspaces/';

//@desc Add document to query of the defined workspace
//@route POST /API_URL/workspaces/
const addDocumentToWorkspace = async (docData, token) => {
    const response = await axios.post(API + "document", docData)      
    return response.data
}

const removeDocumentFromWorkspace = async (docData, token) => {
    const url_ids = docData.workspaceId + '/' + docData.queryId + '/' + docData.documentId;
    const response = await axios.put(API + "document/" + url_ids)   
    return response.data
}

/** 
 * Get document lists by query ID
 * POST /document/:workspaceId/:queryId
*/

const getDocumentByQueryId = async (data, token) => {
    // console.log(data)
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }    
    const response = await axios.get(API + 'document/' + data.workspaceId +  '/' + data.queryId , config)    
    console.log(response.data)
    return response.data.data
}

// New for toggleDocumentSave
const toggleDocumentSave = async (documentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.patch(
    API + 'document/toggle/' + documentId,
    {},
    config
  );

  return response.data;
};

/**
 * Get all documents from all users
 * GET /api/workspaces/document/all
 */
const getAllDocuments = async () => {
  const response = await axios.get(API + 'document/all');
  return response.data;
};

/**
 * Get all documents for a specific query from all users
 * GET /api/workspaces/document/query/:queryId
 */
const getDocumentsByQueryId = async (queryId) => {
  const response = await axios.get(API + 'document/query/' + queryId);
  return response.data;
};

const documentService = {
    addDocumentToWorkspace,
    // removeDocumentFromWorkspace,
    getDocumentByQueryId,
    getAllDocuments,
    getDocumentsByQueryId,
    toggleDocumentSave
}

export default documentService;