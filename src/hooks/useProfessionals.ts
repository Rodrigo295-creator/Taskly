import { useCallback, useEffect, useState } from 'react';
import {
  ALL_PROFESSIONALS,
  type DirectoryProfessional,
} from '../data/mockDirectory';
import { supabase, supabaseConfigured } from '@/lib/supabase';

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
    useState<DirectoryProfessional[]>(() => (supabaseConfigured ? [] : ALL_PROFESSIONALS));
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
      full_name: string | null;
      avatar_url: string | null;
      category_label: string | null;
      category_slug: string | null;
    };

    // View pública restrita às colunas do diretório (RLS bloqueia
    // leitura direta de `profiles` de terceiros).
    const { data: rows, error: qErr } = await supabase
      .from('professional_directory')
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
          full_name,
          avatar_url,
          category_label,
          category_slug
        `,
      );

    if (qErr) {
      if (import.meta.env.DEV) console.warn('[Taskly] Supabase professionals:', qErr.message);
      // Prefer empty over mock UUIDs when Supabase is configured.
      setProfessionalList([]);
      setLoading(false);
      return;
    }

    const rawRows = (rows ?? []) as Row[];

    if (rawRows.length === 0) {
      // Live backend with an empty directory: do not fall back to mock IDs
      // (they break start_conversation / chat RPCs that expect real UUIDs).
      setProfessionalList([]);
      setLoading(false);
      return;
    }

    const list: DirectoryProfessional[] = rawRows.map((row) => {
      const name = row.full_name?.trim() || 'Profissional';
      const categoryLabel = row.category_label?.trim() || 'Serviços';
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
        image: row.avatar_url?.trim() || FALLBACK_IMG,
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
