import iron from '../../../public/ranked-emblem/iron.webp';
import bronze from '../../../public/ranked-emblem/bronze.webp';
import silver from '../../../public/ranked-emblem/silver.webp';
import gold from '../../../public/ranked-emblem/gold.webp';
import platinum from '../../../public/ranked-emblem/platinum.webp';
import emerald from '../../../public/ranked-emblem/emerald.webp';
import diamond from '../../../public/ranked-emblem/diamond.webp';
import master from '../../../public/ranked-emblem/master.webp';
import grandmaster from '../../../public/ranked-emblem/grandmaster.webp';
import challenger from '../../../public/ranked-emblem/challenger.webp';
import { usePlayerDetails } from '@/stores/usePlayerStore';
import Image from 'next/image';

export const tierEmblemMapping = {
  IRON: iron,
  BRONZE: bronze,
  SILVER: silver,
  GOLD: gold,
  PLATINUM: platinum,
  EMERALD: emerald,
  DIAMOND: diamond,
  MASTER: master,
  GRANDMASTER: grandmaster,
  CHALLENGER: challenger,
};

export function RankedEloStats() {
  const {
    onChangePlayerName,
    playerName,
    champions,
    allChamps,
    rankedStats,
    loading,
    playerMatchStats,
  } = usePlayerDetails((state) => state);

  const relevantRankedStats = rankedStats.filter(
    (ranked) =>
      ranked.queueType === 'RANKED_FLEX_SR' ||
      ranked.queueType === 'RANKED_SOLO_5x5',
  );

  return (
    <div className="flex gap-8">
      {relevantRankedStats.map((ranked) => (
        <div
          className="rounded-2xl p-4 h-80 bg-slate-900 flex flex-col"
          key={ranked.leagueId}
        >
          <div className="flex items-center justify-center">
            <span>
              {ranked.queueType === 'RANKED_FLEX_SR' ? (
                <strong className="text-emerald-500">Ranked Flex</strong>
              ) : (
                <strong className="text-emerald-500">Ranked Solo</strong>
              )}
            </span>
          </div>

          <Image
            src={tierEmblemMapping[ranked.tier]}
            alt={`${ranked.tier} Emblem`}
          />

          <ul className="font-semibold text-gray-500">
            <li className="text-emerald-500 font-bold">
              {ranked.tier} <span>{ranked.rank}</span>
            </li>
            <li
              className={
                ranked.leaguePoints < 30
                  ? 'text-red-500'
                  : ranked.leaguePoints <= 50
                  ? 'text-yellow-500'
                  : 'text-emerald-500'
              }
            >
              PDL - {ranked.leaguePoints}
            </li>
            <li
              className={
                ranked.wins > ranked.losses
                  ? 'text-emerald-500'
                  : 'text-red-700'
              }
            >
              WINS - {ranked.wins}
            </li>
            <li
              className={
                ranked.losses > ranked.wins ? 'text-red-500' : 'text-red-200'
              }
            >
              LOSSES - {ranked.losses}
            </li>
          </ul>

          <strong
            className={
              (ranked.wins / (ranked.wins + ranked.losses)) * 100 > 51
                ? 'text-green-500'
                : 'text-red-500'
            }
          >
            Win Rate:{' '}
            {((ranked.wins / (ranked.wins + ranked.losses)) * 100).toFixed(2)}%
          </strong>
        </div>
      ))}
    </div>
  );
}
