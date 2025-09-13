# Google OAuth Setup Guide

Your Google OAuth integration is now configured and ready to use! You just need to add the missing environment variables.

## Required Environment Variables

Add these to your `.env` file:

### 1. NEXTAUTH_SECRET
Generate a random secret key:
```bash
# Option 1: Online generator
# Visit: https://generate-secret.vercel.app/32

# Option 2: Command line
openssl rand -base64 32

# Option 3: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. NEXTAUTH_URL
```bash
# Development
NEXTAUTH_URL="http://localhost:3000"

# Production (replace with your actual domain)
NEXTAUTH_URL="https://yourdomain.com"
```

### 3. GOOGLE_CLIENT_SECRET
Get this from Google Cloud Console:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" → "Credentials"
4. Find your OAuth 2.0 Client ID (the one matching your GOOGLE_CLIENT_ID)
5. Copy the "Client secret" value

## Complete .env Example
```bash
DATABASE_URL="libsql://thingstorent-wzid.aws-us-east-2.turso.io"
DATABASE_AUTH_TOKEN="your-database-token"

# NextAuth Configuration
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="42383798583-jfhsu0hp4lqdo0iii5rqv08sapv00p1a.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="42383798583-jfhsu0hp4lqdo0iii5rqv08sapv00p1a.apps.googleusercontent.com"
```

## Google OAuth Configuration
Make sure your Google OAuth app is configured with these settings:
- **Authorized JavaScript origins**: `http://localhost:3000` (development)
- **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

## Test Your Setup

1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/login`
3. Click "Continue with Google"
4. Complete the OAuth flow

## What Was Fixed

✅ **Database Schema**: Updated to be fully compatible with NextAuth
✅ **Auth Configuration**: Centralized in `/src/lib/auth.ts`
✅ **Session Provider**: Added to layout for client-side session management
✅ **Login Page**: Created at `/login` with Google OAuth button
✅ **Middleware**: Added route protection for authenticated areas
✅ **API Routes**: Properly configured NextAuth handlers

## Protected Routes
These routes now require authentication:
- `/dashboard`
- `/profile` 
- `/list`

Users will be automatically redirected to `/login` if not authenticated.
