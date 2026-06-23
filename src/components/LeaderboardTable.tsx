import type { Leaderboard } from "@/data/leaderboards";

export function LeaderboardTable({ leaderboard }: { leaderboard: Leaderboard }) {
  return (
    <article className="rounded-lg border border-line bg-panel p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">{leaderboard.title}</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{leaderboard.description}</p>
      </div>
      <div className="overflow-hidden rounded-md border border-white/10">
        <table className="min-w-full divide-y divide-line text-sm">
          <tbody className="divide-y divide-line">
            {leaderboard.entries.map((entry) => (
              <tr key={`${leaderboard.id}-${entry.rank}`}>
                <td className="w-12 px-3 py-3 text-center font-mono text-zinc-500">#{entry.rank}</td>
                <td className="px-3 py-3">
                  <p className="font-medium text-white">{entry.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{entry.label}</p>
                </td>
                <td className="px-3 py-3 text-right">
                  <p className="font-semibold text-white">{entry.value}</p>
                  <p className="mt-1 text-xs text-signal">{entry.change}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
