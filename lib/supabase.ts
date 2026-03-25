import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://db.bikbmxqjwizdebrwvqla.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpa2JteHFqd2l6ZGVicnd2cWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzU4NTcsImV4cCI6MjA4ODQxMTg1N30.bUcY81a5jBG6jRDazsmRsMW5O1rUw8P3qNzdnb1DOHs'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpa2JteHFqd2l6ZGVicnd2cWxhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgzNTg1NywiZXhwIjoyMDg4NDExODU3fQ.il4HpVZUUJdr1MUHmx_ceAAkp4phO0YO-aB4FJd-VXk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
})

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
})
