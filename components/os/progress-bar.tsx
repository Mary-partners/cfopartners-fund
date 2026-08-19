export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10"
    >
      <div
        className="h-full rounded-full bg-accent transition-[width]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
