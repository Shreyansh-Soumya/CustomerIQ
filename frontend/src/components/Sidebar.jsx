import { LayoutDashboard, Target, Users, X } from "lucide-react";

import BrandMark from "./BrandMark";

const ITEMS = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "segments", label: "Segments", Icon: Users },
  { id: "predict", label: "Predict customer", Icon: Target },
];

export default function Sidebar({ active, open, inert, onNavigate, onClose }) {
  return (
    <aside
      id="app-sidebar"
      className={`fixed inset-y-0 left-0 z-50 flex w-66 flex-col overflow-y-auto overflow-x-clip border-r border-rule bg-desk px-4 py-6 transition-transform duration-200 ease-out max-lg:w-70 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="CustomerIQ navigation"
      aria-hidden={inert ? "true" : undefined}
      inert={inert ? true : undefined}
    >
      <div className="flex items-center gap-3 px-2 pb-6">
        <BrandMark />
        <div>
          <span className="block text-base font-semibold leading-tight tracking-[-0.01em] text-ink">
            CustomerIQ
          </span>
          <span className="mt-0.5 block text-xs text-muted">Intelligence platform</span>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex size-8 items-center justify-center rounded-input border border-rule-2 text-ink-2 transition-colors duration-200 hover:border-field hover:bg-surface-2 lg:hidden"
          aria-label="Close navigation"
          onClick={onClose}
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-col gap-1" aria-label="Sections">
        <p className="mx-2 mb-1 mt-4 text-xs font-medium text-muted">Workspace</p>
        {ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;

          return (
            <a
              key={id}
              className={`relative flex min-h-9 items-center gap-3 rounded-input px-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-cotton text-ink shadow-[inset_0_0_0_1px_var(--rule)] before:absolute before:left-0 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-[2px] before:bg-accent-2 before:content-['']"
                  : "text-ink-2 hover:bg-ink/5 hover:text-ink"
              }`}
              href={`#${id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={onNavigate}
            >
              <Icon className="size-4 flex-none" size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
