import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentThumbnailUrl, getBookThumbnailUrl } from '../../features/contents/contentResultsSlice';
import default_thumbnail from '../../assets/default_thmbnail1.png';

function RenderDocumentThumbnail({ doi, type }) {
    const dispatch = useDispatch();
    const { thumbnails } = useSelector((state) => state.content);
    const [imageSrc, setImageSrc] = useState(default_thumbnail);

    useEffect(() => {
        if (doi) {
            if(type === 'book'){
                dispatch(getBookThumbnailUrl(doi));
            }else{
                dispatch(getDocumentThumbnailUrl(doi));
            }
        }
    }, [doi, dispatch]);

    // console.log("___ ___ ", thumbnails[doi])
    // const documentThumbnail = thumbnails[doi] || default_thumbnail;
    useEffect(() => {
        if (thumbnails[doi]) {
            setImageSrc(thumbnails[doi]);
        }
    }, [thumbnails, doi]);

    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        console.log('__ *** __', naturalWidth )
        if (naturalWidth === naturalHeight) {
            setImageSrc(default_thumbnail); 
        }
    };

    return (
        <img
            className="object-contain w-full h-full bg-slate-50"
            src={imageSrc}
            alt="Document Thumbnail"
            onLoad={handleImageLoad}
        />
    );
}

export default RenderDocumentThumbnail;
