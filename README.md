# CustomerIQ — Customer Segmentation Dashboard

An interactive machine learning application that uses **K-Means Clustering** to segment customers based on their annual income and spending score. CustomerIQ transforms customer data into meaningful business insights through an interactive React dashboard.

<p align="center">
  <a href="https://shreyansh-soumya.github.io/CustomerIQ/">
    <strong>🚀 Live Demo</strong>
  </a>
</p>

---

## 📌 Project Overview

Understanding customer behaviour is essential for businesses to make informed marketing, sales, and customer engagement decisions.

CustomerIQ applies unsupervised machine learning to group customers with similar characteristics into distinct segments.

The model uses two primary features:

- **Annual Income (k$)**
- **Spending Score (1–100)**

The trained K-Means model is integrated into a React application, allowing users to enter customer information and instantly discover the predicted customer segment.

## ✨ Key Features

- **Customer Segmentation:** Groups customers into five distinct clusters using K-Means.
- **Interactive Dashboard:** Displays customer statistics and cluster distributions.
- **Customer Prediction:** Predicts the segment of a new customer using annual income and spending score.
- **Visual Analytics:** Displays customer segment distributions through interactive charts.
- **Segment Insights:** Provides segment characteristics and business-oriented recommendations.
- **Machine Learning Integration:** Connects a Python-trained model with a React frontend using JSON model parameters.
- **Live Deployment:** Hosted on GitHub Pages.

## 🧠 Machine Learning Methodology

CustomerIQ uses the **K-Means Clustering Algorithm**, an unsupervised learning technique that groups data points based on their similarity.

### Machine Learning Workflow

1. **Data Collection:** Load the Mall Customers dataset.
2. **Data Exploration:** Explore customer demographics, annual income, and spending scores.
3. **Feature Selection:** Select Annual Income and Spending Score for clustering.
4. **Feature Scaling:** Standardize the selected features using `StandardScaler`.
5. **Model Training:** Train a K-Means model with five clusters.
6. **Model Evaluation:** Evaluate clustering quality using the Silhouette Score.
7. **Model Export:** Export trained centroids and scaling parameters into JSON.
8. **Frontend Integration:** Use the exported model parameters in the React application to predict customer segments.

### Model Configuration

| Parameter | Value |
|---|---|
| Algorithm | K-Means Clustering |
| Number of Clusters (K) | 5 |
| Initialization Method | K-Means++ |
| Random State | 42 |
| Number of Initializations | 10 |
| Feature Scaling | StandardScaler |
| Evaluation Metric | Silhouette Score |
| Silhouette Score | **0.5547** |

The Silhouette Score measures how well-separated the resulting clusters are. A score of 0.5547 indicates reasonably well-defined customer groups.

## 📊 Customer Segments

The trained model identifies five distinct customer segments.

| Cluster | Customer Segment | Avg. Income (k$) | Avg. Spending Score |
|---|---|---:|---:|
| 0 | Standard Customers | 55.30 | 49.52 |
| 1 | Premium Customers | 86.54 | 82.13 |
| 2 | High-Potential Customers | 25.73 | 79.36 |
| 3 | Conservative Customers | 88.20 | 17.11 |
| 4 | Budget-Conscious Customers | 26.30 | 20.91 |

### Business Interpretation

- **Standard Customers:** Customers with moderate income and spending behaviour.
- **Premium Customers:** High-income customers with high spending scores who may respond well to premium offers and loyalty programs.
- **High-Potential Customers:** Customers with relatively lower income but high spending scores who may respond to personalized engagement.
- **Conservative Customers:** High-income customers with lower spending scores who may benefit from targeted promotions.
- **Budget-Conscious Customers:** Customers with lower income and lower spending scores who may respond to affordable offers and discounts.

## 🛠️ Technology Stack

### Machine Learning

- Python
- Pandas
- NumPy
- Matplotlib
- Scikit-learn
- Google Colab

### Frontend Development

- React
- JavaScript
- Vite
- CSS
- Recharts
- Lucide React

### Tools and Deployment

- Git
- GitHub
- GitHub Pages
- VS Code

## 📁 Project Structure

```text
CustomerIQ/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── ml/
│   ├── CustomerIQ_KMeans_Implementation.ipynb
│   ├── Mall_Customers.csv
│   ├── model.json
│   └── cluster_stats.json
│
├── frontend/
│   ├── public/
│   │   ├── model.json
│   │   └── cluster_stats.json
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── ClusterChart.jsx
│   │   │   ├── ClusterDetails.jsx
│   │   │   └── CustomerForm.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── predict.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

Follow these instructions to run CustomerIQ locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Shreyansh-Soumya/CustomerIQ.git
```

### 2. Navigate to the Frontend Directory

```bash
cd CustomerIQ/frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `frontend/dist` directory.

## 📚 Dataset

This project uses the **Mall Customers Dataset**, which contains customer information such as:

- Customer ID
- Gender
- Age
- Annual Income
- Spending Score

**Dataset Source:** [Mall Customers Dataset — GitHub](https://github.com/tirthajyoti/Machine-Learning-with-Python/blob/master/Datasets/Mall_Customers.csv)

The dataset contains 200 customer records.

## 🔮 Future Improvements

Some planned enhancements include:

- Adding more customer attributes for richer segmentation.
- Comparing K-Means with other clustering algorithms.
- Supporting customer dataset uploads.
- Adding more advanced customer analytics and visualizations.
- Exploring automated marketing recommendations for different customer segments.

## 👥 Team Members

CustomerIQ was collaboratively developed by the following team members:

1. **Arhan Abdullah**
2. **Nayab Nasim**
3. **Soumalya Roy**
4. **Shreyansh Soumya**
5. **Ashish Kumar**

## 🔗 Project Links

- **Live Application:** [CustomerIQ Dashboard](https://shreyansh-soumya.github.io/CustomerIQ/)
- **GitHub Repository:** [Shreyansh-Soumya/CustomerIQ](https://github.com/Shreyansh-Soumya/CustomerIQ)

---

<p align="center">
  <strong>CustomerIQ</strong>
  <br/>
  Turning Customer Data into Meaningful Business Insights.
  <br/><br/>
  Built with ❤️ by Team CustomerIQ.
</p>
