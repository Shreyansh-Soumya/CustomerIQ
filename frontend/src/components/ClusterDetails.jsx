
import { ArrowUpRight, Users, Wallet, ShoppingBag } from "lucide-react";

export default function ClusterDetails({ clusters }) {
  return (
    <section id="segments" className="segments-section">
      <div className="section-heading">
        <div>
          <h3>Customer Segments</h3>
          <p>Insights and business recommendations for each group</p>
        </div>
      </div>

      <div className="segments-grid">
        {clusters.map((cluster) => (
          <article className="segment-card" key={cluster.id}>
            <div className="segment-card-header">
              <span className="cluster-label">
                CLUSTER {cluster.id}
              </span>
              <ArrowUpRight size={20} />
            </div>

            <h3>{cluster.name}</h3>
            <p className="segment-description">
              {cluster.description}
            </p>

            <div className="segment-metrics">
              <div>
                <Users size={16} />
                <span>{cluster.customer_count} customers</span>
              </div>

              <div>
                <Wallet size={16} />
                <span>Income: ${cluster.avg_income}k</span>
              </div>

              <div>
                <ShoppingBag size={16} />
                <span>Spending: {cluster.avg_spending}/100</span>
              </div>
            </div>

            <div className="recommendation">
              <strong>Business strategy</strong>
              <p>{cluster.recommendation}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
