const express = require('express');
const { findOptimalConditions } = require('./services/picnicService');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Picnic Weather Planner API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 80%;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    text-align: center;
                    color: #007BFF;
                }
                h3 {
                    color: #333;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                ul li {
                    padding: 5px;
                }
                code {
                    background-color: #e9ecef;
                    padding: 5px;
                    border-radius: 4px;
                }
                pre {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 4px;
                    overflow-x: auto;
                }
                .example-request {
                    background-color: #e7f3fe;
                    border-left: 5px solid #007BFF;
                    padding: 15px;
                    margin: 20px 0;
                }
                .response, .important-notes {
                    background-color: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 15px;
                    margin-top: 20px;
                }
                .response pre {
                    background-color: #f1f1f1;
                    color: #212529;
                }
                .important-notes ul {
                    margin-top: 10px;
                }
                .important-notes li {
                    color: #d9534f;
                }
                footer {
                    text-align: center;
                    padding: 15px;
                    background-color: #f1f1f1;
                    margin-top: 30px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to the Picnic Weather Planner API!</h1>
                <p>This API helps you find the best date and location for your picnic based on weather conditions.</p>
                
                <h3>How to Use</h3>
                <p>To find the best picnic date and location, send a <strong>GET</strong> request to the <code>/party_plan</code> endpoint with the following query parameters:</p>

                <h4>Required Parameters:</h4>
                <ul>
                    <li><strong>from:</strong> The start date for your picnic planning (ISO 8601 format, e.g., 2025-02-17).</li>
                    <li><strong>to:</strong> The end date for your picnic planning (ISO 8601 format, e.g., 2025-02-25).</li>
                    <li><strong>locations:</strong> A list of locations (comma-separated). For example: <strong>"Treptower Park, Berlin, Tempelhofer Feld, Berlin, English Garden, Munich"</strong>.</li>
                </ul>

                <h4>Example Request:</h4>
                <div class="example-request">
                    <p>To search for the best picnic date and location between <strong>2025-02-17</strong> and <strong>2025-02-25</strong>, with the locations <strong>Treptower Park, Berlin</strong>, <strong>Tempelhofer Feld, Berlin</strong>, and <strong>English Garden, Munich</strong>, use the following URL:</p>
                    <pre>
                        http://localhost:3000/party_plan?from=2025-02-17&to=2025-02-25&locations=Treptower Park, Tempelhofer Feld, English Garden
                    </pre>
                </div>

                <h4>How It Works:</h4>
                <p>The API will evaluate the weather for the provided locations and date range and select the optimal conditions based on the following criteria:</p>
                <ul>
                    <li>Wind speed (avg) must be less than 30 km/h.</li>
                    <li>Temperature (avg high) must be between 20°C and 30°C.</li>
                    <li>The location with the highest sunshine and minimal precipitation will be chosen.</li>
                </ul>

                <h4>Response Example:</h4>
                <div class="response">
                    <pre>
                    {
                        "date": "2025-02-20",
                        "location": "Treptower Park, Berlin"
                    }
                    </pre>
                </div>

                <div class="important-notes">
                    <h4>Important Notes:</h4>
                    <ul>
                        <li>Ensure the date is in <strong>ISO 8601</strong> format: <strong>YYYY-MM-DD</strong>.</li>
                        <li>Locations should be written as human-readable names, separated by commas.</li>
                        <li>All parameters are required to get a valid response.</li>
                    </ul>
                </div>

                <footer>
                    <p>Powered by Picnic Weather Planner API | Enjoy your picnic planning!</p>
                </footer>
            </div>
        </body>
        </html>
    `);
});

router.get('/party_plan', async (req, res) => {
    // Check for missing parameters
    const { from, to, locations } = req.query;
    if (!from || !to || !locations) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Check if 'to' date is smaller than 'from' date
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (toDate < fromDate) {
        return res.status(400).json({
            error: `'to' date (${toDate.toISOString().split('T')[0]}) ` +
                `cannot be earlier than ` +
                `'from' date (${fromDate.toISOString().split('T')[0]})`
        });
    }

    const locationsArray = Array.isArray(locations) ? locations : locations.split(",");
    try {
        const result = await findOptimalConditions(from, to, locationsArray);

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'No optimal conditions found for the given parameters' });
        }
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
});

module.exports = router;
