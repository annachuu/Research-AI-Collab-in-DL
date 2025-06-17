import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Workspace.module.css';
import { setSelectedWorkspace, updateWorkspace } from '../../features/workspace/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegFileLines, FaMagnifyingGlass, FaEllipsisVertical, FaTrashCan, FaPenToSquare, FaArrowRotateLeft } from "react-icons/fa6";
import {motion} from "framer-motion";
import ModalComponent from '../../components/Modal/Modal';

function WorkspaceLists({data, rilData}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const [taskResumed, setTaskResumed] = useState(false);
    const [selectedWId, setSelectedWId] = useState('');
    const [isDropdown, setIsDropdown] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentWorkspace, setCurrentWorkspace] = useState('')
    const {ril_documents, isRilLoading} = useSelector((state) => state.ril)    
    const [inputFormData, setInputFormData] = useState("")

    const listsVariants = {
        hidden: {
            opacity: 0,
            y: 100
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 350,
                damping: 50,
                duration: 0.5
            }
        }
    }

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: 10
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 350,
                damping: 50,
                duration: 0.5
            }
        }
    }

    const fetchWorkspaceDetails = (wsp) =>{
        if(wsp.archive === true){
            navigate('/workspace/' + wsp._id)
        }
    }

    const taskResumeHandler = (workspace) => {        
        if(workspace.archive === true){
            setSelectedWId(workspace._id)

            if(selectedWId !== workspace._id){
                setTaskResumed(true)            
                dispatch(setSelectedWorkspace(workspace))
            }else{
                setTaskResumed(false)
                setSelectedWId('')
                dispatch(setSelectedWorkspace(null))
            }
        }
    }

    const dropDownHandler = (wId) => {
        setIsDropdown(!isDropdown);
        setCurrentWorkspace(wId)
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {            
            setIsDropdown(false);
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const editWorkspace = (wpData) => {
        // console.log(id)
        setIsEdit(true)
        setInputFormData(wpData)
        setIsDropdown(false);
    }

    const archiveOrRestoreWrokspace = (data) => {
        console.log('archive the workspace')
        // 
        const temp = {
            'id': data._id,
            'name': data.name,
            'archive': !data.archive,
            'userId': data.userId
        }
        dispatch(updateWorkspace(temp))
    }    


    return (
        <>
            {data.length > 0 &&     
                <motion.div variants={listsVariants} initial="hidden" animate="visible">
                    <div className={`pt-2 pb-10 ${styles.list_container}`}>
                        <div className={`relative ${styles.mx_44}`}>
                                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 transition ease-out'>                                    
                                    {data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((workspace, index) => (                                    
                                        <div key={`${workspace._id}-${index}`} className={` flex flex-col justify-between cursor-pointer rounded-lg bg-white p-4 border border-1 border-black ${(taskResumed && selectedWId === workspace._id) ? styles['hightlight_task'] : ''}`}>
                                            <div className="relative">
                                                <div className={`absolute z-10 ${styles.dropdown_element}`}> 
                                                    <div onClick={() => dropDownHandler(workspace._id)} className={`p-2 ${styles.dropdown_wrap}`}>
                                                        <FaEllipsisVertical className={styles.dropdown_icon} />
                                                    </div>
                                                </div>                                     
                                                {(isDropdown && currentWorkspace === workspace._id) && (
                                                    <div ref={dropdownRef}>
                                                        <motion.div variants={dropdownVariants} initial="hidden" animate="visible"> 
                                                            <div className="absolute right-0 top-5 z-10 bg-white shadow-lg rounded w-[250px] p-5 mt-1">
                                                                {workspace.archive === true &&
                                                                    <div onClick={() => editWorkspace(workspace)} className='flex items-center mb-2'>
                                                                        <FaPenToSquare className='text-sky-400' />
                                                                        <span className='ml-2 text-slate-500'>Edit</span>
                                                                    </div>
                                                                }
                                                                <div onClick={() => archiveOrRestoreWrokspace(workspace)} className='flex items-center'>                                                                    
                                                                    {workspace.archive !== true ? <>
                                                                        <FaArrowRotateLeft />
                                                                        <span className='ml-2 text-slate-500'>Restore</span>
                                                                    </> : <>
                                                                        <FaTrashCan className='text-rose-400' />
                                                                        <span className='ml-2 text-slate-500'>Archive</span>
                                                                    </>}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                )}
                                            </div>
                                            <> 
                                                <p onClick={() => fetchWorkspaceDetails(workspace)} 
                                                    className={`
                                                        font-bold capitalize transition ease-in-out mr-3
                                                        ${workspace.archive === true ? 'cursor-pointer hover:text-indigo-800' : ''}
                                                        `}>                                    
                                                    {workspace.name.length > 160 ?
                                                        `${workspace.name.substring(0, 160)}...` :
                                                        workspace.name
                                                    }
                                                </p>
                                                <div className='flex justify-between my-4 mx-2'>
                                                    <div className={`
                                                        flex items-center hover:text-indigo-800 transition ease-in-out 
                                                        ${styles.link_default_color}
                                                        ${workspace.archive === true ? 'cursor-pointer hover:text-indigo-800' : ''}
                                                        `} 
                                                        onClick={() => fetchWorkspaceDetails(workspace)}>
                                                        <FaMagnifyingGlass className='text-xl' />
                                                        <p className='font-medium text-xs mt-1 ml-2'>{workspace.querySize}</p>
                                                    </div>
                                                    <div className={`flex items-center doc_default_color hover:text-yellow-500 transition ease-in-out`} onClick={() => fetchWorkspaceDetails(workspace)}>
                                                        <FaRegFileLines className={`text-xl`} />
                                                        <p className='font-medium text-sm mt-1 ml-2'>{workspace.docSize}</p>
                                                    </div>
                                                </div>
                                            </>
                                            <div className='flex justify-between' onClick={()=> taskResumeHandler(workspace)}>
                                                <p  className={`
                                                    text-xs mt-2 transition ease-in-out 
                                                    ${workspace.archive === true ? 'cursor-pointer hover:text-indigo-800' : 'pointer-event-none'}
                                                    ${(selectedWId === workspace._id && taskResumed) ? 'text-indigo-800' : 'text-slate-500'}
                                                    `}>Resume task</p>
                                                <div></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        </div>
                    </div> 
                    <ModalComponent isVisible={isEdit} onModalClose={() => setIsEdit(false)} inputValue={inputFormData}/>
                </motion.div>
            }
        </>
    )    
}

export default WorkspaceLists;