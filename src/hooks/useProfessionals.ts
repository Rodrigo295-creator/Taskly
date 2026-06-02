import { useCallback, useEffect, useState } from 'react';
import {
  ALL_PROFESSIONALS,
  type DirectoryProfessional,
} from '../data/mockDirectory';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import { normalizeProfile } from '@/lib/supabase-profile';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80';

function formatPriceUnit(unit: string): string {
  const u = unit.trim();
  if (!u.startsWith('/')) return `/${u}`;
  return u;
}

export function useProfessionals(): {
  professionals: DirectoryProfessional[];
  loading: boolean;
} {
  const [professionalList, setProfessionalList] =
    useState<DirectoryProfessional[]>(ALL_PROFESSIONALS);
  const [loading, setLoading] = useState(() => supabaseConfigured);

  const fetchRemote = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);

    type Row = {
      id: string;
      title: string;
      description: string | null;
      price_amount: number | string;
      price_unit: string;
      is_online: boolean;
      rating_avg: number | string;
      completed_jobs_count: number;
      profiles:
        | { full_name: string; avatar_url: string | null }
        | { full_name: string; avatar_url: string | null }[]
        | null
        | undefined;
      categories:
        | { label: string; slug: string }
        | { label: string; slug: string }[]
        | null
        | undefined;
    };

    const { data: rows, error: qErr } = await supabase
      .from('professional_profiles')
      .select(
        `
          id,
          title,
          description,
          price_amount,
          price_unit,
          is_online,
          rating_avg,
          completed_jobs_count,
          profiles(full_name, avatar_url),
          categories(label, slug)
        `,
      );

    if (qErr) {
      console.warn('[Taskly] Supabase professionals:', qErr.message);
      setProfessionalList(ALL_PROFESSIONALS);
      setLoading(false);
      return;
    }

    const rawRows = (rows ?? []) as Row[];

    if (rawRows.length === 0) {
      setProfessionalList(ALL_PROFESSIONALS);
      setLoading(false);
      return;
    }

    const list: DirectoryProfessional[] = rawRows.map((row) => {
      const profile = normalizeProfile(row.profiles);
      const category = normalizeProfile(row.categories);
      const name = profile?.full_name?.trim() || 'Profissional';
      const categoryLabel = category?.label?.trim() || 'Serviços';
      return {
        id: row.id,
        name,
        role: row.title.trim() || categoryLabel,
        category: categoryLabel,
        description: row.description?.trim() || '',
        rating:
          typeof row.rating_avg === 'string'
            ? parseFloat(row.rating_avg) || 0
            : Number(row.rating_avg) || 0,
        price:
          typeof row.price_amount === 'string'
            ? parseFloat(row.price_amount) || 0
            : Number(row.price_amount) || 0,
        priceUnit: formatPriceUnit(row.price_unit ?? 'hora'),
        image: profile?.avatar_url?.trim() || FALLBACK_IMG,
        isOnline: row.is_online,
        completedJobs: row.completed_jobs_count,
      };
    });

    setProfessionalList(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (supabaseConfigured) fetchRemote();
  }, [fetchRemote]);

  return {
    professionals: professionalList,
    loading,
  };
}
