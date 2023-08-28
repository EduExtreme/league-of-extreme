/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";

import { americasRiotApi, riotApi } from "@/services/api";
import { usePlayerDetails } from "@/stores/usePlayerStore";
import { Spinner } from "../Spinner";
import iron from "../../../public/ranked-emblem/iron.webp"
import bronze from "../../../public/ranked-emblem/bronze.webp"
import silver from "../../../public/ranked-emblem/silver.webp"
import gold from "../../../public/ranked-emblem/gold.webp"
import platinum from "../../../public/ranked-emblem/platinum.webp"
import emerald from "../../../public/ranked-emblem/emerald.webp"
import diamond from "../../../public/ranked-emblem/diamond.webp"
import master from "../../../public/ranked-emblem/master.webp"
import grandmaster from "../../../public/ranked-emblem/grandmaster.webp"
import challenger from "../../../public/ranked-emblem/challenger.webp"
import Image, { StaticImageData } from "next/image";


export default function PlayerStatus(): JSX.Element {
  const {
    onChangePlayerName,
    playerName,
    champions,
    allChamps,
    rankedStats,
    loading,
   
  } = usePlayerDetails((state) => state);

  const tierEmblemMapping = {
    IRON: iron,
    BRONZE: bronze,
    SILVER: silver,
    GOLD: gold,
    PLATINUM: platinum,
    EMERALD:emerald,
    DIAMOND:diamond,
    MASTER:master,
    GRANDMASTER:grandmaster,
    CHALLENGER:challenger
  };

  const playerDetailsFromMatchData: any = [];

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangePlayerName(event.target.value);
  };

 


  const relevantRankedStats = rankedStats.filter(
    (ranked) =>
      ranked.queueType === "RANKED_FLEX_SR" ||
      ranked.queueType === "RANKED_SOLO_5x5"
  );

  return (
    <main className="flex px-12 py-8 gap-8">
      {loading === true ? <Spinner/> : (
 <>
    <div className="flex gap-8">
      {relevantRankedStats.map((ranked) => (
        <div className="border border-blue-500 border-solid p-4" key={ranked.leagueId}>
              <span>
                {ranked.queueType === "RANKED_FLEX_SR" ? (
                  <strong className="text-blue-700">Ranked Flex</strong>
                ) : (
                  <strong className="text-blue-700">Ranked Solo</strong>
                )}
              </span>
              <Image src={tierEmblemMapping[ranked.tier]} alt={`${ranked.tier} Emblem`} />
              <ul className="font-semibold text-gray-500">
              <li className="text-blue-700 font-bold"> {ranked.tier} <span>{ranked.rank}</span></li>
              <li> PDL - {ranked.leaguePoints}</li>
              <li> WINS - {ranked.wins}</li>
              <li> LOSSES - {ranked.losses}</li>
              </ul>
              
              <strong className={((ranked.wins / (ranked.wins + ranked.losses)) * 100) > 51 ? 'text-green-500' : 'text-red-500'}>
                  Win Rate:{" "}
                  {((ranked.wins / (ranked.wins + ranked.losses)) * 100).toFixed(2)}
                  %
                </strong>
            </div>
          ))}
        </div>
        <div className="flex flex-1 justify-center">
          <h1 className="text-blue-700 font-bold text-2xl">{playerName}{" "}History's</h1></div>





        {/* <div className="flex flex-col flex-1">
            <h1 className="font-bold">Top 3 Mastery Champions of {playerName}:</h1>
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
          </div> */}
       </>
) }
     
      

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
    </main>
  );
}
