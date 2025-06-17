import React, {useState, useEffect} from "react";
import { FaXmark } from "react-icons/fa6";
import { updateWorkspace } from '../../features/workspace/workspaceSlice';
import { useDispatch } from 'react-redux';

function ModalComponent({isVisible, onModalClose, inputValue}) {
    const dispatch = useDispatch(); 
    const [currentWorkspace, setCurrentWorkspace] = useState(inputValue || {});
    const [updatedValue, setUpdatedValue] = useState(inputValue?.name || "");
    const [isDisable, setIsDisable] = useState(false);

    const handleClose = (e) =>{
        if(e.target.id === 'modal_container') onModalClose();
    }

    useEffect(() => {
        setCurrentWorkspace(inputValue || {});
        setUpdatedValue(inputValue?.name || "");
        console.log()
        if(inputValue.name !== undefined){
            setIsDisable(inputValue?.name.trim().length === 0);
        }
    }, [inputValue]);

    const submitFormHandler = (event)=>{
        event.preventDefault();
                
        const temp = {
            'id': inputValue._id,
            'name': updatedValue,
            'archive': inputValue.archive,
            'userId': inputValue.userId
        }
        console.log(temp)
        dispatch(updateWorkspace(temp))
        onModalClose()
    }

    const formInputHandler = (event) => {
        const val = event.target.value;
        setUpdatedValue(val);
        setIsDisable(val.trim().length === 0);
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div id="modal_container" onClick={handleClose} className="fixed z-20 inset-0 bg-black bg-opacity-65 backdrop-blur-sm flex justify-center items-center">
            <div className='w-[450px] flex flex-col'>
                <div className={`rounded-xl relative`}>
                    <div className='absolute right-0'>
                        <button onClick={() => onModalClose()} className='m-5 text-2xl place-self-end hover:text-amber-500 transition ease-out'>
                            <FaXmark/ >
                        </button>
                    </div>
                    <div className="p-8 bg-white rounded-lg">
                        <form onSubmit={submitFormHandler}>
                            <h3 className="text-xl text-slate-500 mb-6 font-bold">Edit Workspace</h3>
                            <div>
                                <input className={`w-full rounded-md border px-4 py-3 text-slate-500 leading-tight focus:outline-none focus:shadow-outline`} 
                                    id="editWorkspace" 
                                    name="editWorkspace"
                                    type="text" 
                                    placeholder="Edit workspace name" 
                                    onChange={formInputHandler}
                                    value={updatedValue} />  
                            </div>
                            <div className="flex mt-5 space-x-2">
                                <button className="flex-1 glow px-4 py-3 rounded-md bg-rose-500 text-white hover:bg-rose-600 transition ease-out" onClick={() => onModalClose()}>Cancel</button>
                                <button 
                                    type="submit"
                                    className={`flex-1 glow px-4 py-3 rounded-md text-white transition ease-out ${isDisable ? 'bg-slate-500 pointer-events-none' : 'bg-indigo-900 hover:bg-indigo-800'}`} 
                                    disabled={isDisable}>
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent;