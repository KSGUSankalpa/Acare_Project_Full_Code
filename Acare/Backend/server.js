require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http'); // Import HTTP
const { Server } = require('socket.io'); // Import Socket.IO

const PredefinedAlert = require('./models/PredefinedAlert');
const SentAlert = require('./models/SentAlert');

const userRoutes = require('./api/User_login');
const hospitalRoutes = require('./api/Hospital_login');
const driverRoutes = require('./api/Driver');
const ambulanceRoutes = require('./api/Ambulance');
const availableBedRoutes = require('./api/Bedavailability');
const IcuRoutes = require('./api/Icu');
const notificationRoutes = require('./api/Notification');
const ventilators = require('./api/Ventilators');
const theaters = require('./api/Theater');
const oxygenRoutes = require('./api/Oxygen');
const moreinfoRoutes = require('./api/Moreinfo');

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/User_login', userRoutes);
app.use('/api/Hospital_login', hospitalRoutes);
app.use('/api/Driver', driverRoutes);
app.use('/api/Ambulance', ambulanceRoutes);
app.use('/api/Bedavailability', availableBedRoutes);
app.use('/api/Ventilators', ventilators);
app.use('/api/Icu', IcuRoutes);
app.use('/api/Notification', notificationRoutes);
app.use('/api/Theater', theaters);
app.use('/api/Oxygen', oxygenRoutes);
app.use('/api/Moreinfo', moreinfoRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // You can listen to events here, for example:
  socket.on('alert', (data) => {
    console.log('Received alert:', data);
    // Emit to other clients if needed
    io.emit('alert', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

// Routes for alerts
app.get('/predefinedAlerts', async (req, res) => {
  try {
    const alerts = await PredefinedAlert.find();
    res.json(alerts);
  } catch (error) {
    console.error("Error retrieving predefined alerts:", error);
    res.status(500).json({ error: 'Failed to retrieve predefined alerts' });
  }
});

app.get('/getSentAlerts', async (req, res) => {
  try {
    const alerts = await SentAlert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    console.error("Error retrieving sent alerts:", error);
    res.status(500).json({ error: 'Failed to retrieve sent alerts' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
