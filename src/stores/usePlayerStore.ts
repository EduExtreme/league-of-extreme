import axios from 'axios';
import { create } from 'zustand'

type ChampionSelectedAllData = {
  id: string;
  name: string;
  key: string;
};

interface RankedStat {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}



type PlayerDetails = {
  playerName:string
  onChangePlayerName: (name: string) => void
 
 
  champions:any[],
  onChangeChampions: (champ: []) => void


  allChamps:ChampionSelectedAllData[],
  onChangeAllChampions: (all: any[]) => void
  
  
  rankedStats:RankedStat[],
  onChangeRankedStats: (ranked:[]) => void

  playerStats: []
  onChangePlayerStats: (stats: any) => void

  matchDetailsById:"",
  onChangeMatchDetailsById:(matchId: any) => void



}



export const usePlayerDetails = create<PlayerDetails>((set, get) => ({

 playerName: "",
 onChangePlayerName: (name) => {
  set({ playerName: name })
 },
 champions:[],
onChangeChampions: (champ) => {
  set({ champions:champ })
},
  allChamps:[],
onChangeAllChampions: (all) => {
  set({ allChamps: all })
},
  rankedStats:[],
onChangeRankedStats: (ranked) =>{
  set({ rankedStats:ranked })
}, 
playerStats:[],
onChangePlayerStats: (stats) => {
  set({ playerStats: stats })
},
matchDetailsById:"",
onChangeMatchDetailsById: (matchId) => {
  set({ matchDetailsById: matchId })
},

}))


