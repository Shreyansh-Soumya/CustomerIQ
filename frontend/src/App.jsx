
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import ClusterChart from "./components/ClusterChart";
import ClusterDetails from "./components/ClusterDetails";
import CustomerForm from "./components/CustomerForm";

import "./App.css";

function App() {
  const [model, setModel] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [modelResponse, analyticsResponse] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}model.json`),
          fetch(`${import.meta.env.BASE_URL}cluster_stats.json`),
        ]);

        if (!modelResponse.ok || !analyticsResponse.ok) {
          throw new Error("Unable to load CustomerIQ data.");
        }

        const modelData = await modelResponse.json();
        const analyticsData = await analyticsResponse.json();

        setModel(modelData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    loadData();
  }, []);

  if (error) {
    return <div className="loading-screen">Error: {error}</div>;
  }

  if (!model || !analytics) {
    return <div className="loading-screen">Loading CustomerIQ...</div>;
  }

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content" id="overview">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow">CUSTOMER INTELLIGENCE</span>
            <h1>Analytics Overview</h1>
            <p>
              Understand your customers with machine learning-powered
              segmentation.
            </p>
          </div>

          <div className="model-status">
            <span className="status-dot" />
            Model Operational
          </div>
        </header>

        <StatsCards data={analytics} />

        <div className="dashboard-grid">
          <ClusterChart clusters={analytics.clusters} />

          <CustomerForm
            model={model}
            clusters={analytics.clusters}
          />
        </div>

        <ClusterDetails clusters={analytics.clusters} />

        <footer className="dashboard-footer">
          <span>CustomerIQ · AI-powered Customer Segmentation</span>
          <span>Powered by K-Means Clustering</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
