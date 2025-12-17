import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllWorkspaces, resetWorkspaceData } from '../../features/workspace/workspaceSlice';
import styles from './Home.module.css';

import Header from '../../components/Header/Header';
import WorkspaceForm from '../Workspace/WorkspaceForm';
import WorkspaceLists from "../Workspace/WorkspaceLists";
import Loading from "../../components/Loading/Loading";

function DashboardComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const {user} = useSelector((state) => state.auth);
    const {workspaces, singleWorkspace, isLoading, isError, message} = useSelector((state) => state.workspace);     
    

    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        if(!user || !user.data){
            navigate('/login')
        }else{
            const user_data = {
                userId: user.data._id
            }
            if(!isError){
                dispatch(getAllWorkspaces(user_data))
            }
        }             

        return() => {
            dispatch(resetWorkspaceData())
        }
    }, [navigate, isError, message, dispatch, singleWorkspace, user])

    useEffect(() => {
        // localStorage.removeItem('query')
    }, [workspaces])

    return (
        <>
            <Header />
            <div className={`${styles.element_container}`}>
                {isLoading && <div><Loading /></div>}
                <div className="mx-36 mt-36 mb-12">
                    <WorkspaceForm />
                </div>
                <>
                    {workspaces.length > 0 &&                            
                        <WorkspaceLists data={workspaces}/>
                    }
                </>
            </div>
        </>

    )
}

export default DashboardComponent;