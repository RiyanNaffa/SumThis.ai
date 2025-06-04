import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from '../Header';
import Footer from '../Footer';

const About = () => {
    const [isDark, setIsDark] = useState(() => {
        try {
            const storedTheme = localStorage.getItem("isDark");
            return storedTheme ? JSON.parse(storedTheme) : false;
        } catch {
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem("isDark", JSON.stringify(isDark));
    }, [isDark]);
    
    const aboutDesc = "Introducing **SumThis.ai**, your go-to web-based **AI-Powered Text Summarization Tool** designed to effortlessly condense any text, article, or lengthy document into a clear and concise summary. With just a single click, SumThis.ai transforms overwhelming information into easily digestible insights, saving you time and helping you focus on what truly matters.";
    const aboutPreTable = "## Models Supported:";

    const aboutTable = `
| **Model** 	| **API** 	| **Type** 	| **Translation** 	|
|:---:	|:---:	|:---:	|:---:	|
| **DeepSeek V3 0324** 	| Open Router 	| General 	| Direct Chat 	|
| **Gemini 2.0 Flash Exp** 	| Open Router 	| General 	| Direct Chat	|
| **Qwen 3 235B A22B** 	| Open Router 	| General 	| Direct Chat	|
| **BART Large CNN** 	| Hugging Face 	| Summarization 	| Google Translate 	|
| **DistilBART CNN** 	| Hugging Face 	| Summarization 	| Google Translate 	|
| **Falconsai Text Summarization** 	| Hugging Face 	| Summarization 	| Google Translate 	|
| **Pegasus XSum** 	| Hugging Face 	| Summarization 	| Google Translate 	|
`

    return (
        <>
        <div className={`flex flex-col w-[100vw] font-sans min-h-[100vh] transition-colors duration-300 ${isDark ? 'bg-[#020202]' : 'bg-[#fdfefd]'}`}>
            <Header isDark={isDark} setIsDark={setIsDark} />
            <div style={{ padding: '2rem' }} className="flex-1">
                <div className={`transition-colors duration-300 ${isDark ? 'text-[#fdfefd]' : 'text-[#020202]'}`}>
                    <div className="markdown-content">
                        <style>{`
                            .markdown-content h1 {
                                color: ${isDark ? '#ffef73' : '#020202'};
                                border-bottom: 2px solid ${isDark ? '#a4e2cd' : '#6ca494'};
                                padding-bottom: 0.5rem;
                                margin-bottom: 1rem;
                            }
                            .markdown-content h2 {
                                font-size: 24px;
                                color: ${isDark ? '#e3bb74' : '#020202'};
                                margin-top: 2rem;
                                margin-bottom: 1rem;
                            }
                            .markdown-content p {
                                font-size: 20px;
                            }
                            .markdown-content strong {
                                color: ${isDark ? '#fcff72' : '#4e7c6f'};
                            }
                            .markdown-content table {
                                border-collapse: collapse;
                                border-spacing: 0;
                                width: 100%;
                                margin: 1rem 0;
                                background-color: ${isDark ? '#1a1a1a' : '#f8f8ef'};
                                border-radius: 8px;
                                overflow: hidden;
                                border: none;
                            }
                            .markdown-content th,
                            .markdown-content td {
                                border: 1px solid ${isDark ? '#a1a978' : '#6ca494'};
                                padding: 12px;
                                text-align: center;
                            }
                            .markdown-content th {
                                background-color: ${isDark ? '#9faf86' : '#dbe370'};
                                color: ${isDark ? '#fdfefd' : '#020202'};
                                font-weight: bold;
                            }
                            .markdown-content td {
                                color: ${isDark ? '#fdfefd' : '#020202'};
                            }
                            .markdown-content tr:nth-child(even) td {
                                background-color: ${isDark ? '#2a2a2a' : '#fdfefd'};
                            }
                            .markdown-content tr:hover td {
                                background-color: ${isDark ? '#7eaf9e' : '#a4e2cd'};
                                color: #020202;
                                transition: all 0.3s ease;
                            }
                            .markdown-content table th:first-child {
                                border-top-left-radius: 8px;
                            }
                            .markdown-content table th:last-child {
                                border-top-right-radius: 8px;
                            }
                            .markdown-content table tr:last-child td:first-child {
                                border-bottom-left-radius: 8px;
                            }
                            .markdown-content table tr:last-child td:last-child {
                                border-bottom-right-radius: 8px;
                            }
                        `}</style>
                        <h1 className="flex flex-row">
                            <div className="pb-2">
                                About 
                            </div>
                            <div className="px-4">
                                <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
                                    SumThis.ai
                                </span>
                            </div>
                        </h1>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {aboutDesc}
                        </Markdown>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {aboutPreTable}
                        </Markdown>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {aboutTable}
                        </Markdown>
                    </div>
                </div>
            </div>
            <Footer isDark={isDark} />
        </div>
        </>
    );
}

export default About;