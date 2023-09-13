import { Search } from 'lucide-react';
import { InputControl, InputPrefix, InputRoot } from '../Input';
import {
  ChampionSelectedAllData,
  usePlayerDetails,
} from '@/stores/usePlayerStore';
import { v4 as uuidv4 } from 'uuid';
import { americasRiotApi, riotApi } from '@/services/api';
import axios from 'axios';
import { useState } from 'react';

export function Header() {
  const {
    onChangePlayerName,
    playerName,
    onChangeChampions,
    champions,
    allChamps,
    onChangeAllChampions,
    rankedStats,
    onChangeRankedStats,
    playerStats,
    onChangePlayerStats,
    onChangeMatchDetailsById,
    matchDetailsById,
    onChangeLoading,
    onChangePlayerMatchStats,
    playerMatchStats,
  } = usePlayerDetails((state) => state);

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangePlayerName(event.target.value);
  };

  const playerDetailsFromMatchData: any = [];

  async function handleSearchClick() {
    onChangeLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const responseSummonerData = await riotApi.get(
      `/summoner/v4/summoners/by-name/${playerName}?api_key=${apiKey}`,
    );

    const summonerId = responseSummonerData.data.id;
    const summonerPuuid = responseSummonerData.data.puuid;

    const statsResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?api_key=${apiKey}`,
    );

    const championAllDataResponse = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/13.7.1/data/pt_BR/champion.json`,
    );

    const championSelectedAllData: ChampionSelectedAllData[] = Object.values(
      championAllDataResponse.data.data,
    );

    const responseRankedQeue = await riotApi.get(
      `/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`,
    );

    const historicMatch = await americasRiotApi.get(
      `lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20&api_key=${apiKey}`,
    );

    const allMatchGames = historicMatch.data.map(async (match: any) => {
      const Matchs = await americasRiotApi.get(
        `lol/match/v5/matches/${match}?api_key=${apiKey}`,
      );

      return Matchs.data;
    });

    const matchDetailsbyGame = await Promise.all(allMatchGames);

    const matchParamsDetails = matchDetailsbyGame.map((detail) => {
      const PlayerStatsbyMatch = detail.info.participants.map((item: any) => {
        return {
          id: uuidv4(),
          summonerName: item.summonerName,
          firstblood: item.firstBloodKill,
          championId: item.championId,
          championName: item.championName,
          firstSpell: item.summoner1Id,
          secondSpell: item.summoner2Id,
          kills: item.kills,
          deaths: item.deaths,
          assists: item.assists,
          win: item.win,
          firstItem: item.item0,
          secondItem: item.item1,
          threeItem: item.item2,
          fourItem: item.item3,
          fiveItem: item.item4,
          sixItem: item.item5,
          sevenItem: item.item6,
          role: item.individualPosition,
          queue: detail.info.queueId,
          triples: item.tripleKills,
          farm: item.totalMinionsKilled,
          gameCreation: detail.info.gameCreation,
          gameDuration: detail.info.gameDuration,
          gameEndTimestamp: detail.info.gameEndTimestamp,
        };
      });

      playerDetailsFromMatchData.push(...PlayerStatsbyMatch);

      return PlayerStatsbyMatch;
    });

    onChangePlayerName(playerName);
    onChangePlayerStats(playerDetailsFromMatchData);
    onChangeChampions(statsResponse.data);
    onChangeAllChampions(championSelectedAllData);
    onChangeRankedStats(responseRankedQeue.data);
    onChangeMatchDetailsById(allMatchGames);
    onChangeLoading(false);
    onChangePlayerMatchStats(playerDetailsFromMatchData);
  }

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <header className="bg-slate-900 h-52">
      <div className="flex flex-col gap-2 pt-5 px-12">
        <label htmlFor="role" className="text-xl font-semibold text-white">
          ExtremeGG
        </label>
        <InputRoot>
          <InputPrefix>
            <Search className="h-5 w-5 text-white" />
          </InputPrefix>
          <InputControl
            placeholder="Search your lol profile..."
            value={playerName}
            onChange={handlePlayerNameChange}
            onKeyDown={handleEnterKey}
          />
          <InputPrefix>
            <button
              className="bg-emerald-700 rounded-xl p-1 text-sm font-semibold text-white"
              onClick={handleSearchClick}
            >
              .GG
            </button>
          </InputPrefix>
        </InputRoot>
      </div>
    </header>
  );
}
