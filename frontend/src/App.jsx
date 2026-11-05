import { useEffect, useState } from "react";
import { predictCluster } from "./utils/predict";

function App() {

  const [model, setModel] = useState(null);

  const [income, setIncome] = useState(50);
  const [spending, setSpending] = useState(50);

  const [prediction, setPrediction] = useState(null);

  useEffect(() => {

    fetch(`${import.meta.env.BASE_URL}model.json`)
      .then(res => res.json())
      .then(data => setModel(data))
      .catch(error => console.error(error));

  }, []);

  function handlePrediction(e) {

    e.preventDefault();

    if (!model) return;

    const result = predictCluster(
      Number(income),
      Number(spending),
      model
    );

    setPrediction(result);

  }

  if (!model) {
    return <h2>Loading Machine Learning Model...</h2>;
  }

  return (

    <div className="min-h-screen p-8">

      <header className="mb-10">

        <h1 className="text-4xl font-bold">
          CustomerIQ
        </h1>

        <p className="text-gray-400 mt-2">
          AI-powered Customer Segmentation Platform
        </p>

      </header>

      <div className="grid md:grid-cols-2 gap-8">

        <section className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-2xl font-semibold mb-6">
            Customer Prediction
          </h2>

          <form onSubmit={handlePrediction}>

            <label>Annual Income (in thousands)</label>

            <input
              type="number"
              min="0"
              value={income}
              onChange={e => setIncome(e.target.value)}
              className="w-full p-3 mt-2 mb-6 rounded bg-slate-700"
              required
            />

            <label>Spending Score (1-100)</label>

            <input
              type="number"
              min="1"
              max="100"
              value={spending}
              onChange={e => setSpending(e.target.value)}
              className="w-full p-3 mt-2 mb-6 rounded bg-slate-700"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg w-full"
            >
              Predict Customer Segment
            </button>

          </form>

        </section>

        <section className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-2xl font-semibold mb-6">
            Prediction Result
          </h2>

          {prediction !== null ? (

            <div>

              <p className="text-gray-400">
                Assigned Cluster
              </p>

              <h1 className="text-6xl font-bold text-green-400 mt-4">
                {prediction + 1}
              </h1>

              <p className="mt-4 text-gray-300">
                This customer belongs to Cluster {prediction + 1}.
              </p>

            </div>

          ) : (

            <p className="text-gray-400">
              Enter customer details to see the predicted segment.
            </p>

          )}

        </section>

      </div>

    </div>

  );
}

export default App;