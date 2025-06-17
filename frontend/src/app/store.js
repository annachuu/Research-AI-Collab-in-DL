import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from '../features/workspace/workspaceSlice';
import searchResultReducer from '../features/contents/contentResultsSlice';
import authReducer from '../features/Auth/AuthSlice';
import documentReducer from '../features/Document/documentSlice';
import rilReducer from '../features/RIL/rilSlice';

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    content: searchResultReducer,
    auth: authReducer,
    document: documentReducer,
    ril: rilReducer
  },
});
