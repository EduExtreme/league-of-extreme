import { InputControl, InputPrefix, InputRoot } from "@/components/Input";
import PlayerStatus from "../components/PlayerStats";
import { Header } from "@/components/Header";


export default function Home() {
  return (
    <>
      <Header/>
      <PlayerStatus />
    </>
  );
}
