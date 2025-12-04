# Grief Companion v2 - Deployment Checklist

## Pre-Deployment (Do Once)

- [ ] **GitHub Repository Created**
  - Name: `grief-companion-v2`
  - Visibility: Private/Public (your choice)
  - URL: `https://github.com/YOUR_USERNAME/grief-companion-v2`

- [ ] **GitHub Remote Added**
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/grief-companion-v2.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Vercel Account Created**
  - Sign up at https://vercel.com with GitHub account

## Deployment Day

### Step 1: Import Repository to Vercel
- [ ] Go to https://vercel.com/new
- [ ] Click "Import Git Repository"
- [ ] Authorize GitHub access
- [ ] Select `grief-companion-v2` repo
- [ ] Accept default settings
- [ ] Click "Import"

### Step 2: Set Environment Variables in Vercel
Navigate to: **Settings → Environment Variables**

Add these 5 variables:

**PUBLIC VARIABLES:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` → `https://rfqbxfduvvfwhjocxeqf.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` → (Copy from `.env.local` file)

**PRIVATE VARIABLES (Mark as Sensitive):**
- [ ] `SUPABASE_SERVICE_ROLE_KEY` → (Copy from `.env.local` file)
- [ ] `DATABASE_URL` → (Copy from `.env.local` file)

**OPTIONAL:**
- [ ] `NEXT_PUBLIC_ENABLE_DEBUG` → `false`
- [ ] `NEXT_PUBLIC_ENABLE_ANALYTICS` → `false`

### Step 3: Deploy
- [ ] In Vercel dashboard, click **"Deploy"**
- [ ] Wait 2-5 minutes for build to complete
- [ ] Verify deployment shows "Ready"
- [ ] Copy your Vercel URL (e.g., `https://grief-companion-v2.vercel.app`)

### Step 4: Update Supabase Auth Callback
1. [ ] Go to https://supabase.com/dashboard/project/rfqbxfduvvfwhjocxeqf
2. [ ] Navigate to: **Authentication → URL Configuration**
3. [ ] Update **Redirect URLs** to include:
   ```
   https://YOUR_VERCEL_DOMAIN/auth/callback
   ```
   (Example: `https://grief-companion-v2.vercel.app/auth/callback`)

### Step 5: Test on Desktop
In your browser, go to `https://YOUR_VERCEL_DOMAIN`

- [ ] Homepage loads (no errors in console)
- [ ] Sign up form works
- [ ] Create new account
- [ ] Redirected to dashboard
- [ ] Home page displays user info
- [ ] Can navigate to different pages (no 404s)

### Step 6: Mobile Testing - iPhone

**Using Safari:**
1. [ ] Open Safari on iPhone
2. [ ] Navigate to `https://YOUR_VERCEL_DOMAIN`
3. [ ] Test on WiFi first, then on cellular

**Test These Features:**
- [ ] App loads without errors
- [ ] Text is readable (no tiny fonts)
- [ ] Buttons are large enough to tap
- [ ] Sign up form works
- [ ] Dashboard displays correctly
- [ ] Navigation menu works (bottom floating nav)
- [ ] Ritual page displays properly
- [ ] Memory wizard loads (all 4 steps)
- [ ] Community circles visible
- [ ] AI companion chat works
- [ ] No horizontal scroll needed
- [ ] Viewport fills to edges (respects safe areas)

**Using Chrome DevTools:**
1. [ ] Open DevTools (F12 on desktop)
2. [ ] Click device toggle (top-left)
3. [ ] Select iPhone model (iPhone 15, iPhone SE)
4. [ ] Repeat tests above

### Step 7: Mobile Testing - Android

**Using Chrome on Android Device:**
1. [ ] Open Chrome browser
2. [ ] Navigate to `https://YOUR_VERCEL_DOMAIN`
3. [ ] Test on WiFi first

**Test These Features:**
- [ ] App loads without errors
- [ ] Layout matches iPhone experience
- [ ] All buttons responsive to touch
- [ ] Forms work correctly
- [ ] Navigation accessible at bottom
- [ ] No layout shifts when scrolling
- [ ] Animations smooth (no jank)

### Step 8: Test Core Functionality

**Authentication:**
- [ ] Can sign up with email/password
- [ ] Can log in with credentials
- [ ] Can log out
- [ ] Redirects work properly
- [ ] Session persists on reload

**Ritual (Candle):**
- [ ] Timer starts at 120 seconds
- [ ] Flame animates when lit
- [ ] Dedication input works
- [ ] Completes after timer ends
- [ ] Redirects to home with success

**Memories:**
- [ ] Can navigate through 4 steps
- [ ] Step indicator shows progress
- [ ] Can type memory text
- [ ] Can upload photo
- [ ] Can select date
- [ ] Can add location and people
- [ ] Can select tags
- [ ] Review shows all data
- [ ] Can save memory
- [ ] Redirects to home

**Circles:**
- [ ] List shows all circles
- [ ] Can tap on circle
- [ ] Circle detail loads
- [ ] Can write reflection
- [ ] Posts display below
- [ ] Back navigation works

**AI Companion:**
- [ ] Messages appear in chat
- [ ] Can type and send
- [ ] Receives response from AI
- [ ] Response streams smoothly
- [ ] Chat history persists

**Dashboard:**
- [ ] Shows current streak
- [ ] Shows total sessions
- [ ] Navigation menu visible
- [ ] All cards clickable
- [ ] Data updates after actions

### Step 9: Check Performance

**Desktop (Chrome DevTools Lighthouse):**
- [ ] Run Lighthouse audit
- [ ] Performance > 70
- [ ] Accessibility > 85
- [ ] Best Practices > 80
- [ ] SEO > 80

**Mobile (Chrome DevTools Lighthouse):**
- [ ] Run Lighthouse audit (mobile)
- [ ] Performance > 60 (mobile is slower)
- [ ] Accessibility > 85
- [ ] Best Practices > 80

### Step 10: Check Logs

**Vercel Logs:**
- [ ] Go to Deployment → Functions → Logs
- [ ] Check for any errors
- [ ] Check API route logs

**Supabase Logs:**
- [ ] Go to https://supabase.com/dashboard/project/rfqbxfduvvfwhjocxeqf/logs
- [ ] Check for database errors
- [ ] Check for auth errors

## Post-Deployment

- [ ] **Share Deployment URL**
  ```
  Your app is live at: https://YOUR_VERCEL_DOMAIN
  ```

- [ ] **Set Up Optional Services**
  - [ ] Add custom domain (if desired)
  - [ ] Enable error tracking (Sentry, etc.)
  - [ ] Set up analytics
  - [ ] Configure email notifications

- [ ] **Document Issues Found**
  ```
  Create GitHub Issues for:
  - Any bugs discovered during testing
  - Performance improvements needed
  - Mobile-specific fixes needed
  ```

## Troubleshooting Quick Fixes

**Build Failed?**
- [ ] Check Vercel build logs
- [ ] Verify all env variables are set
- [ ] Ensure no .env.local is in repo

**Blank Page After Deploy?**
- [ ] Clear browser cache (Cmd+Shift+Delete)
- [ ] Check browser console (F12)
- [ ] Verify Supabase is accessible
- [ ] Check Vercel function logs

**Auth Redirect Loop?**
- [ ] Verify redirect URL in Supabase matches Vercel domain
- [ ] Check auth callback route exists
- [ ] Clear browser cookies

**Mobile Layout Issues?**
- [ ] Check viewport meta tag in app layout
- [ ] Verify Tailwind responsive classes
- [ ] Test on actual device (not just DevTools)

**API Not Responding?**
- [ ] Check Vercel function logs
- [ ] Verify Supabase credentials are correct
- [ ] Check database is accessible
- [ ] Ensure environment variables are set

## Success Criteria

You're ready for mobile testing when:
- ✅ App deploys without errors
- ✅ All authentication flows work
- ✅ Can complete a ritual
- ✅ Can create a memory
- ✅ Can join a circle
- ✅ AI companion responds
- ✅ Mobile layout is responsive
- ✅ No console errors on mobile
- ✅ All buttons/inputs touch-friendly
- ✅ Navigation is intuitive

---

**Estimated Time**: 30-45 minutes
**Last Updated**: December 3, 2024
