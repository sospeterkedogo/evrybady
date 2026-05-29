import { supabase } from './supabase';
import { Partner } from '../types';

export async function getPartners(): Promise<Partner[]> {
  const { data, error } = await supabase.from('partners').select('*');
  if (error) throw error;
  return data as Partner[];
}
