# Grief Companion v2 - Quick Start Guide

## TL;DR - Deploy in 5 Minutes

### 1. Create GitHub Repo
```bash
# If not already on GitHub, create a new repo at github.com/new
# Name: grief-companion-v2
# Then add remote and push:

git remote add origin https://github.com/YOUR_USERNAME/grief-companion-v2.git
git branch -M main
git push -u origin main
```

### 2. Go to Vercel
1. Visit https://vercel.com/new
2. Click "Import Git Repository"
3. Select `grief-companion-v2`
4. Click "Import"

### 3. Add 5 Environment Variables
Go to Settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://rfqbxfduvvfwhjocxeqf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcWJ4ZmR1dnZmd2hqb2N4ZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzU4NDUsImV4cCI6MjA3Mzk1MTg0NX0.BfjZda_4IeWGk5niItfaeqOZYDSVqz5EjMxaDITcsuA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcWJ4ZmR1dnZmd2hqb2N4ZXFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODM3NTg0NSwiZXhwIjoyMDczOTUxODQ1fQ.Wkj2_doi4XwwrZOfWAMISMBahn0VkRB3hz7Vkzdd21g
DATABASE_URL=postgresql://postgres:DemonMonster.2036@db.rfqbxfduvvfwhjocxeqf.supabase.co:5432/postgres
NEXT_PUBLIC_ENABLE_DEBUG=false
```

**Important**: Mark `SUPABASE_SERVICE_ROLE_KEY` and `DATABASE_URL` as "Sensitive"

### 4. Deploy
Click "Deploy" button and wait 2-5 minutes

### 5. Update Supabase Auth
Go to https://supabase.com/dashboard/project/rfqbxfduvvfwhjocxeqf/auth/url-configuration

Update Redirect URLs to:
```
https://YOUR_VERCEL_DOMAIN/auth/callback
```

### Done!
Your app is now live at `https://YOUR_VERCEL_DOMAIN` 🎉

---

## Environment Variables Explained

| Variable | What It Is | Where It Goes |
|----------|-----------|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase database URL | Public (in browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | Public (in browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Private server key | Private (server only) |
| `DATABASE_URL` | PostgreSQL connection | Private (server only) |
| `NEXT_PUBLIC_ENABLE_DEBUG` | Show debug info (false for prod) | Public |

---

## Quick Test Checklist

After deployment, test these on **mobile** (iPhone or Android):

- [ ] App loads without blank screen
- [ ] Can create account
- [ ] Can log in
- [ ] Dashboard shows your info
- [ ] Can light a candle ritual
- [ ] Can create a memory (all 4 steps)
- [ ] Can view circles and post
- [ ] Can chat with AI companion
- [ ] Can view progress/streak
- [ ] Layout looks good (not stretched/squished)
- [ ] All buttons are tappable
- [ ] Navigation menu works
- [ ] No console errors (F12 → Console)

---

## Features Deployed

✅ **Authentication**
- Email/password signup and login
- Session management
- Protected routes

✅ **Dashboard**
- User profile
- Streak display
- Ritual completion stats
- Memory and circle shortcuts

✅ **Rituals**
- Candle lighting experience
- 2-minute reflection timer
- Dedication input
- Streak tracking

✅ **Memories**
- 4-step memory creation wizard
- Multiple memory types (story, photo, quote, favorite)
- Photo upload support
- Location and people tagging
- Memory review before saving

✅ **Community**
- Circle discovery
- Circle detail with posts
- Share reflections in circles
- See other members' posts

✅ **AI Companion**
- Chat with grief-supportive AI
- Real-time streaming responses
- Message history
- Suggestion cards

✅ **Streak Tracking**
- Calendar view of completed rituals
- Current and longest streak display
- Total sessions count
- Month navigation

---

## Troubleshooting

### Blank Page?
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Vercel logs: Dashboard → Deployments → [Latest] → View Logs
4. Verify all env variables are set

### Can't Log In?
1. Check auth redirect URL in Supabase
2. Clear browser cookies/cache
3. Check browser console for errors
4. Verify Supabase credentials are correct

### Buttons Don't Work on Mobile?
1. Test on actual device (not just emulator)
2. Check network tab for API errors
3. Verify Supabase is accessible
4. Check Vercel function logs

### Deployment Failed?
1. Check Vercel build logs
2. Ensure all env variables are set (no typos)
3. Verify `.env.local` is NOT in git repo
4. Check Node.js version is 18+

---

## Documentation Files

- **DEPLOYMENT.md** - Complete step-by-step deployment guide
- **VERCEL_ENV.md** - Environment variables reference
- **DEPLOYMENT_CHECKLIST.md** - Detailed mobile testing checklist

---

## Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Your Supabase Project**: https://supabase.com/dashboard/project/rfqbxfduvvfwhjocxeqf
- **GitHub Repository**: https://github.com/YOUR_USERNAME/grief-companion-v2

---

## Next Steps After Mobile Testing

1. Document any bugs found during testing
2. Create GitHub Issues for each bug
3. Plan fixes for Phase 5
4. Get user feedback
5. Iterate and improve

---

**Happy testing!** 🌱

If something breaks, check the docs or Vercel/Supabase logs.

**Last Updated**: December 3, 2024
