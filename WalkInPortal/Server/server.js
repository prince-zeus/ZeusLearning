require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const { connection } = require('./config/connectDB');
const PORT = process.env.PORT || 3500;

// Connect to MySQL
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// custom middleware logger
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/api/register', require('./routes/registerRoute.js'));
app.use('/api/login', require('./routes/loginRoute.js'));

app.use(verifyJWT);
app.use('/api/jobs', require('./routes/jobsRoute'))
app.use('/api/appliedjob', require('./routes/appliedJobRoute.js'))
app.use('/api/jobroles', require('./routes/jobRoles.js'))
app.use('/api/qualifications', require('./routes/qualificationsRoute.js'))
app.use('/api/colleges', require('./routes/collegesRoute.js'))
app.use('/api/streams', require('./routes/streamsRoute.js'))
app.use('/api/technologies', require('./routes/technologiesRoute.js'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// app.use(errorHandler);