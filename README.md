# NexaTech Landing Page

A modern, responsive landing page built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The app will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   └── TechLanding.jsx    # Main landing page component
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind imports
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── postcss.config.js         # PostCSS configuration
```

## ✨ Features

- 🎨 Modern, gradient-based design
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessible (ARIA labels, keyboard navigation)
- ⚡ Optimized performance (throttled scroll, memoization)
- 🎯 Smooth scrolling navigation
- 📝 Form validation with error handling
- 🎭 Loading states and animations

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder will contain the production-ready files.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`

## 📝 Notes

- The form currently simulates an API call. Replace the API call in `TechLanding.jsx` (line 86) with your actual endpoint.
- Analytics integration is ready for Google Tag Manager (see line 89-94 in TechLanding.jsx).





