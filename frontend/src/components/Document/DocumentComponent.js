import { useSelector, useDispatch } from 'react-redux';
import { BsDashSquareFill } from "react-icons/bs";
import styles from "../../pages/DocumentSearchResults/ContentListings.module.css";
import { FaLockOpen, FaBookOpenReader, FaLink, FaArrowUpRightFromSquare, FaAngleRight } from "react-icons/fa6";
import { BsFileEarmarkPdf, BsFillJournalBookmarkFill } from "react-icons/bs";

import { removeDocumentFromWorkspace, resetDocument, setDocumentRemovedSuccess } from '../../features/Document/documentSlice';
import { removeDocumentFromRil,  reset, getRilDocumentCount } from "../../features/RIL/rilSlice";
import { useEffect, useState, useRef } from 'react';
import RenderDocumentThumbnail from './DocumentThumbnail'

import { isbn_url } from "../../config/env";
import default_thumbnail from '../../assets/default_thmbnail.png'

function DocumentComponent({listings, queryDetail, onDocRemove}) { 
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);    
    const {isRemoveDocumentSuccess} = useSelector((state) => state.document);
    const [selectedDoc, setSelectedDoc] = useState("")
    const {isRemoveFromRilSuccess } = useSelector((state) => state.ril);
    const [isReadMore, setIsReadMore] = useState(true);

    const contentRef = useRef(null);
    const [height, setHeight] = useState('auto');

    useEffect(() => {
        console.log("listinggggggggg", listings)
        if (selectedDoc._id !== listings._id) {
            setHeight(contentRef.current.scrollHeight + 'px');
        } else {
            setHeight('0px');
        }
    }, [selectedDoc, listings]);
    
    const removeDocument = (doc) => {
        console.log('doc_', doc)
        console.log('queryDetail_', queryDetail)
        setSelectedDoc(doc)
        if(queryDetail._id !== undefined){
            console.log('remove from workspace')
            dispatch(setDocumentRemovedSuccess(false))
            const DOC_TEMP_REMOVE ={
                "documentId": doc._id,                                
                "workspaceId": queryDetail.workspaceId,
                "queryId": queryDetail._id
            }
            console.log(DOC_TEMP_REMOVE)
            onDocRemove(queryDetail._id)
            dispatch(removeDocumentFromWorkspace(DOC_TEMP_REMOVE))
        }else{
            console.log('remove from Ril')
            const DOC_TEMP_REMOVE ={
                "id": doc._id
            }
    
            console.log('DOC_TEMP_REMOVE ', DOC_TEMP_REMOVE)
            dispatch(removeDocumentFromRil(DOC_TEMP_REMOVE)) 
        }
    }

    useEffect(() => {       
        if(isRemoveFromRilSuccess){            
            const user_data = {
                'userId': user.data._id
            }            
            dispatch(getRilDocumentCount(user_data))
        }
        if(isRemoveDocumentSuccess){
            dispatch(setDocumentRemovedSuccess(true))
        }
    }, [ isRemoveFromRilSuccess, isRemoveDocumentSuccess ])     

    const readMoreHandler = () => {
        setIsReadMore(!isReadMore);
        
        setHeight('auto');
    };

    return (  
        
        <div 
            className={`flex mb-8 ${selectedDoc._id === listings._id ? styles.hiddendivs : styles.visibledivs}`}
            style={{ height: height }}
            ref={contentRef}
       >            
            <div className={`bg-slate-50 border flex ${styles.book_cover}`}>
                {listings.doc_thumbnail !== undefined ?   
                    <>
                        {listings.thumbnail_type === 'doi' ? <>
                            <RenderDocumentThumbnail doi={listings.doc_thumbnail} type="" />
                        </> : 
                        <>
                            <img
                                className={`object-cover w-full h-full`}
                                src={isbn_url + listings.doc_thumbnail + '/sc.jpg'}
                                alt="Document Thumbnail"
                            />
                        </>}
                    </>
                    : <>                                                            
                        <img
                            className={`object-contain`}
                            src={default_thumbnail}
                            alt="Document Thumbnail"
                        />
                    </>
                }
            </div>
            <div className='pl-5 w-full'>            
                <div className='flex justify-between mb-3'>
                    <div className='flex items-center'>
                        <div className={`rounded-full ${styles.contenttype_wrap}`}>
                            <p className='text-xs font-semibold capitalize px-1'>{listings.doc_type}</p>
                        </div>
                        <div className={`mx-3.5 ${styles.block}`}></div>
                        <div className=''>{listings.doc_date}</div>   
                        {(listings.doc_partof !== undefined && listings.doc_partof !== null) && 
                            <>
                            {listings.doc_partof.length > 0 &&
                                <div className={`mx-3.5 ${styles.block}`}></div>
                            }
                            </>}
                        <p>{listings.doc_partof}</p>                                         
                    </div>
                    <div className='flex'>
                        <div className={`relative ${styles.has_tooltip}`}>
                            <BsDashSquareFill
                                className={`mr-1 text-rose-600 cursor-pointer`}
                                onClick={() => removeDocument(listings)}
                            />
                            <span className={`rounded absolute text-xs text-center shadow-lg p-1 bg-gray-100 text-slate-500 -mt-8 ${styles.tooltip_remove01}`}>Remove Document</span>
                        </div>
                    </div>
                </div>
                <h3 className="text-xl font-bold mt-5 mb-1" id={"document-title-ws"}>
                    <a href={listings.doc_url} target="_blank" rel="noopener noreferrer">
                        {listings.title}
                    </a>
                </h3>

                <p className='mb-2 italic'>
                    {listings.doc_authors.map((author, index) => (
                        <span key={index}>{author.replace('.', '').split(',')} {(listings.doc_authors.length - 1 !== index) &&<span>,</span>} </span>
                    ))}
                    {/* {listings.doc_authors} */}
                </p>
                {(listings.doc_abstract !== undefined && listings.doc_abstract.length > 0) && (
                    <>  
                        {listings.doc_abstract.length > 250 ? (<>
                            {isReadMore ? (<>
                                <p className={`mt-5 text-justify ${styles.abstract_txt}`}>
                                    {listings.doc_abstract.slice(0, 250) + `...`}
                                    <span onClick={readMoreHandler} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition ease-out">
                                    {" "} Read more
                                    </span>
                                </p>
                            </>) 
                            : (<>
                                <p className={`mt-5 text-justify ${styles.abstract_txt}`}>
                                    {listings.doc_abstract}
                                    <span onClick={readMoreHandler} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition ease-out">
                                    {" "} Read less
                                    </span>
                                </p>
                            </>)}
                        </>)                         
                        : (
                            <p className={`mt-5 text-justify ${styles.abstract_txt}`}>{listings.doc_abstract}</p>
                        )} 
                    </>
                )}
                <div className="mt-3">
                    <div className="flex items-center"> 
                    {listings.doc_peerreview &&  <>
                        <div className="flex items-center mr-3">
                            <FaBookOpenReader className="text-sm text-cyan-600" />
                            <p className="uppercase text-sm ml-1">Peer Reviewed</p>
                        </div> 
                    </>}            
                    {listings.doc_openaccess && <>
                        <div className="flex items-center">
                            <FaLockOpen className="text-sm text-lime-500" />
                            <p className="uppercase text-sm ml-1">Open Access</p>
                        </div>
                    </>}
                    </div>
                </div>
                {listings.doc_fulltext && <>
                    <div className="flex items-center">
                        <FaLink className="text-sm text-slate-500" />
                        <p className="uppercase text-sm m-1 text-indigo-600">Full text available</p>
                        <FaArrowUpRightFromSquare className="text-sm text-slate-500 ml-1" />
                        <FaAngleRight className="text-sm text-slate-500 ml-1" />
                    </div>
                </>}

                {/* <div className="flex items-center">
                    <BsFileEarmarkPdf className="text-sm text-slate-500" />
                    <p className="uppercase text-sm m-1 text-indigo-600">Get Pdf</p>
                    <FaArrowUpRightFromSquare className="text-sm text-slate-500 ml-1" />
                    <FaAngleRight className="text-sm text-slate-500 ml-1" />
                </div> */}
            </div>
        </div>
        
    )
}

export default DocumentComponent;