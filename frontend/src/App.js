import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import SearchResultLists from './pages/DocumentSearchResults/Contentlists';
import LoginComponent from './pages/Login/Login';
import WorkspaceDetails from './pages/Workspace/WorkspaceDetails';
import RilDetailView from './pages/RIL/RilDetailView';
import ArchiveComponent from './pages/Workspace/ArchiveLists';

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <Router>
        <div>          
          <Routes>
            <Route path='/' element={<Dashboard setSearchInput={setSearchInput} />} />
            <Route path='/task/:workspaceId/:queryId' element={<SearchResultLists setSearchInput={setSearchInput} />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/workspace/:id' element={<WorkspaceDetails />} />
            <Route path='/ril' element={<RilDetailView />} />                                  
            <Route path='/workspace/archives' element={<ArchiveComponent />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
