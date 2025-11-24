const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Optional, you already use express.json()
const bcrypt = require('bcryptjs');
const natural = require('natural');
const TfIdf = natural.TfIdf;
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');
const { execFile } = require('child_process');

// Connect to Database
connectDB();

// --- Start Python Similarity Service using execFile ---
// const pythonExecutable = 'C:\\Me\\UofR\\Uregina\\Uregina\\Team Interfaces\\Emon\\sddl\\standalone\\venv\\Scripts\\python.exe';
// const pythonScriptPath = path.join(__dirname, 'SimilarityComputer.py'); // Adjust path as needed

// execFile(pythonExecutable, [pythonScriptPath], (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error executing python script: ${error}`);
//         return;
//     }
//     if (stdout) {
//         console.log(`Python stdout: ${stdout}`);
//         // Check for a specific message indicating success.
//         if (stdout.includes('Python similarity service started successfully')) {
//             console.log('Python similarity service is running successfully.');
//         }
//     }
//     if (stderr) {
//         console.error(`Python stderr: ${stderr}`);
//     }
// });

// --- Express App Setup ---
const app = express();

// CORS Setup
app.use(cors({
    origin: '*', // Replace with your frontend URL in production.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for Parsing
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Logging middleware.
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    if (req.body && Object.keys(req.body).length) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// API Routes
app.use('/api/workspaces', require('./routes/workspaceRoutes'));
app.use('/api/ril', require('./routes/rilRoutes'));
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/advancelogger', require('./routes/AdvanedLoggerRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('Please set NODE_ENV to production.'));
}

// Custom Error Handler Middleware
app.use(errorHandler);

// Start the Server
const port = process.env.PORT || 5006;
console.log(colors.cyan.bold(`Server started on port: ${port}`));
app.listen(port, () => console.log(`Node server listening on port: ${port}`));
