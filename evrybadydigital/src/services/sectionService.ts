import { supabase } from "@/lib/supabaseClient";

export type SectionRecord = {
  id: string;
  business_id?: string;
  owner_id?: string;
  page_slug: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string;
  cta_text?: string | null;
  cta_url?: string | null;
  metadata?: Record<string, unknown>;
  position: number;
  created_at?: string;
  updated_at?: string;
};

export async function fetchSections(pageSlug: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [] as SectionRecord[];
  }

  const { data, error } = await supabase
    .from<SectionRecord>("sections")
    .select("*")
    .eq("page_slug", pageSlug)
    .order("position", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function upsertSection(section: Partial<SectionRecord>) {
  const { data, error } = await supabase.from("sections").upsert(section, {
    onConflict: "id",
    returning: "representation",
  });

  if (error) {
    throw error;
  }

  return data?.[0] as SectionRecord;
}

export async function deleteSection(sectionId: string) {
  const { error } = await supabase.from("sections").delete().eq("id", sectionId);
  if (error) {
    throw error;
  }
  return true;
}
