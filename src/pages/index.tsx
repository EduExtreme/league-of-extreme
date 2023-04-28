import { HeroPattern } from "@/assets/HeroPattern";
import PlayerStatus from "../components/PlayerStats";

export default function Home() {
  return (
    <main>
      <PlayerStatus playerName="name" />
      <HeroPattern />
    </main>
  );
}
