import ReactMarkdown from "react-markdown";

const MODEL_OPTIONS = [
    {
        value: "deepseek/deepseek-chat-v3-0324:free",
        label: "DeepSeek V3 0324",
        api: "openrouter"
    },
    {
        value: "qwen/qwen3-235b-a22b:free",
        label: "Qwen 3 235B A22B",
        api: "openrouter"
    },
    {
        value: "google/gemini-2.0-flash-exp:free",
        label: "Gemini 2.0 Flash Exp",
        api: "openrouter"
    },
    {
        value: "facebook/bart-large-cnn",
        label: "BART Large CNN",
        api: "huggingface"
    },
    {
        value: "google/pegasus-xsum",
        label: "Google Pegasus XSum",
        api: "huggingface"
    },
    {
        value: "sshleifer/distilbart-cnn-12-6",
        label: "DistilBART CNN",
        api: "huggingface"
    },
    {
        value: "Falconsai/text_summarization",
        label: "Falconsai Text Summarization",
        api: "huggingface"
    }
]

const Summarizer = ({
  inputText,
  setInputText,
  summary,
  handleSummarize,
  handleReset,
  language,
  setLanguage,
  inputLang,
  setInputLang,
  model,
  setModel,
  loading,
  maxSummaryLength,
  setMaxSummaryLength,
}) => {
  // Remove any local summary update logic here, rely on parent/App.jsx for summary and history

  return (
    <>
      {/* Layout: Model + From/To */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Kiri: Model (50%) */}
        <div className="sm:w-1/2 w-full">
            <p className="mb-2 font-bold">Model:</p>
            <select
                value={model.value}
                onChange={e => {
                    const selected = MODEL_OPTIONS.find(opt => opt.value === e.target.value);
                    setModel(selected);
                    console.log("Model changed to:", selected);
                }}
                className="w-full p-2 border border-gray-300 rounded"
            >
                {MODEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        <div className="sm:w-1/2 w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <p className="mb-2 font-bold">From:</p>
            <select
              value={inputLang}
              onChange={(e) => setInputLang(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <p className="mb-2 font-bold">To:</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <p className="mb-2 font-bold">Max words:</p>
            <input
              type="number"
              min="1"
              max="1000"
              step="1"
              placeholder="100"
              value={maxSummaryLength}
              onChange={(e) => setMaxSummaryLength(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Full-width textarea with dynamic height */}
      <div className="mb-4">
        <textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            // Auto-resize logic
            const textarea = e.target;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
          }}
          ref={el => {
            if (el) {
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }
          }}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your input text here..."
          style={{ minHeight: "120px", resize: "none", overflow: "hidden" }}
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          onClick={handleSummarize}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Summing up..." : "SumThis!"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          disabled={loading}
        >
          Reset
        </button>
      </div>

      {/* Output */}
      <div className="text-gray-700 w-full">
        {summary ? (
          <ReactMarkdown>{summary}</ReactMarkdown>
        ) : loading ? (
          <div className="flex items-center justify-center py-4 w-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3">Summing up...</span>
          </div>
        ) : (
          "Summed up text will show here."
        )}
      </div>
    </>
  );
};

// Extracted language list to avoid repetition
const languageOptions = [
    { value: "English", label: "English" },
    { value: "Indonesian", label: "Bahasa Indonesia" },
    { value: "Danish", label: "Dansk" },
    { value: "German", label: "Deutsch" },
    { value: "Spanish", label: "Español" },
    { value: "Filipino", label: "Filipino" },
    { value: "French", label: "Français" },
    { value: "Italian", label: "Italiano" },
    { value: "Malay", label: "Malay" },
    { value: "Dutch", label: "Nederlands" },
    { value: "Norwegian", label: "Norsk" },
    { value: "Polish", label: "Polski" },
    { value: "Portuguese", label: "Português" },
    { value: "Russian", label: "Русский" },
    { value: "Finnish", label: "Suomi" },
    { value: "Swedish", label: "Svenska" },
    { value: "Tagalog", label: "Tagalog" },
    { value: "Vietnamese", label: "Tiếng Việt" },
    { value: "Turkish", label: "Türkçe" },
    { value: "Arabic", label: "العربية" },
    { value: "Han (Chinese)", label: "中文" },
    { value: "Hindi", label: "हिन्दी" },
    { value: "Japanese", label: "日本語" },
    { value: "Korean", label: "한국어" },
    { value: "Thai", label: "ภาษาไทย" },
];

export default Summarizer;