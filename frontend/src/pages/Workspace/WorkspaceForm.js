import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {  } from 'react-router-dom';
import { createWorkspace, createQuery } from '../../features/workspace/workspaceSlice';
import styles from "./Workspace.module.css";

function WorkspaceForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const location = useLocation();
    const isDashboard = location.pathname === '/';
    const {singleWorkspace, singleQuery, isWorkspaceCreateSuccess, isQueryCreateSuccess} = useSelector((state) => state.workspace);            
    const {user} = useSelector((state) => state.auth);      
    const [searchInput, setSearchInput] = useState("")          
    const currentWorkspace = useSelector((state) => state.workspace.selectedWorkspace);
    

    const redirectToContentLists = (wordspace_id, query_id, keyword) => {   
        console.log('wordspace_id = ', wordspace_id)   
        console.log('query_id = ', query_id)     
        localStorage.setItem('query', searchInput)        
        if(searchInput.length !== 0){ 
            // navigate('/task/' + currentWorkspace._id , { state: keyword})
            navigate('/task/' + wordspace_id + '/' + query_id)
        }
    }

    //search input form fields validation
    const formInputHandler = (event) => {        
        setSearchInput(event.target.value)
    }
    
    // form handler function to create workspace or query for a search task 
    const submitFormHandler = (event) => {
        console.log('submit form handler is running:: ', searchInput, '_', currentWorkspace)
        event.preventDefault();       
        const wpdata = {
            "name": searchInput,
            'userId': user.data._id,
            "queryName": searchInput
        }

        localStorage.setItem('query', 'searchInput')

        if(currentWorkspace !== null){
            // search task resumes into the selected workspace
            // new query will be added to quries array of the selected workspace
            const queryData = {
                'query': searchInput,
                'userId': user.data._id,
                'workspaceId': currentWorkspace._id,
                'workspaceName': currentWorkspace.name,
                'documents': []
            }        
            console.log(queryData)    
            dispatch(createQuery(queryData))            
        }else{
            // create new workspace
            // first query will be fetched from server, no need to call createQuery for new workspace
            dispatch(createWorkspace(wpdata));
        }
    }    

    useEffect(()=>{
        if(isWorkspaceCreateSuccess || isQueryCreateSuccess){
            if(isQueryCreateSuccess){   
                console.log('query is created, now redirect to SERP', singleQuery)                           
                redirectToContentLists(singleQuery.workspaceId, singleQuery._id, singleQuery.query);
            }else{
                console.log('new workspace created_', singleWorkspace)
                if(singleWorkspace !== undefined){                    
                    redirectToContentLists(singleWorkspace.workspace._id, singleWorkspace.queries[0]._id, singleWorkspace.queries[0].query);                    
                }
            }
        }   
    }, [isWorkspaceCreateSuccess, isQueryCreateSuccess])

    return (
        <div className='flex justify-center'>
            <form onSubmit={submitFormHandler} className={`${styles.cw_42, styles.search_bar}`}>
                <div className={`flex rounded-full shadow appearance-none focus:outline-none focus:shadow-outline w-full ${styles.search_input}`}>
                    <div className="ltr">
                        <input className={`rounded-s-full w-full px-4 py-3 text-slate-500 leading-tight focus:outline-none focus:shadow-outline`}
                               id="searchInput"
                               name="searchInput"
                               type="text"
                               placeholder="Search"
                               onChange={formInputHandler}
                               autoComplete="off"
                               value={searchInput} />
                    </div>
                    <div className={`cursor-pointer ${styles.search_bar_btn}`}>
                        <button disabled={searchInput.trim().length === 0}></button>
                    </div>
                </div>
                {isDashboard ? <>
                    <div className=" min-h-8">
                        {currentWorkspace !== null ? <>
                                <p className='mt-2 ml-4 transition ease-in-out'>Search tasks will resume to <span className="font-bold italic">{currentWorkspace?.name}</span></p>
                            </> :
                            <>
                                <p className='mt-2 ml-4'>Start a new search task</p>
                            </>}
                    </div>
                </> : <>
                    <p className='mt-2 ml-4'>Create a new search</p>
                </>}
            </form>

        </div>
    )
}

export default WorkspaceForm;