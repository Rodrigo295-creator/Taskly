-- Advisor: fixa o search_path da função de guarda do plano (evita hijack via search_path)
alter function public.enforce_plan_guard() set search_path = public;
