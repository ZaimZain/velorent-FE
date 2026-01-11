// src/components/TailwindTest.tsx

export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="max-w-sm w-full rounded-2xl bg-slate-800 p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2">
          Tailwind is working 🎉
        </h1>

        <p className="text-slate-300 mb-4">
          This component uses only Tailwind utility classes.
        </p>

        <div className="flex gap-3">
          <button className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 text-white font-medium hover:bg-emerald-600 transition">
            Confirm
          </button>

          <button className="flex-1 rounded-lg border border-slate-600 px-4 py-2 text-slate-300 hover:bg-slate-700 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
