import ReactMarkdown from "react-markdown";
import Header from '../Header';
import Footer from '../Footer';

const About = () => {
    const about = "# SumThis.ai\n\n" + "**SumThis.ai** is a web-based **AI Text Summarizer** that currently uses free LLM models. Choose your preferenced model, select input language, and select summarizing language. With just a click of a button, your summed up text is ready to go!\n\n" +
    "## Models Supported:\n" + "1. **DeepSeek V3 0324** (free)\n" +
    "2. **Qwen3 235B A22B** (free)\n" +
    "3. **Gemini 2.0 Flash Experimental** (free)"

    return (
        <>
        <div className="bg-gray-100 font-sans min-h-screen">
            <Header title="SumThis.ai" />
            <div style={{ padding: '2rem' }}>
                <div className="text-gray-700">
                    <ReactMarkdown>
                        {about}
                    </ReactMarkdown>    
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}

export default About;