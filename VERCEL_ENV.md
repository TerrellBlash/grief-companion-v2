# Vercel Environment Variables Checklist

Copy and paste these environment variable names into Vercel Dashboard Settings → Environment Variables.

## Required Variables (Must Set Before Deploy)

### Public Variables (Visible in Browser)
```
NEXT_PUBLIC_SUPABASE_URL
Value: https://rfqbxfduvvfwhjocxeqf.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcWJ4ZmR1dnZmd2hqb2N4ZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzU4NDUsImV4cCI6MjA3Mzk1MTg0NX0.BfjZda_4IeWGk5niItfaeqOZYDSVqz5EjMxaDITcsuA
```

### Private Variables (Server-Side Only - Mark as Sensitive)
```
SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcWJ4ZmR1dnZmd2hqb2N4ZXFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODM3NTg0NSwiZXhwIjoyMDczOTUxODQ1fQ.Wkj2_doi4XwwrZOfWAMISMBahn0VkRB3hz7Vkzdd21g

DATABASE_URL
Value: postgresql://postgres:DemonMonster.2036@db.rfqbxfduvvfwhjocxeqf.supabase.co:5432/postgres
```

## Optional Variables (Add When Enabling Features)

### AI Companion (Perplexity API)
```
PERPLEXITY_API_KEY
Value: [Get from https://www.perplexity.ai/api - add when you have key]
```

### Feature Flags
```
NEXT_PUBLIC_ENABLE_DEBUG
Value: false
(Set to true only for debugging deployments)

NEXT_PUBLIC_ENABLE_ANALYTICS
Value: false
(Set to true when adding analytics service)
```

## Step-by-Step in Vercel UI

1. Go to your project on https://vercel.com
2. Click Settings → Environment Variables
3. For each variable:
   - Enter **Name** (exact text from above)
   - Enter **Value** (exact value from above)
   - Select **Environments**: Production, Preview, Development
   - If private (SERVICE_ROLE_KEY, DATABASE_URL), leave "Sensitive" checked
   - Click **Add**
4. Click **Save**
5. Trigger a new deployment or redeploy

## After Setting Variables

The variables will be available to:
- ✅ Build process
- ✅ Server-side code (API routes, server components)
- ✅ Client-side code (only NEXT_PUBLIC_* variables)

**Security Note**: Never commit `.env.local` to GitHub. The `.gitignore` is already configured to exclude it.

## Verification

After deploying with these variables:

1. ✅ Check Vercel dashboard shows no undefined variable errors
2. ✅ Test authentication (sign up/login)
3. ✅ Test ritual completion (triggers Supabase write)
4. ✅ Test memory creation
5. ✅ Test AI companion (if PERPLEXITY_API_KEY is set)

If something breaks, check the deployment logs:
- Vercel Dashboard → Deployments → [Latest] → View Logs

---

**Last Updated**: December 3, 2024
