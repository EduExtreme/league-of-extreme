import { create } from 'zustand';

type Tier = "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";
type Role = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY"

export interface PlayerMatchStat  {
  kills:number,
  deaths:string,
  assists: number,
  championId: number,
  summonerName:string,
  championName:string,
  firstblood:boolean,
  farm:number,
  firstSpell:number,
  secondSpell:number,
  firstItem:number,
  secondItem:number,
  threeItem:number,
  fourItem:number,
  fiveItem:number,
  sixItem:number,
  sevenItem:number,
  gameCreation:number,
  gameDuration:number,
  gameEndTimesTamp:number,
  id:string,
  queue:number,
  role:Role,
  triples:number,
  win:boolean,
}

interface Champions {
  championId:number,
  championLevel:number,
  championPoints:number,
  championPointsSinceLastLevel:number,
  championPointsUntilNextLevel:number,
  lastPlayTime:number,
  summonerId:string
}

export interface ChampionSelectedAllData {
  id: string;
  name: string;
  key: string;
};

interface RankedStat {
  leagueId: string;
  queueType: string;
  tier: Tier;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

type PlayerDetails = {
  playerName: string;
  onChangePlayerName: (name: string) => void;
 
  champions: Champions[];
  onChangeChampions: (champ: Champions[]) => void;

  allChamps:ChampionSelectedAllData[],
  onChangeAllChampions: (all: ChampionSelectedAllData[]) => void
  
  rankedStats: RankedStat[];
  onChangeRankedStats: (ranked: RankedStat[]) => void;

  playerStats: any;
  onChangePlayerStats: (stats: any) => void;

  matchDetailsById: string;
  onChangeMatchDetailsById: (matchId: string) => void;

  loading: boolean;
  onChangeLoading: (load: boolean) => void;

  playerMatchStats: PlayerMatchStat[],
  onChangePlayerMatchStats: (playerMatch: PlayerMatchStat[]) => void;

};

export const usePlayerDetails = create<PlayerDetails>((set) => ({
  playerName: "",
  onChangePlayerName: (name) => {
    set({ playerName: name });
  },
  champions: [],
  onChangeChampions: (champ) => {
    set({ champions: champ });
  },
  allChamps: [],
  onChangeAllChampions: (all) => {
    set({ allChamps: all });
  },
  rankedStats: [],
  onChangeRankedStats: (ranked) => {
    set({ rankedStats: ranked });
  }, 
  playerStats: {},
  onChangePlayerStats: (stats) => {
    set({ playerStats: stats });
  },
  matchDetailsById: "",
  onChangeMatchDetailsById: (matchId) => {
    set({ matchDetailsById: matchId });
  },
  loading: false,
  onChangeLoading: (load) => {
    set({ loading: load });
  },

  playerMatchStats:[],
  onChangePlayerMatchStats:(playerMatch) => {
  set({ playerMatchStats: playerMatch });
  }

}));
