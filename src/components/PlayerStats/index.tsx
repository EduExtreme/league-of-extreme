import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import {
  Container,
  HeroSection,
  RankedStats,
  SearchSection,
  Spinner,
  StatsZone,
  WinRateZones,
} from "./styles";
import { americasRiotApi, riotApi } from "@/services/api";
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
interface playerDetailsFromMatchDataProps {
  playerDetailsFromMatchData: [];
}

export default function PlayerStatus(props: PlayerStatsProps): JSX.Element {
  const [champions, setChampions] = useState<ChampionStats[]>([]);
  const [playerName, setPlayerName] = useState("EduExtreme");
  const [allChamps, setAllChamps] = useState<ChampionSelectedAllData[]>([]);
  const [loading, setLoading] = useState(false);
  const [rankedStats, setRankedStats] = useState([]);
  const [matchDetailsById, setMatchDetailsById] = useState();
  const [playerStats, setPlayerStats] = useState([]);

  const playerDetailsFromMatchData = [];

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlayerName(event.target.value);
  };

  async function handleSearchClick() {
    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const responseSummonerData = await riotApi.get(
      `/summoner/v4/summoners/by-name/${playerName}?api_key=${apiKey}`
    );

    const summonerId = responseSummonerData.data.id;
    const summonerPuuid = responseSummonerData.data.puuid;

    // const statsResponse = await axios.get(
    //   `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?api_key=${apiKey}`
    // );

    // const championAllDataResponse = await axios.get(
    //   `https://ddragon.leagueoflegends.com/cdn/13.7.1/data/pt_BR/champion.json`
    // );

    // const championSelectedAllData: ChampionSelectedAllData[] = Object.values(
    //   championAllDataResponse.data.data
    // );

    const responseRankedQeue = await riotApi.get(
      `/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
    );

    const historicMatch = await americasRiotApi.get(
      `lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=30&api_key=${apiKey}`
    );

    const allMatchGames = historicMatch.data.map(async (match) => {
      const Matchs = await americasRiotApi.get(
        `lol/match/v5/matches/${match}?api_key=${apiKey}`
      );

      return Matchs.data;
    });
    const matchDetailsbyGame = await Promise.all(allMatchGames);

    const matchParamsDetails = matchDetailsbyGame.map((detail) => {
      const PlayerStatsbyMatch = detail.info.participants.map((item) => {
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

      PlayerStatsbyMatch.forEach((item) => {
        playerDetailsFromMatchData.push(item);
      });
    });
    console.log("playerDetailsFromMatchData", playerDetailsFromMatchData);

    setPlayerStats(playerDetailsFromMatchData);
    // setChampions(statsResponse.data);
    // setAllChamps(championSelectedAllData);
    setRankedStats(responseRankedQeue.data);
    setMatchDetailsById(allMatchGames);
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
        {loading && <Spinner />}
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
      {/* <StatsZone>
        <h2>
          Top 3 Mastery Champions of {playerName}: 
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
                </strong>

                <p>Maestria : {champion.championLevel}</p>
                <p>Pts : {pointsFormatted}</p>
              </li>
            );
          })}
        </ul>
      </StatsZone> */}
      <WinRateZones>
        {playerStats.map((detail) => (
          <Fragment key={detail.id}>
            <p>
              {detail.summonerName === "Edu Extreme" && (
                <>
                  <span>{detail.championName}</span>
                  <span>
                    {detail.championName === "Zed"
                      ? ` ${detail.win}`
                      : " nao jogou de zed "}
                  </span>
                </>
              )}
            </p>
          </Fragment>
        ))}
      </WinRateZones>
    </Container>
  );
}
