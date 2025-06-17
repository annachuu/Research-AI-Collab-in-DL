import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import documentService from './documentService';

const initialState = {
    documents: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isAddDocumentSuccess: false,
    isRemoveDocumentSuccess: false,
    isDocumentArraySuccess: false, 
}

//save a document to the query of defined workspace
export const saveDocumentToWorkspace = createAsyncThunk('documents/add', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await documentService.addDocumentToWorkspace(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const removeDocumentFromWorkspace = createAsyncThunk('documents/remove', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await documentService.removeDocumentFromWorkspace(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})



//get document lists of the given query
export const getDocumentListsByQueryId = createAsyncThunk('document/:wid/:qid', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await documentService.getDocumentByQueryId(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        resetDocument: (state) => ({
            ...state,
            isAddDocumentSuccess: initialState.isAddDocumentSuccess,
            isRemoveDocumentSuccess: initialState.isRemoveDocumentSuccess,
            isDocumentArraySuccess: initialState.isDocumentArraySuccess
        }),
        setDocumentArraySuccess: (state, action) => {
            state.isDocumentArraySuccess = action.payload;
        },
        setDocumentAddedSuccess: (state, action) => {
            state.isAddDocumentSuccess = action.payload;
        },
        setDocumentRemovedSuccess: (state, action) => {
            state.isRemoveDocumentSuccess = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveDocumentToWorkspace.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveDocumentToWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDocumentArraySuccess = false
                state.isRemoveDocumentSuccess = false
                state.isAddDocumentSuccess = true
                // state.documents.push(action.payload)
                state.documents = action.payload
            })
            .addCase(saveDocumentToWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeDocumentFromWorkspace.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeDocumentFromWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDocumentArraySuccess = false
                state.isAddDocumentSuccess = false
                state.isRemoveDocumentSuccess = true                
                state.documents = action.payload;
            })
            .addCase(removeDocumentFromWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDocumentListsByQueryId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDocumentListsByQueryId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAddDocumentSuccess = false
                state.isRemoveDocumentSuccess = false 
                state.isDocumentArraySuccess = true
                state.documents = action.payload
            })
            .addCase(getDocumentListsByQueryId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetDocument, setDocumentArraySuccess, setDocumentAddedSuccess, setDocumentRemovedSuccess} = documentSlice.actions
export default documentSlice.reducer