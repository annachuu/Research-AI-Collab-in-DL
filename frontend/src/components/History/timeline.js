import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import VideocamIcon from '@mui/icons-material/Videocam';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from "react-router-dom";
import documentService from "../../features/Document/documentService";
import axios from 'axios';
import { API_URL } from "../../config/env";
import styles from "./timeline.module.css";

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

const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
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
    if (usernameIndex !== -1) {
        return usernameIndex % User_Colours.length;
    }
    return 0;
};

export default function UserTimeline({ queries, setPageLoading, setShowDetails, setDetails, queryId }) {
  const navigate = useNavigate();
  const [allDocuments, setAllDocuments] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  // Fetch chat messages to get all users for consistent color assignment
  useEffect(() => {
    async function fetchChatMessages() {
      try {
        const chatApiUrl = API_URL + 'chat';
        const res = await axios.get(chatApiUrl);
        setChatMessages(res.data || []);
      } catch (error) {
        console.error("Failed to fetch chat messages for color assignment: ", error);
      }
    }
    
    fetchChatMessages();
    const interval = setInterval(fetchChatMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch documents for the current query from all users
  useEffect(() => {
    if (!queryId) 
    {
      setAllDocuments([]);
      return;
    }

    async function fetchDocumentsByQuery() 
    {
      try 
      {
        const docs = await documentService.getDocumentsByQueryId(queryId);
        const documentsArray = Array.isArray(docs) ? docs : [];
        
        console.log(`Timeline: Fetched ${documentsArray.length} documents for queryId ${queryId}`);
        
        // Log the breakdown by each user
        const byUser = documentsArray.reduce((acc, d) => {
          const username = d.userId?.username || 'Unknown';
          if (!acc[username]) {
            acc[username] = { total: 0, active: 0, removed: 0 };
          }
          acc[username].total++;
          if (d.doc_isRemoved) {
            acc[username].removed++;
          } else {
            acc[username].active++;
          }
          return acc;
        }, {});
        
        console.log(`Documents breakdown:`, byUser);
        console.log(`Sample documents:`, documentsArray.slice(0, 3).map(d => ({
          username: d.userId?.username || 'Unknown',
          title: d.title?.substring(0, 40),
          removed: d.doc_isRemoved
        })));
        
        setAllDocuments(documentsArray);
      } 
      catch (error) 
      {
        console.error("Failed to fetch documents for query: ", error);
        setAllDocuments([]);
      }
    }
    
    fetchDocumentsByQuery();
    const interval = setInterval(fetchDocumentsByQuery, 3000);
    return () => clearInterval(interval);
  }, [queryId]);

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
      // Fallback - this shouldn't happen in normal flow
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


  // Get unique usernames from BOTH chat messages AND documents for consistent color of the users, ensures the same user gets the same color in both chat and timeline
  const chatUsernames = chatMessages.map(msg => msg.username).filter(Boolean);
  const documentUsernames = allDocuments.map(doc => doc.userId?.username).filter(Boolean);
  const allUsernames = [...chatUsernames, ...documentUsernames];
  const uniqueUsernamesSorted = [...new Set(allUsernames)].sort();

  // Group documents by date
  const documentsByDate = {};
  allDocuments.forEach((doc) => {
    const dateKey = formatDate(doc.createdAt);
    if (!documentsByDate[dateKey]) {
      documentsByDate[dateKey] = [];
    }
    documentsByDate[dateKey].push(doc);
  });

  // Sort documents within each date by creation time
  Object.keys(documentsByDate).forEach(dateKey => {
    documentsByDate[dateKey].sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    );
  });

  // Sort dates in descending order (new one first) by using the first document's date in each group
  const sortedDates = Object.keys(documentsByDate).sort((a, b) => {
    const dateA = documentsByDate[a][0]?.createdAt;
    const dateB = documentsByDate[b][0]?.createdAt;
    if (!dateA || !dateB) return 0;
    return new Date(dateB) - new Date(dateA);
  });

  return (
    <div className={styles.timelineWrapper}>
      <h3 className={styles.timelineTitle}>History</h3>
      <div className={styles.timelineScrollContainer}>
        {sortedDates.length === 0 ? (
          <div className={styles.noQueries}>No saved documents yet</div>
        ) : (
          sortedDates.map((dateKey) => (
            <div key={dateKey} className={styles.queryGroup}>
              <h4 className={styles.queryDate}>{dateKey}</h4>
              {documentsByDate[dateKey].map((doc) => {
                const timechanger = formatTime(doc.createdAt || doc.updatedAt || new Date());
                const docTitle = doc.title || 'Untitled Document';
                const docFormat = doc.doc_type || '';
                const controlNumber = doc.documentId || doc._id;
                const username = doc.userId?.username || 'Unknown User';
                
                // Get color for this user
                const colorIndex = getColorIndexForUsername(username, uniqueUsernamesSorted);
                const userColor = User_Colours[colorIndex];

                return (
                  <div
                    key={doc._id || controlNumber}
                    className={doc.doc_isRemoved ? styles.queryItemRemoved : styles.queryItem}
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
                          <span className={styles.savedText}> has saved</span>
                        </span>
                      </div>

                      {/* document title */}
                      <div
                        className={
                          doc.doc_isRemoved
                            ? styles.queryItemTitleRemoved
                            : styles.queryItemTitle
                        }
                        onClick={() =>
                          getDetails(controlNumber, setPageLoading, setShowDetails, setDetails)
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
            </div>
          ))
        )}
      </div>

        <div className={styles.magnifyingRow}>
          {/* Still show query search if available */}
          {queries.length > 0 && queries.map((query) => {
            const initialSearch = formatDateTime(query.createdAt);
            return (
              <div key={query._id}>
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
            );
          })}
        </div>
    </div>
  );
}
