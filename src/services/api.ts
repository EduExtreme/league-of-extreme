import axios from 'axios';

export const riotApi = axios.create({
  baseURL: 'https://br1.api.riotgames.com/lol/',
});
export const americasRiotApi = axios.create({
  baseURL: 'https://americas.api.riotgames.com/',
});