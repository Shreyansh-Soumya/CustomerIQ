export default function LoadingState() {
  return (
    <div className="flex flex-col gap-10" aria-busy="true" aria-label="Loading CustomerIQ data">
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-card border border-rule bg-rule max-lg:grid-cols-2 max-sm:grid-cols-1">
        {[0, 1, 2, 3].map((item) => (
          <div className="flex flex-col gap-3 bg-cotton p-6" key={item}>
            <span className="block h-3 w-56 max-w-full rounded-input bg-surface-2 motion-safe:animate-pulse" />
            <span className="block h-7 w-[48%] rounded-input bg-surface-2 motion-safe:animate-pulse" />
            <span className="block h-3 w-[72%] rounded-input bg-surface-2 motion-safe:animate-pulse" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] gap-6 max-xl:grid-cols-1">
        <div className="rounded-card border border-rule bg-cotton p-6">
          <span className="block h-3 w-56 max-w-full rounded-input bg-surface-2 motion-safe:animate-pulse" />
          <div className="mt-6 h-80 rounded-input bg-surface-2 motion-safe:animate-pulse" />
        </div>
        <div className="rounded-card border border-rule bg-cotton p-6">
          <span className="block h-3 w-56 max-w-full rounded-input bg-surface-2 motion-safe:animate-pulse" />
          <div className="mt-6 flex flex-col gap-4">
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                className="block h-10 rounded-input bg-surface-2 motion-safe:animate-pulse"
                key={item}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-card border border-rule bg-cotton p-6">
        <span className="block h-3 w-56 max-w-full rounded-input bg-surface-2 motion-safe:animate-pulse" />
        <div className="mt-6 flex flex-col gap-4">
          {[0, 1, 2, 3].map((item) => (
            <span
              className="block h-10 rounded-input bg-surface-2 motion-safe:animate-pulse"
              key={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
