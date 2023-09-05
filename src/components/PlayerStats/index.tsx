import { Fragment, useState } from 'react';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

import { americasRiotApi, riotApi } from '@/services/api';
import { usePlayerDetails } from '@/stores/usePlayerStore';
import { Spinner } from '../Spinner';
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
import Image, { StaticImageData } from 'next/image';

import top from '../../../public/icon-position-top.svg';
import jungle from '../../../public/icon-position-jungle.svg';
import mid from '../../../public/icon-position-mid.svg';
import bot from '../../../public/icon-position-bot.svg';
import sup from '../../../public/icon-position-sup.svg';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
export default function PlayerStatus(): JSX.Element {
  const {
    onChangePlayerName,
    playerName,
    champions,
    allChamps,
    rankedStats,
    loading,
    playerMatchStats,
  } = usePlayerDetails((state) => state);

  const tierEmblemMapping = {
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

  interface Teste {
    TOP: StaticImageData;
    JUNGLE: StaticImageData;
    MIDDLE: StaticImageData;
    BOTTOM: StaticImageData;
    UTILITY: StaticImageData;
  }

  const positionRole: Teste = {
    TOP: top,
    JUNGLE: jungle,
    MIDDLE: mid,
    BOTTOM: bot,
    UTILITY: sup,
  };

  const itemIconBaseUrl =
    'https://ddragon.leagueoflegends.com/cdn/13.17.1/img/item/';

  const championIconBaseUrl =
    'http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/';

  // const playerDetailsFromMatchData: any = [];

  // console.log(playerDetailsFromMatchData);

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangePlayerName(event.target.value);
  };

  const relevantRankedStats = rankedStats.filter(
    (ranked) =>
      ranked.queueType === 'RANKED_FLEX_SR' ||
      ranked.queueType === 'RANKED_SOLO_5x5',
  );
  return (
    <main className="flex px-12 py-8 gap-8">
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          <div className="flex gap-8">
            {relevantRankedStats.map((ranked) => (
              <div
                className="border border-blue-500 border-solid p-4 h-80"
                key={ranked.leagueId}
              >
                <span>
                  {ranked.queueType === 'RANKED_FLEX_SR' ? (
                    <strong className="text-blue-700">Ranked Flex</strong>
                  ) : (
                    <strong className="text-blue-700">Ranked Solo</strong>
                  )}
                </span>
                <Image
                  src={tierEmblemMapping[ranked.tier]}
                  alt={`${ranked.tier} Emblem`}
                />
                <ul className="font-semibold text-gray-500">
                  <li className="text-blue-700 font-bold">
                    {' '}
                    {ranked.tier} <span>{ranked.rank}</span>
                  </li>
                  <li> PDL - {ranked.leaguePoints}</li>
                  <li> WINS - {ranked.wins}</li>
                  <li> LOSSES - {ranked.losses}</li>
                </ul>

                <strong
                  className={
                    (ranked.wins / (ranked.wins + ranked.losses)) * 100 > 51
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  Win Rate:{' '}
                  {(
                    (ranked.wins / (ranked.wins + ranked.losses)) *
                    100
                  ).toFixed(2)}
                  %
                </strong>
              </div>
            ))}
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col space-y-12">
              {Array.from({
                length: Math.ceil(playerMatchStats.length / 10),
              }).map((_, groupIndex) => {
                const startIndex = groupIndex * 10;
                const endIndex = startIndex + 10;
                const playerGroup = playerMatchStats.slice(
                  startIndex,
                  endIndex,
                );

                const currentPlayer = playerGroup.find(
                  (player) => player.summonerName === playerName,
                );
                const currentPlayerWinStatus = currentPlayer
                  ? currentPlayer.win
                  : false;

                const playersWithSameWinStatus = playerGroup.filter(
                  (player) => player.win === currentPlayerWinStatus,
                );

                if (currentPlayer) {
                  const currentPlayerIndex = playersWithSameWinStatus.findIndex(
                    (player) => player.summonerName === playerName,
                  );
                  if (currentPlayerIndex !== -1) {
                    playersWithSameWinStatus.splice(currentPlayerIndex, 1);
                    playersWithSameWinStatus.unshift(currentPlayer);
                  }
                }

                const playersWithOppositeWinStatus = playerGroup.filter(
                  (player) => player.win !== currentPlayerWinStatus,
                );

                const summonerNameFirstPlayer =
                  playersWithSameWinStatus[0].summonerName;
                const summonerNameChampion =
                  playersWithSameWinStatus[0].championName;
                const summonerNameRole = playersWithSameWinStatus[0].role;
                const summonerNameKills = playersWithSameWinStatus[0].kills;
                const summonerNameDeaths = playersWithSameWinStatus[0].deaths;
                const summonerNameAssists = playersWithSameWinStatus[0].assists;
                const summonerNameWin = playersWithSameWinStatus[0].win;

                const summonerNameFirstBlood =
                  playersWithSameWinStatus[0].firstblood;

                const summonerNameItem1 = playersWithSameWinStatus[0].firstItem;
                const summonerNameItem2 =
                  playersWithSameWinStatus[0].secondItem;
                const summonerNameItem3 = playersWithSameWinStatus[0].threeItem;
                const summonerNameItem4 = playersWithSameWinStatus[0].fourItem;
                const summonerNameItem5 = playersWithSameWinStatus[0].fiveItem;
                const summonerNameItem6 = playersWithSameWinStatus[0].sixItem;

                const summonerQueue = playersWithSameWinStatus[0].queue;

                const rankedQueue = relevantRankedStats.find(
                  (ranked) =>
                    (ranked.queueType === 'RANKED_FLEX_SR' &&
                      summonerQueue === 440) ||
                    (ranked.queueType === 'RANKED_SOLO_5x5' &&
                      summonerQueue === 420),
                );

                const itemData = [
                  {
                    value: summonerNameItem1,
                    shouldRender: summonerNameItem1 !== 0,
                  },
                  {
                    value: summonerNameItem2,
                    shouldRender: summonerNameItem2 !== 0,
                  },
                  {
                    value: summonerNameItem3,
                    shouldRender: summonerNameItem3 !== 0,
                  },
                  {
                    value: summonerNameItem4,
                    shouldRender: summonerNameItem4 !== 0,
                  },
                  {
                    value: summonerNameItem5,
                    shouldRender: summonerNameItem5 !== 0,
                  },
                  {
                    value: summonerNameItem6,
                    shouldRender: summonerNameItem6 !== 0,
                  },
                ];

                return (
                  <div key={groupIndex}>
                    <div className="flex flex-col">
                      {playersWithSameWinStatus.length > 0 && (
                        <Accordion
                          type="single"
                          collapsible
                          key={playersWithSameWinStatus[0].id}
                        >
                          <AccordionItem
                            value={`item-${groupIndex}`}
                            className={` ${
                              summonerNameWin ? 'bg-blue-200' : 'bg-red-200'
                            }`}
                          >
                            <AccordionTrigger
                              className={`flex flex-1 items-center justify-between border-l-[12px] ${
                                summonerNameWin
                                  ? 'border-blue-500'
                                  : 'border-red-500'
                              }`}
                            >
                              <div className="">
                                <div className="bg-blue-600 w-[130px] flex justify-center">
                                  <span className="font-semibold text-white">
                                    {playersWithSameWinStatus[0].queue === 440
                                      ? 'Ranked Flex'
                                      : playersWithSameWinStatus[0].queue ===
                                        420
                                      ? 'Ranked Solo'
                                      : ''}
                                  </span>
                                </div>
                                <div className="flex gap-2 pl-3 pb-2 pt-2">
                                  <div className="flex flex-col text-left">
                                    <span className="text-blue-700 font-bold">
                                      {summonerNameFirstPlayer}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      {rankedQueue && rankedQueue.tier && (
                                        <span>
                                          <Image
                                            width={24}
                                            height={24}
                                            src={
                                              tierEmblemMapping[
                                                rankedQueue.tier
                                              ]
                                            }
                                            alt={`${rankedQueue.tier} Emblem`}
                                          />
                                        </span>
                                      )}
                                      <span className="text-blue-700 font-bold">
                                        {rankedQueue?.rank}
                                      </span>
                                    </div>

                                    <div className="flex gap-1">
                                      <div className="">
                                        <Image
                                          width={32}
                                          height={32}
                                          src={`${championIconBaseUrl}${summonerNameChampion}.png`}
                                          alt={`${summonerNameChampion} Icon`}
                                        />
                                      </div>
                                      <div className="text-blue-700 font-medium">
                                        <strong className="mr-2">KDA</strong>
                                        <span>{summonerNameKills}</span>/
                                        <span className="text-red-600">
                                          {summonerNameDeaths}
                                        </span>
                                        /<span>{summonerNameAssists}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    <Image
                                      src={positionRole[summonerNameRole]}
                                      alt="ROLE"
                                    />
                                  </div>

                                  <ul className="flex gap-3">
                                    {itemData.map(
                                      (item) =>
                                        item.shouldRender && (
                                          <li
                                            key={item.value}
                                            className="min-w-[16] min-h-16"
                                          >
                                            <Image
                                              alt={`${itemIconBaseUrl}${item.value}.png`}
                                              width={32}
                                              height={32}
                                              src={`${itemIconBaseUrl}${item.value}.png`}
                                            />
                                          </li>
                                        ),
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </AccordionTrigger>

                            {[
                              ...playersWithSameWinStatus,
                              ...playersWithOppositeWinStatus,
                            ]
                              .slice(1)
                              .map((player) => {
                                const lastRankedStats =
                                  relevantRankedStats.find(
                                    (ranked) =>
                                      (ranked.queueType === 'RANKED_FLEX_SR' &&
                                        player.queue === 440) ||
                                      (ranked.queueType === 'RANKED_SOLO_5x5' &&
                                        player.queue === 420),
                                  );

                                return (
                                  <AccordionContent
                                    key={player.id}
                                    className={`text-blue-700 font-semibold p-2 data-[state=closed]:hidden flex items-center ${
                                      player.win ? 'bg-blue-100' : 'bg-red-100'
                                    }`}
                                  >
                                    <div className="text-blue-700 font-semibold p-2 flex items-center ">
                                      <div className="flex items-center justify-center gap-4">
                                        <div className="flex flex-col">
                                          <span className="">
                                            {player.summonerName}
                                          </span>
                                          <div className="flex gap-3">
                                            <Image
                                              width={32}
                                              height={32}
                                              src={`${championIconBaseUrl}${player.championName}.png`}
                                              alt={`${player.championName} Icon`}
                                            />
                                            <span className="">
                                              {player.kills}/{player.deaths}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-blue-600">
                                          <span className="">
                                            {lastRankedStats && (
                                              <p className="text-blue-600">
                                                <div className="flex items-center gap-2">
                                                  <Image
                                                    width={32}
                                                    height={32}
                                                    src={
                                                      tierEmblemMapping[
                                                        lastRankedStats.tier
                                                      ]
                                                    }
                                                    alt={`${rankedQueue?.tier} Emblem`}
                                                  />
                                                  <span>
                                                    {lastRankedStats.rank}
                                                  </span>
                                                </div>
                                              </p>
                                            )}
                                          </span>
                                        </div>
                                        <Image
                                          src={positionRole[player.role]}
                                          alt="ROLE"
                                        />
                                        <div className="w-32 space-x-2 flex items-center">
                                          <Image
                                            alt="item"
                                            width={32}
                                            height={32}
                                            src={`${itemIconBaseUrl}${player.firstItem}.png`}
                                          />
                                          <Image
                                            alt="item"
                                            width={32}
                                            height={32}
                                            src={`${itemIconBaseUrl}${player.secondItem}.png`}
                                          />
                                          <Image
                                            alt="item"
                                            width={32}
                                            height={32}
                                            src={`${itemIconBaseUrl}${player.threeItem}.png`}
                                          />
                                          <Image
                                            alt="item"
                                            width={32}
                                            height={32}
                                            src={`${itemIconBaseUrl}${player.fourItem}.png`}
                                          />
                                          <Image
                                            alt="item"
                                            width={32}
                                            height={32}
                                            src={`${itemIconBaseUrl}${player.fiveItem}.png`}
                                          />
                                          <Image
                                            alt="item"
                                            width={32}
                                            height={32}
                                            src={`${itemIconBaseUrl}${player.sixItem}.png`}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </AccordionContent>
                                );
                              })}
                          </AccordionItem>
                        </Accordion>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
      )}

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
