import React, {useState, useEffect, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaRegFileLines, FaMagnifyingGlass } from "react-icons/fa6";

import { getWorkspaceDetails, createQuery, setSelectedWorkspace, resetWorkspaceData } from '../../features/workspace/workspaceSlice';
import {  setDocumentRemovedSuccess } from '../../features/Document/documentSlice';
import RenderDocumentThumbnail from '../../components/Document/DocumentThumbnail';
import DocumentComponent from '../../components/Document/DocumentComponent';
import UserTimeline from "../../components/History/enhancedTimeline";


import default_thumbnail from '../../assets/default_thmbnail.png'
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import styles from "./Workspace.module.css";
import { isbn_url } from "../../config/env";

function WorkspaceDetails() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const { id } = useParams();
    const {user} = useSelector((state) => state.auth);
    const {singleWorkspace, isWorkpsaceDetailSuccess, isQueryCreateSuccess, singleQuery, isDetailLoading, isError, message} = useSelector((state) => state.workspace);        
    const {isRemoveDocumentSuccess} = useSelector((state) => state.document);

    const [searchInput, setSearchInput] = useState("") 
    const [currentWorkspace, setCurrentWorkspace] = useState({})    
    
    const [pageLoading, setPageLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState(null);

    const timelineQueries = singleWorkspace.queries || [];
    const isQueryDetailSuccess = timelineQueries.length > 0;


    useEffect(()=>{
        dispatch(getWorkspaceDetails(id))
        // console.log(singleWorkspace)
        
        return() => {
            dispatch(resetWorkspaceData())
        }
    }, [dispatch, id])

    useEffect(()=>{
       // dispatch(setSelectedWorkspace(singleWorkspace.workspace))
        if(isWorkpsaceDetailSuccess){
            console.log('_', singleWorkspace)
            
            setCurrentWorkspace(singleWorkspace.workspace)
        }
        
    }, [isWorkpsaceDetailSuccess])

    useEffect(()=>{        
        if(isRemoveDocumentSuccess){
            console.log('hi')
            dispatch(setDocumentRemovedSuccess(false))
            dispatch(getWorkspaceDetails(id))
        }
         
     }, [isRemoveDocumentSuccess])
    
    const documentCountHandler = (queryId) => {        
        console.log(queryId)
        console.log(singleWorkspace.queries)        
        const index = singleWorkspace.queries.findIndex(item => item._id === queryId);
    }

    const redirectToContentLists = (details) => {
        console.log('details_', details)
        localStorage.setItem('query', details.query)
        localStorage.setItem('wpname', currentWorkspace.name)
        setTimeout(() => {
            // navigate('/testing/' + details.workspaceId + '/' + details._id, {state: details.query})        
            navigate('/task/' + details.workspaceId + '/' + details._id)        
        }, 100);
    }

    const submitFormHandler = (event) => {
        console.log('submit form handler is running:: ', searchInput, '_', singleWorkspace)
        event.preventDefault();       
        localStorage.setItem('query', searchInput)
        localStorage.setItem('wpname', currentWorkspace.name)
        const queryData = {
            'query': searchInput,
            'userId': user.data._id,
            'workspaceId': id,
            'workspaceName': currentWorkspace.name,
            'documents': []
        }        
        console.log(queryData)    
        dispatch(createQuery(queryData))                    
    }

    useEffect(()=>{
        if(isQueryCreateSuccess){
            navigate('/task/' + id + '/' + singleQuery._id , { state: searchInput})  
        }
    }, [isQueryCreateSuccess]) 

    //search input form fields validation
    const formInputHandler = (event) => {
        console.log('...', event.target.value)
        setSearchInput(event.target.value)
    } 

    const backToHome = () => {
        dispatch(resetWorkspaceData())
        setCurrentWorkspace({})
        navigate('/')
    }

    return (
        <>
            <Header />
            <div className="mt_22">
                <div className={`flex items-center px-6 py-3 nav_wrap`}>
                    <div className='flex items-center cursor-pointer hover:text-indigo-800 transition ease-out' onClick={backToHome}>
                        <FaChevronLeft />
                        <p className='text-sm ml-2'>Dashboard</p>
                    </div>
                    <span className='px-3 text-sm'>/</span>
                    {singleWorkspace !== undefined && <>
                        <p className='text-sm'>Workspace: {singleWorkspace.workspace?.name}</p>
                    </>}
                </div>
                
                {isDetailLoading &&
                    <div><Loading /></div>
                }
                <div className='main_element_container'>
                    
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
                            <p className='mt-2 ml-4'>Create a new search task</p>
                        </form>  
                    </div>
                    
                    <div className='mt-14'>
                        <div className="workspaceContentTimelineContainer">
                        {/* Left Workspace */}
                        <div className='workspaceLeft'>
                      <h3 className="text-lg text-slate-500 mb-6 mt-6 font-bold">Workspace: {singleWorkspace.workspace?.name}</h3>
                            {
                                isWorkpsaceDetailSuccess && <>
                                    <div className='flex mb-4'>
                                        <div className='flex items-center mr-4'>
                                            <FaMagnifyingGlass className="query_icon_color mr-2"/>
                                            <span className='text-sm font-semibold'>Total Queries: {singleWorkspace.querySize} </span>
                                        </div>
                                        <div className='flex items-center mr-4'>
                                            <FaRegFileLines className={`text-xl mr-2 ${styles.doc_default_color}`} /> 
                                            <span className='text-sm font-semibold'>Total Documents: {singleWorkspace.docSize} </span>
                                        </div>
                                    </div>
                                    {
                                        singleWorkspace.queries.map((data, index) => (
                                            <div key={data._id} className='w-full mb-4 p-4 border rounded-lg'style={{ width: '70%', maxWidth: '100%' }}>
                                                <div className='border-b border-solid border-slate-200 mb-3'>
                                                    <div className='mb-3 flex items-center'>
                                                        <div onClick={() => redirectToContentLists(data)} className='flex items-center'>
                                                            <FaMagnifyingGlass className="query_icon_color mr-2"/>
                                                            <span className='mr-3 cursor-pointer hover:text-indigo-800 transition ease-out-500 text-sm text-slate-500 pt-0.5'>{data.query}</span>
                                                        </div>
                                                        <span className='block_element'></span>
                                                        <span className='mx-3 text-sm text-slate-500'>{data.createdAt.split('T')[0]}</span>
                                                        <span className='block_element'></span>
                                                        <div className={`px-3 flex items-center ${styles.doc_default_color}`}>
                                                            <FaRegFileLines className={`text-xl`} />
                                                            <p className='font-medium text-sm mt-1 ml-2'>{data.documents.length}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='my-5 mx-10'>
                                                    {data.documents.length !== 0 ? (
                                                        <>
                                                            {data.documents.map((list, index) => (                                                                    
                                                                <DocumentComponent key={list._id} listings={list} queryDetail={data} onDocRemove={documentCountHandler}/>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <>-</>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        
                                </>
                            }
                            
                        </div>
                        {/* Right: Timeline Sidebar */}
                            {isQueryDetailSuccess && timelineQueries.length > 0 && (
                                <div className="workspaceRight">
                                <UserTimeline 
                                    queries={timelineQueries}
                                    setPageLoading={setPageLoading}
                                    setShowDetails={setShowDetails}
                                    setDetails={setDetails}
                                    />
                                    </div>
                            )}
                    </div>
                    </div>
                    
                    </div>
             </div>
        </>
    )
}

export default WorkspaceDetails;