import { panelClass } from "../utils/styles";

export default function SegmentDistribution({ clusters, activeId, onActive }) {
  const maxCount = Math.max(...clusters.map((cluster) => cluster.customer_count));
  const ordered = [...clusters].sort((a, b) => b.customer_count - a.customer_count);

  return (
    <section
      className={panelClass}
      aria-labelledby="distribution-title"
      onMouseLeave={() => onActive(null)}
    >
      <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-6">
        <div>
          <h2
            className="text-lg font-semibold tracking-[-0.015em] text-ink"
            id="distribution-title"
          >
            By segment size
          </h2>
          <p className="mt-1 text-sm text-muted">Share of all customers, largest first</p>
        </div>
      </div>

      <ol className="flex list-none flex-col px-2 pb-2 max-xl:grid max-xl:grid-cols-2 max-xl:gap-x-6 max-sm:flex">
        {ordered.map((cluster) => {
          const active = activeId === cluster.id;

          return (
            <li
              className="border-t border-rule first:border-t-0 max-xl:[&:nth-child(2)]:border-t-0 max-sm:[&:nth-child(2)]:border-t"
              key={cluster.id}
            >
              <button
                type="button"
                className={`grid w-full grid-cols-[minmax(0,1fr)_auto_auto] gap-x-3 gap-y-1 rounded-input px-2 py-2 text-left text-ink transition-colors duration-200 focus-visible:bg-surface-2 ${
                  active ? "bg-surface-2" : "hover:bg-surface-2"
                }`}
                aria-pressed={active}
                aria-label={`${cluster.name}, ${cluster.customer_count} customers, ${cluster.percentage}% of the dataset`}
                onMouseEnter={() => onActive(cluster.id)}
                onFocus={() => onActive(cluster.id)}
                onBlur={() => onActive(null)}
              >
                <span className="truncate text-sm font-medium">{cluster.name}</span>
                <span className="font-mono text-sm tabular-nums">
                  {cluster.customer_count}
                </span>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {cluster.percentage}%
                </span>
                <span
                  className="col-span-full mt-1 h-1 overflow-hidden rounded-[2px] bg-surface-3"
                  aria-hidden="true"
                >
                  <span
                    className={`block h-full w-full origin-left rounded-[inherit] transition-colors duration-200 ${
                      active ? "bg-accent-2" : "bg-ink-2"
                    }`}
                    style={{
                      transform: `scaleX(${(cluster.customer_count / maxCount).toFixed(3)})`,
                    }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="px-6 pb-6 text-xs leading-normal text-muted">
        Bars show each segment&apos;s share of all customers.
      </p>
    </section>
  );
}
