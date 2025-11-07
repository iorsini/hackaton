# 🍅 Pomofy - Pomodoro Timer with Empathy

> A modern, empathetic Pomodoro timer that adapts to your mood and helps you stay productive without burnout.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![Pomofy Banner](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=400&fit=crop)

---

## ✨ Features

### 🎯 **Mood-Based Timer**
- 6 different mood modes (Creative, Focused, Tired, Stressed, Unmotivated, Energized)
- Adaptive focus and break times based on your current state
- Custom timer configuration

### 📝 **Task Management**
- Create and organize tasks by category
- Track completion with visual progress
- Automatic task completion on Pomodoro finish

### 🏠 **Study Rooms**
- Create collaborative study spaces
- Invite friends with unique room codes
- Real-time activity tracking
- Room-specific leaderboards

### 📊 **Statistics & Gamification**
- Track daily, weekly, monthly progress
- Streak counter for consistency
- Total focus time and break time tracking
- Achievement system (coming soon)

### 🎨 **Modern UI/UX**
- Smooth animations with Framer Motion
- Responsive design (mobile-first)
- Dark mode ready
- Beautiful gradients and glassmorphism effects

### 🔐 **Authentication**
- Email/Password login
- OAuth (Google, GitHub)
- Secure session management with NextAuth.js

### ☁️ **Cloud Features**
- Avatar upload with Cloudinary
- Profile customization
- Data persistence across devices

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)
- (Optional) Cloudinary account for image uploads
- (Optional) OAuth credentials (Google, GitHub)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/iorsini/hackaton.git
cd hackaton
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# App
NEXT_PUBLIC_APP_NAME="Pomofy"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# MongoDB
MONGODB_URI="mongodb://localhost:27017/pomofy"

# OAuth (Optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Environment
NODE_ENV="development"
```

4. **Generate NextAuth secret**
```bash
npx auth secret
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── tasks/             # Task management
│   │   ├── rooms/             # Study rooms
│   │   ├── users/             # User management
│   │   └── cycle/             # Pomodoro cycles
│   ├── dashboard/             # Dashboard pages
│   │   ├── pomodoro/          # Main timer page
│   │   ├── profile/           # User profile
│   │   ├── progresso/         # Progress tracking
│   │   └── sobre/             # About page
│   ├── (auth)/                # Auth pages
│   │   ├── login/
│   │   └── register/
│   └── layout.js
├── components/
│   ├── auth/                  # Auth components
│   ├── pomodoro/              # Timer components
│   ├── profile/               # Profile components
│   ├── progresso/             # Stats components
│   ├── ui/                    # Reusable UI components
│   └── teste/                 # Test components
├── lib/
│   ├── mongodb.js             # Database connection
│   ├── cloudinary.js          # Image upload
│   └── calculateUserStats.js  # Stats calculation
├── models/                    # MongoDB schemas
│   ├── User.js
│   ├── Task.js
│   ├── Room.js
│   ├── PomodoroCycle.js
│   └── PomodoroSession.js
└── styles/
    └── globals.css
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/[...nextauth]     # NextAuth handler
POST   /api/auth/register          # User registration
POST   /api/auth/logout            # Logout
```

### Users
```
GET    /api/users/me               # Current user data
PUT    /api/users/me               # Update profile
DELETE /api/users/me               # Delete account
POST   /api/users/me/avatar        # Upload avatar
GET    /api/users/profile          # Profile with stats
POST   /api/users/pomodoro         # Register focus time
PATCH  /api/users/pomodoro         # Register break time
GET    /api/users/[userId]/stats   # User statistics
```

### Tasks
```
GET    /api/tasks                  # List tasks
POST   /api/tasks                  # Create task
PATCH  /api/tasks/[id]             # Update task
DELETE /api/tasks/[id]             # Delete task
```

### Rooms
```
GET    /api/rooms                  # List user rooms
POST   /api/rooms/create           # Create room
POST   /api/rooms/join             # Join room by code
GET    /api/rooms/[roomId]         # Room details
GET    /api/rooms/[roomId]/posts   # Room posts
POST   /api/rooms/[roomId]/posts   # Create post
```

### Pomodoro Sessions
```
POST   /api/session/start          # Start session
GET    /api/session/active         # Get active session
PATCH  /api/session/end            # End session
POST   /api/cycle/start            # Start cycle
PATCH  /api/cycle/complete         # Complete cycle
```

---

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form (planned)

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: NextAuth.js v4
- **File Upload**: Cloudinary

### DevOps
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier (recommended)

---

## 🎯 Key Features Explained

### Mood-Based Timer System

The timer adapts to your current emotional state:

```javascript
const MOODS = {
  CREATIVE: { focusTime: 25, breakTime: 5 },
  FOCUSED: { focusTime: 30, breakTime: 5 },
  TIRED: { focusTime: 15, breakTime: 10 },
  STRESSED: { focusTime: 20, breakTime: 7 },
  UNMOTIVATED: { focusTime: 15, breakTime: 5 },
  ENERGIZED: { focusTime: 35, breakTime: 5 }
}
```

### Statistics Calculation

Tracks your productivity across different time periods:
- Daily, weekly, monthly, yearly totals
- Streak counter (consecutive days with activity)
- Focus vs break time ratio
- Task completion rate

### Study Rooms

Collaborative spaces where you can:
- Study together with friends
- Share progress and achievements
- Compete on leaderboards
- Post updates and motivational messages

---

## 🔧 Configuration

### MongoDB Setup

**Local MongoDB:**
```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connection string
mongodb://localhost:27017/pomofy
```

**MongoDB Atlas:**
```
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to .env.local
```

### OAuth Setup

**GitHub OAuth:**
```
1. Go to GitHub Settings → Developer settings
2. New OAuth App
3. Set callback: http://localhost:3000/api/auth/callback/github
4. Copy Client ID and Secret to .env.local
```

**Google OAuth:**
```
1. Go to console.cloud.google.com
2. Create project → Enable OAuth
3. Set callback: http://localhost:3000/api/auth/callback/google
4. Copy credentials to .env.local
```

### Cloudinary Setup

```
1. Create account at cloudinary.com
2. Get Cloud Name, API Key, API Secret
3. Add to .env.local
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list

# Restart MongoDB
brew services restart mongodb-community
```

### NextAuth Session Issues
```bash
# Clear cookies and restart server
rm -rf .next
npm run dev
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Guilherme França** - Full-Stack Developer
- **Isadora Barradas** - Full-Stack Developer
- **Jhonathan Tinoco** - Full-Stack Developer
- **Paula Guollo** - Full-Stack Developer

---

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique by Francesco Cirillo
- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern productivity apps
- Built with love and a lot of ☕

---

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Desktop app (Electron)
- [ ] Advanced analytics dashboard
- [ ] Team workspaces
- [ ] Integration with calendar apps
- [ ] Spotify integration
- [ ] Custom themes
- [ ] Export data feature
- [ ] Public API

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Made with 💜 by the Pomofy Team**

*Productivity with empathy*
