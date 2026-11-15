// Starts the "Weekly Facebook groups pipeline" GitHub Actions workflow on demand.
//
// Secrets to set in Supabase (Edge Functions > Secrets):
//   GITHUB_PAT            fine-grained token for the repo with "Actions: read and write"
//   GITHUB_REPO           optional, defaults to Dinnerli/interior-design-journey-91
//   GITHUB_REF            optional, defaults to main

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const token = Deno.env.get('GITHUB_PAT');
  if (!token) return json({ error: 'The trigger is not configured yet.' }, 503);

  const repo = Deno.env.get('GITHUB_REPO') ?? 'Dinnerli/interior-design-journey-91';
  const ref = Deno.env.get('GITHUB_REF') ?? 'main';
  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/workflows/weekly-facebook-groups.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'datasets-page-trigger',
      },
      body: JSON.stringify({ ref }),
    },
  );
  if (!res.ok) return json({ error: `GitHub refused the request (${res.status}).` }, 502);
  return json({ ok: true });
});
