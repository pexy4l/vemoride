import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xdpcxvryhlrcdebdfwis.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcGN4dnJ5aGxyY2RlYmRmd2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NTg1NzksImV4cCI6MjA3MjAzNDU3OX0.m0RvEVL9Ik9tLHkr77ldLAlVgSX_eDqexnB8WN5Aip0';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
