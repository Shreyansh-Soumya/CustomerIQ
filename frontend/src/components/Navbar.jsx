
import { BrainCircuit, LayoutDashboard, Users, Target } from "lucide-react";

export default function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <BrainCircuit size={25} />
        </div>
        <div>
          <h2>CustomerIQ</h2>
          <span>Intelligence Platform</span>
        </div>
      </div>

      <nav className="nav-links">
        <a href="#overview" className="nav-link active">
          <LayoutDashboard size={18} />
          Overview
        </a>

        <a href="#segments" className="nav-link">
          <Users size={18} />
          Segments
        </a>

        <a href="#predict" className="nav-link">
          <Target size={18} />
          Predict Customer
        </a>
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        ML Model Operational
      </div>
    </aside>
  );
}
