## ⚡ 5-Minute Setup

1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Add your MongoDB URI (or use MongoDB Atlas free tier)
4. Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
5. `npm run dev`

✅ Done! Login with email or OAuth

# 🚀 DevBase Template

> A modern, production-ready Next.js starter template with authentication, user management, and beautiful UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6-green?style=flat-square&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🔐 Authentication
- ✅ Email/Password with bcrypt
- ✅ OAuth (GitHub & Google)
- ✅ Session management
- ✅ Protected routes
- ✅ Password reset ready

### 👤 User Management
- ✅ Profile with avatar upload
- ✅ Account settings
- ✅ Password change
- ✅ Account deletion
- ✅ Email validation

### 🎨 UI/UX
- ✅ Modern, responsive design
- ✅ Dark theme optimized
- ✅ Mobile-first
- ✅ Accessible components
- ✅ Loading states
- ✅ Smooth animations

### 🛠️ Developer Experience
- ✅ Clean code structure
- ✅ Reusable components
- ✅ TypeScript ready
- ✅ Hot reload
- ✅ Easy configuration

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/devbase-template.git my-app
cd my-app

# Run setup script
node scripts/setup.js

# Install dependencies
npm install

# Start development server
npm run dev
```

### Option 2: Manual Setup

```bash
# Clone and install
git clone https://github.com/yourusername/devbase-template.git my-app
cd my-app
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
# Generate NEXTAUTH_SECRET with:
openssl rand -base64 32

# Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Configuration

### App Configuration

Edit `config/app.config.js` to customize:

```javascript
export const appConfig = {
  name: "Your App Name",
  description: "Your app description",
  colors: {
    primary: "#0B111c",
    secondary: "#1e2939",
    accent: "#00c951",
  },
  // ... more options
};
```

### Enable/Disable Features

```javascript
features: {
  auth: {
    credentials: true,      // Email/password
    github: true,           // GitHub OAuth
    google: true,           // Google OAuth
  },
  profile: {
    avatarUpload: true,     // Avatar upload
    accountDeletion: true,  // Delete account
  },
}
```

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_SECRET` | ✅ | Authentication secret (generate with `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | ✅ | Your app URL (http://localhost:3000 in dev) |
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `GITHUB_ID` | ⚠️ | GitHub OAuth Client ID (optional) |
| `GITHUB_SECRET` | ⚠️ | GitHub OAuth Secret (optional) |
| `GOOGLE_CLIENT_ID` | ⚠️ | Google OAuth Client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | ⚠️ | Google OAuth Secret (optional) |
| `CLOUDINARY_CLOUD_NAME` | ⚠️ | Cloudinary cloud name (optional) |
| `CLOUDINARY_API_KEY` | ⚠️ | Cloudinary API key (optional) |
| `CLOUDINARY_API_SECRET` | ⚠️ | Cloudinary API secret (optional) |

⚠️ = Optional, ✅ = Required

## 🗂️ Project Structure

```
devbase-template/
├── config/                 # App configuration
│   └── app.config.js
├── public/                 # Static files
├── scripts/               # Setup scripts
│   └── setup.js
├── src/
│   ├── app/
│   │   ├── (auth)/        # Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/     # Protected pages
│   │   │   ├── home/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── about/
│   │   ├── api/           # API routes
│   │   │   ├── auth/
│   │   │   └── users/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── providers.js
│   ├── components/
│   │   ├── auth/          # Auth components
│   │   ├── profile/       # Profile components
│   │   └── ui/            # Reusable UI
│   ├── lib/               # Utilities
│   │   ├── mongodb.js
│   │   └── cloudinary.js
│   └── models/            # Database models
│       └── User.js
├── .env.example           # Environment template
├── .env.local            # Your environment (not in git)
└── README.md
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#0B111c',    // Main background
  secondary: '#1e2939',  // Card background
  accent: '#00c951',     // Brand color
}
```

### Components

All UI components are in `src/components/ui/`:
- `Button.jsx` - Buttons with variants
- `Input.jsx` - Form inputs
- `Alert.jsx` - Alert messages
- `LoadingSpinner.jsx` - Loading states
- And more...

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/devbase-template)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- **Railway**: `railway up`
- **Render**: Connect GitHub repo
- **DigitalOcean**: App Platform
- **AWS**: Amplify

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test

# Run linter
npm run lint

# Build for production
npm run build
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Support

- ⭐ Star the project
- 🐛 Report bugs
- 💡 Request features
- 📖 Improve documentation

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/devbase-template](https://github.com/yourusername/devbase-template)

---

Made with ❤️ by Isadora (https://github.com/iorsini)