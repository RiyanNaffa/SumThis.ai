/**
 * Function to translate an input text from a language to another using Google Translate API.
 *
 * @param   {string}    text        Text in `sourceLang` to be translated.
 * @param   {string}    sourceLang  Language used in input `text`.
 * @param   {string}    targetLang  Target language the function translates to.
 * @returns {string}    Translated text in `targetLang`.
 */
async function translateWithGoogle(text, sourceLang, targetLang) {
    // Mapping from a language label to its Google Translate code
    const langMap = {
        "English": "en",
        "Indonesian": "id",
        "Danish": "da",
        "German": "de",
        "Spanish": "es",
        "Filipino": "tl",
        "French": "fr",
        "Italian": "it",
        "Malay": "ms",
        "Dutch": "nl",
        "Norwegian": "no",
        "Polish": "pl",
        "Portuguese": "pt",
        "Russian": "ru",
        "Finnish": "fi",
        "Swedish": "sv",
        "Tagalog": "tl",
        "Vietnamese": "vi",
        "Turkish": "tr",
        "Arabic": "ar",
        "Han (Chinese)": "zh",
        "Hindi": "hi",
        "Japanese": "ja",
        "Korean": "ko",
        "Thai": "th"
    };
    
    const srcCode = langMap[sourceLang] || sourceLang.toLowerCase();
    const tgtCode = langMap[targetLang] || targetLang.toLowerCase();
    
    // Google Translate API
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${srcCode}&tl=${tgtCode}&dt=t&q=${encodeURIComponent(text)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Google Translate returns a complex nested array structure
        // Extract the translated text from the response
        let translatedText = '';
        if (data && data[0]) {
            for (const item of data[0]) {
                if (item[0]) {
                    translatedText += item[0];
                }
            }
        }
        
        return translatedText || text; // fallback to original text if translation fails
    } catch (error) {
        console.error('Google Translate error:', error);
        return text; // fallback to original text
    }
}

/**
 * `/api/summarize` handler function.
 *
 * @param   {*}    req         Request.
 * @param   {*}    res         Response.
 * @returns {*}    Response with HTTP status and body.
 */
export default async function handler(req, res) {
    if (req.method === "POST") {
        const {
            inputText,
            inputLang,
            language,
            maxSummaryLength,
            model,
            api,
            inputHistory = [],
            summaryHistory = [],
        } = req.body || {};

        console.log("Received request with body:", req.body);

        if (!inputText || inputText.trim() === "") {
            return res.status(400).json({ error: "Input text is required." });
        }

        try {
            let summary = "";
            let response;
            let summedText = "";

            // Open Router API
            if (api === "openrouter") {
                response = await fetch(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.OPENROUTER_APIKEY}`,
                        },
                        body: JSON.stringify({
                            model: model,
                            messages: [
                                {
                                    role: "user",
                                    content: `Summarize the following text (written in language ${inputLang}) without any additional answer! Summarize in language ${language} without exceeding ${maxSummaryLength} words:\n${inputText}`,
                                },
                            ],
                        }),
                    }
                );

            // Hugging Face Inference
            } else if (api === "huggingface") {
                let inputTextTranslated = inputText;

                if (!process.env.HUGGINGFACE_ACCESS_TOKEN) {
                    console.error("HUGGINGFACE_ACCESS_TOKEN environment variable is not set");
                    return res.status(500).json({ error: "HuggingFace API token not configured." });
                }

                // Translate input language to English
                if (inputLang !== "English") {
                    console.log("Translating input from", inputLang, "to English using Google Translate");
                    inputTextTranslated = await translateWithGoogle(inputText, inputLang, "English");
                    console.log("Translated input:", inputTextTranslated);
                }
                
                // Summarize using specialized model (can only summarize in English)
                console.log("Making summarization request to model:", model);
                console.log("Request parameters:", {
                    max_length: Math.round((Number(maxSummaryLength) || 50) * 1.5), // approx. tokens from words
                    input_length: inputTextTranslated.length
                });

                response = await fetch(
                    "https://router.huggingface.co/hf-inference/models/" + model,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
                        },
                        body: JSON.stringify({ 
                            inputs: inputTextTranslated,
                            parameters: {
                                clean_up_tokenization_spaces: true,
                                truncation: "longest_first",
                                max_length: Math.round((Number(maxSummaryLength) || 50) * 1.5),
                                do_sample: false,
                            }
                        }),
                    }
                );

                console.log("Summarization response status:", response.status, response.statusText);

                if (!response.ok) {
                    console.error("Summarization failed:", response.status, response.statusText);
                    let errorData;
                    try {
                        errorData = await response.json();
                    } catch {
                        const errorText = await response.text().catch(() => "Unknown error");
                        console.error("Summarization error body (text):", errorText);
                        return res.status(500).json({ 
                            error: "Failed to get response from Summarize Hugging Face API.", 
                            details: { status: response.status, body: errorText }
                        });
                    }
                    console.error("Summarization error body (JSON):", errorData);
                    return res.status(500).json({ 
                        error: "Failed to get response from Summarize Hugging Face API.", 
                        details: errorData 
                    });
                }

                let data;
                try {
                    data = await response.json();
                } catch (parseError) {
                    console.error("Failed to parse summarization response:", parseError);
                    const responseText = await response.text().catch(() => "Could not read response");
                    console.error("Raw response:", responseText);
                    return res.status(500).json({ error: "Invalid JSON response from summarization API." });
                }

                console.log("Summarization response data:", JSON.stringify(data, null, 2));

                if (!Array.isArray(data) || !data[0]?.summary_text) {
                    console.error("Unexpected Hugging Face response format:", data);
                    return res.status(500).json({ 
                        error: "Unexpected response from Hugging Face summarization model.",
                        details: data
                    });
                }

                summedText = data[0].summary_text;
                console.log("Generated summary:", summedText);

                // Translate summary (English) into target language
                if (language !== "English") {
                    console.log("Translating summary from English to", language, "using Google Translate");
                    summedText = await translateWithGoogle(summedText, "English", language);
                    console.log("Translated summary:", summedText);
                }
            } else {
                return res.status(400).json({ error: "Unknown API source." });
            }

            if (api === "openrouter") {
                if (response.status === 401) {
                    return res.status(401).json({ error: "Unauthorized: Invalid API key." });
                }
                if (response.status === 403) {
                    return res.status(403).json({ error: "Forbidden: Access denied." });
                }
                if (response.status === 429) {
                    return res.status(429).json({ error: "Too many requests. Please try again later." });
                }
                if (response.status >= 500) {
                    return res.status(502).json({ error: "Upstream server error." });
                }
                const data = await response.json();
                summary = data.choices?.[0]?.message?.content || "";

            } else if (api === "huggingface") {
                summary = summedText;
            } else {
                return res.status(400).json({ error: "Unknown API source." });
            }

            if (summary === "") {
                console.error("Empty summary generated");
                return res.status(500).json({ error: "Model returns an empty response." });
            }

            // Update history arrays (keep only last 5)
            const newInputHistory = [...inputHistory, inputText].slice(-5);
            const newSummaryHistory = [...summaryHistory, summary].slice(-5);

            console.log("input text:", inputText);
            console.log("final summary:", summary);

            res.status(200).json({ summary, inputHistory: newInputHistory, summaryHistory: newSummaryHistory });
        } catch (error) {
            console.error("Unhandled error in summarize handler:", error);
            console.error("Error stack:", error.stack);
            res.status(500).json({ 
                error: "Failed to summarize.", 
                debug: process.env.NODE_ENV === 'development' ? error.message : undefined 
            });
        }
    } else {
        // HTTP method not allowed (other than GET)
        res.status(405).end();
    }
}