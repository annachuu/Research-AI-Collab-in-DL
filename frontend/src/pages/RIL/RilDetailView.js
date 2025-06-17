import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft,FaMagnifyingGlass, FaRegFileLines } from "react-icons/fa6";
import { FaRegCheckCircle, FaInfoCircle } from "react-icons/fa";

import HeaderComponent from "../../components/Header/Header";
import DocumentComponent from "../../components/Document/DocumentComponent";
import SimilarityComponent from './SimilarityResults';
import CreateWorkspaceFormComponent from './CreateWorkspaceForm';

import { getRilDocumentLists, resetRilData, removeDocumentFromRil, setRilRemoveSuccess } from '../../features/RIL/rilSlice';
import { resetWorkspaceData, getWorkspaceCollections, createWorkspace, getWorkspaceDetails, setIsWorkspaceCreateSuccess } from '../../features/workspace/workspaceSlice';
import { saveDocumentToWorkspace, setDocumentAddedSuccess } from '../../features/Document/documentSlice';

import rilStyles from './Ril.module.css'
import Loading from "../../components/Loading/Loading";

function RilDetailViewComponent() {   
    const stringSimilarity = require("string-similarity"); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    const {ril_documents, isRemoveFromRilSuccess, isRilLoading} = useSelector((state) => state.ril)
    const { wpcollections, isWpcollectionsSuccess, singleWorkspace, isWorkspaceCreateSuccess, isWorkpsaceDetailSuccess } = useSelector((state) => state.workspace); 
    const { isAddDocumentSuccess } = useSelector((state) => state.document);
    const [ selectedDocument, setSelectedDocument] = useState(null)
    const [ isCreateWorkspace, setIsCreateWorkspace] = useState(false)
    const [ workspaceNameInput, setWorkspaceNameInput] = useState('')    
    const [ currentDocID, setCurrentDocID ] = useState(null) 
    const [ visibleComponent, setVisibleComponent] = useState({})
    const [ createNew, setCreateNew] = useState(false)      
    const [ count, setCount ] = useState(null);
    const [ similarityUpdates, setSimilarityUpdates ] = useState(0);
    const [ unableLink, setUnableLink] = useState(false);

    const backToHome = () => {
        navigate('/')
    }

    useEffect(() => {
        dispatch(resetWorkspaceData())
    }, [])

    useEffect(() => {        
        if(!user){
            navigate('/login')
        }else{
            const user_data = {
                userId: user.data._id
            }
            dispatch(getRilDocumentLists(user_data))            
            dispatch(getWorkspaceCollections(user_data))       
        }

        return() => {
            dispatch(resetRilData())
            dispatch(resetWorkspaceData())
        }
    }, [dispatch, user])

    useEffect(() => { 
        const user_data = {
            userId: user.data._id
        }  
        dispatch(getRilDocumentLists(user_data))
        setCreateNew(false)
        dispatch(setRilRemoveSuccess(false))
    }, [dispatch, isRemoveFromRilSuccess])

    useEffect(() => {
        if (isWorkspaceCreateSuccess) {
            console.log('new workspace created', singleWorkspace);
            dispatch(setIsWorkspaceCreateSuccess(false));
            dispatch(getWorkspaceDetails(singleWorkspace.workspace._id));
        }
    }, [isWorkspaceCreateSuccess, dispatch, singleWorkspace]);

    useEffect(() => { 
        // adding document to workspace success
        if(isAddDocumentSuccess && selectedDocument){
            const DOC_TEMP_REMOVE ={
                "id": selectedDocument._id
            }
            
            setUnableLink(true);
            setCount(5);
            const user_data = {
                userId: user.data._id
            }

            setTimeout(() => {
                dispatch(removeDocumentFromRil(DOC_TEMP_REMOVE));
                setUnableLink(false);
                setWorkspaceNameInput('')                
            }, 3000);
            setTimeout(() => {
                dispatch(getWorkspaceCollections(user_data))
            }, 3010);
        }
    }, [ isAddDocumentSuccess, selectedDocument])  

    useEffect(() => {
        if(isWpcollectionsSuccess && isAddDocumentSuccess){
            console.log('@@_@@')
            setSimilarityUpdates(prevKey => prevKey + 1);
        }
    }, [wpcollections, isWpcollectionsSuccess, isAddDocumentSuccess]);

    const createNewWorkspaceHandler = (docData) => {
        const wp_data = {
            "name": workspaceNameInput,
            "queryName": docData.queryName,
            'userId': user.data._id
        }        
        console.log(wp_data)
        setSelectedDocument(docData)
        setVisibleComponent((prev) => ({
            ...prev,
            [docData._id]: false,
        }));
        setCreateNew(true)
        setCount(5);
        dispatch(createWorkspace(wp_data));
    }

    useEffect(() => {
        if (count !== null && count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [count]);

    // move document into created workspace
    useEffect(()=> {        
        if(isWorkpsaceDetailSuccess && selectedDocument){
            console.log('this is the detail of newly created workspace_', singleWorkspace)
            const q_id = singleWorkspace.queries[0]._id
            const wp_data = singleWorkspace.workspace
            moveDocumentToWorkspace(wp_data, selectedDocument , q_id)
        }        
    }, [isWorkpsaceDetailSuccess, singleWorkspace, dispatch, selectedDocument])

    const redirectToSlectedWsp = () => {  
        // console.log(singleWorkspace.queries)      
        // navigate('/workspace/' + singleWorkspace.queries[0]._id)
        navigate('/workspace/' + singleWorkspace.workspace._id)
    }

    const moveDocumentToWorkspace = (wsp, docData, qid) => {
        if(docData !== null){
            const DOC_TEMP ={            
                "userId": user.data._id,
                "workspaceId": wsp._id,
                "queryId":  qid,
                "documentId": docData.documentId,
                "title": docData.title,
                "doc_type": docData.doc_type,
                "doc_authors": docData.doc_authors,
                "doc_abstract": docData.doc_abstract,
                "doc_date": docData.doc_date,
                "doc_thumbnail": docData.doc_thumbnail,
                "thumbnail_type": docData.thumbnail_type,
                "doc_partof": docData.doc_partof,
                "doc_peerreview": docData.doc_peerreview,
                "doc_openaccess": docData.doc_openaccess,
                "doc_fulltext": docData.doc_fulltext,
                "doc_onlineaccess": docData.doc_onlineaccess,
                "doc_getPdf": docData.doc_getPdf,
                "doc_downloadPdf": docData.doc_downloadPdf,
                "doc_url":docData.doc_url
            }
    
            console.log('DOC_TEMP_ ', DOC_TEMP)
            console.log("** ... moving document into the workspace ... ** ")
            dispatch(saveDocumentToWorkspace(DOC_TEMP))
        }
    }

    const handleDocumentMoved = (docId) => {
        setVisibleComponent((prev) => ({
            ...prev,
            [docId]: false,
        }));
    };

    return (
        <div>              
            <HeaderComponent /> 
            {isRilLoading && <div><Loading /></div> }
            <div className={`mt_22`}>
                <div className={`flex items-center px-6 py-3 nav_wrap`} >
                    <div className='flex items-center cursor-pointer hover:text-indigo-800 transition ease-out' onClick={backToHome}>
                        <FaChevronLeft />
                        <p className='text-sm ml-2'>Dashboard</p>
                    </div>
                    <span className='px-3 text-sm'>/</span>
                    <p className='text-sm'>RIL</p>
                </div>
                <div className='main_element_container'>
                    <div>
                        <div className='flex items-center mr-4 mb-4'>
                            <FaRegFileLines className={`text-xl mr-2 ${rilStyles.doc_default_color}`} /> 
                            <span className='text-sm font-semibold'>Total Documents: {ril_documents.length} </span>
                        </div>
                        {ril_documents.length !== 0 && 
                            <>
                                {ril_documents.map((data, index) => (
                                    <div key={data._id} className={`w-full grid grid-cols-8 mb-8 p-8 border rounded-lg`}>
                                        <div className='col-span-5 pr-5'>
                                            <div className='mb-5 flex items-center'>
                                                <FaMagnifyingGlass className={`mr-2 ${rilStyles.query_icon_default_color}`}/>
                                                <span className='mr-3 text-sm text-slate-500'>{data.queryName}</span>
                                                <span className='block_element'></span>
                                                <span className='mx-3 text-sm text-slate-500'>{data.createdAt.split('T')[0]}</span>
                                            </div>
                                            <div className={`
                                                ${visibleComponent[data._id] !== false ? '' : 'pointer-events-none cursor-not-allowed'}
                                            `}>
                                                <DocumentComponent listings={data} queryDetail={'type'}/>
                                            </div>
                                        </div>
                                        <div className='col-span-3 ml-4 relative'>  
                                            {isWpcollectionsSuccess && <>
                                                {wpcollections.length !== 0 &&                                                                           
                                                <SimilarityComponent 
                                                    wpRender={similarityUpdates}
                                                    collections={wpcollections} 
                                                    docId={data._id} 
                                                    docTitle={data.title} 
                                                    docData={data}
                                                    onDocumentMoved={() => handleDocumentMoved(data._id)}/>  
                                                }
                                            </>}
                                           
                                            {visibleComponent[data._id] !== false && 
                                                <CreateWorkspaceFormComponent
                                                    docData={data}
                                                    currentDocID={currentDocID}
                                                    setCurrentDocID={setCurrentDocID}
                                                    isCreateWorkspace={isCreateWorkspace}
                                                    setIsCreateWorkspace={setIsCreateWorkspace}
                                                    workspaceNameInput={workspaceNameInput}
                                                    setWorkspaceNameInput={setWorkspaceNameInput}
                                                    user={user}
                                                    dispatch={dispatch}
                                                    setSelectedDocument={setSelectedDocument}
                                                    createNewWorkspaceHandler={createNewWorkspaceHandler}
                                                    onDocumentMoved={() => handleDocumentMoved(data._id)}
                                                />
                                            }
                                            {(visibleComponent[data._id] === false && createNew) && <>
                                                <p className='mb-3 font-semibold'>
                                                    <span className='italic bold'>"{workspaceNameInput}"</span> workspace is created and document has moved into it
                                                </p>

                                                <div className={`
                                                    border-2 rounded-lg px-4 py-2.5 mb-3 cursor-pointer border-green-600 pointer-events-none`}>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='capitalize'>{workspaceNameInput} </p>
                                                        <FaRegCheckCircle className={`text-green-600 text-lg ${rilStyles.success_animation}`} />
                                                    </div>
                                                </div>

                                                {/* <p onClick={redirectToSlectedWsp} className={`hover:underline cursor-pointer transition ease-out
                                                    ${!isAddDocumentSuccess ? 'pointer-events-none' : 'text-blue-600'}
                                                `} */}
                                                <p onClick={redirectToSlectedWsp} className={`hover:underline cursor-pointer transition ease-out
                                                    ${unableLink ? 'text-blue-600' : 'pointer-events-none'}
                                                `}
                                                    
                                                >
                                                    See ... <span className='italic'> {workspaceNameInput} </span> workspace
                                                </p>

                                                {count !== null && 
                                                    <div className="text-slate-500 flex justify-end mt-5">
                                                        <FaInfoCircle className='mr-2 mt-1' />
                                                        <p className='pr-2'>Document will be removed from RIL list in a few seconds </p>
                                                        {/* <p className='w-6'> {count} s</p> */}
                                                    </div>
                                                }
                                            </>
                                            }

                                            
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default RilDetailViewComponent;