import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
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
  
  if (formatLower.includes('book') || formatLower.includes('ebook')) {
    return <span>📚 </span>;
  } else if (formatLower.includes('article') || formatLower.includes('journal')) {
    return <span>📄 </span>;
  } else if (formatLower.includes('video')) {
    return <span>🎥 </span>;
  } else if (formatLower.includes('audio')) {
    return <span>🎵 </span>;
  } else {
    return <span>📋 </span>;
  }
};

export default function UserTimeline({ queries, setPageLoading, setShowDetails, setDetails }) {
  const navigate = useNavigate();

  const getSearchResult = async (searchTerm) => {
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("query", searchTerm);
    
    // Navigate to results page
    const workspaceId = queries[0]?.workspaceId;
    const queryId = queries[0]?._id;
    if (workspaceId && queryId) {
      navigate(`/task/${workspaceId}/${queryId}`);
    } else if (workspaceId) {
      // If we have workspaceId but no queryId, navigate to workspace
      navigate(`/workspace/${workspaceId}`);
    } else {
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
            Search Topic:
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

                  return (
                    <div
                      key={doc._id || controlNumber}
                      className={doc.isRemoved ? styles.queryItemRemoved : styles.queryItem}
                    >
                      <div className={styles.queryItemIcon}>
                        <IconMapper format={docFormat} />
                      </div>
                      {doc.isRemoved ? (
                        <span
                          onClick={() =>
                            getDetails(
                              controlNumber,
                              setPageLoading,
                              setShowDetails,
                              setDetails
                            )
                          }
                          style={{ textDecoration: "line-through" }}
                        >
                          {docTitle}{" "}
                        </span>
                      ) : (
                        <span
                          onClick={() =>
                            getDetails(
                              controlNumber,
                              setPageLoading,
                              setShowDetails,
                              setDetails
                            )
                          }
                        >
                          {docTitle}{" "}
                        </span>
                      )}
                      <div className={styles.queryItemTime}>{timechanger}</div>
                    </div>
                  );
                })}
                <div style={{ padding: "0px 0px" }}>
                  <div
                    className={styles.queryBox}
                    onClick={() => getSearchResult(query.query)}
                  >
                    <span className={styles.queryText}>
                      <FaMagnifyingGlass fontSize="small" />
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
