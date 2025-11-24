import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBookmark, FaChevronLeft, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

import Loading from "../../components/Loading/Loading";
import Header from '../../components/Header/Header';
import RenderDocumentThumbnail from "../../components/Document/DocumentThumbnail";
import SERPDocumentComponent from "./SerpDocumentComponent";
import ChatComponent from "../../components/Chat/ChatComponent";

import { getSearchResultLists, resetSearchResults, getDocumentThumbnailUrl } from '../../features/contents/contentResultsSlice';
import { createQuery, getQueryDetails, resetWorkspaceData } from "../../features/workspace/workspaceSlice";
import {
    saveDocumentToWorkspace, 
    removeDocumentFromWorkspace, 
    getDocumentListsByQueryId, 
    setDocumentArraySuccess, 
    setDocumentAddedSuccess, 
    setDocumentRemovedSuccess,
    resetDocument,
    } from '../../features/Document/documentSlice';
import { getRilDocumentLists, resetRilData, getRilDocumentCount, saveDocumentToRil, removeDocumentFromRil } from "../../features/RIL/rilSlice";

import styles from "./ContentListings.module.css";
import SearchComponent from "../../components/Search/Search";

import { isbn_url } from "../../config/env";

function ContentListsComponent() {
    const dispatch = useDispatch();     
    const navigate = useNavigate(); 
    const scrollToTopRef = useRef();

    const {contents, isSERPLoading,  isNewSearchKeyword, isLoading, isError, message, thumbnail} = useSelector((state) => state.content)
    const { isQueryDetailSuccess, queryDetailObject, singleQuery, quries, isQueryCreateSuccess} = useSelector((state) => state.workspace);
    const {documents, isDocumentArraySuccess, isAddDocumentSuccess, isRemoveDocumentSuccess} = useSelector((state) => state.document);
    const { ril_documents, isRilArraySuccess, isAddToRilSuccess, isRemoveFromRilSuccess } = useSelector((state) => state.ril);
    
    const {workspaceId} = useParams();
    const {queryId} = useParams();  
    const {user} = useSelector((state) => state.auth);      
       
    const [currentWorkspace, setCurrentWorkspace] = useState("");
    const [capturedDocs, setCapturedDocs] = useState([])
    const [capturedRilDocs, setCapturedRilDocs] = useState([])
    
    const [isDocSaved, setIsDocSaved] = useState(false)
    const [tempDocs, setTempDoc] = useState([])
    const [tempRils, setTempRils] = useState([])
    
    const limitperpage = 10;
    const initialPagination = {"offset": 0, "limit": limitperpage}

    const QUERY_STRING = localStorage.getItem('query')
    const CURRENT_WORKSPACENAME = localStorage.getItem('wpname')
    
    const redirectToWorkspace = () => { 
        console.log('redirect to workspace')
        // resetDocumentSuccessStatus()
        redirectResetValues()
        navigate('/workspace/' + workspaceId)
    }

    const redirectToDashboard = () => {
        redirectResetValues()
        navigate('/')
    }

    const redirectResetValues = () => {
        dispatch(resetSearchResults())
        dispatch(resetWorkspaceData())
        localStorage.removeItem('query')
        localStorage.removeItem('wpname')
    }

    const resetDocumentSuccessStatus = () => {
        dispatch(setDocumentArraySuccess(false))
        dispatch(setDocumentAddedSuccess(false))
        dispatch(setDocumentRemovedSuccess(false))
    }

    /**
     * initialization
     */        
    useEffect(() => {
        if(isError) {
            console.log(message)
        }
        
        console.log(QUERY_STRING)
        const QUERY_STRING1 = localStorage.getItem('query')
        // const CURRENT_WORKSPACENAME = localStorage.getItem('wpname')
        if(QUERY_STRING1 !== null){
            const SERP_REQUEST = {
                "query": QUERY_STRING1,
                "offset": initialPagination.offset,
                "limit": initialPagination.limit
            }
                      
            dispatch(getSearchResultLists(SERP_REQUEST))        
             
            const query_temp = {
                "workspaceId": workspaceId,
                "queryId": queryId
            }
            
            dispatch(getQueryDetails(query_temp))
        }                       
        
        return() => {
            dispatch(resetSearchResults())
            dispatch(resetDocument())
            dispatch(resetWorkspaceData())
            dispatch(resetRilData())
            resetDocumentSuccessStatus()
        }
    }, [message, dispatch, QUERY_STRING]) 
    

    /**
     * current search query is detected, ready to call the search 
     */
    useEffect(() => {
        console.log('isQueryDetailSuccess_', isQueryDetailSuccess)
        if(isQueryDetailSuccess){
            console.log('TT~TT ' , queryDetailObject)
            setCapturedDocs(queryDetailObject.documents)
            setCurrentWorkspace(queryDetailObject.workspaceName)            
            
            localStorage.setItem('wpname', queryDetailObject.workspaceName)
            const user_data = {
                'userId': user.data._id
            }
            dispatch(getRilDocumentLists(user_data))       
        }        
    }, [isQueryDetailSuccess]) 

    useEffect(() => {
        console.log('isRilArraySuccess_', isRilArraySuccess)
        if(isRilArraySuccess){
            console.log('RIL list _' , ril_documents)
            setCapturedRilDocs(ril_documents)
            if(ril_documents.length !== 0){
                const documentIds = ril_documents.map(doc => doc._id);
                setTempRils(documentIds);
            }
        }        
    }, [isRilArraySuccess]) 
    

    /**
     * new keyword detected and create query with new keyword
     * start of keyword and query create function
     */
    useEffect(() => {
        console.log('isNewSearchKeyeword detected', isNewSearchKeyword)
        console.log(currentWorkspace)
        if(isNewSearchKeyword !== null){
            const newQueryData = {
                'query': isNewSearchKeyword.keyword,
                'userId': user.data._id,
                'workspaceId': workspaceId,
                'workspaceName': currentWorkspace,
                'documents': []
            }
            
            console.log(newQueryData)
            dispatch(createQuery(newQueryData))
        }           
    }, [isNewSearchKeyword])

    useEffect(() => {
        console.log('isQueryCreateSuccess_', isQueryCreateSuccess)
        console.log('singleQuery_ updates_' , singleQuery)
        setCapturedRilDocs([])
        if(isQueryCreateSuccess){
            console.log('* isQueryCreateSuccess_', isQueryCreateSuccess)
            console.log('qureis', quries)
            // setQueryOfCurrentTask(singleQuery)
            // setCapturedDocs(singleQuery.documents)
            navigate('/task/' + workspaceId + '/' + singleQuery._id)
        }

    }, [isQueryCreateSuccess, singleQuery]) 
    /**
     * new keyword detected and create query with new keyword
     * end of keyword and query create function
     */
 

    /**
     * Add or remove documents into workspace & RIL
     * start of function
     */
    const highlightBookmark = (doc, type) => {                
        if(type !== 'ril'){
            if(capturedDocs.length !== 0){
                const recordId = doc.pnx.control.recordid[0]
                const selectedDocObject = capturedDocs.find(item => item.documentId === recordId);
                const ids = capturedDocs.map(doc => doc.documentId);        
                const index = ids.indexOf(recordId); 
                
                console.log(ids)
                console.log(index)

                if(index === -1){
                    console.log('add ~')
                    setIsDocSaved(true)
                    setTempDoc(prev => [...prev, doc.pnx.control.recordid[0]])
                    addOrRemoveDocuments(doc, undefined)
                }else{
                    console.log('remove ~')
                    setIsDocSaved(false)
                    setTempDoc(prev => prev.filter(id => id !== recordId));
                    const updatedDocs = [...capturedDocs];                    
                    updatedDocs.splice(index, 1);                    
                    setCapturedDocs(updatedDocs);
                    
                    
                    console.log(capturedDocs)
                    console.log(tempDocs)
                    addOrRemoveDocuments(doc, selectedDocObject)
                }
            }else{
                setIsDocSaved(true)
                setTempDoc(prev => [...prev, doc.pnx.control.recordid[0]])
                addOrRemoveDocuments(doc, undefined)
                console.log(tempDocs)
            } 
        }else{
            if(capturedRilDocs.length !== 0){
                const recordId = doc.pnx.control.recordid[0]
                const selectedDocObject = capturedRilDocs.find(item => item.documentId === recordId);
                const ids = capturedRilDocs.map(doc => doc.documentId);        
                const index = ids.indexOf(recordId); 
    
                if(index === -1){
                    console.log('add ril ~')   
                    setTempRils(prev => [...prev, doc.pnx.control.recordid[0]])    
                    console.log(tempRils, doc.pnx.control.recordid[0])                                 
                    addOrRemoveRils(doc, undefined)
                }else{
                    console.log('remove ril ~', selectedDocObject)
                    console.log(tempRils)
                    setTempRils(prev => prev.filter(id => id !== recordId));
                    const updatedRils = [...capturedRilDocs];                    
                    updatedRils.splice(index, 1);                    
                    setCapturedRilDocs(updatedRils);

                    addOrRemoveRils(doc, selectedDocObject)
                }
            }else{
                addOrRemoveRils(doc, undefined)
            }
        }        
        
    }

    const buildFullDisplayUrl = (doc1) => {
        const baseUrl =
            "https://casls-regina.primo.exlibrisgroup.com/discovery/fulldisplay?";
        const docid = doc1.pnx.control.recordid[0];
        const context = doc1.context; // e.g., "L"
        const vid = "01CASLS_REGINA:01CASLS_REGINA";
        const lang = "en";
        const search_scope = "MyInst_and_CI";
        const adaptor = doc1.adaptor; // e.g., "Local Search Engine"
        const tab = "Everything";
        const query = "any,contains,data";
        const mode = "Basic";
        return `${baseUrl}docid=${docid}&context=${context}&vid=${vid}&lang=${lang}&search_scope=${search_scope}&adaptor=${encodeURIComponent(
            adaptor
        )}&tab=${tab}&query=${query}&mode=${mode}`;
    };

    const addOrRemoveDocuments = (doc, selectedDoc) => { 
        console.log('add or remove doc')
        console.log(doc)
        console.log(selectedDoc)
        console.log('temp_', tempDocs)

        if(selectedDoc !== undefined){            
            const DOC_TEMP_REMOVE ={
                "documentId": selectedDoc._id,                                
                "workspaceId": workspaceId,
                "queryId": queryId
            }
    
            console.log('DOC_TEMP_REMOVE ', DOC_TEMP_REMOVE)
            dispatch(removeDocumentFromWorkspace(DOC_TEMP_REMOVE))            
        }else{
            console.log("**", doc.delivery)
            const DOC_TEMP ={
                "documentId": doc.pnx.control.recordid[0],
                "userId": user.data._id,
                "workspaceId": workspaceId,
                "queryId": queryId,
                "title": doc.pnx.display.title[0],
                "doc_type": doc.pnx.display.type[0],
                "doc_authors": doc.pnx.addata.au,
                "doc_abstract": (doc.pnx.addata.abstract !== undefined) ? doc.pnx.addata?.abstract[0] : '',
                "doc_date": (doc.pnx.display.creationdate !== undefined) ? doc.pnx.display.creationdate : doc.pnx.facets.creationdate,                
                "doc_thumbnail" : (doc.pnx.addata.isbn !== undefined) ? doc.pnx.addata.isbn[0] : (doc.pnx.addata.doi !== undefined) ? doc.pnx.addata.doi[0] : undefined,
                "thumbnail_type": (doc.pnx.addata.isbn !== undefined) ? 'isbn' : (doc.pnx.addata.doi !== undefined) ? 'doi' : undefined,
                "doc_partof": (doc.pnx.display.ispartof !== undefined) ? doc.pnx.display.ispartof[0] : '', 
                "doc_peerreview" : (doc.pnx.display.lds50 !== undefined) ? true : false,
                "doc_openaccess": (doc.pnx.addata.oa !== undefined) ? true : false,
                "doc_fulltext": (doc.delivery !== undefined) ? doc.delivery.availability[0] : undefined,
                "doc_onlineaccess": '',
                "doc_getPdf": '',
                "doc_downloadPdf": '',
                "doc_url":buildFullDisplayUrl(doc)
            }
    
            console.log('DOC_TEMP_ ', DOC_TEMP)
            
            dispatch(saveDocumentToWorkspace(DOC_TEMP))
        }
    }

    const addOrRemoveRils = (doc, selectedDoc) => {
        console.log('add or remove ril')
        resetDocumentSuccessStatus();

        if(selectedDoc !== undefined){                        
            const DOC_TEMP_REMOVE ={
                "id": selectedDoc._id
            }
    
            console.log('DOC_TEMP_REMOVE ', DOC_TEMP_REMOVE)
            dispatch(removeDocumentFromRil(DOC_TEMP_REMOVE))            
        }else{            
            const DOC_TEMP ={
                "documentId": doc.pnx.control.recordid[0],
                "userId": user.data._id,
                // "queryName": queryDetailObject.query,
                "queryName": QUERY_STRING,
                "queryId": queryDetailObject._id,
                "title": doc.pnx.display.title[0],
                "doc_type": doc.pnx.display.type[0],
                "doc_authors": doc.pnx.addata.au,
                "doc_abstract": (doc.pnx.addata.abstract !== undefined) ? doc.pnx.addata.abstract[0] : '',
                "doc_date": (doc.pnx.display.creationdate !== undefined) ? doc.pnx.display.creationdate : doc.pnx.facets.creationdate,                
                "doc_thumbnail" : (doc.pnx.addata.isbn !== undefined) ? doc.pnx.addata.isbn[0] : (doc.pnx.addata.doi !== undefined) ? doc.pnx.addata.doi[0] : undefined,
                "thumbnail_type": (doc.pnx.addata.isbn !== undefined) ? 'isbn' : (doc.pnx.addata.doi !== undefined) ? 'doi' : undefined,
                "doc_partof": (doc.pnx.display.ispartof !== undefined) ? doc.pnx.display.ispartof[0] : '', 
                "doc_peerreview" : (doc.pnx.display.lds50 !== undefined) ? true : false,
                "doc_openaccess": (doc.pnx.addata.oa !== undefined) ? true : false,
                "doc_fulltext": (doc.delivery !== undefined) ? doc.delivery.availability[0] : undefined,
                "doc_onlineaccess": '',
                "doc_getPdf": '',
                "doc_downloadPdf": '',
                "doc_url":buildFullDisplayUrl(doc)
            }
    
            console.log('DOC_TEMP_ ', DOC_TEMP)
            
            dispatch(saveDocumentToRil(DOC_TEMP))
        }
    }    
    
    useEffect(() => { 
        console.log('add ril_', isAddToRilSuccess)       
        if(isAddToRilSuccess || isRemoveFromRilSuccess){
            console.log('ril is added_')
            const user_data = {
                'userId': user.data._id
            }
            dispatch(getRilDocumentLists(user_data))
            dispatch(getRilDocumentCount(user_data))
        }
    }, [ isAddToRilSuccess, isRemoveFromRilSuccess ])  
    
    useEffect(() => {        
        console.log('isDocumentArraySuccess_', isDocumentArraySuccess)
        console.log('documents updates_', documents)
        console.log('ril docs are_ ', capturedRilDocs)
        if(isAddDocumentSuccess || isRemoveDocumentSuccess){
            console.log('add/remove doc is true')
            const query_temp = {
                "workspaceId": workspaceId,
                "queryId": queryId
            }
            
            dispatch(getDocumentListsByQueryId(query_temp))
            
        }
        
        if(isDocumentArraySuccess){
            console.log('doc has updated_', documents)            
            setCapturedDocs(documents)
            // setCurrentWorkspace(queryDetailObject.workspaceName)           
        }
    }, [ isAddDocumentSuccess, isRemoveDocumentSuccess, isDocumentArraySuccess])
    /**
     * Add or remove documents into workspace & RIL
     * end of function
     */        

    const paginationHandler = ({selected}) => {
        console.log(selected)
        
        const skip = (limitperpage * selected ) ;                              

        const SERP_REQUEST = {
            "query": queryDetailObject.query,
            "offset": skip,
            "limit": limitperpage
        }

        console.log(SERP_REQUEST)

        if(skip < 2000){
            dispatch(getSearchResultLists(SERP_REQUEST))
            // scrollToTopRef.current?.scrollIntoView({
            //     behaviour: 'smooth'
            // })     
            
            if (scrollToTopRef.current) {
                scrollToTopRef.current.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to top of the container
            }
        }else{
            alert('offset is over the limit the Primo API can handle. The recomended maximim offset is 2000.')
        }
    }        

    return (
        <div>      
            <Header />      
            
            {/* search results */}            
            <div className="mt_22">  
                <div className={`flex items-center px-6 py-3 nav_wrap`} >
                    <div className='flex items-center cursor-pointer hover:text-indigo-800 transition ease-out' onClick={redirectToDashboard}>
                        <FaChevronLeft />
                        <p className='text-sm ml-2'>Dashboard</p>
                    </div>
                    <span className='px-3 text-sm'>/</span>
                    <div className='flex items-center cursor-pointer hover:text-indigo-800 transition ease-out' onClick={redirectToWorkspace}>                        
                        <p className='text-sm ml-2'> Workspace: {CURRENT_WORKSPACENAME}</p>  
                    </div>
                    <span className='px-3 text-sm'>/</span>
                    <p className='text-sm'>Search results</p>                 
                </div>              
                
                {isSERPLoading && <div><Loading /></div> }
                <> 
                    <div className="my-6 mx-36 flex items-center relative">
                        <h3 className="text-lg font-bold">
                            Search Results:
                            {contents.docs?.length > 0 ? (
                                <span className="pl-2">
                                    {Number(contents.info?.total).toLocaleString()}
                                </span>
                            ) : (
                                <span className="pl-2">0</span>
                            )}
                        </h3>
                        {QUERY_STRING !== null && 
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <SearchComponent/>
                            </div>
                        }
                    </div>
                    {contents.docs?.length > 0 &&
                        <> 
                            <div ref={scrollToTopRef} className={`${styles.listing_container}`}>     
                                
                                {contents.docs.map((data) => (                                    
                                    <div key={data.pnx.control.recordid[0]} className={`flex ${styles.cmb_4}`}>
                                        
                                        <div>
                                            <div className={`bg-slate-50 border flex ${styles.book_cover}`}>  
                                                {data.pnx.addata.isbn !== undefined ?
                                                    <>       
                                                        {/* X_X                                                          */}
                                                        <img
                                                            className={`object-contain w-full h-full`}
                                                            src={isbn_url + data.pnx.addata.isbn[0] + '/sc.jpg'}
                                                            alt="Document Thumbnail"
                                                        />
                                                    </> :
                                                    <>
                                                        {data.pnx.addata.doi !== undefined &&
                                                            <>
                                                                {/* @_@ */}
                                                                <RenderDocumentThumbnail doi={data.pnx.addata.doi[0]} docType="others" />
                                                            </> 
                                                        }
                                                    </>
                                                }
                                            </div>
                                            <div>
                                                <div className='mt-2 justify-between'>
                                                    <div className={`
                                                        relative mb-2 
                                                        ${styles.has_tooltip}
                                                        ${capturedRilDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? 'pointer-events-none opacity-60' : ''}
                                                        `}>
                                                        <div onClick={() => highlightBookmark(data, 'workspace')} 
                                                            className={`cursor-pointer items-center border border-2 rounded-md relative 
                                                            ${capturedDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? styles.highlighted_bookmark_icon : styles.bookmark_bg} 
                                                            ${tempDocs.includes(data.pnx.control.recordid[0]) ? styles.highlighted_bookmark_icon : ''}` }>
                                                            <p className={`uppercase text-sm text-center font-semibold 
                                                                ${capturedDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? 'text-white' : 'text-slate-500'}
                                                                ${tempDocs.includes(data.pnx.control.recordid[0]) ? 'text-white' : 'text-slate-500'}`}>Save</p>
                                                            <FaBookmark className={`absolute top-0 right-0 ${styles.ril_icon} 
                                                            ${capturedDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? styles.highlighted_bookmark_icon : ''}
                                                            ${tempDocs.includes(data.pnx.control.recordid[0]) ? styles.highlighted_bookmark_icon : ''}`} />
                                                        </div>
                                                        
                                                        <span className={`rounded text-xs text-center absolute z-10 shadow-lg p-1 bg-gray-100 text-slate-500 -mt-8 ${styles.tooltip_bookmark}`}>
                                                            Save Document
                                                        </span>
                                                    </div>
                                                    {/*<div onClick={() => highlightBookmark(data, 'ril')} */}
                                                    {/*    className={`*/}
                                                    {/*        relative */}
                                                    {/*        ${styles.has_tooltip}*/}
                                                    {/*        ${capturedDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? 'pointer-events-none opacity-60' : ''} */}
                                                    {/*        ${tempDocs.includes(data.pnx.control.recordid[0]) ? 'pointer-events-none opacity-60' : ''}*/}
                                                    {/*    `}>*/}
                                                    {/*    <div className={`*/}
                                                    {/*        cursor-pointer items-center border border-2 rounded-md relative */}
                                                    {/*        ${capturedRilDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? styles.ril_wrap + ' ' + styles.highlighted_bookmark_icon : styles.ril_wrap}*/}
                                                    {/*        ${tempRils.includes(data.pnx.control.recordid[0]) ? styles.ril_wrap + ' ' + styles.highlighted_bookmark_icon : styles.ril_wrap}*/}
                                                    {/*        `}>*/}
                                                    {/*        <FaBookmark className={`absolute top-0 right-0 ${styles.ril_icon} */}
                                                    {/*            ${capturedRilDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? styles.highlighted_bookmark_icon : ''}*/}
                                                    {/*            ${tempRils.includes(data.pnx.control.recordid[0]) ? styles.highlighted_bookmark_icon : '' }*/}
                                                    {/*        `} />*/}
                                                    {/*        <p className={`uppercase text-sm text-center font-semibold */}
                                                    {/*            ${capturedRilDocs.find(doc => doc.documentId === data.pnx.control.recordid[0]) ? 'text-white' : 'text-slate-500'}*/}
                                                    {/*            ${tempRils.includes(data.pnx.control.recordid[0]) ? 'text-white' : 'text-slate-500' }*/}
                                                    {/*        `}>ril</p>*/}
                                                    {/*    </div>*/}
                                                    {/*    <span className={`rounded absolute text-xs text-center shadow-lg p-1 bg-gray-100 text-slate-500 -mt-8 ${styles.tooltip_ril}`}>Read It Later</span>*/}
                                                    {/*</div>*/}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <SERPDocumentComponent doc={data} />
                                    </div>
                                ))}

                                <div>
                                {contents.info?.total !== undefined && 
                                    <>
                                        {contents.info?.total > 10 && 
                                            <ReactPaginate
                                                breakLabel={
                                                    <span className='mr-4 ml-3'>...</span>
                                                }
                                                nextLabel={
                                                    <span className='w-10 h-10 flex items-center justify-center bg-slate-100 rounded-md ml-3'>
                                                        <FaAngleRight />
                                                    </span>
                                                }
                                                onPageChange={paginationHandler}
                                                pageRangeDisplayed={5}
                                                pageCount={Math.ceil(contents.info.total / limitperpage)}
                                                previousLabel={
                                                    <span className='w-10 h-10 flex items-center justify-center bg-slate-100 rounded-md mr-3'>
                                                        <FaAngleLeft />
                                                    </span>
                                                }
                                                containerClassName='flex items-center justify-center mt-8 mb-4'
                                                pageClassName='block border border-slate-400 pagination_element m-1 flex items-center justify-center rounded-md hover:text-white hover:bg-indigo-500'
                                                activeClassName='bg-indigo-800 text-white'
                                            />
                                        
                                        }
                                    </>
                                }
                                </div>
                            </div>
                        </>
                    }
                    {contents.info?.total === 0 && 
                        <div className={`${styles.listing_container}`}>     
                            No document has found.
                        </div>
                    }
                </>
            </div>
            {/* Chat Box */}
            <ChatComponent 
                currentUsername={user?.data?.username || ''}
                currentUserIndex={0}
            />
        </div>
    )
}

export default ContentListsComponent;