# Hintro Dashboard

A modern dashboard for AI-powered call insights and knowledge management, built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

- **Dashboard Overview**: View key metrics like total sessions, average duration, AI usage, and last session.
- **Recent Calls**: Browse recent call records with sentiment analysis, tags, and summaries.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Demo States**: Toggle between empty and active user states for demonstration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Linting**: ESLint with Next.js config

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
app/
  globals.css          # Global styles and Tailwind config
  layout.tsx           # Root layout
  page.tsx             # Main dashboard page
components/            # Reusable UI components
hooks/                 # Custom React hooks
services/              # API and mock data
types/                 # TypeScript type definitions
utils/                 # Utility functions
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
