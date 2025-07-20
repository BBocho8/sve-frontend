# SVE Match Replays 🏈

A modern web application for coaches, players, and team staff to watch and analyze football match replays. Built with Next.js 15, TypeScript, and Sanity CMS.

## ✨ Features

- **🎥 Match Replays**: Watch high-quality game replays with video analysis
- **🔍 Smart Search**: Search games by team names or competitions
- **🏆 Competition Filtering**: Filter games by different competitions
- **📊 Game Statistics**: View match results and performance data
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🔐 Admin Panel**: Secure admin area for content management
- **⚡ Fast Performance**: Optimized with Next.js 15 and SWR caching

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI (MUI)
- **Icons**: Heroicons
- **CMS**: Sanity
- **Authentication**: NextAuth.js
- **Data Fetching**: SWR
- **Deployment**: Netlify

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- Sanity account
- Supabase account (optional, for additional features)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sve-replay-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables (see [Environment Variables](#environment-variables) section)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth (for admin authentication)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase Configuration (optional)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Getting Your Sanity Credentials

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Go to Project Settings → API
4. Copy your Project ID and Dataset name
5. Create a new API token with read permissions

### Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── replay/            # Replay pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── home/             # Homepage components
│   ├── main-components/  # Shared components (Navbar, Footer)
│   ├── providers/        # Context providers
│   └── replay/           # Replay-specific components
├── stores/               # State management (Zustand)
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🎯 Key Components

### Homepage (`/`)
- Hero section with call-to-action
- Quick stats overview
- Latest games preview
- Quick action cards

### Replay Page (`/replay`)
- Search functionality
- Competition filtering
- Paginated game grid
- Game cards with video thumbnails

### Game Details (`/replay/[gameID]`)
- Video player integration
- Match statistics
- Game result display
- Navigation controls

### Admin Panel (`/admin`)
- Protected admin area
- Content management interface
- Authentication required

## 🔐 Authentication

The admin panel is protected with NextAuth.js and Google OAuth. Only authorized users can access the admin area.

### Admin Access
- Navigate to `/admin`
- Sign in with your Google account
- Must be in the authorized admin list

## 🎨 Styling

The project uses Tailwind CSS for styling with a custom color scheme:
- Primary Green: `#15A34A`
- Secondary colors defined in `tailwind.config.ts`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Netlify Deployment

1. **Connect your repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add environment variables** in Netlify dashboard
4. **Deploy**

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy**

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Quality

- **ESLint**: Code linting with custom rules
- **TypeScript**: Full type safety
- **Prettier**: Code formatting
- **Biome**: Additional linting and formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [Sanity](https://sanity.io) for the headless CMS
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Heroicons](https://heroicons.com) for the beautiful icons

---

**Built with ❤️ for SVE Team**
