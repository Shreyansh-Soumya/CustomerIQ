import { useMediaQuery } from "../hooks/useMediaQuery";
import { formatIncome, formatScore, shortName } from "../utils/segments";

const INCOME_MAX = 140;
const SPENDING_MAX = 100;
const X_TICKS = [0, 35, 70, 105, 140];
const Y_TICKS = [0, 25, 50, 75, 100];

const LAYOUTS = {
  desktop: {
    width: 640,
    height: 360,
    pad: { left: 56, right: 16, top: 32, bottom: 44 },
    radius: (count) => 6 + Math.sqrt(count) * 1.4,
  },
  phone: {
    width: 360,
    height: 340,
    pad: { left: 44, right: 10, top: 30, bottom: 44 },
    radius: (count) => 5.5 + Math.sqrt(count) * 1.15,
  },
};

const gridClass = "stroke-chart-grid stroke-1";
const tickClass = "fill-muted font-mono text-xs tabular-nums max-sm:text-[13px]";
const axisClass = "fill-muted font-display text-xs font-medium max-sm:text-[13px]";
const nameClass =
  "pointer-events-none font-display text-xs font-medium [paint-order:stroke] stroke-cotton [stroke-linejoin:round] [stroke-width:3] max-sm:text-[14px]";

export default function SegmentMap({
  clusters,
  averages,
  activeId,
  onActive,
  prediction,
}) {
  const phone = useMediaQuery("(max-width: 639px)");
  const { width, height, pad, radius: radiusFor } = phone
    ? LAYOUTS.phone
    : LAYOUTS.desktop;
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;

  const spreadX = (value) =>
    pad.left + (Math.min(INCOME_MAX, Math.max(0, value)) / INCOME_MAX) * plotWidth;
  const spreadY = (value) =>
    pad.top +
    plotHeight -
    (Math.min(SPENDING_MAX, Math.max(0, value)) / SPENDING_MAX) * plotHeight;

  const predicted = prediction
    ? {
        x: spreadX(prediction.income),
        y: spreadY(prediction.spending),
      }
    : null;
  const predictedLeft = predicted ? predicted.x > width - 150 : false;
  const markerOuter = phone ? 11 : 10;
  const markerInner = phone ? 5 : 4.5;

  return (
    <div className="px-4 pt-3">
      <svg
        className="h-auto w-full overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
        role="group"
        aria-label="Segment map of annual income against spending score. Hover or focus a segment to inspect it."
      >
        <g aria-hidden="true">
          {X_TICKS.map((tick) => (
            <g key={`x-${tick}`}>
              <line
                className={gridClass}
                x1={spreadX(tick)}
                x2={spreadX(tick)}
                y1={pad.top}
                y2={pad.top + plotHeight}
              />
              {tick > 0 && tick < INCOME_MAX && (
                <text
                  className={tickClass}
                  x={spreadX(tick)}
                  y={height - 20}
                  textAnchor="middle"
                >
                  ${tick}k
                </text>
              )}
              {tick === 0 && (
                <text
                  className={tickClass}
                  x={spreadX(tick)}
                  y={height - 20}
                  textAnchor="start"
                >
                  $0
                </text>
              )}
              {tick === INCOME_MAX && (
                <text
                  className={tickClass}
                  x={spreadX(tick)}
                  y={height - 20}
                  textAnchor="end"
                >
                  ${tick}k
                </text>
              )}
            </g>
          ))}
          {Y_TICKS.map((tick) => (
            <g key={`y-${tick}`}>
              <line
                className={gridClass}
                x1={pad.left}
                x2={pad.left + plotWidth}
                y1={spreadY(tick)}
                y2={spreadY(tick)}
              />
              <text
                className={tickClass}
                x={pad.left - 10}
                y={spreadY(tick) + 4}
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          ))}
          <line
            className="stroke-rule-2 stroke-1 [stroke-dasharray:3_4]"
            x1={spreadX(averages.income)}
            x2={spreadX(averages.income)}
            y1={pad.top}
            y2={pad.top + plotHeight}
          />
          <line
            className="stroke-rule-2 stroke-1 [stroke-dasharray:3_4]"
            x1={pad.left}
            x2={pad.left + plotWidth}
            y1={spreadY(averages.spending)}
            y2={spreadY(averages.spending)}
          />
          <text className={axisClass} x={pad.left} y={phone ? 14 : 16}>
            Spending score
          </text>
          <text
            className={axisClass}
            x={pad.left + plotWidth}
            y={height - 4}
            textAnchor="end"
          >
            Annual income
          </text>
        </g>

        {clusters.map((cluster) => {
          const cx = spreadX(cluster.avg_income);
          const cy = spreadY(cluster.avg_spending);
          const radius = radiusFor(cluster.customer_count);
          const active = activeId === cluster.id;

          return (
            <g
              key={cluster.id}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`${cluster.name}, ${cluster.customer_count} customers, average income ${formatIncome(
                cluster.avg_income,
              )}, average spending ${formatScore(cluster.avg_spending)}`}
              onMouseEnter={() => onActive(cluster.id)}
              onFocus={() => onActive(cluster.id)}
              onBlur={() => onActive(null)}
              onClick={() => onActive(cluster.id)}
            >
              <circle
                className={`stroke-[1.5] transition-colors duration-200 ${
                  active
                    ? "fill-accent-soft stroke-accent-2"
                    : "fill-surface-2 stroke-ink-2"
                }`}
                cx={cx}
                cy={cy}
                r={radius}
              />
              <text
                className="pointer-events-none fill-ink font-mono text-xs tabular-nums"
                x={cx}
                y={cy + 4}
                textAnchor="middle"
              >
                {cluster.customer_count}
              </text>
              <text
                className={`${nameClass} ${active ? "fill-ink" : "fill-ink-2"}`}
                x={cx}
                y={cy - radius - 8}
                textAnchor="middle"
              >
                {shortName(cluster.name)}
              </text>
            </g>
          );
        })}

        {predicted && (
          <g
            aria-label={`Predicted customer at ${formatIncome(
              prediction.income,
            )} income and ${formatScore(prediction.spending)} spending`}
          >
            <circle
              className="fill-none stroke-accent-2 [stroke-width:1.5]"
              cx={predicted.x}
              cy={predicted.y}
              r={markerOuter}
            />
            <circle
              className="fill-accent-2 stroke-cotton [stroke-width:2]"
              cx={predicted.x}
              cy={predicted.y}
              r={markerInner}
            />
            <text
              className="fill-accent-2 font-display text-xs font-semibold [paint-order:stroke] stroke-cotton [stroke-linejoin:round] [stroke-width:3] max-sm:text-[13px]"
              x={predicted.x + (predictedLeft ? -14 : 14)}
              y={predicted.y - 12}
              textAnchor={predictedLeft ? "end" : "start"}
            >
              Predicted customer
            </text>
          </g>
        )}
      </svg>
      <p className="px-4 pt-1 text-xs leading-normal text-muted">
        Bubble size shows customers. Dashed lines mark the dataset average.
      </p>
    </div>
  );
}
