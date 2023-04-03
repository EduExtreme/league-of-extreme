import { useState, useEffect } from "react";
import axios from "axios";

interface PlayerStatsProps {}

type ChampionStats = {
  championId: number;
  championName: string;
  championLevel: number;
  championPoints: number;
};

type ChampionSelectedAllData = {
  id: number;
  name: string;
};

export default function PlayerStatistc(props: PlayerStatsProps): JSX.Element {
  const [champions, setChampions] = useState<ChampionStats[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [allChamps, setAllChamps] = useState<ChampionSelectedAllData[]>([]);
  console.log("allChamps", allChamps);

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlayerName(event.target.value);
  };

  async function handleSearchClick() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const responseSummonerData = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${apiKey}`
    );

    const summonerId = responseSummonerData.data.id;

    const statsResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${apiKey}`
    );

    const championAllDataResponse = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/13.6.1/data/pt_BR/champion.json`
    );

    const championSelectedAllData: ChampionSelectedAllData[] = Object.values(
      championAllDataResponse.data.data
    );

    setChampions(statsResponse.data);
    setAllChamps(championSelectedAllData);

    console.log("all champs state", allChamps);
  }

  return (
    <div>
      <h2>Search player stats:</h2>
      <input type="text" value={playerName} onChange={handlePlayerNameChange} />
      <button onClick={handleSearchClick}>Search</button>
      <br />
      <h2>Stats for {playerName}:</h2>
      <ul>
        {champions.map((champion) => {
          const champInfo = allChamps.find(
            (item) => item.key === champion.championId
          );

          return (
            <li key={champion.championId}>
              <h3>{champInfo ? champInfo.name : "Campeão não encontrado"}</h3>
              <p>Level: {champion.championLevel}</p>
              <p>Points: {champion.championPoints}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
