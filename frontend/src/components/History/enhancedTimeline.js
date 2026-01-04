import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import VideocamIcon from '@mui/icons-material/Videocam';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from "react-router-dom";
import styles from "./enhancedTimeline.module.css";

// Date formatting helper functions
const formatDate = (date) => {
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

export default function UserTimeline({ queries, setPageLoading, setShowDetails, setDetails }) {
    const navigate = useNavigate();
    const [removedDocs, setRemovedDocs] = useState({});
    const workspaceId = queries?.[0]?.workspaceId;
    // const [hasSelectedTopic, setHasSelectedTopic] = useState(false);

    const getSearchResult = async (searchTerm) => 
    {
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
    // For now, we'll just log it - integrate with existing document detail logic
    console.log("Getting details for:", controlNumber);
    if (setShowDetails) setShowDetails(true);
    if (setDetails) setDetails({ controlNumber });
    if (setPageLoading) setPageLoading(false);
  };




  if (queries.length === 0) {
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
            <h3 className={styles.timelineTitle}>
                History:
            </h3>
            {queries.map((query) => {
                const initialSearch = formatDateTime(query.createdAt);
                let previousDate = null;

                return (
                <div key={query._id} className={styles.queryGroup}>
                    <h4 className={styles.queryDate}>
                    {formatDate(query.createdAt)}
                    </h4>
                    {query.documents?.map((doc) => {
                    const timechanger = formatTime(doc.createdAt || doc.updatedAt || new Date());
                    previousDate = doc.updatedAt;
                    const docTitle = doc.title || doc.docdata?.Title || 'Untitled Document';
                    const docFormat = doc.doc_type || doc.docdata?.Format || doc.docdata?.doc_type || '';
                    const controlNumber = doc.documentId || doc.ControlNumber || doc._id;

                    // Check for removed status (handle both doc_isRemoved and isRemoved for compatibility)
                    const isRemoved = doc.doc_isRemoved ?? doc.isRemoved ?? false;

                    return (
                        <div
                            key={doc._id || controlNumber}
                            className={isRemoved ? styles.queryItemRemoved : styles.queryItem}
                        >
                        <div className={styles.queryItemContent}>
                            {/* Top row, icon + title */}
                            <div className={styles.queryItemHeader}>
                            <div className={styles.queryItemIcon}>
                                <IconMapper format={docFormat} />
                            </div>
                            <span
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
                                {docTitle}{" "}
                            </span>
                            </div>

                            {/* Time date in lower-right corner */}
                            <div className={styles.queryItemDate}>{formatDate(doc.createdAt)}</div>
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
