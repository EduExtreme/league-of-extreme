export default function TagRanked({ playersWithSameWinStatus }: any) {
  console.log(playersWithSameWinStatus);
  return (
    <div className="bg-emerald-700 flex justify-center rounded-2xl">
      <span className="font-semibold text-white">
        {playersWithSameWinStatus[0].queue === 440
          ? 'Ranked Flex'
          : playersWithSameWinStatus[0].queue === 420
          ? 'Ranked Solo'
          : ''}
      </span>
    </div>
  );
}
