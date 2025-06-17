import axios from 'axios'
import { API_URL } from "../../config/env";

const API = API_URL + 'workspaces/';

//@desc Get All Workspaces
//@route GET /API_URL/workspaces/user/:userId
const getAllWorkspaces = async (data, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API + 'user/' + data.userId)
    return response.data.data
}

const getArchives = async (data, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API + 'user/' + data.userId + '/archives')
    return response.data.data
}

//@desc Get workspace details
//@route GET /API_URL/workspaces/id
const getSingleWorkspace = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API + id , config)    
    return response.data.data
}

//@desc Create workspace
//@route POST /API_URL/workspaces/
const createWorkspace = async (data, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
            formData: true
        }
    }    
    const response = await axios.post(API , data)
    return response.data.data
}

//@desc Update workspace
//@route PATCH /API_URL/workspaces/id
const updateWorkspace = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // Remove the custom formData header below:
            // formData: true
        }
    };

    const request_body = {
        userId: data.userId,
        name: data.name,
        archive: data.archive
    };

    const response = await axios.put(API + data.id, request_body, config);
    return response.data;
};

//@desc Delete workspace
//@route DELETE /API_URL/workspaces/id
const deleteWorkspace = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API + id , config)
    return response.data
}

//@desc Create query
//@route POST /API_URL/workspaces/query
// slice function: createQuery
const createQueryToWorkspace = async (data, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
            formData: true
        }
    }    
    const response = await axios.post(API + 'query' , data)
    // console.log(response)
    return response.data.data
}

// /query/:workspaceId/:queryId
const getQueryDetails = async (data, token) => {    
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }    
    const response = await axios.get(API + 'query/' + data.workspaceId +  '/' + data.queryId , config)        
    return response.data.data.query
}

// :workspaceId/query
const getQueryIds = async (wID, token) => {    
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }    
    const response = await axios.get(API + wID +  '/query' , config)        
    return response.data.data.queryIds
}

const getWorkspaceCollections = async (data, token) => {    
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }    
    const response = await axios.get(API + 'user/' + data.userId + '/wpcollections')        
    return response.data.data
}


const workspaceService = {
    getAllWorkspaces,
    getSingleWorkspace,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    createQueryToWorkspace,
    getQueryDetails,
    getQueryIds,
    getWorkspaceCollections,
    getArchives
}

export default workspaceService;