export default function StatLedger({ data }) {
  const items = [
    {
      label: "Total customers",
      value: data.total_customers,
      note: "Customers analyzed",
    },
    {
      label: "Customer segments",
      value: data.number_of_clusters,
      note: "K-Means clusters",
    },
    {
      label: "Silhouette score",
      value: Number(data.silhouette_score).toFixed(4),
      note: "Model quality indicator",
    },
    {
      label: "ML algorithm",
      value: "K-Means",
      note: "Unsupervised learning",
      word: true,
    },
  ];

  return (
    <dl
      className="grid grid-cols-4 gap-px overflow-hidden rounded-card border border-rule bg-rule shadow-card max-lg:grid-cols-2 max-sm:grid-cols-1"
      aria-label="Dataset at a glance"
    >
      {items.map((item) => (
        <div className="flex flex-col gap-2 bg-cotton p-6" key={item.label}>
          <dt className="text-xs font-medium text-muted">{item.label}</dt>
          <dd
            className={
              item.word
                ? "font-display text-xl font-semibold tracking-[-0.02em] text-ink"
                : "font-mono text-2xl font-normal leading-none tracking-[-0.03em] text-ink tabular-nums"
            }
          >
            {item.value}
          </dd>
          <dd className="text-xs text-muted">{item.note}</dd>
        </div>
      ))}
    </dl>
  );
}
