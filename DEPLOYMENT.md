# Grief Companion v2 - Deployment Guide

## Quick Start: Deploy to Vercel

### Prerequisites
- GitHub account with repository access
- Vercel account (sign up at https://vercel.com)
- Supabase project already configured

### Step 1: Create GitHub Repository

If you haven't already created the repository, follow these steps:

```bash
# Navigate to your project directory
cd /Users/victorblash/Documents/Grief\ Companion/grief-companion-v2

# Initialize git (if not already done)
git init

# Create GitHub repo at: https://github.com/new
# Name it: grief-companion-v2
# Description: "A compassionate app for processing grief with rituals, memories, and community support"
# Make it Private or Public (your choice)

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/grief-companion-v2.git

# Rename branch to main if needed
git branch -M main

# Push all commits to GitHub
git push -u origin main
```

### Step 2: Set Up Vercel Project

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/grief-companion-v2`
4. Authorize Vercel to access your GitHub account
5. Select the project and click "Import"

### Step 3: Configure Environment Variables in Vercel

In the Vercel dashboard, navigate to your project's Settings → Environment Variables and add the following:

#### Required Environment Variables

```
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://rfqbxfduvvfwhjocxeqf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcWJ4ZmR1dnZmd2hqb2N4ZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzU4NDUsImV4cCI6MjA3Mzk1MTg0NX0.BfjZda_4IeWGk5niItfaeqOZYDSVqz5EjMxaDITcsuA

# Server-side Only (mark as "Sensitive")
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcWJ4ZmR1dnZmd2hqb2N4ZXFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODM3NTg0NSwiZXhwIjoyMDczOTUxODQ1fQ.Wkj2_doi4XwwrZOfWAMISMBahn0VkRB3hz7Vkzdd21g
DATABASE_URL=postgresql://postgres:DemonMonster.2036@db.rfqbxfduvvfwhjocxeqf.supabase.co:5432/postgres

# API Configuration
NEXT_PUBLIC_API_URL=https://YOUR_VERCEL_DOMAIN/api

# AI Services (Optional, add when enabled)
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

#### Optional Environment Variables

```
# Feature Flags
NEXT_PUBLIC_ENABLE_DEBUG=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Step 4: Configure Supabase for Production

1. Go to your Supabase project: https://supabase.com/dashboard/project/rfqbxfduvvfwhjocxeqf

2. **Authentication Settings**:
   - Go to Authentication → Providers
   - Enable OAuth providers if needed (Google, GitHub, etc.)
   - Set redirect URL: `https://YOUR_VERCEL_DOMAIN/auth/callback`

3. **Database Setup**:
   - Ensure all required tables exist (see database schema below)
   - Set up Row Level Security (RLS) policies if not already done

4. **Storage Setup**:
   - Create a storage bucket named `memories` for memory photos
   - Set bucket policies to allow authenticated users to upload/view

### Step 5: Deploy

Once you've configured everything:

1. In Vercel dashboard, click "Deploy"
2. Vercel will automatically build and deploy your Next.js app
3. Your app will be available at: `https://your-project-name.vercel.app`

### Step 6: Post-Deployment Verification

1. **Update Supabase Redirect URLs**:
   ```
   https://your-project-name.vercel.app/auth/callback
   ```

2. **Test Core Features**:
   - Sign up and create account
   - Complete ritual (candle lighting)
   - Create a memory
   - Join a circle and post
   - Chat with AI companion

3. **Monitor Logs**:
   - Vercel Dashboard → Deployments → View Logs
   - Supabase Dashboard → Logs for any database errors

---

## Database Schema Reference

Ensure these tables exist in your Supabase project:

```sql
-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  avatar_url TEXT,
  loved_one_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rituals & Streaks
CREATE TABLE ritual_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  ritual_type TEXT,
  dedication TEXT,
  completed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_completed_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Memories
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT, -- 'story', 'photo', 'quote', 'favorite'
  content TEXT,
  photo_url TEXT,
  memory_date DATE,
  location TEXT,
  people TEXT[],
  tags TEXT[],
  loved_one_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Circles & Community
CREATE TABLE circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- 'flower', 'paw', 'heart'
  is_open BOOLEAN DEFAULT TRUE,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE circle_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID REFERENCES circles(id),
  user_id UUID REFERENCES auth.users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(circle_id, user_id)
);

CREATE TABLE circle_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID REFERENCES circles(id),
  user_id UUID REFERENCES auth.users(id),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Companion Messages
CREATE TABLE companion_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  role TEXT, -- 'user' or 'assistant'
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Environment Variables Summary

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | String | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | String | Yes | Public API key for browser access |
| `SUPABASE_SERVICE_ROLE_KEY` | String | Yes | Server-side service role key (private) |
| `DATABASE_URL` | String | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_API_URL` | String | No | API base URL (auto-configured in Vercel) |
| `PERPLEXITY_API_KEY` | String | No | For AI companion feature |
| `NEXT_PUBLIC_ENABLE_DEBUG` | Boolean | No | Enable debug logging (default: false) |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Boolean | No | Enable analytics (default: false) |

---

## Mobile Testing

The application is fully responsive and optimized for mobile:

- iPhone: Test at `https://your-domain.vercel.app` on Safari/Chrome
- Android: Test at `https://your-domain.vercel.app` on Chrome/Firefox
- Use Chrome DevTools device emulation for quick testing
- Recommend testing on actual devices for gesture interactions

### Key Mobile Features
- Full-height viewport with safe area insets
- Touch-optimized buttons and inputs
- Smooth animations and transitions
- Floating navigation bar for easy thumb access
- Bottom sheet modals for forms

---

## Troubleshooting

### Build Failures
- Check Vercel logs: Dashboard → Deployments → View Logs
- Ensure all environment variables are set correctly
- Verify Node.js version compatibility (v18+)

### Runtime Errors
- Check browser console for client-side errors
- Check Supabase logs for database/auth issues
- Verify Supabase credentials are correct

### Blank Page or 404s
- Clear browser cache and reload
- Check if Supabase is accessible
- Verify redirect URLs are configured correctly

### Mobile Issues
- Use responsive device mode in DevTools
- Test on real devices for accurate mobile behavior
- Check network tab for failed API calls

---

## Next Steps

1. Set up monitoring/analytics (optional)
2. Configure custom domain (if desired)
3. Set up CI/CD with GitHub Actions (optional)
4. Enable error tracking with Sentry (optional)
5. Performance optimization and caching strategies

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Framer Motion**: https://www.framer.com/motion/

---

**Deployment Date**: [Your deployment date]
**Last Updated**: December 3, 2024
