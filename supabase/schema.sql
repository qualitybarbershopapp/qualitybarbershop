-- ========================================================
-- QUALITY BARBER SHOP - SUPABASE DATABASE SCHEMA
-- ========================================================

-- 1. Create the appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY,
    service_id TEXT NOT NULL,
    extra_service_ids TEXT[] DEFAULT '{}',
    service_name TEXT NOT NULL,
    service_price NUMERIC NOT NULL,
    price_label TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    duration INTEGER NOT NULL,
    barber_name TEXT NOT NULL,
    barber_id TEXT NOT NULL,
    date_key TEXT NOT NULL,       -- Stored as 'YYYY-MM-DD'
    date_label TEXT NOT NULL,      -- Example: 'Jueves 15 de octubre'
    time TEXT NOT NULL,            -- Example: '10:20 a.m.'
    full_name TEXT NOT NULL,
    email TEXT DEFAULT '',
    phone TEXT NOT NULL,
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'confirmed' -- 'confirmed', 'cancelled', 'completed'
);

-- 2. Create indexes for fast searches
CREATE INDEX IF NOT EXISTS idx_appointments_date_barber ON public.appointments(date_key, barber_id);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON public.appointments(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON public.appointments(email);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 4. Policies for appointments
-- Allow public inserts (so clients can book appointments)
CREATE POLICY "Allow public inserts" ON public.appointments
    FOR INSERT WITH CHECK (true);

-- Allow public selects (filtered by API server or anon key)
CREATE POLICY "Allow public select" ON public.appointments
    FOR SELECT USING (true);

-- Allow updates (e.g. status cancellation via API or dashboard)
CREATE POLICY "Allow service role full access" ON public.appointments
    FOR ALL USING (true);
