# PAM Rwanda - Backend API

Professional Pan-Africanism Movement Platform Backend built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **User Authentication**: JWT-based auth with bcrypt password hashing
- **Complete REST API**: All core functionality exposed through RESTful endpoints
- **Database Models**: Comprehensive data models for Users, Events, Testimonies, Learning Sessions, History, Panafricanists, Opportunities, and Chat
- **Real-time Chat**: Socket.io integration for live community and session chat
- **Role-Based Access**: Admin, Member, and User roles with authorization middleware
- **Learning Path**: Structured learning sessions with progress tracking and membership verification
- **Events Management**: Full CRUD operations for events with filtering capabilities

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)  
- npm or yarn

## 🔧 Installation

1. **Navigate to directory**
   ```bash
   cd PAM-Rwanda-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables** - Copy `.env.example` to `.env`:
   ```bash
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=pam_rwanda
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Create PostgreSQL database**:
   ```bash
   createdb pam_rwanda
   ```

5. **Seed database with sample data** (optional):
   ```bash
   npm run seed
   ```

## 🚀 Running

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

API runs at: `http://localhost:5000/api`

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get profile |
| PUT | `/api/auth/profile` | Update profile |
| GET | `/api/events` | Get events |
| POST | `/api/events` | Create event |
| GET | `/api/sessions` | Get sessions |
| POST | `/api/sessions/:id/complete` | Complete session |
| GET | `/api/testimonies` | Get testimonies |
| POST | `/api/testimonies` | Submit testimony |
| GET | `/api/history` | Get history |
| GET | `/api/panafricanists` | Get heroes |
| GET | `/api/opportunities` | Get opportunities |
| GET | `/api/chat` | Get messages |
| POST | `/api/chat` | Send message |

## 🔐 Authentication

Request headers:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Get token via login:
```bash
POST /api/auth/login
{
  "email": "admin@pam.africa",
  "password": "admin123"
}
```

## 🗄️ Database Models

- **User**: Authentication, profile, membership status
- **Event**: Conferences, workshops, webinars
- **LearningSession**: Course modules (4 sessions)
- **SessionProgress**: User progress tracking
- **Testimony**: Community stories
- **AfricanHistory**: Historical records
- **Panafricanist**: Historical figures
- **Opportunity**: Jobs, scholarships, startups
- **ChatMessage**: Real-time messages

## 💬 Real-time Chat

Socket.io events:
- `join-chat` - Join room
- `send-message` - Send message
- `receive-message` - Receive message
- `leave-chat` - Leave room

## 🌐 CORS

Configured for `http://localhost:5173`. Update `.env` for production.

## 📝 Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "secure123",
    "country": "Kenya"
  }'
```

### Create Event
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pan-African Summit",
    "date": "2026-06-01",
    "location": "Nairobi",
    "country": "Kenya",
    "category": "conference"
  }'
```

## 🐛 Troubleshooting

**DB Connection Error**
- Ensure PostgreSQL is running
- Check credentials in `.env`
- Create database: `createdb pam_rwanda`

**Port in Use**
- Change PORT in `.env`
- Kill process: `lsof -i :5000`

**JWT Errors**
- Check JWT_SECRET in `.env`
- Verify token format

## 📄 License

MIT @ Pan-Africanism Movement 2026

---

Built with 🖤 for African Unity