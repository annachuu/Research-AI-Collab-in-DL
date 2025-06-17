import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaBookmark, FaFileArrowDown, FaRegSquarePlus, FaRightLeft, FaMagnifyingGlass, FaRegFileLines } from "react-icons/fa6";

import HeaderComponent from "../../components/Header/Header";
import DocumentComponent from "../../components/Document/DocumentComponent";
import RenderDocumentThumbnail from '../../components/Document/DocumentThumbnail';
import default_thumbnail from '../../assets/default_thmbnail.png'
import Loading from '../../components/Loading/Loading';
import SimilarityComponent from './SimilarityResults';

import { getRilDocumentLists, removeDocumentFromRil, resetRilData } from '../../features/RIL/rilSlice';
import { getAllWorkspaces, resetWorkspaceData, getQueryIdsLists, setIsQueryIdsSuccess, createQuery, createWorkspace, setIsWorkspaceCreateSuccess, getWorkspaceDetails, getWorkspaceCollections } from '../../features/workspace/workspaceSlice';
import { saveDocumentToWorkspace, setDocumentAddedSuccess } from '../../features/Document/documentSlice';

import styles from '../DocumentSearchResults/ContentListings.module.css';
import rilStyles from './Ril.module.css'

function ScoreComponent({collections, docId, docTitle}) {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    const {ril_documents, isRemoveFromRilSuccess, isLoading, isRilLoading} = useSelector((state) => state.ril)
    const { wpcollections, workspaces, quriesIdsArray, isQueryIdsSuccess, isQueryCreateSuccess, singleQuery, isWorkspaceCreateSuccess, singleWorkspace, isWorkpsaceDetailSuccess } = useSelector((state) => state.workspace); 
    const { isAddDocumentSuccess } = useSelector((state) => state.document);
    const [ selectedWorkspace, setSelectedWorkspace] = useState(null)
    const [ selectedDocument, setSelectedDocument] = useState(null)
    const [ isCreateWorkspace, setIsCreateWorkspace] = useState(false)
    const [ workspaceNameInput, setWorkspaceNameInput] = useState('')
    const [ isLoadingOn, setIsLoadingOn] = useState(false)
    const [ currentDocID, setCurrentDocID ] = useState(null)

    useEffect(() => {        
        if(!user){
            navigate('/login')
        }else{
            const user_data = {
                userId: user.data._id
            }
            dispatch(getRilDocumentLists(user_data))            
            dispatch(getWorkspaceCollections(user_data))  
            dispatch(getAllWorkspaces(user_data))        
        }

        return() => {
            dispatch(resetRilData())
            dispatch(resetWorkspaceData())
        }
    }, [dispatch, user])

    const backToHome = () => {
        navigate('/')
    }
    
    return (
        <>
            <div>              
                <HeaderComponent /> 
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
                            {/* <DocumentComponent listings={ril_documents} workspace={type}/>  */}
                            <div className='flex items-center mr-4 mb-4'>
                                <FaRegFileLines className={`text-xl mr-2 ${rilStyles.doc_default_color}`} /> 
                                <span className='text-sm font-semibold'>Total Documents: {ril_documents.length} </span>
                            </div>
                            {ril_documents.length !== 0 && <>
                                {ril_documents.map((data, index) => (
                                    
                                    <div key={data._id} className={`w-full grid grid-cols-8 mb-8 p-8 border rounded-lg`}>                                            
                                        <SimilarityComponent collections={wpcollections} docId={data._id} docTitle={data.title} />
                                    </div>
                                ))}
                            </>
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScoreComponent;