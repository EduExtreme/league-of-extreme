import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import challenger from "../../../public/ranked-emblem/emblem-challenger.png";
import wallpaperYasuo from "../../../public/night-yasuo.jpg";
import { Container, HeroSection, SearchSection, StatsZone } from "./styles";
interface PlayerStatsProps {
  playerName: string;
}

type ChampionStats = {
  championId: number;
  championName: string;
  championLevel: number;
  championPoints: number;
};

type ChampionSelectedAllData = {
  id: number;
  name: string;
  key: string;
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
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?api_key=${apiKey}`
    );
    console.log("MAESTRIA DATA :", statsResponse.data);

    const championAllDataResponse = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/13.7.1/data/pt_BR/champion.json`
    );

    const championSelectedAllData: ChampionSelectedAllData[] = Object.values(
      championAllDataResponse.data.data
    );
    console.log(
      "todos os Champions response Api dentro do Array :",
      championSelectedAllData
    );

    setChampions(statsResponse.data);
    setAllChamps(championSelectedAllData);
  }

  return (
    <Container>
      <HeroSection>
        <Image
          src={wallpaperYasuo}
          alt="Imagem da hero section"
          width={1100}
          height={400}
          placeholder="blur"
        />
      </HeroSection>
      <SearchSection>
        <span>Search your Profile</span>
        <input
          type="text"
          value={playerName}
          onChange={handlePlayerNameChange}
          placeholder="Search your profile... example: EduExtreme"
        />
        <button className="button-styled" onClick={handleSearchClick}>
          <p>Search</p>
        </button>
      </SearchSection>

      <StatsZone>
        <h2>Top 3 Mastery Champions of {playerName}:</h2>

        <ul>
          {champions.map((champion) => {
            const champInfo = allChamps.find(
              (item) => Number(item.key) === champion.championId
            );
            const pointsFormatted = champion.championPoints.toLocaleString();
            return (
              <li key={champion.championId}>
                <strong>
                  {champInfo ? champInfo.name : "Campeão não encontrado"}
                </strong>

                {/* <Image src={challenger} alt="Icone" /> */}
                <p>Maestria : {champion.championLevel}</p>
                <p>Pts : {pointsFormatted}</p>
              </li>
            );
          })}
        </ul>
      </StatsZone>
    </Container>
  );
}
