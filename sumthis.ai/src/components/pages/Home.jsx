import { useState, useEffect } from "react";
import Header from "../Header";
import Summarizer from "../Summarizer";
import History from "../History";
import Footer from "../Footer";

const Home = () => {

    const [inputText, setInputText] = useState("");
    const [summary, setSummary] = useState("");
    const [inputHistory, setInputHistory] = useState([]);
    const [summaryHistory, setSummaryHistory] = useState([]);
    const [model, setModel] = useState({
        value: "deepseek/deepseek-chat-v3-0324:free",
        label: "DeepSeek V3 0324",
        api: "openrouter"
    });
    const [loading, setLoading] = useState(false);
    const [inputLang, setInputLang] = useState("English");
    const [language, setLanguage] = useState("English");
    const [maxSummaryLength, setMaxSummaryLength] = useState(50);

    // Ambil riwayat dari localStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const storedInputHistory = localStorage.getItem("inputHistory");
        const storedSummaryHistory = localStorage.getItem("summaryHistory");
        console.log("Get from local storage:", storedInputHistory, storedSummaryHistory);

        let inputHistoryArr = [];
        let summaryHistoryArr = [];

        try {
            if (storedInputHistory) inputHistoryArr = JSON.parse(storedInputHistory);
            if (storedSummaryHistory) summaryHistoryArr = JSON.parse(storedSummaryHistory);
        } catch (e) {
            // If parsing fails, fallback to empty array
            inputHistoryArr = [];
            summaryHistoryArr = [];
        }

        setInputHistory(Array.isArray(inputHistoryArr) ? inputHistoryArr.slice(-5) : []);
        setSummaryHistory(Array.isArray(summaryHistoryArr) ? summaryHistoryArr.slice(-5) : []);
        console.log("After parsing:", inputHistory, summaryHistory);
    }, []);

    const handleSummarize = async () => {
        if (inputText.trim() === "") return;

        setSummary("");
        setLoading(true);
        try {
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

            const data = await response.json();
            setSummary(data.summary || "");
            setInputHistory(Array.isArray(data.inputHistory) ? data.inputHistory : []);
            setSummaryHistory(Array.isArray(data.summaryHistory) ? data.summaryHistory : []);
            localStorage.setItem("inputHistory", JSON.stringify(Array.isArray(data.inputHistory) ? data.inputHistory : []));
            localStorage.setItem("summaryHistory", JSON.stringify(Array.isArray(data.summaryHistory) ? data.summaryHistory : []));
        } catch (error) {
            console.error("Failed to summarize:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setInputText("");
        setSummary("");
    };

    const handleDelete = (index) => {
        const newInputHistory = inputHistory.filter((_, i) => i !== index);
        const newSummaryHistory = summaryHistory.filter((_, i) => i !== index);
        setInputHistory(newInputHistory);
        setSummaryHistory(newSummaryHistory);
        localStorage.setItem("inputHistory", JSON.stringify(newInputHistory));
        localStorage.setItem("summaryHistory", JSON.stringify(newSummaryHistory));
    };

    const handlePdf = (index) => {
        const pdfContent = summaryHistory[index];
        const blob = new Blob([pdfContent], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `summary-${index}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <>
            <div className="flex flex-col bg-gray-100 w-[100vw] font-sans min-h-screen">
                <Header title="SumThis.ai" />
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
                    />
                    <History history={Array.isArray(summaryHistory) ? summaryHistory.slice(-5) : []} handleDelete={handleDelete} handlePdf={handlePdf} />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Home;