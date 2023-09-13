export default function TagRankedCs({ playersWithSameWinStatus }: any) {
  console.log(playersWithSameWinStatus);
  return (
    <div className="bg-slate-700 flex justify-center rounded-2xl h-6 w-16">
      <span className="font-semibold text-emerald-500">
        {playersWithSameWinStatus[0].farm} CS
      </span>
    </div>
  );
}
