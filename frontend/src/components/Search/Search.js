import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from "./Search.module.css";

import { getSearchResultLists, setNewSearchKeyword} from '../../features/contents/contentResultsSlice';
import { createQuery} from "../../features/workspace/workspaceSlice";

function SearchComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    const {user} = useSelector((state) => state.auth);  
    const { isQueryCreateSuccess, singleQuery} = useSelector((state) => state.workspace);
    // const {state} = useLocation();
    const {workspaceId} = useParams();
    // const {workspaceId} = useParams();
    const QUERY_STRING = localStorage.getItem('query')
    
    // useEffect(() => {
    //     console.log('state_', state)
    //     if(state !== null){
    //         setSearchKeyword(state);
    //     }                
    // }, [state]);

    useEffect(() => {
        setSearchKeyword(QUERY_STRING);        
    }, [QUERY_STRING]);

    //search input form fields validation
    const formInputHandler = (event) => {        
        setSearchKeyword(event.target.value)
    }

    const searchFormHandler = (event) => {        
        event.preventDefault();  
        localStorage.setItem('query', searchKeyword)        

        const TEMP = {
            'keyword': searchKeyword,
            'workspaceId': workspaceId
        }
        
        const newQueryData = {
            'query': searchKeyword,
            'userId': user.data._id,
            'workspaceId': workspaceId,
            'workspaceName': localStorage.getItem('wpname'),
            'documents': []
        }
        dispatch(createQuery(newQueryData))
    }

    useEffect(() => {
        if(isQueryCreateSuccess){
            console.log('* isQueryCreateSuccess_', isQueryCreateSuccess)
            navigate('/task/' + workspaceId + '/' + singleQuery._id)
        }

    }, [isQueryCreateSuccess, singleQuery]) 

    return (
        <div className='flex justify-center'>
            <form onSubmit={searchFormHandler} className={`${styles.cw_42, styles.search_bar}`}>
                <div className={`flex rounded-full appearance-none focus:outline-none focus:shadow-outline w-full ${styles.search_input}`}>
                    <div className="ltr">
                        <input 
                            className={`rounded-s-full w-full px-4 py-3 text-slate-500 leading-tight focus:outline-none focus:shadow-outline`} 
                            id="search" 
                            type="text" 
                            placeholder="Search"
                            onChange={formInputHandler}
                            autoComplete="off"
                            value={searchKeyword} />
                    </div> 
                    <div className={`cursor-pointer ${styles.search_bar_btn}`}>
                        <button></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchComponent;



// import React, {useState, useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useParams } from 'react-router-dom';
// import styles from "./Search.module.css";

// import { getSearchResultLists} from '../../features/contents/contentResultsSlice';
// import { setNewSearchKeyword } from '../../features/contents/contentResultsSlice';

// function SearchComponent() {
//     const dispatch = useDispatch();
//     const {currentKeyword} = useSelector((state) => state.content)
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const {user} = useSelector((state) => state.auth);  
//     const {state} = useLocation();
//     const {id} = useParams();
    
//     useEffect(() => {
//         console.log('state_', state)
//         if(state !== null){
//             setSearchKeyword(state.name);
//         }                
//     }, [state]);

//     useEffect(() => {
//         console.log('currentKeyword _', currentKeyword)
//         if(currentKeyword !== null){
//             setSearchKeyword(currentKeyword);
//         }                
//     }, [currentKeyword]);

//     //search input form fields validation
//     const formInputHandler = (event) => {
//         // console.log('...', event.target.value)
//         setSearchKeyword(event.target.value)
//     }

//     const searchFormHandler = (event) => {        
//         event.preventDefault();   

//         const TEMP = {
//             'keyword': searchKeyword,
//             'workspaceId': id
//         }
//         dispatch(setNewSearchKeyword(TEMP))
//         dispatch(getSearchResultLists(searchKeyword));
//     }

//     return (
//         <div className='flex justify-center'>
//             <form onSubmit={searchFormHandler} className={`${styles.cw_42}`}>
//                 <div className='flex'>
//                     <input 
//                         className="shadow appearance-none border rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//                         id="search" 
//                         type="text" 
//                         placeholder="Search"
//                         onChange={formInputHandler}
//                         value={searchKeyword} />                
//                     {/* <button>hi</button> */}
//                 </div>
//             </form>
            
//         </div>
//     )
// }

// export default SearchComponent;