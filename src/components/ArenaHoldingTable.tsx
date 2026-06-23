import { formatMoney, formatPercent } from "@/components/utils";
import type { ArenaHolding } from "@/types/arena";

export function ArenaHoldingTable({ holdings }: { holdings: ArenaHolding[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">资产</th>
              <th className="px-4 py-3">数量</th>
              <th className="px-4 py-3">虚拟建仓价</th>
              <th className="px-4 py-3">当前价</th>
              <th className="px-4 py-3">浮动盈亏</th>
              <th className="px-4 py-3">AI 判词 / 反证条件</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-panel">
            {holdings.map((holding) => (
              <tr key={holding.id}>
                <td className="px-4 py-4">
                  <p className="font-medium text-white">{holding.assetName}</p>
                  <p className="mt-1 font-mono text-xs text-zinc-500">{holding.assetSymbol}</p>
                </td>
                <td className="px-4 py-4 text-zinc-300">{holding.quantity.toLocaleString("zh-CN")}</td>
                <td className="px-4 py-4 text-zinc-300">{formatMoney(holding.entryPrice)}</td>
                <td className="px-4 py-4 text-zinc-300">{formatMoney(holding.currentPrice)}</td>
                <td className={holding.pnlPercent >= 0 ? "px-4 py-4 text-signal" : "px-4 py-4 text-danger"}>
                  {formatPercent(holding.pnlPercent)}
                </td>
                <td className="max-w-md px-4 py-4 text-zinc-300">
                  <p>{holding.thesis}</p>
                  <p className="mt-2 text-xs text-caution">反证：{holding.invalidation}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
