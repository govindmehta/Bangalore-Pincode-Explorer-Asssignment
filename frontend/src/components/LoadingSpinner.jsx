export default function LoadingSpinner({ label }) {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-slate-200">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      {label}
    </div>
  );
}
