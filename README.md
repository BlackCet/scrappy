# Scrappy: Intelligence Engine

A full-stack intelligence dashboard built to aggregate, filter, and display critical tech sector data in real-time. This system uses automated Python scrapers to pull targeted data streams into a MongoDB database, served via a Node/Express REST API to a custom React terminal interface.

Developed as a core engineering project at MNNIT Allahabad.

## 🚀 Core Features
* **CEO Social Feeds**: Tracks real-time communications from major tech executives (Sam Altman, Elon Musk, Satya Nadella, Sundar Pichai).
* **Market Signals**: Monitors and parses stock-moving news with automatic ticker detection ($NVDA, $TSLA, BTC).
* **R&D Tracking**: Pulls latest technical publications from official Big Tech engineering blogs (OpenAI, Meta AI, Google).
* **Tech Community Radar**: Interfaces with Hacker News API for trending developer discussions.
* **Event Aggregation**: Scrapes Devpost/HackerEarth feeds for upcoming hackathons.

## 🛠 Tech Stack
* **Frontend**: React (Vite), Tailwind CSS v4, Lucide Icons, Axios.
* **Backend**: Node.js, Express, Mongoose.
* **Database**: MongoDB Atlas.
* **Scrapers**: Python 3, Feedparser, Requests.
* **Automation**: Node-cron for background task scheduling.

## ⚙️ Local Setup

### 1. Database & Environment
Create a `.env` file in the root directory:
\`\`\`env
MONGO_URI=your_mongodb_connection_string
PORT=5000
\`\`\`

### 2. Python Scrapers (Data Pipeline)
\`\`\`bash
cd scrapers
python -m venv .venv
source .venv/Scripts/activate  # Windows
pip install requests feedparser pymongo python-dotenv
\`\`\`

### 3. Backend (API & Scheduler)
\`\`\`bash
cd backend
npm install
node server.js
\`\`\`

### 4. Frontend (Dashboard)
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## 🧠 Architecture
1.  **Python layer** executes targeted scraping tasks and cleans the payload.
2.  **Node.js scheduler** triggers these scripts at intervals and handles database upserts to prevent duplication.
3.  **Express API** serves the aggregated `intel_db` with query-based filtering.
4.  **React UI** continuously polls the API and visualizes the stream via a distributed, color-coded terminal layout.

## 🔮 Future Enhancements
* **Unified JS Scraping Engine**: Introduce a **Node.js/Cheerio** scraping layer to handle raw HTML parsing directly within the backend. This will eventually unify the codebase into 100% JavaScript and eliminate the need for Python virtual environments.
* **WebSocket Integration**: Upgrade the REST API polling mechanism to a live WebSocket connection for millisecond-accurate ticker and news updates.
* **Infinite Scroll**: Implement intersection observers on the frontend to replace standard pagination with a seamless infinite scrolling intelligence feed.
