export function datasetAverages(clusters) {
  const total = clusters.reduce((sum, cluster) => sum + cluster.customer_count, 0);

  if (!total) {
    return { total: 0, income: 0, spending: 0 };
  }

  return {
    total,
    income: clusters.reduce((sum, cluster) => sum + cluster.avg_income * cluster.customer_count, 0) / total,
    spending: clusters.reduce((sum, cluster) => sum + cluster.avg_spending * cluster.customer_count, 0) / total,
  };
}

export function shortName(name) {
  return name.replace(/ Customers$/, "");
}

export function formatIncome(value) {
  return `$${Number(value).toFixed(1)}k`;
}

export function formatScore(value) {
  return Number(value).toFixed(1);
}

export function scalePercent(value, max) {
  if (!max) return 0;
  const percent = (Number(value) / max) * 100;
  return Math.min(100, Math.max(0, Number(percent.toFixed(2))));
}
