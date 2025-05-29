import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Summarizer from "../Summarizer";
import History from "../History";
import Footer from "../Footer";

const Home = () => {
    const [isDark, setIsDark] = useState(() => {
        try {
            const storedTheme = localStorage.getItem("isDark");
            return storedTheme ? JSON.parse(storedTheme) : false;
        } catch {
            return false;
        }
    });
    const [inputText, setInputText] = useState("");
    const [summary, setSummary] = useState("");
    const [inputHistory, setInputHistory] = useState([]);
    const [summaryHistory, setSummaryHistory] = useState([]);
    const [urlHistory, setUrlHistory] = useState([]);
    const [model, setModel] = useState({
        value: "deepseek/deepseek-chat-v3-0324:free",
        label: "DeepSeek V3 0324",
        api: "openrouter"
    });
    const [loading, setLoading] = useState(false);
    const [inputLang, setInputLang] = useState("English");
    const [language, setLanguage] = useState("English");
    const [maxSummaryLength, setMaxSummaryLength] = useState(50);
    const [url, setUrl] = useState("");

    const navigate = useNavigate();

    // Load history from localStorage when component first mounts
    useEffect(() => {
        const storedInputHistory = localStorage.getItem("inputHistory");
        const storedSummaryHistory = localStorage.getItem("summaryHistory");
        const storedUrlHistory = localStorage.getItem("urlHistory");
        const storedTheme = localStorage.getItem("isDark");
        
        console.log("Get from local storage:", storedInputHistory, storedSummaryHistory, storedUrlHistory, storedTheme);

        let inputHistoryArr = [];
        let summaryHistoryArr = [];
        let urlHistoryArr = [];

        try {
            if (storedInputHistory) inputHistoryArr = JSON.parse(storedInputHistory);
            if (storedSummaryHistory) summaryHistoryArr = JSON.parse(storedSummaryHistory);
            if (storedUrlHistory) urlHistoryArr = JSON.parse(storedUrlHistory);
            console.log("Is Dark:", storedTheme);
            if (storedTheme) setIsDark(JSON.parse(storedTheme));
        } catch (_) {
            // If parsing fails, fallback to empty array
            inputHistoryArr = [];
            summaryHistoryArr = [];
            urlHistoryArr = [];
            setIsDark(false);
        }

        setInputHistory(Array.isArray(inputHistoryArr) ? inputHistoryArr.slice(-5) : []);
        setSummaryHistory(Array.isArray(summaryHistoryArr) ? summaryHistoryArr.slice(-5) : []);
        setUrlHistory(Array.isArray(urlHistoryArr) ? urlHistoryArr.slice(-5) : []);
        console.log("After parsing:", inputHistory, summaryHistory, urlHistory);
    }, []);

    // Save theme preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("isDark", JSON.stringify(isDark));
    }, [isDark]);

    // Handle input text summarizer
    const handleSummarize = async () => {
        if (maxSummaryLength > 1000) {
            alert("Maximum summary length exceeded! (Max. 1000 words)")
            return;
        }
        if (inputText.trim() === "") {
            if (url.trim() === "") {
                alert("Please enter text or a URL to summarize.");
                return;
            }
            // Handle URL here if input text empty, but not URL
            await handleUrl();
            return; // Prevent double summarization
        }

        setSummary("");
        setLoading(true);

        try {
            // Summarize inputText using /api/summarizer
            const response = await fetch("/api/summarize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputText: inputText,
                    inputLang: inputLang,
                    language: language,
                    maxSummaryLength: maxSummaryLength,
                    model: model?.value || "deepseek/deepseek-chat-v3-0324:free",
                    api: model?.api || "openrouter",
                    inputHistory: inputHistory,
                    summaryHistory: summaryHistory,
                }),
            });

            console.log("Sent request with body:", {
                inputText: inputText,
                inputLang: inputLang,
                language: language,
                maxSummaryLength: maxSummaryLength,
                model: model.value,
                api: model.api,
                inputHistory: inputHistory,
                summaryHistory: summaryHistory,
            });

            // Set the data fetched
            const data = await response.json();
            setSummary(data.summary || "");
            setUrl("");
            setInputHistory(Array.isArray(data.inputHistory) ? data.inputHistory : []);
            setSummaryHistory(Array.isArray(data.summaryHistory) ? data.summaryHistory : []);
            const newUrlHistory = [...urlHistory, url].slice(-5);
            setUrlHistory(newUrlHistory);
            localStorage.setItem("inputHistory", JSON.stringify(Array.isArray(data.inputHistory) ? data.inputHistory : []));
            localStorage.setItem("summaryHistory", JSON.stringify(Array.isArray(data.summaryHistory) ? data.summaryHistory : []));
            localStorage.setItem("urlHistory", JSON.stringify(newUrlHistory));
        } catch (error) {
            console.error("Failed to summarize:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle URL input summarizer
    const handleUrl = async () => {
        if (maxSummaryLength > 1000) {
            alert("Maximum summary length exceeded! (Max. 1000 words)")
            return;
        }
        if (url.trim() === "") return;
        setLoading(true);
        try {
            // Fetch from api/getUrlContent
            const response = await fetch(`/api/getUrlContent?url=${encodeURIComponent(url)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.error || "Failed to fetch URL content.");
                setLoading(false);
                return;
            }
            const urlContent = data.content || "";

            // Summarize using /api/summarize
            const summarizeResponse = await fetch("/api/summarize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputText: urlContent,
                    inputLang: inputLang,
                    language: language,
                    maxSummaryLength: maxSummaryLength,
                    model: model?.value || "deepseek/deepseek-chat-v3-0324:free",
                    api: model?.api || "openrouter",
                    inputHistory: inputHistory,
                    summaryHistory: summaryHistory,
                }),
            });

            // Set the data
            const summarizeData = await summarizeResponse.json();
            setSummary(summarizeData.summary || "");
            setInputHistory(Array.isArray(summarizeData.inputHistory) ? summarizeData.inputHistory : []);
            setSummaryHistory(Array.isArray(summarizeData.summaryHistory) ? summarizeData.summaryHistory : []);
            const newUrlHistory = [...urlHistory, url].slice(-5);
            setUrlHistory(newUrlHistory);
            localStorage.setItem("inputHistory", JSON.stringify(Array.isArray(summarizeData.inputHistory) ? summarizeData.inputHistory : []));
            localStorage.setItem("summaryHistory", JSON.stringify(Array.isArray(summarizeData.summaryHistory) ? summarizeData.summaryHistory : []));
            localStorage.setItem("urlHistory", JSON.stringify(newUrlHistory));
            setUrl("");
            setInputText("");
        } catch (error) {
            console.error("Failed to summarize URL content:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle reset
    const handleReset = () => {
        setInputText("");
        setSummary("");
    };

    // Handle delete
    const handleDelete = (index) => {
        const newInputHistory = inputHistory.filter((_, i) => i !== index);
        const newSummaryHistory = summaryHistory.filter((_, i) => i !== index);
        const newUrlHistory = urlHistory.filter((_, i) => i !== index);
        setInputHistory(newInputHistory);
        setSummaryHistory(newSummaryHistory);
        setUrlHistory(newUrlHistory);
        localStorage.setItem("inputHistory", JSON.stringify(newInputHistory));
        localStorage.setItem("summaryHistory", JSON.stringify(newSummaryHistory));
        localStorage.setItem("urlHistory", JSON.stringify(newUrlHistory));
    };

    // Handle PDF preview page
    const handlePdf = (index) => {
        const inputArr = JSON.parse(localStorage.getItem("inputHistory") || "[]");
        const summaryArr = JSON.parse(localStorage.getItem("summaryHistory") || "[]");
        const urlArr = JSON.parse(localStorage.getItem("urlHistory") || "[]");
        navigate("/pdf-preview", {
            state: {
                inputText: inputArr[index] || "",
                url: urlArr[index] || "",
                summary: summaryArr[index] || "",
                isDark: isDark
            }
        });
    }

    return (
        <>
            <div className={`flex flex-col w-[100vw] font-sans min-h-[100vh] transition-colors duration-300 ${
                isDark ? 'bg-[#020202]' : 'bg-[#fdfefd]'
            }`}>
                <Header isDark={isDark} setIsDark={setIsDark} />
                <main className="w-full max-w-none mx-auto p-4 pb-0 flex-1">
                    <Summarizer
                        inputText={inputText}
                        setInputText={setInputText}
                        summary={summary}
                        handleSummarize={handleSummarize}
                        handleReset={handleReset}
                        inputLang={inputLang}
                        setInputLang={setInputLang}
                        language={language}
                        setLanguage={setLanguage}
                        model={model}
                        setModel={setModel}
                        loading={loading}
                        maxSummaryLength={maxSummaryLength}
                        setMaxSummaryLength={setMaxSummaryLength}
                        url={url}
                        setUrl={setUrl}
                        isDark={isDark}
                    />
                    <History 
                        history={Array.isArray(summaryHistory) ? summaryHistory.slice(-5) : []} 
                        handleDelete={handleDelete} 
                        handlePdf={handlePdf}
                        isDark={isDark}
                    />
                </main>
                <Footer isDark={isDark} />
            </div>
        </>
    );
}

export default Home;