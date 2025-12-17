import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchComponent from '../Search/Search';
import { FaArrowRightFromBracket, FaRegFileLines } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { logOut, reset } from '../../features/Auth/AuthSlice';
import { getRilDocumentCount, resetRilData } from "../../features/RIL/rilSlice";

function HeaderComponent() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const dispatch = useDispatch();   
    const dropdownRef = useRef(null);

    const {user, isError, message} = useSelector((state) => state.auth)
    const { count } = useSelector((state) => state.ril);
    const [isDropdown, setIsDropdown] = useState(false);
    const [isMenuDropdown, setIsMenuDropdown] = useState(false);

    const isRIL = location.pathname;

    const redirectToHome = (event) => {
        console.log('logo is clicked to redirect home')
        console.log('====', location.state , '====')

        navigate('/', {state: null})
        // navigate('/', { state: null });
    }

    const logoutHandler = (event) => {        
        dispatch(logOut());
        navigate('/')
    };

    const redirectToRil = () => {
        navigate('/ril')
    }

    const redirectToArchive = ()=> {
        navigate('/workspace/archives')
    }

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
                dispatch(getRilDocumentCount(user_data))
            }
        }

        console.log('initailization from dh... ')        

        return() => {
            dispatch(resetRilData())
        }
    }, [navigate, isError, message, dispatch, user])

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

    return (
        <>
        {user !== null && user.data &&
            <div className={`flex justify-between w-full z-20 items-center ${styles.header_container}`}>
                <h1 onClick={redirectToHome} className="cursor-pointer text-3xl font-bold text-white"></h1>
                
                <div className='flex items-center'>       
                    <div className='flex items-center'>
                        <div className='mr-8'>
                            {/*<div className={`*/}
                            {/*    border-2 border-gray-950 py-1.5 px-4 rounded-full*/}
                            {/*    ${isRIL === '/ril' ? styles.ril_bg : ''} */}
                            {/*    `}>*/}
                            {/*    <div className="cursor-pointer flex items-center hover:text-indigo-800 transition ease-in-out-800" onClick={redirectToRil}>*/}
                            {/*        <div className={`flex items-center doc_default_color`}>*/}
                            {/*            <FaRegFileLines className={`text-xl`} />*/}
                            {/*            <span className="ml-2">RIL - </span>*/}
                            {/*            <div>*/}
                            {/*                <p className='ml-2 font-bold'>{count}</p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                        {/* Gere dropdown   */}
                        <div className="relative" ref={dropdownRef}>
                            <div onClick={() => setIsDropdown(!isDropdown)} className='flex items-center cursor-pointer'>
                                <p className='text-white pr-2 capitalize'>{user.data?.username || 'User'}</p>                        
                                <div className="mr-1 relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-gray-300 dark:ring-gray-500 bg-white">
                                    <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill_rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip_rule="evenodd"></path></svg>
                                </div>
                            </div>
                            {isDropdown && (
                                <div className="absolute right-0 bg-white shadow-lg rounded w-[180px] p-5 mt-1">                                    
                                    <button onClick={redirectToArchive} className='hover:text-slate-400 transition ease-out font-sm flex items-center mb-3'>
                                        <FaRegEyeSlash />
                                        <span className="ml-5">Archive</span>
                                    </button>
                                    <button onClick={logoutHandler} className='hover:text-slate-400 transition ease-out font-sm flex items-center mb-3'>
                                        <FaArrowRightFromBracket />
                                        <span className="ml-5">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default HeaderComponent;