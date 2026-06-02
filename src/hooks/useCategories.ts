import { useCallback, useEffect, useState } from 'react';
import { HOME_CATEGORIES, type HomeCategory } from '../data/mockDirectory';
import { lucideIconByName } from '@/lib/lucideByName';
import { supabase, supabaseConfigured } from '@/lib/supabase';

export function useCategories(): {
  categories: HomeCategory[];
  loading: boolean;
} {
  const [categoriesList, setCategoriesList] =
    useState<HomeCategory[]>(HOME_CATEGORIES);
  const [loading, setLoading] = useState(() => supabaseConfigured);

  const fetchRemote = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);

    const { data: rows, error } = await supabase
      .from('categories')
      .select('slug, label, icon_name')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('[Taskly] Supabase categories:', error.message);
      setCategoriesList(HOME_CATEGORIES);
      setLoading(false);
      return;
    }

    type Row = {
      slug: string;
      label: string;
      icon_name: string | null;
    };

    const list: HomeCategory[] = ((rows ?? []) as Row[]).map((row) => ({
      id: row.slug,
      label: row.label.trim(),
      icon: lucideIconByName(row.icon_name),
    }));

    setCategoriesList(list.length > 0 ? list : HOME_CATEGORIES);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (supabaseConfigured) fetchRemote();
  }, [fetchRemote]);

  return {
    categories: categoriesList,
    loading,
  };
}
