import { datasetAverages, formatIncome, formatScore } from "../utils/segments";
import { panelClass } from "../utils/styles";

import SegmentDistribution from "./SegmentDistribution";
import SegmentMap from "./SegmentMap";

export default function OverviewPanel({ clusters, activeId, onActive, prediction }) {
  const averages = datasetAverages(clusters);
  const active = clusters.find((cluster) => cluster.id === activeId) ?? null;
  const readout = active
    ? {
        name: active.name,
        customers: active.customer_count,
        income: formatIncome(active.avg_income),
        spending: formatScore(active.avg_spending),
      }
    : {
        name: "Dataset average",
        customers: averages.total,
        income: formatIncome(averages.income),
        spending: formatScore(averages.spending),
      };

  return (
    <div className="grid grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] gap-6 max-xl:grid-cols-1">
      <section
        className={panelClass}
        id="overview-map"
        aria-labelledby="map-title"
        onMouseLeave={() => onActive(null)}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h2
              className="text-lg font-semibold tracking-[-0.015em] text-ink"
              id="map-title"
            >
              Customer distribution
            </h2>
            <p className="mt-1 text-sm text-muted">
              How customers are distributed across segments
            </p>
          </div>
          <p className="flex-none text-xs text-muted max-sm:hidden">
            Bubble size shows customers
          </p>
        </div>

        <SegmentMap
          clusters={clusters}
          averages={averages}
          activeId={activeId}
          onActive={onActive}
          prediction={prediction}
        />

        <div
          className="mx-6 mt-2 flex min-h-10 items-center gap-4 border-t border-rule py-3 max-sm:flex-wrap"
          aria-live="polite"
        >
          <span className="min-w-0 truncate text-sm font-medium text-ink">
            {readout.name}
          </span>
          <div className="flex flex-1 gap-6 max-sm:basis-full max-sm:flex-wrap max-sm:gap-x-4 max-sm:gap-y-2">
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="whitespace-nowrap text-xs text-muted">Customers</span>
              <span className="whitespace-nowrap font-mono text-sm tabular-nums text-ink">
                {readout.customers}
              </span>
            </span>
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="whitespace-nowrap text-xs text-muted">Avg income</span>
              <span className="whitespace-nowrap font-mono text-sm tabular-nums text-ink">
                {readout.income}
              </span>
            </span>
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="whitespace-nowrap text-xs text-muted">Avg spending</span>
              <span className="whitespace-nowrap font-mono text-sm tabular-nums text-ink">
                {readout.spending}
              </span>
            </span>
          </div>
        </div>
      </section>

      <SegmentDistribution clusters={clusters} activeId={activeId} onActive={onActive} />
    </div>
  );
}
