/** Official social profiles — override via VITE_INSTAGRAM_URL / VITE_TIKTOK_URL */
export const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL?.trim() || 'https://www.instagram.com/taskly';

export const TIKTOK_URL =
  import.meta.env.VITE_TIKTOK_URL?.trim() || 'https://www.tiktok.com/@taskly';
