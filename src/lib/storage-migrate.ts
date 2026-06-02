/** One-time copy from Job4You storage keys so existing users keep prefs/sessions. */
export function migrateLocalStorageKey(oldKey: string, newKey: string) {
  try {
    if (localStorage.getItem(newKey) != null) return;
    const value = localStorage.getItem(oldKey);
    if (value != null) {
      localStorage.setItem(newKey, value);
      localStorage.removeItem(oldKey);
    }
  } catch {
    /* ignore */
  }
}

export function migrateSessionStorageKey(oldKey: string, newKey: string) {
  try {
    if (sessionStorage.getItem(newKey) != null) return;
    const value = sessionStorage.getItem(oldKey);
    if (value != null) {
      sessionStorage.setItem(newKey, value);
      sessionStorage.removeItem(oldKey);
    }
  } catch {
    /* ignore */
  }
}
