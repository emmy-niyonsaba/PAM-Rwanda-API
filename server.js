import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import sequelize from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import testimonyRoutes from './src/routes/testimonyRoutes.js';
import sessionRoutes from './src/routes/sessionRoutes.js';
import historyRoutes from './src/routes/historyRoutes.js';
import panafricanistRoutes from './src/routes/panafricanistRoutes.js';
import opportunityRoutes from './src/routes/opportunityRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/testimonies', testimonyRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/panafricanists', panafricanistRoutes);
app.use('/api/opportunities', opportunityRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'PAM API is running', timestamp: new Date() });
});

// Create HTTP server for Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Real-time Chat with Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-chat', (chatType, sessionId) => {
    const room = sessionId ? `session-${sessionId}` : 'general';
    socket.join(room);
    console.log(`User ${socket.id} joined ${room}`);
  });

  // implenttin the soceket 
  socket.on('send-message', (message) => {
    const room = message.sessionId ? `session-${message.sessionId}` : 'general';
    io.to(room).emit('receive-message', message);
  });

  socket.on('leave-chat', (sessionId) => {
    const room = sessionId ? `session-${sessionId}` : 'general';
    socket.leave(room);
    console.log(`User ${socket.id} left ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Sync database and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');

    httpServer.listen(PORT, () => {
      console.log(`PAM Backend API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
