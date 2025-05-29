import https from 'https';
import http from 'http';
import { URL } from 'url';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

/**
 * Function to access a URL's content using HTTP or HTTPS.
 *
 * @param   {URL}             url        Target's URL.
 * @param   {http | https}    lib        URL's protocol. Either HTTP or HTTPS.
 * @returns {Promise<string>} Resolve: the data fetched from the URL, Reject: reason the fetch is rejected.
 */
function fetchUrlContent(url, lib) { return new Promise((resolve, reject) => {
    lib.get(url, (response) => {

      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume();
        return reject(new Error(`Request Failed. Status Code: ${response.statusCode}`));
      }

      let data = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => resolve(data));

    }).on('error', reject);
  });
}

/**
 * `api/getUrlContent` handler function.
 *
 * @param   {*}    req         Request.
 * @param   {*}    res         Response.
 * @returns {*}    Response with HTTP status and body.
 */
export default async function handler(req, res) {
  // Reject if HTTP method is other than GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const urlString = req.query.url;
  if (!urlString) {
    return res.status(400).json({ error: 'Missing url query parameter.' });
  }

  try {
    const url = new URL(urlString);
    console.log("URL hostname:", url.hostname);

    const lib = url.protocol === 'https:' ? https : http;
    const html = await fetchUrlContent(url, lib);

    const dom = new JSDOM(html, {url: urlString});
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
        return res.status(422).json({ error: 'Could not extract article from this URL.' });
    }

    res.status(200).json({ content: article.textContent });

  } catch (err) {
    res.status(400).json({ error: err.message || 'Invalid URL.' });
  }
}