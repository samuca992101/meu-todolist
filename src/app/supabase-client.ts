// src/app/supabase-client.ts
import { createClient } from '@supabase/supabase-js';

// Substitua pelos seus dados REAIS do painel do Supabase
const SUPABASE_URL = 'https://ihpugbifwfgdkqghjkkv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocHVnYmlmd2ZnZGtxZ2hqa2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyODc2MTQsImV4cCI6MjA3OTg2MzYxNH0.ypaeTTZr89CDDMVRjqVoS1yLHQSvnQY5CK8nEbocmyM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);