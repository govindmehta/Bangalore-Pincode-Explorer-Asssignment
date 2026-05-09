export default function ResultCard({ item, mode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-md shadow-slate-950/40">
      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
      <div className="mt-3 space-y-1 text-sm text-slate-200">
        {mode === "area" && (
          <p>
            <span className="text-slate-400">Pincode:</span> {item.pincode}
          </p>
        )}
        <p>
          <span className="text-slate-400">District:</span> {item.district}
        </p>
        <p>
          <span className="text-slate-400">State:</span> {item.state}
        </p>
        {mode === "pincode" && (
          <p>
            <span className="text-slate-400">Delivery:</span> {item.deliveryStatus}
          </p>
        )}
      </div>
    </div>
  );
}
