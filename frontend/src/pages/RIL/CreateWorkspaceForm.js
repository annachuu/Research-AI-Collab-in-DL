// Child Component: CreateWorkspaceFormComponent

import React, { useEffect } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

function CreateWorkspaceFormComponent({
    docData,
    currentDocID,
    setCurrentDocID,
    isCreateWorkspace,
    setIsCreateWorkspace,
    workspaceNameInput,
    setWorkspaceNameInput,
    user,
    dispatch,
    setSelectedDocument,
    createNewWorkspaceHandler,
    onDocumentMoved
}) {
    const newWorkspaceToggleHandler = (id) => {
        setCurrentDocID(id);
        setIsCreateWorkspace(!isCreateWorkspace);
    };

    const formInputHandler = (event) => {
        setWorkspaceNameInput(event.target.value);
    };

    return (
        <div className='border rounded-lg px-4 py-2.5 mb-3 transition ease-out-500 primary_bg'>
            <div onClick={() => newWorkspaceToggleHandler(docData._id)} className='relative cursor-pointer '>
                <div className='flex justify-center items-center text-white'>
                    <p className='mr-2 transition ease-out-500'>Create New Workspace</p>
                    <FaRegSquarePlus />
                </div>
            </div>
            <div>
                {(isCreateWorkspace && currentDocID === docData._id) && 
                    <div className={`bg-white p-3 mt-3 rounded-md`}>
                        <input 
                            className='rounded-lg border w-full px-4 py-3 text-slate-500 leading-tight focus:outline-none focus:shadow-outline'
                            id="workspaceNameInput" 
                            name="workspaceNameInput"
                            type="text"
                            placeholder="Enter workspace name"
                            onChange={formInputHandler}
                            value={workspaceNameInput}
                            autoComplete="off"
                        />
                        <div className='flex justify-between mt-3'>
                            <div onClick={() => setIsCreateWorkspace(false)} className='cursor-pointer transition ease-out-500 hover:bg-red-400 p-3 rounded-lg w-5/12 bg-red-300 text-center'>Cancel</div>
                            <div onClick={() => createNewWorkspaceHandler(docData)} className='cursor-pointer transition ease-out-500 hover:bg-indigo-700 p-3 rounded-lg w-5/12 bg-indigo-800 text-white text-center'>Create</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CreateWorkspaceFormComponent;
