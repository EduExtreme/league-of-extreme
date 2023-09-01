
import React from 'react';

// Função para construir a URL da imagem do campeão com base no nome
export default function getChampionImageUrl(championName) {
  // Substitua 'Anivia' pelo nome do campeão dinâmico
  return `http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/${championName}.png`;
}

function ChampionInfo(props) {
  const { championName } = props; // Suponha que você tenha o nome do campeão como uma propriedade

  // Use a função para obter a URL da imagem do campeão
  const championImageUrl = getChampionImageUrl(championName);

 


