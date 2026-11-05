
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  
  const COLORS = [
    "#818cf8",
    "#34d399",
    "#fbbf24",
    "#f472b6",
    "#38bdf8",
  ];
  
  export default function ClusterChart({ clusters }) {
    const chartData = clusters.map((cluster) => ({
      name: cluster.name,
      value: cluster.customer_count,
    }));
  
    return (
      <section className="panel chart-panel">
        <div className="section-heading">
          <div>
            <h3>Customer Distribution</h3>
            <p>How customers are distributed across segments</p>
          </div>
        </div>
  
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={4}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    );
  }
  