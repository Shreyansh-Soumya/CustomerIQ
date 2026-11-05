
import { useState } from "react";
import { predictCluster } from "../utils/predict";
import { Sparkles } from "lucide-react";

export default function CustomerForm({ model, clusters }) {
  const [income, setIncome] = useState(60);
  const [spending, setSpending] = useState(50);
  const [prediction, setPrediction] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const clusterId = predictCluster(
      Number(income),
      Number(spending),
      model
    );

    setPrediction(clusters.find((c) => c.id === clusterId));
  }

  return (
    <section id="predict" className="panel prediction-panel">
      <div className="section-heading">
        <div>
          <h3>Customer Segment Predictor</h3>
          <p>Use the trained K-Means model to classify a customer</p>
        </div>
        <Sparkles size={22} />
      </div>

      <form onSubmit={handleSubmit} className="prediction-form">
        <label>
          Annual Income ($k)
          <input
            type="number"
            min="0"
            max="200"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </label>

        <label>
          Spending Score (1–100)
          <input
            type="number"
            min="1"
            max="100"
            value={spending}
            onChange={(e) => setSpending(e.target.value)}
            required
          />
        </label>

        <button type="submit">Predict Customer Segment</button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <span>Predicted customer segment</span>
          <h2>{prediction.name}</h2>
          <p>{prediction.description}</p>
          <strong>Recommended strategy</strong>
          <p>{prediction.recommendation}</p>
        </div>
      )}
    </section>
  );
}
