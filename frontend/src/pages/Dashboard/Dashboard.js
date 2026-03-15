import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllWorkspaces } from '../../features/workspace/workspaceSlice';
import styles from './Home.module.css';

import Header from '../../components/Header/Header';
import WorkspaceForm from '../Workspace/WorkspaceForm';
import WorkspaceLists from "../Workspace/WorkspaceLists";
import Loading from "../../components/Loading/Loading";

function DashboardComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { workspaces, isLoading, isError, message } = useSelector((state) => state.workspace);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user?.data) 
        {
            navigate('/login');
            return;
        }
    }, [user?.data, navigate]);

    // Fetch workspaces when dashboard is shown and user is logged in (mount, return from other page, etc.)
    useEffect(() => {
        if (isError) 
        {
            console.log(message);
        }
        if (!user?.data?._id) 
        {
            return;
        }
        dispatch(getAllWorkspaces({ userId: user.data._id }));
    }, [user?.data?._id, location.pathname, dispatch]);

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