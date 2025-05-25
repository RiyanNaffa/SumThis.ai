const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Fetches content from a given URL using GET request.
 * @param {string} urlString - The URL to fetch content from.
 * @returns {Promise<string>} - Resolves with the content as a string.
 */
function getUrlContent(urlString) {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(urlString);
            const lib = url.protocol === 'https:' ? https : http;

            const req = lib.get(url, (res) => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
                    res.resume();
                    return;
                }

                let data = '';
                res.setEncoding('utf8');
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => resolve(data));
            });

            req.on('error', reject);
            req.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = getUrlContent;