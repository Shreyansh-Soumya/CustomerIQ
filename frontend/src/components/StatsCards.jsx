
import { Users, Layers3, TrendingUp, BrainCircuit } from "lucide-react";

const icons = [Users, Layers3, TrendingUp, BrainCircuit];

export default function StatsCards({ data }) {
  const cards = [
    {
      title: "Total Customers",
      value: data.total_customers,
      subtitle: "Customers analyzed",
    },
    {
      title: "Customer Segments",
      value: data.number_of_clusters,
      subtitle: "K-Means clusters",
    },
    {
      title: "Silhouette Score",
      value: data.silhouette_score,
      subtitle: "Model quality indicator",
    },
    {
      title: "ML Algorithm",
      value: "K-Means",
      subtitle: "Unsupervised learning",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => {
        const Icon = icons[index];

        return (
          <div className="stat-card" key={card.title}>
            <div className="stat-top">
              <span>{card.title}</span>
              <Icon size={21} />
            </div>

            <h2>{card.value}</h2>
            <p>{card.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
