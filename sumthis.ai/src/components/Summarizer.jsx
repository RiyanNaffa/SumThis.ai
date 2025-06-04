import ReactMarkdown from "react-markdown";

// Model options arrays
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
        label: "Pegasus XSum",
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
  url,
  setUrl,
  isDark
}) => {

  return (
    <>
      {/* Layout: Model + From + To + Max Words */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Left: Model (50% width) */}
        <div className="sm:w-1/2 w-full">
            <p className={`mb-2 font-bold ${isDark ? 'text-[#ffef73]' : 'text-[#020202]'}`}>Model:</p>
            <select
                value={model.value}
                onChange={e => {
                    const selected = MODEL_OPTIONS.find(opt => opt.value === e.target.value);
                    setModel(selected);
                    // console.log("Model changed to:", selected);
                }}
                className={`w-full p-2 border rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6ca494] ${
                    isDark 
                        ? 'bg-[#020202] text-[#fdfefd] border-[#a1a978] hover:bg-[#1a1a1a]' 
                        : 'bg-[#fdfefd] text-[#020202] border-[#6ca494] hover:bg-[#f8f8ef]'
                }`}
            >
                {MODEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        {/* From + To + Max Words (flex col) */}
        <div className="sm:w-1/2 w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <p className={`mb-2 font-bold ${isDark ? 'text-[#ffef73]' : 'text-[#020202]'}`}>
              From:
            </p>
            <select
              value={inputLang}
              onChange={(e) => setInputLang(e.target.value)}
              className={`w-full p-2 border rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6ca494] ${
                isDark 
                    ? 'bg-[#020202] text-[#fdfefd] border-[#a1a978] hover:bg-[#1a1a1a]' 
                    : 'bg-[#fdfefd] text-[#020202] border-[#6ca494] hover:bg-[#f8f8ef]'
              }`}
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <p className={`mb-2 font-bold ${isDark ? 'text-[#ffef73]' : 'text-[#020202]'}`}>
              To:
            </p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full p-2 border rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6ca494] ${
                isDark 
                    ? 'bg-[#020202] text-[#fdfefd] border-[#a1a978] hover:bg-[#1a1a1a]' 
                    : 'bg-[#fdfefd] text-[#020202] border-[#6ca494] hover:bg-[#f8f8ef]'
              }`}
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <p className={`mb-2 font-bold ${isDark ? 'text-[#ffef73]' : 'text-[#020202]'}`}>
              Max words:
            </p>
            <input
              type="number"
              min="1"
              max="1000"
              step="1"
              placeholder="100"
              value={maxSummaryLength}
              onChange={(e) => setMaxSummaryLength(e.target.value)}
              className={`w-full p-2 border rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6ca494] ${
                isDark 
                    ? 'bg-[#020202] text-[#fdfefd] border-[#a1a978] placeholder-[#a1a978] hover:bg-[#1a1a1a]' 
                    : 'bg-[#fdfefd] text-[#020202] border-[#6ca494] placeholder-[#6ca494] hover:bg-[#f8f8ef]'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Input text area (input text & URL) */}
      <div className="mb-4">

        {/* Input Text textarea */}
        <textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);

            // Auto-resize height logic
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
          className={`w-full p-4 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6ca494] ${
            isDark 
                ? 'bg-[#020202] text-[#fdfefd] border-[#a1a978] placeholder-[#a1a978]' 
                : 'bg-[#fdfefd] text-[#020202] border-[#6ca494] placeholder-[#6ca494]'
          }`}
          placeholder="Your input text here..."
          style={{ minHeight: "120px", resize: "none", overflow: "hidden" }}
        ></textarea>

        {/* URL textarea */}
        <textarea
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            
            // Auto-resize logic
            const url = e.target;
            url.style.height = "auto";
            url.style.height = url.scrollHeight + "px";
          }}
          ref={el => {
            if (el) {
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }
          }}
          className={`w-full p-4 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6ca494] ${
            isDark 
                ? 'bg-[#020202] text-[#fdfefd] border-[#a1a978] placeholder-[#a1a978]' 
                : 'bg-[#fdfefd] text-[#020202] border-[#6ca494] placeholder-[#6ca494]'
          }`}
          placeholder="...or your URL here"
          style={{ minHeight: "30px", resize: "none", overflow: "hidden" }}>
        </textarea>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          onClick={handleSummarize}
          className={`px-6 py-2 rounded transition-all duration-300 font-semibold ${
            isDark 
                ? 'bg-[#6ca494] text-[#020202] hover:bg-[#a4e2cd] disabled:bg-[#a1a978] disabled:text-[#fdfefd]' 
                : 'bg-[#6ca494] text-[#fdfefd] hover:bg-[#a4e2cd] hover:text-[#020202] disabled:bg-[#a1a978] disabled:text-[#fdfefd]'
          }`}
          disabled={loading}
        >
          {loading ? "Summing up..." : "SumThis!"}
        </button>
        <button
          onClick={handleReset}
          className={`px-6 py-2 rounded transition-all duration-300 font-semibold ${
            isDark 
                ? 'bg-[#e3bb74] text-[#020202] hover:bg-[#ffef73] disabled:bg-[#a1a978] disabled:text-[#fdfefd]' 
                : 'bg-[#e3bb74] text-[#020202] hover:bg-[#ffef73] disabled:bg-[#a1a978] disabled:text-[#fdfefd]'
          }`}
          disabled={loading}
        >
          Reset
        </button>
      </div>

      {/* Output */}
      <div className={`w-full transition-colors duration-300 ${isDark ? 'text-[#fdfefd]' : 'text-[#020202]'}`}>
        {summary ? (
          <div className={`p-4 rounded-lg border ${
            isDark 
                ? 'bg-[#1a1a1a] border-[#a1a978]' 
                : 'bg-[#f8f8ef] border-[#6ca494]'
          }`}>
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-[#ffef73]' : 'text-[#6ca494]'}`} {...props} />,
                h2: ({node, ...props}) => <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-[#e3bb74]' : 'text-[#6ca494]'}`} {...props} />,
                h3: ({node, ...props}) => <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-[#a4e2cd]' : 'text-[#6ca494]'}`} {...props} />,
                strong: ({node, ...props}) => <strong className={`font-bold ${isDark ? 'text-[#ffef73]' : 'text-[#6ca494]'}`} {...props} />,
                em: ({node, ...props}) => <em className={`italic ${isDark ? 'text-[#e3bb74]' : 'text-[#6ca494]'}`} {...props} />,
                p: ({node, ...props}) => <p className="mb-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
              }}
            >
              {summary}
            </ReactMarkdown>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-8 w-full">
            <div className={`w-8 h-8 border-4 border-t-transparent rounded-full animate-spin ${
              isDark ? 'border-[#6ca494]' : 'border-[#6ca494]'
            }`}></div>
            <span className="ml-3 font-medium">Summing up...</span>
          </div>
        ) : (
          <div className={`text-center py-8 ${isDark ? 'text-[#a1a978]' : 'text-[#6ca494]'}`}>
            Summed up text will show here.
          </div>
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