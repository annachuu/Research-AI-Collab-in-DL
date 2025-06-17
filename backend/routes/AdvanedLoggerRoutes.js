const express = require('express');
const router = express.Router();
const multer = require('multer');
const sort = {savedOrderId: 1};
const limit = 10;
let ObjectId = require('mongodb').ObjectId;
// Import the Log model (adjust the path as needed)
const UserLog = require('../models/logModel');

// Set storage engine for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './videos'); // Folder to save the video file
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original file name
    }
});

const upload = multer({storage: storage});


router.post("/saveVideoFile", upload.single('video'), async (request, response) => {
    console.log(request.file);
})



var WebSocket = require('ws');
const wss = new WebSocket.Server({port: 2000});


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        if (data.type === 'logEvents') {
            if (data.payload.items && data.payload.items.length > 0) {
                console.log('New log arrived:', data.payload.items[0].eventType);
                // Ensure the userId is extracted from applicationSpecificData.
                const userId = data.payload.items[0].applicationSpecificData.userID; // This should be a string.
                if (userId) {
                    getLogByUserId(userId)
                        .then(async (t) => {
                            if (t) {
                                console.log("Existing log found for user:", userId);
                                // Append non-browserEvent logs.
                                data.payload.items.forEach((logObj) => {
                                    if (logObj.eventType !== "browserEvent") {
                                        t.logs.push({
                                            applicationSpecificData: logObj.applicationSpecificData,
                                            eventType: logObj.eventType,
                                            eventDetails: logObj.eventDetails,
                                            timestamps: logObj.timestamps,
                                            metadata: logObj.metadata,
                                        });
                                    }
                                });
                                await updateLog(t);
                            } else {
                                console.log("No log document exists. Creating new log document for user:", userId);
                                // Create a new log document using userId (note the lowercase "d").
                                const logList = {
                                    userId: userId,
                                    logs: [],
                                };
                                data.payload.items.forEach((logObj) => {
                                    if (logObj.eventType !== "browserEvent") {
                                        logList.logs.push({
                                            applicationSpecificData: logObj.applicationSpecificData,
                                            eventType: logObj.eventType,
                                            eventDetails: logObj.eventDetails,
                                            timestamps: logObj.timestamps,
                                            metadata: logObj.metadata,
                                        });
                                    }
                                });
                                await saveNewLog(logList);
                            }
                        })
                        .catch((error) => {
                            console.error("Error processing log:", error);
                        });
                }
            }
        }
    });
});



// Get a user's log document by userId.
const getLogByUserId = async (userId) => {
    try {
        const userLog = await UserLog.findOne({ userId: userId });
        return userLog;
    } catch (error) {
        throw error;
    }
};

// Update a user's log document.
const updateLog = async (log) => {
    try {
        // Here we update the logs array.
        const updatedUserLog = await UserLog.findOneAndUpdate(
            { _id: log._id },
            { $set: { logs: log.logs } },
            { new: true }
        );
        return updatedUserLog;
    } catch (error) {
        throw error;
    }
};

// Save a new log document.
const saveNewLog = async (logData) => {
    try {
        const newLog = new UserLog(logData);
        await newLog.save();
        console.log("Log saved into database successfully!");
        return newLog;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};

module.exports = {
    getLogByUserId,
    updateLog,
    saveNewLog,
};



module.exports = router;