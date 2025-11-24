import axios from 'axios'
import { library_url, doi_url, isbn_url, API_URL } from "../../config/env";

const API = library_url;
const API_Base = API_URL;
const DOC_COVER_API = doi_url
const BOOK_COVER_API = isbn_url

//@desc Get SERP
//@route GET /API/
// A simple hash function that returns a positive integer from a string.
// A simple hash function that returns a positive integer from a string.
const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32-bit integer.
    }
    return Math.abs(hash);
};

export const getBookResultLists = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        console.log('data.offset = ', data.offset);
        console.log('data.limit = ', data.limit);

        // Get the book results.
        const bookResponse = await axios.get(
            API + data.query + '&offset=' + data.offset + '&limit=' + (data.limit - 1),
            config
        );

        // bookResponse.data is an object that includes docs.
        const bookData = bookResponse.data;
        let bookDocs = bookData.docs; // Extract the docs array.
        if (!Array.isArray(bookDocs)) {
            console.error("bookData.docs is not an array:", bookDocs);
            bookDocs = [];
        }
        // If there are three or fewer books, return the original bookData without insertion.
        return bookData;
    } catch (error) {
        console.error('Error in getBookResultLists:', error);
        throw error;
    }
};

// get document cover by doi
const getDocumentCover = async (doi, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.get(
            DOC_COVER_API +
            doi +
            "?" +
            'include=journal&' +
            'access_token=66db3295-b03a-4a98-ae87-3473b6d85542')

        // console.log(response)
        // console.log(response.data.included[0])

        return response.data.included[0]
    } catch (error) {
        // Handle the error
        if (error.response) {


            if(error.response.status === 404){
                console.log('error')
                return []
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Request setup error:", error.message);
        }
        // Return null or throw an error depending on your requirements
        throw error;
    }
}

// get book cover by isbn
const getBookCover = async (isbn, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.get(
            BOOK_COVER_API +
            isbn +  '/sc.jpg'
        )

        console.log(response)
        console.log(response.data.included[0])

        return response.data.included[0]
    } catch (error) {
        // Handle the error
        if (error.response) {
            if(error.response.status === 404){
                console.log('error')
                return []
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Request setup error:", error.message);
        }
        // Return null or throw an error depending on your requirements
        throw error;
    }
}

const getBookCover1 = async (doi, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(
            `${DOC_COVER_API}${doi}?include=journal&access_token=66db3295-b03a-4a98-ae87-3473b6d85542`,
            config
        );
        return response.data.included;
    } catch (error) {
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);

            if (error.response.status === 404) {
                return [];
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Request setup error:", error.message);
        }
        throw error;
    }
};


export const saveChatMessage = async (msg) =>
{
    return axios.post("/api/chat", msg);
};

export const getAllChatMessages = async () =>
{
    return axios.get("/api/chat");
};

const contentResultsService = {
    getBookResultLists,
    getDocumentCover,
    getBookCover,
    saveChatMessage,
    getAllChatMessages

}

export default contentResultsService;