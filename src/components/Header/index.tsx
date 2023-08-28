import { Search } from "lucide-react";
import { InputControl, InputPrefix, InputRoot } from "../Input";
import { usePlayerDetails } from "@/stores/usePlayerStore";
import { v4 as uuidv4 } from "uuid";
import { americasRiotApi, riotApi } from "@/services/api";
import axios from "axios";
import { useState } from "react";

export function Header () {


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
  } = usePlayerDetails((state) => state);

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangePlayerName(event.target.value);
  };

  
  const playerDetailsFromMatchData: any = [];

  async function handleSearchClick() {
    onChangeLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const responseSummonerData = await riotApi.get(
      `/summoner/v4/summoners/by-name/${playerName}?api_key=${apiKey}`
    );

    const summonerId = responseSummonerData.data.id;
    const summonerPuuid = responseSummonerData.data.puuid;

    const statsResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?api_key=${apiKey}`
    );

    const championAllDataResponse = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/13.7.1/data/pt_BR/champion.json`
    );

    const championSelectedAllData = Object.values(
      championAllDataResponse.data.data
    );

    const responseRankedQeue = await riotApi.get(
      `/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
    );

    const historicMatch = await americasRiotApi.get(
      `lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20&api_key=${apiKey}`
    );

    const allMatchGames = historicMatch.data.map(async (match: any) => {
      const Matchs = await americasRiotApi.get(
        `lol/match/v5/matches/${match}?api_key=${apiKey}`
      );

      return Matchs.data;
    });
    const matchDetailsbyGame = await Promise.all(allMatchGames);

    const matchParamsDetails = matchDetailsbyGame.map((detail) => {
      const PlayerStatsbyMatch = detail.info.participants.map((item: any) => {
        return {
          id: uuidv4(),
          summonerName: item.summonerName,
          championId: item.championId,
          championName: item.championName,
          kills: item.kills,
          death: item.deaths,
          win: item.win,
        };
      });

      PlayerStatsbyMatch.forEach((item: any) => {
        playerDetailsFromMatchData.push(item);
      });
    });

    console.log("Ranked Queue : ", rankedStats);
    onChangePlayerName(playerName);
    onChangePlayerStats(playerDetailsFromMatchData);
    onChangeChampions(statsResponse.data);
    onChangeAllChampions(championSelectedAllData);
    onChangeRankedStats(responseRankedQeue.data);
    onChangeMatchDetailsById(allMatchGames);
    onChangeLoading(false)
    
  }

  console.log('PLAYER STATUS :',playerStats)
  console.log('matchDetailsById:',matchDetailsById)
  console.log("champions",champions)

  return ( 
    <header className="bg-blue-700 h-52">
        <div className="flex flex-col gap-2 pt-5 px-12">
          <label htmlFor="role" className="text-xl font-semibold text-white">
              ExtremeGG
          </label>
          <InputRoot>
          
          <InputPrefix>
            <Search className="h-5 w-5 text-white" />
          </InputPrefix>
        <InputControl placeholder="Search your lol profile..."
          value={playerName}
          onChange={handlePlayerNameChange}/>
        <InputPrefix>
           <button className="bg-white rounded-md p-1 text-sm font-semibold text-blue-700" onClick={handleSearchClick}>.GG</button>
          </InputPrefix>
        </InputRoot>
        </div>
      </header>
  )
}