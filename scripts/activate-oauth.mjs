#!/usr/bin/env node
/**
 * Ativa Google/Apple + redirect URLs no Supabase (Management API).
 * Uso: preencha .env.oauth e rode: node scripts/activate-oauth.mjs
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const oauthEnvPath = resolve(root, '.env.oauth');

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

const env = { ...process.env, ...loadEnvFile(oauthEnvPath) };
const ref = env.SUPABASE_PROJECT_REF || 'pnygzbfeuovauwzlluys';
const token = env.SUPABASE_ACCESS_TOKEN?.trim();
const anonKey =
  env.SUPABASE_ANON_KEY?.trim() ||
  loadEnvFile(resolve(root, '.env')).VITE_SUPABASE_ANON_KEY?.trim();

if (!token) {
  console.error('Falta SUPABASE_ACCESS_TOKEN em .env.oauth ou no ambiente.');
  console.error('Crie .env.oauth com SUPABASE_ACCESS_TOKEN e credenciais Google.');
  process.exit(1);
}

const body = {
  site_url: env.SUPABASE_SITE_URL || 'https://taskly-rodrigo295.vercel.app/',
  uri_allow_list:
    env.SUPABASE_URI_ALLOW_LIST ||
    'http://localhost:5173/,https://taskly-rodrigo295.vercel.app/,https://job4you-rho.vercel.app/',
};

const gid = env.GOOGLE_CLIENT_ID?.trim();
const gsec = env.GOOGLE_CLIENT_SECRET?.trim();
if (gid && gsec) {
  body.external_google_enabled = true;
  body.external_google_client_id = gid;
  body.external_google_secret = gsec;
}

const aid = env.APPLE_CLIENT_ID?.trim();
const asec = env.APPLE_CLIENT_SECRET?.trim();
if (aid && asec) {
  body.external_apple_enabled = true;
  body.external_apple_client_id = aid;
  body.external_apple_secret = asec;
}

const api = `https://api.supabase.com/v1/projects/${ref}/config/auth`;

console.log('PATCH', api);
console.log(JSON.stringify(body, null, 2));

const patchRes = await fetch(api, {
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const patchText = await patchRes.text();
if (!patchRes.ok) {
  console.error('Erro', patchRes.status, patchText);
  process.exit(1);
}
console.log('OK — auth config atualizado.');

if (anonKey) {
  const settingsRes = await fetch(`https://${ref}.supabase.co/auth/v1/settings`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
  });
  const settings = await settingsRes.json();
  const ext = settings.external ?? {};
  console.log('Verificação /auth/v1/settings:');
  console.log('  google:', ext.google);
  console.log('  apple:', ext.apple);
  console.log('  email:', ext.email);
}
