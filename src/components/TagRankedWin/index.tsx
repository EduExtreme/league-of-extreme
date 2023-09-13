export default function TagRankedWin({ playersWithSameWinStatus }: any) {
  console.log(playersWithSameWinStatus);
  return (
    <div
      className={`${
        playersWithSameWinStatus[0].win === true ? 'bg-green-600' : 'bg-red-500'
      } flex justify-center rounded-2xl w-16`}
    >
      <span className="font-semibold text-white items-center">
        {playersWithSameWinStatus[0].win === true ? (
          <span className="text-white">Win</span>
        ) : (
          <span className="text-white">Loss</span>
        )}
      </span>
    </div>
  );
}
