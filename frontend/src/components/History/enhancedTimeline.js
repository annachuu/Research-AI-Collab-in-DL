import React, { useState, useEffect, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import VideocamIcon from '@mui/icons-material/Videocam';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from "react-router-dom";
import documentService from '../../features/Document/documentService';
import axios from 'axios';
import { API_URL } from "../../config/env";
import styles from "./enhancedTimeline.module.css";

// Date formatting helper functions
const formatDate = (date) => 
{
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};

const formatDateTime = (date) => 
{
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', 
    { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

// Simple icon mapper based on document format/type
const IconMapper = ({ format }) => {
    const formatLower = format?.toLowerCase() || '';
    
    if (formatLower.includes('book') || formatLower.includes('ebook')) 
    {
        return <MenuBookIcon/>;
    } 
    else if (formatLower.includes('article') || formatLower.includes('journal')) 
    {
        return <NewspaperIcon/>;
    } 
    else if (formatLower.includes('video')) 
    {
        return <VideocamIcon/>;
    } 
    else if (formatLower.includes('audio')) 
    {
        return <AudioFileIcon/>;
    } 
    else 
    {
        return <InsertDriveFileIcon/>;
    }
};

// User colors matching chat component
const User_Colours = 
[
    "#a6cee3",  // 1st user
    "#1f78b4",  // 2nd user
    "#b2df8a",  // 3rd user
    "#33a02c",  // 4th user
    "#fb9a99",  // 5th user
    "#e31a1c",  // 6th user
    "#fdbf6f",  // 7th user
    "#ff7f00",  // 8th user
    "#cab2d6",  // 9th user
    "#6a3d9a"   // 10th user
];

// Get color index for username (same logic as chat)
const getColorIndexForUsername = (username, uniqueUsernamesSorted = []) => {
    if (!username) return 0;
        const usernameIndex = uniqueUsernamesSorted.indexOf(username);
    if (usernameIndex !== -1) 
    {
        return usernameIndex % User_Colours.length;
    }
    return 0;
};

export default function UserTimeline({ queries, setPageLoading, setShowDetails, setDetails }) 
{
    const navigate = useNavigate();
    const [removedDocs, setRemovedDocs] = useState({});
    const [allDocumentsByQuery, setAllDocumentsByQuery] = useState({});
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const workspaceId = queries?.[0]?.workspaceId;
    // const [hasSelectedTopic, setHasSelectedTopic] = useState(false);

    // Fetch chat messages to get all users for consistent color assignment
    useEffect(() => {
        async function fetchChatMessages() {
            try 
            {
                const chatApiUrl = API_URL + 'chat';
                const res = await axios.get(chatApiUrl);
                setChatMessages(res.data || []);
            } 
            catch (error) 
            {
                console.error("Failed to fetch chat messages for color assignment: ", error);
            }
        }
        
        fetchChatMessages();
        const interval = setInterval(fetchChatMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    // Fetch documents from all users for each query
    useEffect(() => {
        const fetchAllDocuments = async () => {
            if (!queries || queries.length === 0) return;
            
            setLoadingDocuments(true);
            const documentsMap = {};
            
            try 
            {
                // Fetch documents for each query from all users
                await Promise.all(queries.map(async (query) => {
                    if (query._id) 
                    {
                        try 
                        {
                            const allDocs = await documentService.getDocumentsByQueryId(query._id);
                            // Store documents including removed ones
                            documentsMap[query._id] = allDocs || [];
                        } 
                        catch (error) 
                        {
                            console.error(`Error fetching documents for query ${query._id}:`, error);
                            documentsMap[query._id] = [];
                        }
                    }
                }));
                
                setAllDocumentsByQuery(documentsMap);
            } 
            catch (error) 
            {
                console.error('Error fetching documents:', error);
            } 
            finally 
            {
                setLoadingDocuments(false);
            }
        };

        fetchAllDocuments();
        const interval = setInterval(fetchAllDocuments, 3000);
        return () => clearInterval(interval);
    }, [queries]);

    const getSearchResult = async (searchTerm) => {
        localStorage.setItem("searchTerm", searchTerm);
        localStorage.setItem("query", searchTerm);
        
        // Navigate to results page
        const workspaceId = queries[0]?.workspaceId;
        const queryId = queries[0]?._id;
        if (workspaceId && queryId) 
        {
            navigate(`/task/${workspaceId}/${queryId}`);
        } 
        else if (workspaceId) 
        {
            // If we have workspaceId but no queryId, navigate to workspace
            navigate(`/workspace/${workspaceId}`);
        } 
        else 
        {
            // Fallback, this shouldn't happen in normal flow
            window.location.href = "/results";
        }
    };

     const getDetails = (controlNumber, setPageLoading, setShowDetails, setDetails) => {
         if (setPageLoading) setPageLoading(true);
         // This function should fetch document details
         // integrate with existing document detail logic
         console.log("Getting details for:", controlNumber);
         if (setShowDetails) setShowDetails(true);
         if (setDetails) setDetails({ controlNumber });
         if (setPageLoading) setPageLoading(false);
     };

     // Get unique usernames from BOTH chat messages AND documents for consistent color assignment
     const allDocuments = Object.values(allDocumentsByQuery).flat();
     const chatUsernames = chatMessages.map(msg => msg.username).filter(Boolean);
     const documentUsernames = allDocuments.map(doc => doc.userId?.username).filter(Boolean);
     const allUsernames = [...chatUsernames, ...documentUsernames];
     const uniqueUsernamesSorted = [...new Set(allUsernames)].sort();

     // Deduplicate queries by query string (case-insensitive, trimmed)
     // Merge documents from all duplicate queries to ensure no documents are lost
     const deduplicatedQueries = useMemo(() => {
        const queryMap = new Map();
    
        queries.forEach(query => {
        const normalizedQuery = (query.query || '').trim().toLowerCase();
        
        if (!queryMap.has(normalizedQuery)) 
        {
            // First occurrence of this query - add it
            queryMap.set(normalizedQuery, {
            ...query,
            _queryIds: [query._id] // Track all query IDs with this name for document merging
            });
        } 
        else 
        {
            // Query already exists - merge query IDs and keep the one with the most recent date
            const existingQuery = queryMap.get(normalizedQuery);
            existingQuery._queryIds.push(query._id);
            
            if (new Date(query.createdAt) > new Date(existingQuery.createdAt)) 
            {
            // Replace with newer query but keep merged query IDs
            queryMap.set(normalizedQuery, {
                ...query,
                _queryIds: existingQuery._queryIds
            });
            }
        }
        });
    
        return Array.from(queryMap.values());
    }, [queries]);

    // Merge documents from all query IDs for each deduplicated query
    const mergedDocumentsByQuery = useMemo(() => {
        const merged = {};
    
        deduplicatedQueries.forEach(query => {
        const queryIds = query._queryIds || [query._id];
        const allDocs = [];
        const seenDocIds = new Set();
        
        // Collect documents from all query IDs with this name
        queryIds.forEach(queryId => {
            const docs = allDocumentsByQuery[queryId] || [];
            docs.forEach(doc => {
            const docId = doc._id?.toString();
            if (docId && !seenDocIds.has(docId)) 
            {
                seenDocIds.add(docId);
                allDocs.push(doc);
            }
            });
        });
        
        merged[query._id] = allDocs;
        });
        
         return merged;
     }, [deduplicatedQueries, allDocumentsByQuery]);

     //  return after all hooks have been called (for memo error)
     if (queries.length === 0) 
     {
         return (
         <div className={styles.timelineContainer}>
             <h5 className={styles.noQueries}>No queries found for this topic</h5>
         </div>
         );
     }

     return (
        <div className={styles.timelineContainer}>
        <div className={styles.timelineWrapper}>
            <div className={styles.timelineScrollContainer}>
            <h3 className={styles.timelineTitle}>History:</h3>
            {/*{queries.map((query) => { */}
            {deduplicatedQueries.map((query) => {
                const initialSearch = formatDateTime(query.createdAt);
                let previousDate = null;
                
                // // Use documents from all users instead of just query.documents
                //const documentsToShow = allDocumentsByQuery[query._id] || query.documents || [];
                // Use merged documents from all duplicate queries with the same name
                const documentsToShow = mergedDocumentsByQuery[query._id] || allDocumentsByQuery[query._id] || query.documents || [];

                return (
                <div key={query._id} className={styles.queryGroup}>
                    <h4 className={styles.queryDate}>
                    {formatDate(query.createdAt)}
                    </h4>
                    {/* {query.documents?.map((doc) => { */}
                    {documentsToShow.map((doc) => {
                    const timechanger = formatTime(doc.createdAt || doc.updatedAt || new Date());
                    previousDate = doc.updatedAt;
                    const docTitle = doc.title || doc.docdata?.Title || 'Untitled Document';
                    const docFormat = doc.doc_type || doc.docdata?.Format || doc.docdata?.doc_type || '';
                    const controlNumber = doc.documentId || doc.ControlNumber || doc._id;
                    const username = doc.userId?.username || 'Unknown User';

                    // Check for removed status (handle both doc_isRemoved and isRemoved for compatibility)
                    const isRemoved = doc.doc_isRemoved ?? doc.isRemoved ?? false;

                    // Get color for this user
                    const colorIndex = getColorIndexForUsername(username, uniqueUsernamesSorted);
                    const userColor = User_Colours[colorIndex];

                    return (
                        <div
                            key={doc._id || controlNumber}
                            className={isRemoved ? styles.queryItemRemoved : styles.queryItem}
                            style={{ borderLeftColor: userColor }}
                        >
                        <div className={styles.queryItemContent}>
                            {/* Top-left header, icon + username */}
                            <div className={styles.queryItemHeader}>
                            <span className={styles.queryItemHeaderIcon}>
                                <IconMapper format={docFormat} />
                            </span>
                            <span
                                className={styles.queryItemUsername}
                                style={{ color: userColor }}
                            >
                                {username}
                            </span>
                            </div>

                            {/* Document title */}
                            <div
                                className={isRemoved ? styles.queryItemTitleRemoved : styles.queryItemTitle}
                                onClick={() =>
                                    getDetails
                                    (
                                        controlNumber, 
                                        setPageLoading, 
                                        setShowDetails, 
                                        setDetails
                                    )
                                }
                            >
                                {docTitle}
                            </div>

                            {/* Time */}
                            <div className={styles.queryItemTime}>{timechanger}</div>
                        </div>
                        </div>
                    );
                    })}
                    <div style={{ padding: "0px 0px" }}>
                    <div
                        className={styles.queryBox}
                        onClick={() => getSearchResult(query.query)}
                    >
                        <span className={styles.queryText}>
                        <SearchIcon fontSize="small" />
                        <span style={{ marginLeft: "0.5rem" }}>{query.query}</span>
                        </span>
                    </div>
                    <div className={styles.queryTime}>{initialSearch}</div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
    </div>
    );
}
