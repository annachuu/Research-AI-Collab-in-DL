import React, { useState } from "react";
import styles from "./ContentListings.module.css";
import {
    FaLockOpen,
    FaBookOpenReader,
    FaLink,
    FaArrowUpRightFromSquare,
    FaAngleRight,
} from "react-icons/fa6";

// Define the helper function before using it in the component
const buildFullDisplayUrl = (doc) => {
    const baseUrl =
        "https://casls-regina.primo.exlibrisgroup.com/discovery/fulldisplay?";
    const docid = doc.pnx.control.recordid[0];
    const context = doc.context; // e.g., "L"
    const vid = "01CASLS_REGINA:01CASLS_REGINA";
    const lang = "en";
    const search_scope = "MyInst_and_CI";
    const adaptor = doc.adaptor; // e.g., "Local Search Engine"
    const tab = "Everything";
    const query = "any,contains,data";
    const mode = "Basic";
    return `${baseUrl}docid=${docid}&context=${context}&vid=${vid}&lang=${lang}&search_scope=${search_scope}&adaptor=${encodeURIComponent(
        adaptor
    )}&tab=${tab}&query=${query}&mode=${mode}`;
};

function SERPDocumentComponent({ doc }) {
    const [isReadMore, setIsReadMore] = useState(true);

    const readMoreHandler = (id) => {
        setIsReadMore(!isReadMore);
    };

    const fullDisplayUrl = buildFullDisplayUrl(doc);
    return (
        <div className="pl-5 w-full">
            <div className="flex mb-2">
                <div className="flex items-center">
                    <div className={`rounded-full ${styles.contenttype_wrap}`}>
                        <p className="text-xs font-semibold capitalize px-1">
                            {doc.pnx.display.type}
                        </p>
                    </div>
                    {(doc.pnx.display.creationdate !== undefined ||
                        doc.pnx.facets.creationdate !== undefined) && (
                        <div className={`mx-3.5 ${styles.block}`}></div>
                    )}
                    <div>
                        {doc.pnx.display.creationdate !== undefined
                            ? doc.pnx.display.creationdate
                            : doc.pnx.facets.creationdate}
                    </div>
                    {doc.pnx.display.ispartof !== undefined && (
                        <div className={`mx-3.5 ${styles.block}`}></div>
                    )}
                    <p>
                        {doc.pnx.display.ispartof !== undefined && (
                            <>{doc.pnx.display.ispartof}</>
                        )}
                    </p>
                </div>
            </div>
            {/* Document Title wrapped in a clickable link */}
            <h3 className="text-lg font-bold" id={"document-title-serp"}>
                <a href={fullDisplayUrl} target="_blank" rel="noopener noreferrer">
                    {doc.pnx.display.title[0]}
                </a>
            </h3>
            <p className="mb-2 italic">
                {doc.pnx.addata?.au !== undefined ? (
                    <>
                        {doc.pnx.addata.au.map((author, index) => (
                            <span key={index}>
                {author.replace(".", "").split(",")}{" "}
                                {doc.pnx.addata.au.length - 1 !== index && <span>,</span>}{" "}
              </span>
                        ))}
                    </>
                ) : (
                    <>
                        {doc.pnx.addata?.addau !== undefined ? (
                            <>
                                {doc.pnx.addata.addau.map((author, index) => (
                                    <span key={index}>
                    {author.replace(".", "").split(",")}{" "}
                                        {doc.pnx.addata.addau.length - 1 !== index && <span>,</span>}{" "}
                  </span>
                                ))}
                            </>
                        ) : (
                            <>
                                {doc.pnx.addata?.contributor !== undefined && (
                                    <>
                                        {doc.pnx.addata.contributor.map((author, index) => (
                                            <span key={index}>
                        {author.replace(".", "").split(",")}{" "}
                                                {doc.pnx.addata.addau.length - 1 !== index && <span>,</span>}{" "}
                      </span>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </p>
            {doc.pnx.addata?.abstract !== undefined && (
                <>
                    {doc.pnx.addata.abstract[0].length > 250 ? (
                        <>
                            {isReadMore ? (
                                <p className={`my-5 text-justify ${styles.abstract_txt}`}>
                                    {doc.pnx.addata.abstract[0].slice(0, 250) + `...`}
                                    <span
                                        onClick={() =>
                                            readMoreHandler(doc.pnx.control.recordid[0])
                                        }
                                        className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition ease-out"
                                    >
                    {" "}
                                        Read more
                  </span>
                                </p>
                            ) : (
                                <p className={`my-5 text-justify ${styles.abstract_txt}`}>
                                    {doc.pnx.addata.abstract[0]}
                                    <span
                                        onClick={() =>
                                            readMoreHandler(doc.pnx.control.recordid[0])
                                        }
                                        className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition ease-out"
                                    >
                    {" "}
                                        Read less
                  </span>
                                </p>
                            )}
                        </>
                    ) : (
                        <p className={`my-5 text-justify ${styles.abstract_txt}`}>
                            {doc.pnx.addata.abstract[0]}
                        </p>
                    )}
                </>
            )}
            <div className="mt-3">
                <div className="flex items-center">
                    {doc.pnx.display?.lds50 !== undefined && (
                        <>
                            {doc.pnx.display.lds50.map((peerReviewData, index) => (
                                <div key={index} className="flex items-center mr-3">
                                    {peerReviewData === "peer_reviewed" && (
                                        <>
                                            <FaBookOpenReader className="text-sm text-cyan-600" />
                                            <p className="uppercase text-sm ml-1">Peer Reviewed</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                    {doc.pnx.addata?.oa !== undefined && (
                        <>
                            {doc.pnx.addata.oa.map((data, index) => (
                                <div key={index} className="flex items-center">
                                    {data === "free_for_read" && (
                                        <>
                                            <FaLockOpen className="text-sm text-lime-500" />
                                            <p className="uppercase text-sm ml-1">Open Access</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            {doc.delivery?.availability !== undefined && (
                <>
                    {doc.delivery.availability.map((fulltextData, index) => (
                        <div key={index} className="flex items-center">
                            {fulltextData === "fulltext" && (
                                <>
                                    <FaLink className="text-sm text-slate-500" />
                                    <p className="uppercase text-sm m-1 text-indigo-600">
                                        Full text available
                                    </p>
                                    <FaArrowUpRightFromSquare className="text-sm text-slate-500 ml-1" />
                                    <FaAngleRight className="text-sm text-slate-500 ml-1" />
                                </>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default SERPDocumentComponent;
