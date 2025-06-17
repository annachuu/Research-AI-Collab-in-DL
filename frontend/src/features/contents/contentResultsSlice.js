import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contentResultsService from './contentResultsService';

const initialState = {
    contents: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isSERPLoading: false,
    message: '',
    isNewSearchKeyword: null,
    currentKeyword: '',
    thumbnail: null,
    isThumbnailSuccess: false,
    isThubnailError: false,
    thumbnails: {},
}

// Get SERP lists
export const getSearchResultLists = createAsyncThunk('search', async(data, thunkAPI) => {
    try{
        //const token = thunkAPI.getState().auth.user._id;
        const token = ''
        return await contentResultsService.getBookResultLists(data, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


// export const getDocumentThumbnailUrl = createAsyncThunk('thumbnail', async(doi, thunkAPI) => {
//     try{
//         const token = ''
//         return await contentResultsService.getBookCover(doi, token)
//     } catch(error) {
//         const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message);
//     }
// })

export const getDocumentThumbnailUrl = createAsyncThunk('thumbnail', async(doi, thunkAPI) => {
    // console.log('api is fetching ...')
    try{
        const token = ''
        const response = await contentResultsService.getDocumentCover(doi, token);        
        return { doi, coverImageUrl: response.coverImageUrl };
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue({ doi, error: message });
    }
})

export const getBookThumbnailUrl = createAsyncThunk('thumbnail', async(doi, thunkAPI) => {
    // console.log('api is fetching ...')
    try{
        const token = ''
        const response = await contentResultsService.getBookCover(doi, token);        
        return { doi, coverImageUrl: response.coverImageUrl };
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue({ doi, error: message });
    }
})

export const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {        
        resetSearchResults: (state) => ({
            ...state,
            contents: [],
            isSERPLoading: initialState.isSERPLoading,
            isThumbnailSuccess: initialState.isThumbnailSuccess,
            isThubnailError: initialState.isThubnailError,            
        }),
        setNewSearchKeyword: (state, action) => {
            state.isNewSearchKeyword = action.payload;
        },
        setCurrentKeyword: (state, action) => {
            state.currentKeyword = action.payload;
            console.log("**_", action.payload)
        },
        setIsThumbnailSuccess: (state, action) => {
            state.isThumbnailSuccess = action.payload;
        },
        setIsThubnailError: (state, action) => {
            state.isThubnailError = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder            
            .addCase(getSearchResultLists.pending, (state) => {
                state.isSERPLoading = true;
            })
            .addCase(getSearchResultLists.fulfilled, (state, action) => {
                state.isSERPLoading = false
                state.isSuccess = true
                state.contents = action.payload
            })
            .addCase(getSearchResultLists.rejected, (state, action) => {
                state.isSERPLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDocumentThumbnailUrl.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDocumentThumbnailUrl.fulfilled, (state, action) => {
                state.isLoading = false
                state.isThumbnailSuccess = true
                state.thumbnails[action.payload.doi] = action.payload.coverImageUrl;                
            })
            .addCase(getDocumentThumbnailUrl.rejected, (state, action) => {
                state.isLoading = false
                state.isThubnailError = true
                state.message = action.payload
                state.thumbnails[action.payload.doi] = null;              
            })
    }
})

export const {resetSearchResults, setNewSearchKeyword, setCurrentKeyword, setIsThumbnailSuccess, setIsThubnailError} = contentsSlice.actions
export default contentsSlice.reducer