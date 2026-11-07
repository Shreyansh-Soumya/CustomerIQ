import { AlertTriangle } from "lucide-react";

import { buttonPrimaryClass } from "../utils/styles";

export default function ErrorState({ message, onRetry }) {
  return (
    <div
      className="flex max-w-[640px] flex-col gap-4 rounded-card border border-rule bg-cotton p-10 shadow-card"
      role="alert"
    >
      <AlertTriangle className="size-6 text-error" size={24} strokeWidth={1.75} aria-hidden="true" />
      <h2 className="text-lg font-semibold text-ink">Could not load the model data</h2>
      <p className="max-w-[56ch] text-sm text-muted">
        The dashboard reads two static files from the deployment. Check that{" "}
        <code className="font-mono text-[0.92em] text-ink-2">model.json</code> and{" "}
        <code className="font-mono text-[0.92em] text-ink-2">cluster_stats.json</code> are
        present, then try again.
      </p>
      {message && (
        <p className="break-words rounded-input bg-surface-2 p-3 font-mono text-xs text-ink-2">
          {message}
        </p>
      )}
      <div>
        <button
          type="button"
          className={`${buttonPrimaryClass} w-full sm:w-auto`}
          onClick={onRetry}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
