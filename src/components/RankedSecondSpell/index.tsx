export default function RankedSecondSpell({ playersWithSameWinStatus }: any) {
  console.log(playersWithSameWinStatus);
  return (
    <div className="bg-white flex justify-center rounded-2xl">
      <span className="font-semibold text-emerald-500">
        {playersWithSameWinStatus[0].secondSpell}
      </span>
    </div>
  );
}
