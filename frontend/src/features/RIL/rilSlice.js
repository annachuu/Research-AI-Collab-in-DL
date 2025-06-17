import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rilService from './rilService'

const initialState = {
    ril_documents: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isAddToRilSuccess: false,
    isRemoveFromRilSuccess: false,
    isRilArraySuccess: false, 
    isRilLoading: false,
    isGetRilsLoading: false,
    count: 0,
    similarity_score: {},
    isScoreLoading: false,
    isScoreSuccess: false,
}

// save a document into RIL
export const saveDocumentToRil = createAsyncThunk('rils/add', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await rilService.addDocumentToRil(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// remove document from RIL
export const removeDocumentFromRil = createAsyncThunk('rils/remove', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await rilService.removeDocumentFromRil(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


//get all documents of RIL
export const getRilDocumentLists = createAsyncThunk('getRil/:wid/:qid', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await rilService.getAllRilDocuments(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getRilDocumentCount = createAsyncThunk('documentcount', async(data, thunkAPI) => {
    try{        
        const token = thunkAPI.getState().auth.user._id;
        return await rilService.getRilDocumentCount(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


// get similarity score
export const getSimilarityScore = createAsyncThunk('similarityscore', async(data, thunkAPI) => {

    console.log("dataaaaaaaaaaaaa:", data)
    try{        
        const docId = data.docId;        
        const token = thunkAPI.getState().auth.user._id;

        // console.log('hello')
        // return await rilService.getSimilarityScore(data, token)
        const response = await rilService.getSimilarityScore(data, token);
        console.log('ss~ ', response)
        return { docId, similarityScore: response };
    } catch(error) {
        const docId = data.docId;
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()        
        return thunkAPI.rejectWithValue({ docId, error: message });
    }
})

// get similarity score
export const saveVideoIntoFileSystem = createAsyncThunk('similarityscore', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
         console.log('hello')
        // return await rilService.getSimilarityScore(data, token)
        const response = await rilService.saveVideoIntoFileSystem(data, token);
        console.log('ss~ ', response)
        return { response: response };
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue({error: message });
    }
})

export const rilDocumentSlice = createSlice({
    name: 'ril',
    initialState,
    reducers: {        
        resetRilData: (state) => ({
            ...state,
            isAddToRilSuccess: initialState.isAddToRilSuccess,
            isRemoveFromRilSuccess: initialState.isRemoveFromRilSuccess,
            isRilArraySuccess: initialState.isRilArraySuccess,
            isGetRilsLoading: initialState.isGetRilsLoading,
            isScoreLoading: initialState.isScoreLoading,
            isScoreSuccess: initialState.isScoreSuccess
        }),
        setRilArraySuccess: (state, action) => {
            state.isRilArraySuccess = action.payload;
        },
        setRilAddedSuccess: (state, action) => {
            state.isAddToRilSuccess = action.payload;
        },
        setRilRemoveSuccess: (state, action) => {
            state.isRemoveFromRilSuccess = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveDocumentToRil.pending, (state) => {
                state.isRilLoading = true;
            })
            .addCase(saveDocumentToRil.fulfilled, (state, action) => {
                state.isRilLoading = false 
                state.isRilArraySuccess = false               
                state.isRemoveFromRilSuccess = false
                state.isAddToRilSuccess = true
                // state.documents.push(action.payload)
                // state.ril_documents = action.payload
            })
            .addCase(saveDocumentToRil.rejected, (state, action) => {
                state.isRilLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeDocumentFromRil.pending, (state) => {
                state.isRilLoading = true;
            })
            .addCase(removeDocumentFromRil.fulfilled, (state, action) => {
                state.isRilLoading = false   
                state.isRilArraySuccess = false             
                state.isAddToRilSuccess = false
                state.isRemoveFromRilSuccess = true                
                // state.ril_documents = action.payload;
            })
            .addCase(removeDocumentFromRil.rejected, (state, action) => {
                state.isRilLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRilDocumentLists.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRilDocumentLists.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAddToRilSuccess = false
                state.isRemoveFromRilSuccess = false 
                state.isRilArraySuccess = true
                state.ril_documents = action.payload
            })
            .addCase(getRilDocumentLists.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRilDocumentCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRilDocumentCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.count = action.payload
            })
            .addCase(getRilDocumentCount.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSimilarityScore.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSimilarityScore.fulfilled, (state, action) => {
                state.isLoading = false
                state.isScoreSuccess = true
                // state.similarity_score = action.payload
                state.similarity_score[action.payload.docId] = action.payload.similarityScore;
            })
            .addCase(getSimilarityScore.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.similarity_score[action.payload.docId] = null;
            })
            
    }
})

export const {resetRilData, setRilArraySuccess, setRilAddedSuccess, setRilRemoveSuccess} = rilDocumentSlice.actions
export default rilDocumentSlice.reducer