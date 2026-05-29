import { supabase } from './supabase';
import { Job } from '../types';

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase.from('jobs').select('*');
  if (error) throw error;
  return data as Job[];
}
