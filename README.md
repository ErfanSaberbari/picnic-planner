# Picnic Planner API

A Node.js and Express-based API to find the best date and location for a picnic based on weather conditions.


## 🚀 Features

- Fetches weather data from the Bright Sky API.
- Converts human-readable locations into coordinates using Nominatim Geocoding API.
- Determines the best date and location for a picnic based on:
  - 🌞 Maximum sunshine
  - 🌡️ Temperature between 20°C and 30°C (To test in winter I changed the minimum temperature to 0°C)
  - 💨 Wind speed below 30 km/h
  - 🌧️ No precipitation
- Supports multiple locations and date ranges.
- RESTful API with JSON responses.

## 🛠️ Installation & Setup
### 1️⃣ Prerequisites
- Install Node.js (LTS version recommended)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/picnic-planner.git
cd picnic-planner
```

### 3️⃣ Install Dependencies
```sh
npm install
```

## ▶️ Running the Server

Start the server with:
```sh
node src/app.js
```

The server should now be running at:

```perl
http://localhost:3000
```

## 📡 API Endpoints
### 1️⃣ Welcome Route

![Screenshot 2025-02-17 at 23-27-01 Picnic Weather Planner API](https://github.com/user-attachments/assets/a5b7c2b3-4a28-46c3-9a0c-cb06fa571b2b)

### 2️⃣ Find Best Picnic Conditions
Description: Finds the best date and location for a picnic.<br/>
Query Parameters:

| Parameter     | Type          | Description                      |
| ------------- | ------------- | -------------------------------- |
| from          | String        | Start date (ISO 8601)            |
| to            | String        | End date (ISO 8601)              |
| locations     | Array         | List of human-readable locations |

Example Request:

```perl
http://localhost:3000/party_plan?from=2025-02-17&to=2025-02-25&locations=Treptower Park, Tempelhofer Feld, English Garden
```

Example Response:

```json
{
  "date": "2025-02-22",
  "location": "Treptower Park"
}
```

Error Responses:

| Status Code   | Message                                    |
| ------------- | ------------------------------------------ |
| 400           | "Missing required parameters"              | 
| 400		        | "to date cannot be earlier than from date" |
| 404		        | "No optimal conditions found"              |
| 500		        | "Error processing request"                 |

### 🧪 Testing the API
- Start the server.
- Example using cURL:

curl "http://localhost:3000/party_plan?from=2025-02-17&to=2025-02-25&locations=Treptower%20Park,%20Berlin"

## 📈 Further Development
### 🔧 Upcoming Features:
- ✅ Currently, the API only returns the first suitable location that fits the weather conditions.
- 🚀 In the next update, the API will return a list of all locations that meet the optimal picnic conditions.
- 🔍 The selection logic will be improved to prioritize multiple locations with similar sunshine levels instead of just picking the first one.
    
## 🛠️ Development & Contribution
### 👨‍💻 How to Contribute
- Fork the repository.
- Create a new branch (feature-new).
- Commit and push your changes.
- Submit a Pull Request for review.

### 🐛 Reporting Issues
If you find a bug, please open an issue with details.

## 📜 License
This project is licensed under the MIT License. You are free to use and modify it.
