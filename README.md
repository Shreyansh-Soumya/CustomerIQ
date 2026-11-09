<div align="center">
🎯 CustomerIQ
Turning Customer Data into Meaningful Business Insights

An interactive K-Means Clustering dashboard that segments customers by annual income and spending score, built with a Python-trained model and a React frontend.

<br/>

Live Demo

<br/>

Show Image Show Image Show Image Show Image Show Image Show Image Show Image Show Image

</div> <!-- 📸 TIP: Add a screenshot or GIF of the dashboard here for maximum impact: <p align="center"><img src="docs/dashboard.png" alt="CustomerIQ Dashboard" width="90%"/></p> -->
📑 Table of Contents
📌 Overview
✨ Key Features
🧠 Machine Learning Methodology
📊 Customer Segments
🛠️ Tech Stack
📁 Project Structure
🚀 Getting Started
📚 Dataset
🔮 Future Improvements
👥 Team
📌 Overview

Understanding customer behaviour is essential for making smart marketing, sales, and engagement decisions. CustomerIQ applies unsupervised machine learning to group customers with similar characteristics into distinct, actionable segments.

The model clusters customers using two features:

Feature	Description
💰 Annual Income	Customer income in k$
🛍️ Spending Score	A score from 1 to 100

The trained model is integrated directly into a React app, so you can enter a customer's details and instantly discover their predicted segment.

✨ Key Features
	Feature	What it does
🧩	Customer Segmentation	Groups customers into five distinct clusters using K-Means
📈	Interactive Dashboard	Shows customer statistics and cluster distributions
🔮	Customer Prediction	Predicts the segment of a new customer from income and spending score
📊	Visual Analytics	Interactive charts of segment distributions
💡	Segment Insights	Segment characteristics with business-oriented recommendations
🔗	ML ↔ Frontend Bridge	Connects a Python-trained model to React via JSON model parameters
🌐	Live Deployment	Hosted on GitHub Pages
🧠 Machine Learning Methodology

CustomerIQ uses K-Means Clustering, an unsupervised technique that groups data points by similarity.

🔄 Workflow
📥 Data Collection
🔍 Exploration
🎯 Feature Selection
⚖️ Scaling
🤖 K-Means Training
📏 Silhouette Evaluation
📦 JSON Export
⚛️ React Prediction
<details> <summary><b>📋 Step-by-step breakdown</b></summary> <br/>
Data Collection: Load the Mall Customers dataset.
Data Exploration: Explore demographics, annual income, and spending scores.
Feature Selection: Select Annual Income and Spending Score for clustering.
Feature Scaling: Standardize the features using StandardScaler.
Model Training: Train a K-Means model with five clusters.
Model Evaluation: Evaluate clustering quality using the Silhouette Score.
Model Export: Export trained centroids and scaling parameters to JSON.
Frontend Integration: Use the exported parameters in React to predict customer segments.
</details>
⚙️ Model Configuration
Parameter	Value
Algorithm	K-Means Clustering
Number of Clusters (K)	5
Initialization Method	K-Means++
Random State	42
Number of Initializations	10
Feature Scaling	StandardScaler
Evaluation Metric	Silhouette Score
Silhouette Score	0.5547

💬 The Silhouette Score measures how well separated the clusters are. A score of 0.5547 indicates reasonably well-defined customer groups.

📊 Customer Segments

The trained model identifies five distinct customer segments:

Cluster	Segment	Avg. Income (k$)	Avg. Spending Score
0	🟦 Standard Customers	55.30	49.52
1	👑 Premium Customers	86.54	82.13
2	🌱 High-Potential Customers	25.73	79.36
3	🛡️ Conservative Customers	88.20	17.11
4	🏷️ Budget-Conscious Customers	26.30	20.91
💼 Business Interpretation
Segment	Profile	Recommended Approach
🟦 Standard	Moderate income and spending	Maintain engagement with regular offers
👑 Premium	High income, high spending	Premium offers and loyalty programs
🌱 High-Potential	Lower income, high spending	Personalized engagement
🛡️ Conservative	High income, low spending	Targeted promotions
🏷️ Budget-Conscious	Lower income, low spending	Affordable offers and discounts
🛠️ Tech Stack
<table> <tr> <td valign="top" width="33%">

🤖 Machine Learning

Python
Pandas
NumPy
Matplotlib
Scikit-learn
Google Colab
</td> <td valign="top" width="33%">

🎨 Frontend

React
JavaScript
Vite
CSS
Recharts
Lucide React
</td> <td valign="top" width="33%">

🧰 Tools & Deployment

Git
GitHub
GitHub Pages
VS Code
</td> </tr> </table>
📁 Project Structure
text
CustomerIQ/
│
├── 📂 .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Pages deployment
│
├── 📂 ml/
│   ├── CustomerIQ_KMeans_Implementation.ipynb
│   ├── Mall_Customers.csv
│   ├── model.json                      # Exported centroids & scaler
│   └── cluster_stats.json
│
├── 📂 frontend/
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
│   │   │   └── predict.js              # Nearest-centroid prediction
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── 📄 README.md
🚀 Getting Started

Run CustomerIQ locally in a few quick steps.

✅ Prerequisites
Node.js
npm
Git
🔧 Installation
bash
# 1. Clone the repository
git clone https://github.com/Shreyansh-Soumya/CustomerIQ.git

# 2. Navigate to the frontend directory
cd CustomerIQ/frontend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

Then open the local URL shown in your terminal, usually 👉 http://localhost:5173/

📦 Build for Production
bash
npm run build

The production-ready files are generated in frontend/dist.

📚 Dataset

This project uses the Mall Customers Dataset (200 customer records) with these fields:

Customer ID · Gender · Age · Annual Income · Spending Score

🔗 Source: Mall Customers Dataset on GitHub

🔮 Future Improvements
 Add more customer attributes for richer segmentation
 Compare K-Means with other clustering algorithms
 Support customer dataset uploads
 Add more advanced customer analytics and visualizations
 Explore automated marketing recommendations for each segment
👥 Team

CustomerIQ was collaboratively developed by:

<table align="center"> <tr> <td align="center" width="20%"><b>Arhan Abdullah</b></td> <td align="center" width="20%"><b>Nayab Nasim</b></td> <td align="center" width="20%"><b>Soumalya Roy</b></td> <td align="center" width="20%"><b><a href="https://github.com/Shreyansh-Soumya">Shreyansh Soumya</a></b></td> <td align="center" width="20%"><b>Ashish Kumar</b></td> </tr> </table>
<div align="center">
⭐ If you found this project useful, consider giving it a star!

CustomerIQ · Turning Customer Data into Meaningful Business Insights

🚀 Live Demo · 🐛 Report a Bug · 💡 Request a Feature

</div>
