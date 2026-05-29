import { supabase } from './supabase';
import { ContactSubmission } from '../types';

export async function submitContact(form: Omit<ContactSubmission, 'id' | 'created_at'>) {
  const { data, error } = await supabase.from('contact_submissions').insert([form]);
  if (error) throw error;
  return data;
}
