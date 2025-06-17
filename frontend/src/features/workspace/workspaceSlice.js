import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workspaceService from './workspaceService';

const initialState = {
    workspaces: [],
    singleWorkspace: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    isDetailLoading: false,
    isWorkspaceCreateSuccess: false,
    isWorkpsaceDetailSuccess: false,
    quries: [],
    singleQuery: {},
    queryDetailObject: {},
    isQueryDetailSuccess: false,
    isQueryCreateSuccess: false,
    message: '',
    selectedWorkspace: null, 
    quriesIdsArray: [],   
    isQueryIdsSuccess: false,
    wpcollections: [],
    isWpcollectionsSuccess: false
}

//create new workspace
export const createWorkspace = createAsyncThunk('workspaces/', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await workspaceService.createWorkspace(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

//update new workspace
export const updateWorkspace = createAsyncThunk('workspaces/:id/update', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await workspaceService.updateWorkspace(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Get all workspace
export const getAllWorkspaces = createAsyncThunk('workspaces/getWorkspaces', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;        
        return await workspaceService.getAllWorkspaces(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Get all archives
export const getArchives = createAsyncThunk('workspaces/archives', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;        
        return await workspaceService.getArchives(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Get workspace details
export const getWorkspaceDetails = createAsyncThunk('workspaces/:id', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;        
        return await workspaceService.getSingleWorkspace(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// delete workspace details
export const deleteWorkspace = createAsyncThunk('workspaces/delete/:id', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;        
        return await workspaceService.deleteWorkspace(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

//create new queries to selected workspace
export const createQuery = createAsyncThunk('workspaces/query', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await workspaceService.createQueryToWorkspace(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

//get query details
export const getQueryDetails = createAsyncThunk('workspaces/query/:id', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await workspaceService.getQueryDetails(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

//get query ids lists of a workspace
export const getQueryIdsLists = createAsyncThunk('queryIds', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await workspaceService.getQueryIds(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

//get query ids lists of a workspace
export const getWorkspaceCollections = createAsyncThunk('uid/wpcollections', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await workspaceService.getWorkspaceCollections(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        // resetWorkspaceData: (state) => initialState,
        resetWorkspaceData: (state) => ({
            ...state,
            workspaces: initialState.workspaces,
            isWorkspaceCreateSuccess: initialState.isWorkspaceCreateSuccess,
            isWorkpsaceDetailSuccess: initialState.isWorkpsaceDetailSuccess,
            isQueryDetailSuccess: initialState.isQueryDetailSuccess,
            isQueryCreateSuccess: initialState.isQueryCreateSuccess,
            isQueryIdsSuccess: initialState.isQueryIdsSuccess,
            selectedWorkspace: initialState.selectedWorkspace,
            wpcollections: initialState.wpcollections,
            isWpcollectionsSuccess: initialState.isWpcollectionsSuccess
        }),
        setIsWorkspaceCreateSuccess: (state, action) => {
            state.isWorkspaceCreateSuccess = action.payload;
        },
        resetWorkspaceDetailSuccess : (state, action) => {
            state.isWorkpsaceDetailSuccess = false;
        },
        resetQueryCreateSuccess: (state, action) => {
            state.isQueryCreateSuccess = false;
        },
        setSelectedWorkspace: (state, action) => {
            state.selectedWorkspace = action.payload;
        },        
        setIsQueryIdsSuccess: (state, action) => {
            state.isQueryIdsSuccess = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWorkspace.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.isWorkspaceCreateSuccess = true
                state.workspaces.push(action.payload.workspace)
                state.singleWorkspace = action.payload                
            })
            .addCase(createWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateWorkspace.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.isWorkspaceCreateSuccess = true
                state.singleWorkspace = action.payload.workspace                             
                state.workspaces = state.workspaces.filter(
                    (wsp) => wsp._id !== action.payload._id
                )
            })
            .addCase(updateWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllWorkspaces.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllWorkspaces.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.workspaces = action.payload
            })
            .addCase(getAllWorkspaces.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getArchives.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArchives.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.workspaces = action.payload
            })
            .addCase(getArchives.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getWorkspaceDetails.pending, (state) => {
                state.isDetailLoading = true;
            })
            .addCase(getWorkspaceDetails.fulfilled, (state, action) => {
                state.isDetailLoading = false
                state.isQueryCreateSuccess = false
                state.isWorkpsaceDetailSuccess = true
                state.singleWorkspace = action.payload
            })
            .addCase(getWorkspaceDetails.rejected, (state, action) => {
                state.isDetailLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteWorkspace.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true                                
                state.workspaces = state.workspaces.filter(
                    (workspace) => workspace._id !== action.payload.data._id
                )
            })
            .addCase(deleteWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuery.fulfilled, (state, action) => {
                state.isLoading = false
                state.isQueryCreateSuccess = true                
                state.singleQuery = action.payload
            })
            .addCase(createQuery.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getQueryDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQueryDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isQueryDetailSuccess = true
                state.queryDetailObject = action.payload
            })
            .addCase(getQueryDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })            
            .addCase(getQueryIdsLists.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQueryIdsLists.fulfilled, (state, action) => {
                state.isLoading = false
                state.isQueryIdsSuccess = true
                state.quriesIdsArray = action.payload
            })
            .addCase(getQueryIdsLists.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getWorkspaceCollections.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWorkspaceCollections.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.wpcollections = action.payload
                state.isWpcollectionsSuccess = true
            })
            .addCase(getWorkspaceCollections.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetWorkspaceData, setIsWorkspaceCreateSuccess, resetQueryCreateSuccess, resetWorkspaceDetailSuccess, setSelectedWorkspace, setIsQueryIdsSuccess} = workspaceSlice.actions
export default workspaceSlice.reducer