import { formatIncome, formatScore } from "../utils/segments";

export default function ClusterDetails({ clusters, activeId }) {
  return (
    <section
      id="segments"
      className="mt-16 sm:mt-24 lg:mt-30"
      aria-labelledby="segments-title"
    >
      <div className="flex items-end justify-between gap-6 pb-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
        <div>
          <h2
            id="segments-title"
            className="text-xl font-semibold tracking-[-0.02em] text-ink"
          >
            Customer segments
          </h2>
          <p className="mt-1 text-sm text-muted">
            Insights and business recommendations for each group
          </p>
        </div>
      </div>

      <table className="w-full table-fixed border-collapse max-lg:block">
        <caption className="sr-only">
          Customer segments with customer counts, average income, average spending and
          business strategy
        </caption>
        <colgroup>
          <col className="w-[27%]" />
          <col className="w-[14%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[35%]" />
        </colgroup>
        <thead className="max-lg:absolute max-lg:h-px max-lg:w-px max-lg:overflow-hidden max-lg:whitespace-nowrap max-lg:[clip-path:inset(50%)]">
          <tr>
            <th
              scope="col"
              className="border-b border-ink-2 px-3 py-2 text-left align-bottom text-xs font-medium text-muted first:pl-0 last:pr-0"
            >
              Segment
            </th>
            <th
              scope="col"
              className="border-b border-ink-2 px-3 py-2 text-left align-bottom text-xs font-medium text-muted first:pl-0 last:pr-0"
            >
              Customers
            </th>
            <th
              scope="col"
              className="border-b border-ink-2 px-3 py-2 text-left align-bottom text-xs font-medium text-muted first:pl-0 last:pr-0"
            >
              Income
            </th>
            <th
              scope="col"
              className="border-b border-ink-2 px-3 py-2 text-left align-bottom text-xs font-medium text-muted first:pl-0 last:pr-0"
            >
              Spending
            </th>
            <th
              scope="col"
              className="border-b border-ink-2 px-3 py-2 text-left align-bottom text-xs font-medium text-muted first:pl-0 last:pr-0"
            >
              Business strategy
            </th>
          </tr>
        </thead>
        <tbody className="max-lg:block">
          {clusters.map((cluster) => {
            const active = activeId === cluster.id;

            return (
              <tr
                className={`max-lg:block max-lg:border-b max-lg:border-rule max-lg:py-4 ${
                  active
                    ? "bg-surface-2 max-lg:bg-transparent max-lg:[&>td]:bg-surface-2 max-lg:[&>td:first-child]:shadow-[inset_2px_0_0_var(--accent-2)]"
                    : ""
                }`}
                key={cluster.id}
              >
                <td className="border-b border-rule px-3 py-4 align-top text-sm first:pl-0 last:pr-0 max-lg:block max-lg:border-0 max-lg:px-0 max-lg:py-1">
                  <span className="mb-1 flex items-baseline gap-1 text-xs text-muted">
                    Cluster
                    <span className="font-mono tabular-nums">{cluster.id}</span>
                  </span>
                  <span className="block text-base font-semibold leading-tight tracking-[-0.01em] text-ink">
                    {cluster.name}
                  </span>
                  <span className="mt-1 block max-w-[44ch] text-xs leading-normal text-muted">
                    {cluster.description}
                  </span>
                </td>
                <td
                  data-label="Customers"
                  className="border-b border-rule px-3 py-4 align-top text-sm first:pl-0 last:pr-0 max-lg:grid max-lg:border-0 max-lg:px-0 max-lg:py-1 max-lg:grid-cols-[120px_minmax(0,1fr)] max-lg:items-baseline max-lg:gap-3 max-lg:before:text-xs max-lg:before:text-muted max-lg:before:content-[attr(data-label)]"
                >
                  <span className="flex flex-col gap-1">
                    <span className="block font-mono text-base tabular-nums">
                      {cluster.customer_count}
                    </span>
                    <span className="block font-mono text-xs tabular-nums text-muted">
                      {cluster.percentage}%
                    </span>
                  </span>
                </td>
                <td
                  data-label="Income"
                  className="border-b border-rule px-3 py-4 align-top text-sm first:pl-0 last:pr-0 max-lg:grid max-lg:border-0 max-lg:px-0 max-lg:py-1 max-lg:grid-cols-[120px_minmax(0,1fr)] max-lg:items-baseline max-lg:gap-3 max-lg:before:text-xs max-lg:before:text-muted max-lg:before:content-[attr(data-label)]"
                >
                  <span className="flex flex-col gap-1">
                    <span className="block font-mono text-base tabular-nums">
                      {formatIncome(cluster.avg_income)}
                    </span>
                  </span>
                </td>
                <td
                  data-label="Spending"
                  className="border-b border-rule px-3 py-4 align-top text-sm first:pl-0 last:pr-0 max-lg:grid max-lg:border-0 max-lg:px-0 max-lg:py-1 max-lg:grid-cols-[120px_minmax(0,1fr)] max-lg:items-baseline max-lg:gap-3 max-lg:before:text-xs max-lg:before:text-muted max-lg:before:content-[attr(data-label)]"
                >
                  <span className="flex flex-col gap-1">
                    <span className="block font-mono text-base tabular-nums">
                      {formatScore(cluster.avg_spending)}
                    </span>
                    <span className="block text-xs tabular-nums text-muted">
                      out of 100
                    </span>
                  </span>
                </td>
                <td
                  data-label="Business strategy"
                  className="border-b border-rule px-3 py-4 align-top text-sm first:pl-0 last:pr-0 max-lg:grid max-lg:border-0 max-lg:px-0 max-lg:py-1 max-lg:grid-cols-[120px_minmax(0,1fr)] max-lg:items-baseline max-lg:gap-3 max-lg:before:text-xs max-lg:before:text-muted max-lg:before:content-[attr(data-label)]"
                >
                  <span className="text-xs leading-relaxed text-ink-2 max-lg:text-sm">
                    {cluster.recommendation}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
