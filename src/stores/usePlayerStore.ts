import { create } from 'zustand';

type Tier = "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";

type ChampionSelectedAllData = {
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
 
  champions: any[];
  onChangeChampions: (champ: any[]) => void;

  allChamps:ChampionSelectedAllData[],
  onChangeAllChampions: (all: any[]) => void
  
  rankedStats: RankedStat[];
  onChangeRankedStats: (ranked: RankedStat[]) => void;

  playerStats: any;
  onChangePlayerStats: (stats: any) => void;

  matchDetailsById: string;
  onChangeMatchDetailsById: (matchId: string) => void;

  loading: boolean;
  onChangeLoading: (load: boolean) => void;
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
  }
}));
