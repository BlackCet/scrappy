import os
from newsapi import NewsApiClient
from datetime import datetime
from db_setup import get_collection
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

def scrape_stock_signals():
    # Get your FREE key from newsapi.org
    api_key = os.getenv("NEWSAPI_KEY")
    if not api_key:
        print("❌ NEWSAPI_KEY missing from .env")
        return

    newsapi = NewsApiClient(api_key=api_key)
    collection = get_collection()

    # Targets Task 2: News specifically about major stock movers
    # 'q' can be adjusted to any ticker like 'Nvidia' or 'Reliance'
    queries = ['Nvidia AI', 'Apple Intelligence', 'US Federal Reserve', 'BSE Sensex']

    for query in queries:
        print(f"📊 Analyzing Market Signals for: {query}...")
        articles = newsapi.get_everything(q=query, language='en', sort_by='relevancy', page_size=5)

        for art in articles['articles']:
            intel_doc = {
                "title": art['title'],
                "content": art['description'] or art['content'],
                "url": art['url'],
                "sourceType": "STOCK_SIGNAL",
                "sourceName": art['source']['name'],
                "relatedTickers": [query.split()[0].upper()], # Basic ticker extraction
                "publishedAt": datetime.utcnow()
            }

            collection.update_one(
                {"url": intel_doc["url"]}, 
                {"$set": intel_doc}, 
                upsert=True
            )
    print("✅ Market Signals Updated.")

if __name__ == "__main__":
    scrape_stock_signals()