import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY);

/**
 * Daily biorhythm check-in: returns energy rating, overall phase, and primary cycle values.
 * Uses seeded randomness so the same user gets the same reading on the same date.
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
  console.log('Physical cycle:', data.quickRead.physical);
  console.log('Emotional cycle:', data.quickRead.emotional);
  console.log('Intellectual cycle:', data.quickRead.intellectual);
  console.log('');
  console.log('Spotlight:', data.spotlight.cycle, '|', data.spotlight.value, '|', data.spotlight.phase);
  console.log('Advice:', data.advice);
}

main().catch(console.error);
