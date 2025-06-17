import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import rilStyles from './Ril.module.css'
import { BsJournalArrowDown } from "react-icons/bs";
import { FaRegCheckCircle, FaInfoCircle } from "react-icons/fa";

import { getSimilarityScore, removeDocumentFromRil } from '../../features/RIL/rilSlice';
import { saveDocumentToWorkspace } from '../../features/Document/documentSlice';
import {createQuery, resetQueryCreateSuccess, getWorkspaceDetails, resetWorkspaceDetailSuccess} from '../../features/workspace/workspaceSlice'

import { BsDashSquareFill } from "react-icons/bs";

function SimilarityComponent({collections, docId, docTitle, docData, onDocumentMoved, wpRender}) {
    const {user} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {similarity_score, isScoreSuccess} = useSelector((state) => state.ril);    
    const { isAddDocumentSuccess } = useSelector((state) => state.document);
    const { isQueryCreateSuccess, singleQuery, singleWorkspace, isWorkpsaceDetailSuccess } = useSelector((state) => state.workspace);    

    const [similarityResult, setSimilarityResult] = useState([])
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [ isMoved, setIsMoved ] = useState(false)
    const [ selectedWsp, setSelectedWsp ] = useState("")  
    const [ count, setCount ] = useState(null);  
    
    useEffect(() => {
        if (count !== null && count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [count]);

    useEffect(() => {
        if (docId && docTitle) {
            const temp = {
                'docId': docId,
                'documentTitle': docTitle,
                'documentAbstract': docData.doc_abstract,
                'folders': collections
            }
            // console.log(temp)
            dispatch(getSimilarityScore(temp))
        }
    }, [docId, wpRender, dispatch]);   

    useEffect(() => {
        if(isScoreSuccess){
            console.log('similarity score: ', similarity_score[docId])   
            setSimilarityResult(similarity_score[docId] )
        }
    }, [isScoreSuccess])

    const res = similarity_score[docId] || []; 

    const moveDocumentToWorkspace = (wsp, qID) => {        
        if(docData !== null){
            const DOC_TEMP ={            
                "userId": user.data._id,
                "workspaceId": wsp.workspaceId,
                "queryId":  qID,
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
            
            dispatch(saveDocumentToWorkspace(DOC_TEMP))
            onDocumentMoved(docId);
        }
    } 

    const isQueryExist = (wID) => {
        dispatch(getWorkspaceDetails(wID));
    }

    const addDocumentToWorkspace = (wsp) => {
        console.log(wsp)
        isQueryExist(wsp.workspaceId)
         
        onDocumentMoved(docId)
        setSelectedWsp(wsp)
        setIsMoved(true); 
        setCount(5);
    }

    useEffect(() => {         
        if(isQueryCreateSuccess && selectedWsp){
            console.log('query is created, now move doc under this query', singleQuery._id)
            moveDocumentToWorkspace(selectedWsp, singleQuery._id)
            dispatch(resetQueryCreateSuccess())
        }
        if(isAddDocumentSuccess && selectedWsp){
            const DOC_TEMP_REMOVE ={
                "id": docId
            }
            
            setTimeout(() => {
                dispatch(removeDocumentFromRil(DOC_TEMP_REMOVE));
            }, 5000);
        }
        if(isWorkpsaceDetailSuccess && selectedWsp){
            const queryData = singleWorkspace.queries
            console.log(queryData)
            console.log(selectedWsp.workspace)
            const queryIndex = queryData.findIndex(item => item.query === docData.queryName);
            if (queryIndex !== -1) {
                console.log(`Query exists at index ${queryIndex}`);
                
                moveDocumentToWorkspace(selectedWsp, queryData[queryIndex]._id)
                dispatch(resetWorkspaceDetailSuccess());
            } else {
                console.log('Query does not exist');
                dispatch(resetWorkspaceDetailSuccess());
                const newQueryData = {
                    'query': docData.queryName,
                    'userId': user.data._id,
                    'workspaceId': selectedWsp.workspaceId,
                    'workspaceName': selectedWsp.workspace,
                    'documents': []
                }
                dispatch(createQuery(newQueryData))
            }
        }
    }, [ isQueryCreateSuccess, singleQuery, selectedWsp, isAddDocumentSuccess, isWorkpsaceDetailSuccess])  

    const redirectToSlectedWsp = () => {        
        navigate('/workspace/' + selectedWsp.workspaceId)
    }

    return (
        <>
            <p className='mb-3 font-semibold'>
                {!isMoved ? <>Your workspaces</> : <>Document has moved into <span className='italic bold'>"{selectedWsp.workspace}"</span> workspace</>}
            </p>
            {res !== undefined && (
                <>
                    {res.length !== 0 && (
                        <>
                            {res
                                .filter(wsp => wsp.score > 0) // only show workspaces with score > 0
                                .map((wsp, index) => (
                                    <div
                                        key={`${docId}_${index}`}
                                        className={`
                    border-2 rounded-lg px-4 py-2.5 mb-3 cursor-pointer 
                    ${rilStyles.wsp_container}
                    ${isMoved && selectedWsp.workspace !== wsp.workspace ? rilStyles.hiddendivs : rilStyles.visibledivs}
                    ${isMoved && selectedWsp.workspace === wsp.workspace ? 'border-green-600 pointer-events-none' : ''}
                  `}
                                        onMouseOver={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={() => addDocumentToWorkspace(wsp)}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <p className='capitalize'>{wsp.workspace}</p>
                                            {isMoved && selectedWsp.workspace === wsp.workspace ? (
                                                <FaRegCheckCircle className={`text-green-600 text-lg ${rilStyles.success_animation}`} />
                                            ) : (
                                                <BsJournalArrowDown className={`ml-4 ${hoveredIndex === index ? rilStyles.shake_animation : ''}`} />
                                            )}
                                        </div>
                                        <div className='flex items-center mt-3'>
                                            <div className={rilStyles.base_progressbar}>
                                                <div className={rilStyles.percent_progressbar} style={{ width: `${(wsp.score * 100).toFixed(2)}%` }}></div>
                                            </div>
                                            <p>{(wsp.score * 100).toFixed(2)} %</p>
                                        </div>
                                    </div>
                                ))}
                            {count !== null && (
                                <>
                                    <p onClick={redirectToSlectedWsp} className='text-blue-600 hover:underline cursor-pointer transition ease-out'>
                                        See <span className='italic'>{selectedWsp.workspace}</span> workspace
                                    </p>
                                    <div className="justify-end mt-5 text-slate-500 flex">
                                        <FaInfoCircle className='mr-2 mt-1' />
                                        <p className='pr-2'> Document will be removed from RIL list in a few seconds </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );

}

export default SimilarityComponent;