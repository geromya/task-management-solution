// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Import cors
// require('dotenv').config();

// const taskRoutes = require('./routes/taskRoutes');

// const app = express();

// // Enable CORS
// app.use(cors()); // Use CORS middleware

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use(bodyParser.json());
// app.use(morgan('dev'));

// app.use('/task', taskRoutes);

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
require('./config/passport'); // Ensure your passport configuration is loaded

const app = express();

// Enable CORS
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Express session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/task', taskRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
