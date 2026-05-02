import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

/**
 * Daily biorhythm reading: seeded energy snapshot with physical, emotional, and intellectual cycle values.
 * Deterministic output for consistent per-user daily check-ins. Part of the RoxyAPI biorhythm domain.
 */
async function main() {
  const { data, error } = await roxy.biorhythm.getDailyBiorhythm({
    body: { seed: 'sample-user', date: '2026-04-23' },
  });

  if (error) throw new Error(error.error);

  console.log('Date:', data.date);
  console.log('Energy rating:', data.energyRating, '/ 10');
  console.log('Overall phase:', data.overallPhase);
  console.log('');
  console.log('Primary cycles:');
  console.log('  Physical:      ', data.quickRead.physical);
  console.log('  Emotional:     ', data.quickRead.emotional);
  console.log('  Intellectual:  ', data.quickRead.intellectual);
  console.log('');
  console.log('Spotlight cycle:', data.spotlight.cycle, '|', data.spotlight.value, '|', data.spotlight.phase);
  console.log('Spotlight message:', data.spotlight.message);
  console.log('');
  console.log('Daily message:', data.dailyMessage);
  console.log('Advice:', data.advice);
}

main().catch(console.error);
