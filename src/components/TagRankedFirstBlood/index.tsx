export default function TagRankedFirstBlood({ playersWithSameWinStatus }: any) {
  console.log(playersWithSameWinStatus);
  return (
    <div className="bg-emerald-700 flex justify-center rounded-2xl">
      <span className="font-semibold text-white">
        {playersWithSameWinStatus[0].firstblood === 'true' && 'Firstblood'}
      </span>
    </div>
  );
}
