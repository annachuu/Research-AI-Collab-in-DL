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
    isToggleDocumentSuccess: false,
}

// New help function to normalize backend document shape
const normalizeDocument = (doc) => ({
    ...doc,
    isRemoved: doc.doc_isRemoved ?? doc.isRemoved ?? false,
});


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


// New for toggleDocumentSave
export const toggleDocumentSave = createAsyncThunk(
    'documents/toggle',
    async (documentId, thunkAPI) => {
    try 
    {
      const token = thunkAPI.getState().auth.user._id;
      return await documentService.toggleDocumentSave(documentId, token);
    } 
    catch (error) 
    {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        resetDocument: (state) => ({
            ...state,
            isAddDocumentSuccess: initialState.isAddDocumentSuccess,
            isRemoveDocumentSuccess: initialState.isRemoveDocumentSuccess,
            isDocumentArraySuccess: initialState.isDocumentArraySuccess,
            isToggleDocumentSuccess: initialState.isToggleDocumentSuccess,
        }),
        setToggleDocumentSuccess: (state, action) => {
            state.isToggleDocumentSuccess = action.payload;
        },
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

                console.log("REDUCER PAYLOAD:", action.payload);

                // state.documents.push(action.payload)
                // state.documents = action.payload
                // state.documents = action.payload.map(normalizeDocument);

                const docsArray = Array.isArray(action.payload)
                ? action.payload
                : action.payload.documents ?? [];
            
            state.documents = docsArray.map(normalizeDocument);
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

                // state.documents = action.payload;
                state.documents = action.payload.map(normalizeDocument);

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

                // state.documents = action.payload
                state.documents = action.payload.map(normalizeDocument);
            })
            .addCase(getDocumentListsByQueryId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // New for toggleDocumentSave
            .addCase(toggleDocumentSave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(toggleDocumentSave.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDocumentArraySuccess = false;
                state.isAddDocumentSuccess = false;
                state.isRemoveDocumentSuccess = false;
                state.isToggleDocumentSuccess = true;

                // update document locally if needed
                // const updatedDoc = action.payload.data;
                const updatedDoc = normalizeDocument(action.payload.data);

                state.documents = state.documents.map(doc =>
                    doc._id === updatedDoc._id ? updatedDoc : doc
                );
            })
            .addCase(toggleDocumentSave.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isToggleDocumentSuccess = false;
            })

    }
})

export const {resetDocument, setDocumentArraySuccess, setDocumentAddedSuccess, setDocumentRemovedSuccess, setToggleDocumentSuccess} = documentSlice.actions
export default documentSlice.reducer