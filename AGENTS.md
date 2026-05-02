# AGENTS.md for Biorhythm API

This repo teaches AI coding agents (Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, Gemini CLI) how to use the RoxyAPI daily biorhythm endpoint.

## Endpoint
- Method: `POST`
- URL: `https://roxyapi.com/api/v2/biorhythm/daily`
- Auth: `X-API-Key` header
- Domain: `biorhythm` (one of 10 in the RoxyAPI catalog)
- Operation ID: `getDailyBiorhythm` matches the SDK method name in camelCase
- MCP tool: `post_biorhythm_daily` on `https://roxyapi.com/mcp/biorhythm`

## TypeScript SDK
```ts
import { createRoxy } from '@roxyapi/sdk';
const roxy = createRoxy(process.env.ROXY_API_KEY!);
const { data, error } = await roxy.biorhythm.getDailyBiorhythm({
  body: { seed: 'sample-user', date: '2026-04-23' },
});
```

## Python SDK
```python
import os
from roxy_sdk import create_roxy
roxy = create_roxy(os.environ["ROXY_API_KEY"])
result = roxy.biorhythm.get_daily_biorhythm(seed="sample-user", date="2026-04-23")
```

## Setup step (only when the endpoint requires coordinates)
Always call `GET /location/search?q={city}` first. Take `latitude`, `longitude`, `timezone` from `cities[0]` and pipe them in. Never ask the user to type coordinates.

Note: the biorhythm daily endpoint does NOT require coordinates. Pass `seed` and `date` only.

## Request fields
- `seed` (string, optional): reproducibility key. Same seed plus same date always returns the same reading. Pass any stable identifier such as a user ID or email hash. Omit for anonymous daily readings.
- `date` (string, optional): YYYY-MM-DD. Defaults to today UTC. Useful for historical lookups or pre-generating future readings.

## Response top level keys
- `date`: date the reading is for (YYYY-MM-DD, UTC)
- `seed`: computed seed string used for this reading
- `energyRating`: overall energy score 1-10
- `overallPhase`: summary phase string: `high_energy`, `mixed`, `recovery`, or `critical`
- `spotlight`: object with `cycle` (name of featured cycle), `value` (-100 to 100), `phase`, `message`
- `quickRead`: object with `physical`, `emotional`, `intellectual` cycle values (-100 to 100)
- `dailyMessage`: concise daily message combining energy rating and spotlight cycle
- `advice`: actionable 1-2 sentence guidance for the day

## Domain rules
- The daily endpoint returns a quick-read snapshot of the three primary cycles (physical, emotional, intellectual) plus a seeded spotlight cycle.
- The full 10-cycle breakdown (physical, emotional, intellectual, intuitive, aesthetic, awareness, spiritual, passion, mastery, wisdom) is available via `POST /biorhythm/forecast`.
- The `seed` field creates deterministic output: same seed plus same date always returns identical values. Use a stable user identifier (user ID, email hash) so each user gets a consistent personal daily reading.
- Cycle values range from -100 to 100. Values near 0 indicate a critical crossing (transition day). Negative values mean a low phase, positive values mean a high phase.
- `overallPhase` of `critical` means one or more cycles are near zero. Flag these days in coaching or sports apps.
- For multi-day planning, use `POST /biorhythm/forecast` which accepts `birthDate` and returns `summary.bestDay` and `summary.worstDay` over a date range.
- For couples or team compatibility, use `POST /biorhythm/compatibility` which accepts two `birthDate` values.
- For explicit zero-crossing alerts, use `POST /biorhythm/critical-days` which lists every critical day in a date range with `severity` and `advisory`.

## Related endpoints
- `POST /biorhythm/forecast` (`getForecast`): multi-day forecast with full 10-cycle data per day, best-day and worst-day summary
- `POST /biorhythm/critical-days` (`getCriticalDays`): zero-crossing alert list with severity and advisory per day
- `POST /biorhythm/compatibility` (`calculateBioCompatibility`): couples and team dynamics score across all cycle types

## Verified
2026-Q2 against `https://roxyapi.com/api/v2/openapi.json`. Re-fetch the spec for ground truth before changing this file.

## Discovery
- Full catalog: https://roxyapi.com/AGENTS.md
- LLM index: https://roxyapi.com/llms.txt
- Methodology: https://roxyapi.com/methodology
