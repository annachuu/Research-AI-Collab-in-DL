import axios from 'axios'
import { API_URL } from "../../config/env";

const API = API_URL + 'ril/';

//@desc Add document to query of the defined workspace
//@route POST /API_URL/ril/document
const addDocumentToRil = async (docData, token) => {
    const response = await axios.post(API + "document", docData)      
    return response.data
}

const removeDocumentFromRil = async (docData, token) => {
    const url_ids = docData.id;
    const response = await axios.put(API + "document/" + url_ids)   
    return response.data
}

/** 
 * Get all document lists 
 * GET /API_URL/ril/
*/

const getAllRilDocuments = async (data, token) => {
    
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  

    try {
        const response = await axios.get(API + 'user/' + data.userId + '/rildocuments', config)        
    
        return response.data.data
    } catch (error) {        
        if (error.response) { 
            if(error.response.status === 404){                
                return []
            }
        } else if (error.request) {            
            console.error("No response received:", error.request);
        } else {            
            console.error("Request setup error:", error.message);
        }        
        throw error;
    }
}

const getRilDocumentCount = async (data, token) => {   
    console.log('cont') 
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }        
    const response = await axios.get(API + 'user/' + data.userId +'/rilcount', config)    
    
    return response.data.data
}

const getSimilarityScore = async (data, token) => {
    const requestData = {
        "documentTitle": data.documentTitle,
        "documentAbstract": data.documentAbstract,
        "folders": data.folders
    }

    try {
        const response = await axios.post(API + "similarity", requestData)    
    
        // console.log(response)  
        return response.data.similarityScores
    } catch (error) {
        // Handle the error
        if (error.response) {            
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);

            if(error.response.status === 404){
                console.log('error')
                return []
            }
        } else if (error.request) {            
            console.error("No response received:", error.request);
        } else {            
            console.error("Request setup error:", error.message);
        }
        // Return null or throw an error depending on your requirements
        throw error;
    }
}


const saveVideoIntoFileSystem = async (formData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    };

    const response = await axios.post(API_URL + "advancelogger/saveVideoFile", formData, config);
    return response.data;
};


const rilDocumentService = {
    addDocumentToRil,
    removeDocumentFromRil,
    getAllRilDocuments,
    getRilDocumentCount,
    getSimilarityScore,
    saveVideoIntoFileSystem
}

export default rilDocumentService;