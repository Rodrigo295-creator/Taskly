import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// CORS restrito aos domínios da aplicação (produção + dev local)
const ALLOWED_ORIGINS = [
  "https://job4you-rho.vercel.app",
  "https://taskly-rodrigo295.vercel.app",
  "http://localhost:5173",
];

app.use(
  "/*",
  cors({
    origin: (origin) => (ALLOWED_ORIGINS.includes(origin) ? origin : null),
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e1d2e976/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);