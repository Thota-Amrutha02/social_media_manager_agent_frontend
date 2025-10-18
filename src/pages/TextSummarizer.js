import { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";

export function TextSummarizer() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = () => {
    if (!inputText.trim()) {
      alert("Please enter some text to summarize.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const words = inputText.split(" ");
      const summaryLength = Math.max(20, Math.floor(words.length * 0.3));
      const mockSummary = words.slice(0, summaryLength).join(" ") + "...";
      setSummary(mockSummary);
      setIsLoading(false);
      alert("Summary generated!");
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    alert("Summary copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Text Summarizer
        </h1>
        <p className="text-gray-500">
          Transform long content into concise summaries instantly
        </p>
      </div>

      {/* Input Card */}
      <div className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md">
        <div className="mb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="w-5 h-5 text-pink-500" />
            Enter Your Text
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Paste or type the text you want to summarize
          </p>
        </div>
        <textarea
          placeholder="Paste your article, blog post, or any long text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full min-h-[200px] p-3 rounded-xl border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {inputText.split(" ").filter(w => w).length} words
          </span>
          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-white font-semibold hover:opacity-90 transition"
          >
            {isLoading ? "Summarizing..." : "Summarize"}
          </button>
        </div>
      </div>

      {/* Summary Card */}
      {summary && (
        <div className="p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="w-5 h-5 text-pink-500" />
              Summary
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
            >
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}
export default TextSummarizer;