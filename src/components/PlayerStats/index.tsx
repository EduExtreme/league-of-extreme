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
import { usePlayerDetails } from "@/stores/usePlayerStore";

export default function PlayerStatus(): JSX.Element {
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
  } = usePlayerDetails((state) => state);

  const [loading, setLoading] = useState(false);
  const playerDetailsFromMatchData: any = [];

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangePlayerName(event.target.value);
  };

  async function handleSearchClick() {
    setLoading(true);
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

    // const filteredMatches = playerStats.filter((match) => {
    //   return match.summonerName === playerName && match.championName === "Zed";

    //   // return (
    //   //   match.summonerName === playerName && match.championName === "Riven"
    //   // );
    // });

    // const matchsWithChampion = filteredMatches.reduce((total, match) => {
    //   return match.championName === "Zed" ? total + 1 : total;
    // }, 0);

    // console.log("partidas com o campeão : ", matchsWithChampion);
    console.log("partidas detalhes : ", rankedStats);
    onChangePlayerName(playerName);
    onChangePlayerStats(playerDetailsFromMatchData);
    onChangeChampions(statsResponse.data);
    onChangeAllChampions(championSelectedAllData);
    onChangeRankedStats(responseRankedQeue.data);
    onChangeMatchDetailsById(allMatchGames);

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
                <strong>Ranked Flex</strong>
              ) : (
                <strong>Ranked Solo</strong>
              )}
            </span>
            <p>
              {ranked.tier} {ranked.rank}
            </p>
            <p>PDL {ranked.leaguePoints}</p>
            <p>WINS {ranked.wins}</p>
            <p>LOSSES {ranked.losses}</p>

            <strong>
              Win Rate:{" "}
              {((ranked.wins / (ranked.wins + ranked.losses)) * 100).toFixed(2)}
              %
            </strong>
          </div>
        ))}
      </RankedStats>
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
                  {champInfo ? champInfo.name : "Nome não disponivel"}
                </strong>

                <p>Maestria : {champion.championLevel}</p>
                <p>Pts : {pointsFormatted}</p>
              </li>
            );
          })}
        </ul>
      </StatsZone>

      {/* <WinRateZones>
        {playerStats.map((detail) => (
          <Fragment key={detail.id}>
            <p>
              {detail.summonerName === `${playerName}` &&
                detail.championName === "Riven" &&
                detail.win && (
                  <>
                    <p>{detail.win === false ? "perdeu" : "ganhou "}</p>
                  </>
                )}
            </p>
          </Fragment>
        ))}
      </WinRateZones> */}
    </Container>
  );
}
