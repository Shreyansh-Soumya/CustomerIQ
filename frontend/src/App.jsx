import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import BrandMark from "./components/BrandMark";
import ClusterDetails from "./components/ClusterDetails";
import CustomerForm from "./components/CustomerForm";
import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import OverviewPanel from "./components/OverviewPanel";
import Sidebar from "./components/Sidebar";
import StatLedger from "./components/StatLedger";
import ThemeToggle from "./components/ThemeToggle";
import { useActiveSection } from "./hooks/useActiveSection";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { badgeClass } from "./utils/styles";

const SECTION_LABELS = {
  overview: "Analytics overview",
  segments: "Customer segments",
  predict: "Predict customer",
};

function App() {
  const [model, setModel] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const menuRef = useRef(null);
  const activeSection = useActiveSection();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setError("");

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

        if (cancelled) return;

        setModel(modelData);
        setAnalytics(analyticsData);
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setError(err.message);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) setNavOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!navOpen || !isMobile) return;

    const firstLink = document.querySelector("#app-sidebar a[href^='#']");
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setNavOpen(false);
      window.setTimeout(() => menuRef.current?.focus({ preventScroll: true }), 0);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen, isMobile]);

  function closeNav(restoreFocus = false) {
    setNavOpen(false);

    if (restoreFocus) {
      window.setTimeout(() => menuRef.current?.focus({ preventScroll: true }), 0);
    }
  }

  function handleNavigate() {
    if (navOpen) closeNav(true);
  }

  function handleRetry() {
    setError("");
    setReloadKey((key) => key + 1);
  }

  const loaded = Boolean(model && analytics && !error);
  const status = error ? "Offline" : loaded ? "Static model" : "Connecting";

  return (
    <div className="min-h-dvh bg-paper">
      {navOpen && isMobile && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-pointer border-0 bg-scrim p-0"
          aria-label="Close navigation"
          onClick={() => closeNav(true)}
        />
      )}

      <Sidebar
        active={activeSection}
        open={navOpen}
        inert={isMobile && !navOpen}
        onNavigate={handleNavigate}
        onClose={() => closeNav(true)}
      />

      <div
        className="flex min-h-dvh flex-col lg:ml-66"
        inert={isMobile && navOpen ? true : undefined}
      >
        <header className="sticky top-0 z-30 flex h-15 items-center justify-between gap-4 border-b border-rule bg-paper px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button
              ref={menuRef}
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-input border border-rule-2 text-ink transition-colors duration-200 hover:border-field hover:bg-surface-2 lg:hidden"
              aria-expanded={navOpen}
              aria-controls="app-sidebar"
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
              onClick={() => (navOpen ? closeNav(true) : setNavOpen(true))}
            >
              {navOpen ? (
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>

            <span className="hidden items-center gap-2 text-sm font-semibold tracking-[-0.01em] text-ink max-lg:inline-flex">
              <BrandMark className="size-6 text-ink" />
              CustomerIQ
            </span>

            <nav
              className="flex min-w-0 items-center gap-2 text-xs text-muted max-lg:hidden"
              aria-label="Breadcrumb"
            >
              <span>Workspace</span>
              <span className="text-rule-2" aria-hidden="true">
                /
              </span>
              <span className="truncate font-medium text-ink">
                {SECTION_LABELS[activeSection]}
              </span>
            </nav>
          </div>

          <div className="flex flex-none items-center gap-2">
            <span className={`${badgeClass} max-sm:hidden`}>{status}</span>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pt-10">
          <section
            id="overview"
            className="flex flex-col gap-8 lg:gap-10"
            aria-labelledby="overview-title"
          >
            <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-4">
              <div className="min-w-0">
                <h1
                  id="overview-title"
                  className="max-w-[20ch] text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
                >
                  Analytics overview
                </h1>
                <p className="mt-3 max-w-[58ch] text-base text-muted">
                  Understand your customers with machine-learning segmentation.
                </p>
              </div>

              {loaded && (
                <div className="flex flex-none flex-col gap-1 border-l border-rule-2 pl-4 text-right max-lg:border-l-0 max-lg:pl-0 max-lg:text-left">
                  <span className="text-xs text-muted">Dataset</span>
                  <span className="text-sm font-medium text-ink">Mall Customers</span>
                  <span className="text-xs tabular-nums text-muted">
                    <span className="font-mono">{analytics.total_customers}</span> rows, 2
                    features
                  </span>
                </div>
              )}
            </div>

            {error ? (
              <ErrorState message={error} onRetry={handleRetry} />
            ) : !loaded ? (
              <LoadingState />
            ) : (
              <>
                <StatLedger data={analytics} />
                <OverviewPanel
                  clusters={analytics.clusters}
                  activeId={activeId}
                  onActive={setActiveId}
                  prediction={prediction}
                />
              </>
            )}
          </section>

          {loaded && (
            <>
              <ClusterDetails clusters={analytics.clusters} activeId={activeId} />
              <CustomerForm
                model={model}
                clusters={analytics.clusters}
                prediction={prediction}
                onPredict={setPrediction}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
