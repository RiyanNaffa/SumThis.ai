import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PdfPreview = () => {
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

    const location = useLocation();
    const navigate = useNavigate();
    const { inputText, url, summary } = location.state || {};

    if (!inputText && !summary) {
        navigate("/");
        return null;
    }

    return (
        <>
            <div className={`flex flex-col w-[100vw] font-sans min-h-[100vh] transition-colors duration-300 ${isDark ? 'bg-[#020202]' : 'bg-[#fdfefd]'}`}>
                <Header isDark={isDark} setIsDark={setIsDark} data-component="header"/>
                <div style={{ padding: '2rem' }} className="flex-1" id="pdf-content">
                    <style>{`
                        @media print {
                            /* Completely hide header and all its children */
                            header, 
                            .header, 
                            [data-component="header"],
                            nav,
                            .nav,
                            .navbar {
                                display: none !important;
                                visibility: hidden !important;
                                opacity: 0 !important;
                                height: 0 !important;
                                margin: 0 !important;
                                padding: 0 !important;
                            }
                            
                            /* Hide any element that might be a header */
                            *[class*="header" i],
                            *[id*="header" i] {
                                display: none !important;
                                visibility: hidden !important;
                            }
                            
                            /* Restructure layout for print - only show main content and footer */
                            body {
                                margin: 0 !important;
                                padding: 0 !important;
                            }
                            
                            /* Make the main container take full space without header */
                            .flex.flex-col {
                                display: block !important;
                            }
                            
                            /* Ensure footer is visible at bottom */
                            footer, 
                            .footer, 
                            [data-component="footer"] {
                                display: block !important;
                                position: fixed !important;
                                bottom: 0 !important;
                                left: 0 !important;
                                right: 0 !important;
                                width: 100% !important;
                                background: white !important;
                                border-top: 1px solid #ccc !important;
                                padding: 10px !important;
                                margin: 0 !important;
                            }
                            
                            /* Reset page styles for print */
                            body, html {
                                background: white !important;
                                color: black !important;
                                font-family: Arial, sans-serif !important;
                            }
                            
                            /* Main content area */
                            #pdf-content {
                                padding: 1rem !important;
                                margin: 0 !important;
                                background: white !important;
                                color: black !important;
                                min-height: auto !important;
                                padding-bottom: 60px !important; /* Space for footer */
                            }
                            
                            /* Reset all colors and backgrounds for print */
                            #pdf-content *,
                            [data-component="footer"] * {
                                color: black !important;
                                background: transparent !important;
                                background-color: transparent !important;
                                border-color: #666 !important;
                            }
                            
                            /* Hide all buttons during print */
                            button, 
                            .btn,
                            input[type="button"],
                            input[type="submit"] {
                                display: none !important;
                            }
                            
                            /* Style headings for print */
                            h1 {
                                color: black !important;
                                border-bottom: 2px solid #666 !important;
                                font-size: 24px !important;
                                margin-bottom: 1rem !important;
                                padding-bottom: 0.5rem !important;
                            }
                            
                            h2 {
                                color: black !important;
                                font-size: 18px !important;
                                margin: 1rem 0 0.5rem 0 !important;
                            }
                            
                            /* Style content boxes */
                            pre {
                                background: #f9f9f9 !important;
                                border: 1px solid #ccc !important;
                                padding: 1rem !important;
                                font-family: monospace !important;
                                white-space: pre-wrap !important;
                                word-wrap: break-word !important;
                            }
                            
                            /* Links */
                            a {
                                color: #0066cc !important;
                                text-decoration: underline !important;
                            }
                            
                            /* Page setup */
                            @page {
                                margin: 0.75in !important;
                                size: A4 !important;
                            }
                            
                            /* Prevent page breaks in content */
                            #pdf-content {
                                page-break-inside: avoid;
                            }
                        }
                    `}</style>
                    <div className={`transition-colors duration-300 ${isDark ? 'text-[#fdfefd]' : 'text-[#020202]'}`}>
                        <h1 className={`text-2xl font-bold mb-6 pb-2 border-b-2 ${isDark ? 'text-[#ffef73] border-[#a4e2cd]' : 'text-[#020202] border-[#6ca494]'}`}>
                            PDF Preview
                        </h1>
                        
                        <h2 className={`font-semibold mt-6 mb-4 text-lg ${isDark ? 'text-[#e3bb74]' : 'text-[#020202]'}`}>
                            Input
                        </h2>
                        <pre className={`p-4 rounded-lg whitespace-pre-wrap transition-colors duration-300 ${isDark ? 'bg-[#1a1a1a] text-[#fdfefd] border border-[#a1a978]' : 'bg-[#f8f8ef] text-[#020202] border border-[#6ca494]'}`}>
                            {url && url !== "" ? (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline break-all transition-colors duration-300 ${isDark ? 'text-[#a4e2cd] hover:text-[#ffef73]' : 'text-[#6ca494] hover:text-[#020202]'}`}
                                >
                                    {url}
                                </a>
                            ) : (
                                inputText
                            )}
                        </pre>
                        
                        <h2 className={`font-semibold mt-6 mb-4 text-lg ${isDark ? 'text-[#e3bb74]' : 'text-[#020202]'}`}>
                            Summary
                        </h2>
                        <div className={`p-4 rounded-lg transition-colors duration-300 ${isDark ? 'bg-[#1a1a1a] text-[#fdfefd] border border-[#a1a978]' : 'bg-[#f8f8ef] text-[#020202] border border-[#6ca494]'}`}>
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {summary}
                            </Markdown>
                        </div>
                        
                        <div className="flex justify-center mt-8">
                            <button
                                className={`mt-4 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isDark ? 'bg-[#9faf86] text-[#fdfefd] hover:bg-[#a4e2cd] hover:text-[#020202]' : 'bg-[#6ca494] text-[#fdfefd] hover:bg-[#dbe370] hover:text-[#020202]'}`}
                                onClick={() => {
                                    window.print();
                                }}
                            >
                                Save PDF
                            </button>
                        </div>
                    </div>
                </div>
                <Footer isDark={isDark} data-component="footer"/>
            </div>
        </>
    );
};

export default PdfPreview;