import { useState } from "react";
import { searchByArea, searchByPincode } from "./api.js";
import TabButton from "./components/TabButton.jsx";
import SearchForm from "./components/SearchForm.jsx";
import ResultCard from "./components/ResultCard.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";

const tabs = [
  {
    key: "pincode",
    label: "Search by Pincode",
    placeholder: "Enter a 6-digit Bangalore pincode",
    buttonLabel: "Search Pincode"
  },
  {
    key: "area",
    label: "Search by Area",
    placeholder: "Enter a Bangalore area or post office name",
    buttonLabel: "Search Area"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("pincode");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentTab = tabs.find((tab) => tab.key === activeTab);

  const handleSearch = async () => {
    setError("");
    setResults([]);

    if (activeTab === "pincode" && !/^\d{6}$/.test(query.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    if (activeTab === "area" && query.trim().length < 3) {
      setError("Please enter at least 3 characters.");
      return;
    }

    setLoading(true);

    try {
      const data =
        activeTab === "pincode"
          ? await searchByPincode(query.trim())
          : await searchByArea(query.trim());
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-200">
            Bangalore Pincode Explorer
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Find pincodes and post offices in seconds
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            Use a Bangalore pincode or area name to fetch official India Post details. Results are
            displayed in clean, readable cards.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/60 sm:p-8">
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                label={tab.label}
                isActive={tab.key === activeTab}
                onClick={() => {
                  setActiveTab(tab.key);
                  setQuery("");
                  setResults([]);
                  setError("");
                }}
              />
            ))}
          </div>

          <div className="mt-6">
            <SearchForm
              value={query}
              placeholder={currentTab.placeholder}
              buttonLabel={currentTab.buttonLabel}
              onChange={setQuery}
              onSubmit={handleSearch}
            />

            {loading && (
              <div className="mt-6">
                <LoadingSpinner label="Fetching results" />
              </div>
            )}

            {!loading && error && (
              <div className="mt-6">
                <ErrorMessage message={error} />
              </div>
            )}

            {!loading && !error && results.length === 0 && (
              <p className="mt-6 text-center text-sm text-slate-400">
                Enter a query to see results.
              </p>
            )}

            {!loading && results.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {results.map((item, index) => (
                  <ResultCard key={`${item.name}-${index}`} item={item} mode={activeTab} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
