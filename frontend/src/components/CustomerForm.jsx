import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { predictCluster } from "../utils/predict";
import { formatIncome, formatScore, scalePercent } from "../utils/segments";
import { badgeClass, buttonPrimaryClass, fieldInputClass, panelClass } from "../utils/styles";

const LIMITS = {
  income: { min: 0, max: 200, name: "annual income" },
  spending: { min: 1, max: 100, name: "spending score" },
};

function validate(field, value) {
  const { min, max, name } = LIMITS[field];

  if (value === "" || value === null || value === undefined) {
    return `Enter ${name}.`;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return `Enter a number for ${name}.`;
  }

  if (!Number.isInteger(number)) {
    return `Enter a whole number for ${name}.`;
  }

  if (number < min || number > max) {
    return `Enter ${name} from ${min} to ${max}.`;
  }

  return "";
}

export default function CustomerForm({ model, clusters, prediction, onPredict }) {
  const [income, setIncome] = useState(60);
  const [spending, setSpending] = useState(50);
  const [errors, setErrors] = useState({ income: "", spending: "" });

  function updateField(field, value, setValue) {
    setValue(value);

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validate(field, value) }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      income: validate("income", income),
      spending: validate("spending", spending),
    };
    setErrors(nextErrors);

    if (nextErrors.income || nextErrors.spending) {
      document.getElementById(nextErrors.income ? "income" : "spending")?.focus();
      return;
    }

    const clusterId = predictCluster(Number(income), Number(spending), model);
    const cluster = clusters.find((item) => item.id === clusterId);

    if (!cluster) return;

    onPredict({
      clusterId,
      cluster,
      income: Number(income),
      spending: Number(spending),
    });
  }

  const result = prediction?.cluster ?? null;

  return (
    <section
      id="predict"
      className="mt-16 sm:mt-24 lg:mt-30"
      aria-labelledby="predict-title"
    >
      <div className="flex items-end justify-between gap-6 pb-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
        <div>
          <h2
            id="predict-title"
            className="text-xl font-semibold tracking-[-0.02em] text-ink"
          >
            Customer segment predictor
          </h2>
          <p className="mt-1 text-sm text-muted">
            Use the trained K-Means model to classify a customer
          </p>
        </div>
      </div>

      <div
        className={`${panelClass} grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] overflow-hidden max-lg:grid-cols-1`}
      >
        <div className="flex min-w-0 flex-col gap-6 p-6">
          <div>
            <h3 className="text-lg font-semibold text-ink">Customer details</h3>
            <p className="mt-1 text-sm text-muted">
              Enter the two features the model was trained on.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1">
              <label
                className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink-2"
                htmlFor="income"
              >
                Annual income
                <span className="text-xs font-normal text-muted">$k</span>
              </label>
              <input
                id="income"
                className={fieldInputClass}
                type="number"
                inputMode="numeric"
                min="0"
                max="200"
                step="1"
                value={income}
                required
                aria-invalid={errors.income ? "true" : undefined}
                aria-describedby="income-help"
                onChange={(event) => updateField("income", event.target.value, setIncome)}
              />
              <p
                id="income-help"
                className={`min-h-[1lh] text-xs leading-snug ${
                  errors.income ? "text-error" : "text-muted"
                }`}
              >
                {errors.income || "From 0 to 200"}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink-2"
                htmlFor="spending"
              >
                Spending score
                <span className="font-mono text-xs font-normal text-muted">1 to 100</span>
              </label>
              <input
                id="spending"
                className={fieldInputClass}
                type="number"
                inputMode="numeric"
                min="1"
                max="100"
                step="1"
                value={spending}
                required
                aria-invalid={errors.spending ? "true" : undefined}
                aria-describedby="spending-help"
                onChange={(event) =>
                  updateField("spending", event.target.value, setSpending)
                }
              />
              <p
                id="spending-help"
                className={`min-h-[1lh] text-xs leading-snug ${
                  errors.spending ? "text-error" : "text-muted"
                }`}
              >
                {errors.spending || "From 1 to 100"}
              </p>
            </div>

            <button className={`${buttonPrimaryClass} w-full`} type="submit">
              Predict customer segment
            </button>
          </form>
        </div>

        <div
          className="min-w-0 border-l border-rule bg-surface-2 p-6 max-lg:border-l-0 max-lg:border-t"
          aria-live="polite"
        >
          {result ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-semibold leading-tight text-ink">
                  {result.name}
                </h3>
                <span
                  className={`${badgeClass} border-accent-2/40 bg-accent-soft text-accent-2`}
                >
                  Prediction
                </span>
                <span className={badgeClass}>Cluster {result.id}</span>
              </div>

              <p className="max-w-[58ch] text-sm text-ink-2">{result.description}</p>

              <figure className="m-0 flex flex-col gap-3 border-y border-rule py-3">
                <figcaption className="sr-only">
                  This customer compared with the segment average
                </figcaption>
                <div className="grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 max-sm:grid-cols-1 max-sm:gap-1">
                  <span className="whitespace-nowrap text-xs text-muted">Income</span>
                  <span
                    className="relative h-2 rounded-[2px] bg-surface-3 max-sm:row-start-2"
                    aria-hidden="true"
                  >
                    <span
                      className="absolute -top-1 -bottom-1 w-0.5 rounded-[2px] bg-ink-2"
                      style={{ left: `${scalePercent(result.avg_income, 140)}%` }}
                    />
                    <span
                      className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cotton bg-accent-2"
                      style={{ left: `${scalePercent(prediction.income, 140)}%` }}
                    />
                  </span>
                  <span className="whitespace-nowrap text-xs tabular-nums text-ink">
                    <span className="font-mono">{formatIncome(prediction.income)}</span>
                    <span className="px-1 text-muted">vs</span>
                    <span className="font-mono">{formatIncome(result.avg_income)}</span>
                  </span>
                </div>
                <div className="grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 max-sm:grid-cols-1 max-sm:gap-1">
                  <span className="whitespace-nowrap text-xs text-muted">Spending</span>
                  <span
                    className="relative h-2 rounded-[2px] bg-surface-3 max-sm:row-start-2"
                    aria-hidden="true"
                  >
                    <span
                      className="absolute -top-1 -bottom-1 w-0.5 rounded-[2px] bg-ink-2"
                      style={{ left: `${scalePercent(result.avg_spending, 100)}%` }}
                    />
                    <span
                      className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cotton bg-accent-2"
                      style={{ left: `${scalePercent(prediction.spending, 100)}%` }}
                    />
                  </span>
                  <span className="whitespace-nowrap text-xs tabular-nums text-ink">
                    <span className="font-mono">{formatScore(prediction.spending)}</span>
                    <span className="px-1 text-muted">vs</span>
                    <span className="font-mono">{formatScore(result.avg_spending)}</span>
                  </span>
                </div>
                <div
                  className="flex gap-4 border-t border-rule pt-2"
                  aria-hidden="true"
                >
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <span className="h-0.5 w-2.5 rounded-[2px] bg-ink-2" />
                    Segment average
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <span className="size-2 rounded-full bg-accent-2" />
                    This customer
                  </span>
                </div>
              </figure>

              <div className="flex flex-col gap-2 border-t border-rule pt-4">
                <span className="text-xs font-medium text-muted">Recommended strategy</span>
                <p className="max-w-[62ch] text-sm leading-normal text-ink-2">
                  {result.recommendation}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-accent-2 decoration-1 underline-offset-[0.2em]"
                  href="#overview-map"
                >
                  View on the segment map
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex min-h-full flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-ink">How the model decides</h3>
                <p className="mt-1 max-w-[54ch] text-sm text-muted">
                  Enter an income and a spending score. The model assigns the nearest
                  segment.
                </p>
              </div>

              <dl className="flex flex-col gap-4">
                <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-t border-rule pt-4 max-sm:grid-cols-1 max-sm:gap-1">
                  <dt className="text-xs font-medium text-ink">Inputs</dt>
                  <dd className="text-sm leading-normal text-muted">
                    Annual income and spending score.
                  </dd>
                </div>
                <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-t border-rule pt-4 max-sm:grid-cols-1 max-sm:gap-1">
                  <dt className="text-xs font-medium text-ink">Scaling</dt>
                  <dd className="text-sm leading-normal text-muted">
                    Both values are standardized with the training mean and scale.
                  </dd>
                </div>
                <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-t border-rule pt-4 max-sm:grid-cols-1 max-sm:gap-1">
                  <dt className="text-xs font-medium text-ink">Assignment</dt>
                  <dd className="text-sm leading-normal text-muted">
                    The nearest of five centroids becomes the segment.
                  </dd>
                </div>
              </dl>

              <p className="text-xs text-muted">
                Trained with k = 5 on the Mall Customers dataset.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
