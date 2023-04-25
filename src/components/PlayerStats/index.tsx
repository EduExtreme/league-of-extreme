import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Image from "next/image";
import challenger from "../../../public/ranked-emblem/emblem-challenger.png";
import wallpaperYasuo from "../../../public/night-yasuo.jpg";
import loadingYasuo from "../../../public/yasuo-loading.gif";
import {
  Container,
  HeroSection,
  RankedStats,
  SearchSection,
  Spinner,
  StatsZone,
} from "./styles";
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

export default function PlayerStatus(props: PlayerStatsProps): JSX.Element {
  const [champions, setChampions] = useState<ChampionStats[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [allChamps, setAllChamps] = useState<ChampionSelectedAllData[]>([]);
  const [loading, setLoading] = useState(false);
  const [rankedStats, setRankedStats] = useState([]);
  const [matchHistoryId, setMatchHistoryId] = useState([]);
  const [matchDetailsById, setMatchDetailsById] = useState([]);

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlayerName(event.target.value);
  };

  async function handleSearchClick() {
    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const responseSummonerData = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=RGAPI-2e628ad5-6d2d-40d3-bfcd-2fc53c8b15db`
    );

    const summonerId = responseSummonerData.data.id;
    const summonerPuuid = responseSummonerData.data.puuid;

    const statsResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?api_key=RGAPI-2e628ad5-6d2d-40d3-bfcd-2fc53c8b15db`
    );

    const championAllDataResponse = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/13.7.1/data/pt_BR/champion.json`
    );

    const championSelectedAllData: ChampionSelectedAllData[] = Object.values(
      championAllDataResponse.data.data
    );

    const responseWinRateRanked = await axios.get(
      `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=RGAPI-2e628ad5-6d2d-40d3-bfcd-2fc53c8b15db`
    );

    const matchHistoryResponse = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=30&api_key=RGAPI-2e628ad5-6d2d-40d3-bfcd-2fc53c8b15db`
    );

    const matchDetailsPromises = matchHistoryId.map(async (match) => {
      const matchDetailsResponse = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=RGAPI-2e628ad5-6d2d-40d3-bfcd-2fc53c8b15db`
      );
      return matchDetailsResponse.data;
    });
    const matchDetails = await Promise.all(matchDetailsPromises);

    console.log("match history", matchHistoryResponse.data);
    console.log("match details : ", matchDetailsById);

    setChampions(statsResponse.data);
    setAllChamps(championSelectedAllData);
    setRankedStats(responseWinRateRanked.data);
    setMatchHistoryId(matchHistoryResponse.data);
    setMatchDetailsById(matchDetails);
    setLoading(false);
  }

  return (
    <Container>
      <HeroSection></HeroSection>
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
      <RankedStats>
        {rankedStats.map((ranked) => (
          <div className="ranked-details" key={ranked.leagueId}>
            <span>
              {ranked.queueType === "RANKED_FLEX_SR" ? (
                <p>Ranked Flex</p>
              ) : (
                <p>Ranked Solo</p>
              )}
            </span>
            <p>
              {ranked.tier} {ranked.rank}
            </p>
            <p>PDL {ranked.leaguePoints}</p>
            <p>WINS {ranked.wins}</p>
            <p>LOSSES {ranked.losses}</p>
          </div>
        ))}
      </RankedStats>
      <StatsZone>
        <h2>
          Top 3 Mastery Champions of {playerName}: {loading && <Spinner />}
        </h2>

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
                  {champInfo.name === "Yasuo" ||
                  champInfo.name === "Riven" ||
                  champInfo.name === "Thresh" ||
                  champInfo.name === "Karthus" ||
                  champInfo.name === "Teemo" ||
                  champInfo.name === "Poppy"
                    ? ", entao Você é macaco  "
                    : " Você é gente normal"}
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
