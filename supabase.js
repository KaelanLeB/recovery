import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://asjgudrxgyrsydntqrak.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzamd1ZHJ4Z3lyc3lkbnRxcmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMzM1MDMsImV4cCI6MjA5MjgwOTUwM30.fD5mk-ddi7V-VIv3OJ9G3u1bHHVqelj9FUGMrmXkZGY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
