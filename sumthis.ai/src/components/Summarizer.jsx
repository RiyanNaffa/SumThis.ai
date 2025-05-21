import ReactMarkdown from "react-markdown";

const DEEPSEEK_V3_0324_FREE = "deepseek/deepseek-chat-v3-0324:free";
const DEEPSEEK_R1T_FREE = "tngtech/deepseek-r1t-chimera:free";
const QWEN3_235B_A22B_FREE = "qwen/qwen3-235b-a22b:free";
const GEMINI_2_0_FLASH_EXP_FREE = "google/gemini-2.0-flash-exp:free";

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
}) => {
  return (
    <>
    {/* Layout: Model + From/To */}
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Kiri: Model (50%) */}
        <div className="sm:w-1/2 w-full">
            <p className="mb-2 font-bold">Model:</p>
            <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            >
            <option value={DEEPSEEK_V3_0324_FREE}>DeepSeek V3 0324</option>
            <option value={DEEPSEEK_R1T_FREE}>DeepSeek R1T Chimera (TNG Tech)</option>
            <option value={QWEN3_235B_A22B_FREE}>Qwen 3 235B A22B</option>
            <option value={GEMINI_2_0_FLASH_EXP_FREE}>Gemini 2.0 Flash Exp</option>
            </select>
        </div>

        {/* Kanan: From & To (masing-masing 50% dari bagian kanan) */}
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
        </div>
    </div>


    {/* Full-width textarea */}
    <div className="mb-4">
        <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"    
            rows="20"
            cols="150"
            placeholder="Your text here..."
        ></textarea>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
            onClick={handleSummarize}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
        SumThis!
        </button>
        <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
        Reset
        </button>
    </div>

    {/* Output */}
    <div className="text-gray-700">
        {summary ? (
            <ReactMarkdown>{summary}</ReactMarkdown>
        ) : loading ? (
            <div className="flex items-center justify-center py-4">
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
  { value: "Indonesian", label: "Indonesian" },
  { value: "Malay", label: "Malay" },
  { value: "Tagalog", label: "Tagalog" },
  { value: "Vietnamese", label: "Tiếng Việt" },
  { value: "Thai", label: "ภาษาไทย" },
  { value: "Filipino", label: "Filipino" },
  { value: "Hindi", label: "हिन्दी" },
  { value: "English", label: "English" },
  { value: "French", label: "Français" },
  { value: "German", label: "Deutsch" },
  { value: "Spanish", label: "Español" },
  { value: "Portuguese", label: "Português" },
  { value: "Italian", label: "Italiano" },
  { value: "Han (Chinese)", label: "中文" },
  { value: "Japanese", label: "日本語" },
  { value: "Korean", label: "한국어" },
  { value: "Russian", label: "Русский" },
  { value: "Arabic", label: "العربية" },
  { value: "Turkish", label: "Türkçe" },
  { value: "Polish", label: "Polski" },
  { value: "Dutch", label: "Nederlands" },
  { value: "Swedish", label: "Svenska" },
  { value: "Danish", label: "Dansk" },
  { value: "Finnish", label: "Suomi" },
  { value: "Norwegian", label: "Norsk" },
];

export default Summarizer;