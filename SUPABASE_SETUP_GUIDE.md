# Supabase Setup Guide

This guide will walk you through connecting to the Supabase database from scratch and testing the application functionality.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Your Supabase Project](#getting-your-supabase-project)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Database Schema Setup](#database-schema-setup)
5. [Storage Bucket Setup](#storage-bucket-setup)
6. [Authentication Setup](#authentication-setup)
7. [Testing the Application](#testing-the-application)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js 18+ and npm installed
- Basic understanding of SQL

---

## Getting Your Supabase Project

### Step 1: Create or Access Your Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Create a new project or select an existing one
4. Wait for the project to finish provisioning (usually takes 1-2 minutes)

### Step 2: Get Your Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Find the following values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

You'll need these in the next step.

---

## Environment Variables Setup

### Step 1: Create `.env.local` File

Create a `.env.local` file in the root of your project:

```bash
# In the project root directory
touch .env.local
```

### Step 2: Add Environment Variables

Open `.env.local` and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `https://your-project-id.supabase.co` with your **Project URL**
- `your-anon-key-here` with your **anon public** key

**Important:** 
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- These keys are safe to use in client-side code as they're protected by Row Level Security (RLS)

### Step 3: Restart Your Development Server

If your server is running, restart it to load the new environment variables:

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

---

## Database Schema Setup

The application uses several database tables. You need to create them in your Supabase project.

### Step 1: Access SQL Editor

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**

### Step 2: Create Database Tables

Copy and paste the following SQL script into the SQL Editor, then click **Run**:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    username TEXT,
    account_id TEXT,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    home_phone TEXT,
    preferred_contact TEXT DEFAULT 'phone',
    bio TEXT,
    facebook_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    birthdate TEXT,
    gender TEXT,
    religion TEXT,
    race TEXT,
    first_gen BOOLEAN DEFAULT FALSE,
    veteran BOOLEAN DEFAULT FALSE,
    hispanic_latinx BOOLEAN DEFAULT FALSE,
    citizenship_status TEXT,
    primary_citizenship TEXT,
    no_tests BOOLEAN DEFAULT FALSE,
    sat_ebrw TEXT,
    sat_math TEXT,
    act_english TEXT,
    act_math TEXT,
    act_reading TEXT,
    act_science TEXT,
    intended_degree_type TEXT,
    intended_college_type TEXT,
    sports TEXT,
    rotc TEXT,
    high_school_name TEXT,
    grad_year TEXT,
    ceeb_code TEXT,
    gpa TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT DEFAULT 'US',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create other essential tables (simplified versions)
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.collection_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL,
    notes TEXT,
    order_index INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    all_day BOOLEAN DEFAULT FALSE,
    color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.monitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    site_name TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_title TEXT NOT NULL,
    item_image_url TEXT,
    country_code TEXT NOT NULL,
    country_flag_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    interval_minutes INTEGER DEFAULT 60,
    checks_total INTEGER DEFAULT 0,
    checks_used INTEGER DEFAULT 0,
    last_check_at TIMESTAMPTZ,
    unread_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    modified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.monitor_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    monitor_id UUID REFERENCES public.monitors(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL,
    field_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.monitor_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    monitor_id UUID REFERENCES public.monitors(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL,
    change_type TEXT,
    current_value TEXT,
    previous_value TEXT,
    current_value_full TEXT,
    previous_value_full TEXT,
    magnitude_percentage NUMERIC,
    triggers JSONB,
    unread_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    modified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.monitor_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    monitor_id UUID REFERENCES public.monitors(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL,
    alert_config JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    action_url TEXT,
    metadata JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    team_owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    status TEXT DEFAULT 'pending',
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.verification_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    submitted_data JSONB,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    thumbnail_url TEXT,
    status TEXT DEFAULT 'draft',
    pinned BOOLEAN DEFAULT FALSE,
    hero JSONB,
    overview JSONB,
    info_columns JSONB,
    sections JSONB,
    key_features JSONB,
    gallery TEXT[],
    testimonial JSONB,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON public.collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON public.calendar_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monitors_updated_at BEFORE UPDATE ON public.monitors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verification_requests_updated_at BEFORE UPDATE ON public.verification_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username, account_id, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        UPPER(REPLACE(SUBSTRING(NEW.id::TEXT, 1, 10), '-', '')),
        NEW.raw_user_meta_data->>'full_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitor_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitor_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitor_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Collections: Users can manage their own collections
CREATE POLICY "Users can view own collections" ON public.collections
    FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users can create own collections" ON public.collections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own collections" ON public.collections
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own collections" ON public.collections
    FOR DELETE USING (auth.uid() = user_id);

-- Collection Items: Users can manage items in their collections
CREATE POLICY "Users can manage own collection items" ON public.collection_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.collections
            WHERE collections.id = collection_items.collection_id
            AND collections.user_id = auth.uid()
        )
    );

-- Calendar Events: Users can manage their own events
CREATE POLICY "Users can manage own calendar events" ON public.calendar_events
    FOR ALL USING (auth.uid() = user_id);

-- Monitors: Users can manage their own monitors
CREATE POLICY "Users can manage own monitors" ON public.monitors
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own monitor fields" ON public.monitor_fields
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.monitors
            WHERE monitors.id = monitor_fields.monitor_id
            AND monitors.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own monitor details" ON public.monitor_details
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.monitors
            WHERE monitors.id = monitor_details.monitor_id
            AND monitors.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own monitor alerts" ON public.monitor_alerts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.monitors
            WHERE monitors.id = monitor_alerts.monitor_id
            AND monitors.user_id = auth.uid()
        )
    );

-- Notifications: Users can view and update their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Team Members: Users can view team members where they are owner or member
CREATE POLICY "Users can view relevant team members" ON public.team_members
    FOR SELECT USING (
        auth.uid() = user_id OR auth.uid() = team_owner_id
    );

CREATE POLICY "Team owners can manage team members" ON public.team_members
    FOR ALL USING (auth.uid() = team_owner_id);

-- Verification Requests: Users can view and create their own requests
CREATE POLICY "Users can manage own verification requests" ON public.verification_requests
    FOR ALL USING (auth.uid() = user_id);
```

### Step 3: Verify Tables Created

1. Go to **Table Editor** in your Supabase dashboard
2. You should see all the tables listed (profiles, collections, calendar_events, etc.)

---

## Storage Bucket Setup

The application uses Supabase Storage for avatar images.

### Step 1: Create Storage Bucket

1. In your Supabase dashboard, go to **Storage**
2. Click **Create a new bucket**
3. Name it: `avatars`
4. **Make it public** (toggle "Public bucket" to ON)
5. Click **Create bucket**

### Step 2: Set Up RLS Policies for Storage

1. Go to **Storage** → **Policies** tab
2. Select the `avatars` bucket
3. Click **New policy**
4. Choose **For full customization**

**Option 1: Simple (Recommended for Testing)**

If you want to quickly test the functionality, use this simple policy:

```sql
-- Allow authenticated users full access to avatars
CREATE POLICY "Authenticated users can manage avatars"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'avatars');

-- Allow public read access
CREATE POLICY "Public can read avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

**Option 2: Secure (Recommended for Production)**

For better security, restrict users to only manage their own avatars. Files are stored as `avatars/{user-id}-{timestamp}.{ext}`, so we can extract the user ID from the filename:

```sql
-- Allow users to upload their own avatars (filename starts with their user ID)
CREATE POLICY "Users can upload own avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = 'avatars'
    AND split_part((storage.foldername(name))[2], '-', 1) = auth.uid()::text
);

-- Allow public read access
CREATE POLICY "Public can read avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Allow users to update their own avatars
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = 'avatars'
    AND split_part((storage.foldername(name))[2], '-', 1) = auth.uid()::text
);

-- Allow users to delete their own avatars
CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = 'avatars'
    AND split_part((storage.foldername(name))[2], '-', 1) = auth.uid()::text
);
```

**Note:** The file structure in the code is `avatars/{user-id}-{timestamp}.{ext}`, so the path is `avatars/avatars/{user-id}-{timestamp}.{ext}` when using `storage.foldername()`. For simplicity, start with Option 1 for testing, then switch to Option 2 for production.

If Option 2 doesn't work, you can also use a simpler pattern that just checks if the filename contains the user ID:

```sql
-- Simpler pattern: filename starts with user ID
CREATE POLICY "Users can manage own avatars (simple)"
ON storage.objects FOR ALL
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (name LIKE auth.uid()::text || '-%')
);
```

---

## Authentication Setup

The application supports email/password and OAuth (Google, Facebook, X/Twitter) authentication.

### Step 1: Configure Email Auth

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. **Email** provider is enabled by default
3. Configure email templates if needed (Settings → Auth → Email Templates)

### Step 2: Enable OAuth Providers (Optional)

#### Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
6. Copy **Client ID** and **Client Secret**
7. In Supabase: **Authentication** → **Providers** → **Google**
   - Enable Google provider
   - Paste Client ID and Client Secret
   - Save

#### Facebook OAuth:

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app
3. Add **Facebook Login** product
4. Set Valid OAuth Redirect URIs: `https://your-project-id.supabase.co/auth/v1/callback`
5. Copy **App ID** and **App Secret**
6. In Supabase: **Authentication** → **Providers** → **Facebook**
   - Enable Facebook provider
   - Paste App ID and App Secret
   - Save

#### X (Twitter) OAuth:

1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app
3. Set Callback URL: `https://your-project-id.supabase.co/auth/v1/callback`
4. Copy **API Key** and **API Secret Key**
5. In Supabase: **Authentication** → **Providers** → **Twitter**
   - Enable Twitter provider
   - Paste API Key and API Secret Key
   - Save

### Step 3: Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your development URL: `http://localhost:3000`
3. Add redirect URL: `http://localhost:3000/auth/callback`
4. For production, add your production URL

---

## Testing the Application

Now you can test the application functionality.

### Step 1: Start the Development Server

```bash
npm run dev
```

The application should start at `http://localhost:3000`

### Step 2: Test User Registration

1. Navigate to `/register`
2. Fill in the registration form:
   - Full Name
   - Email (use a test email)
   - Password (min 6 characters)
3. Click **Register**
4. Check your email for confirmation (if email confirmation is enabled)
5. After confirmation, you should be logged in

### Step 3: Test User Login

1. Navigate to `/login`
2. Enter your email and password
3. Click **Login**
4. You should be redirected to the home page

### Step 4: Test Account Details

1. Navigate to `/account-details`
2. You should see your profile information
3. Update any fields (e.g., first name, last name, bio)
4. Click **Save Changes**
5. Refresh the page - changes should persist

### Step 5: Test Avatar Upload

1. In `/account-details`, find the **Avatar Upload** section
2. Click **Upload Avatar**
3. Select an image file
4. Wait for upload to complete
5. The avatar should appear in the preview
6. Check your profile avatar in the header/sidebar - it should update
7. Test **Delete Avatar** - the avatar should be removed

### Step 6: Test OAuth (if configured)

1. Navigate to `/login`
2. Click on **Google**, **Facebook**, or **X** button
3. Complete the OAuth flow
4. You should be redirected back and logged in

### Step 7: Verify Database Data

1. In Supabase dashboard, go to **Table Editor**
2. Select **profiles** table
3. You should see your user profile with the data you entered
4. Check the **avatar_url** field - it should contain a Supabase Storage URL

---

## Troubleshooting

### Issue: "Access token not provided"

**Solution:** Make sure your `.env.local` file contains the correct values:
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart your development server after adding environment variables

### Issue: "Cannot find project ref"

**Solution:** This error usually occurs with Supabase CLI. For this setup, you don't need the CLI - use the Supabase Dashboard SQL Editor instead.

### Issue: "Row Level Security policy violation"

**Solution:** 
- Make sure you've run all the RLS policies from the SQL script
- Check that you're authenticated (logged in) when trying to access protected data
- Verify the RLS policies match the user ID correctly

### Issue: Avatar upload fails

**Solution:**
- Verify the `avatars` bucket exists and is public
- Check that Storage RLS policies are set up correctly
- Ensure the bucket name matches exactly: `avatars`

### Issue: Profile not created automatically

**Solution:**
- Check that the trigger `on_auth_user_created` exists
- Verify the `handle_new_user()` function was created
- You can manually create a profile in the database if needed

### Issue: OAuth redirect not working

**Solution:**
- Verify the redirect URL in Supabase matches your OAuth provider settings
- Check that Site URL is set correctly in Supabase Authentication settings
- Ensure the callback route exists: `/auth/callback`

### Issue: Environment variables not loading

**Solution:**
- Ensure `.env.local` is in the project root (not in `src/`)
- Restart the development server completely
- Check for typos in variable names (must start with `NEXT_PUBLIC_`)

### Issue: TypeScript errors about database types

**Solution:**
- Run type generation: `npx supabase gen types typescript --project-id your-project-id`
- Or manually update `src/lib/supabase_utils/database.types.ts` with your schema

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## Next Steps

Once you've completed the setup:

1. **Test all authentication flows** (email, Google, Facebook, X)
2. **Verify data persistence** (update profile, check database)
3. **Test avatar upload/delete** functionality
4. **Set up production environment variables** when deploying
5. **Configure custom domain** in Supabase if needed

---

## Support

If you encounter issues not covered in this guide:

1. Check the [Supabase Discord](https://discord.supabase.com)
2. Review [Supabase GitHub Discussions](https://github.com/supabase/supabase/discussions)
3. Check the application console for detailed error messages

Happy coding! 🚀

