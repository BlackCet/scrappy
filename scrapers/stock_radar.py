import feedparser
from datetime import datetime
from db_setup import get_collection

# RSS Feeds for Stock and Tech Markets
RSS_SOURCES = [
    {"name": "Yahoo Finance", "url": "https://finance.yahoo.com/rss/topstories"},
    {"name": "Google Tech Stocks", "url": "https://news.google.com/rss/search?q=Big+Tech+Stocks+AI"},
    {"name": "Investing.com", "url": "https://www.investing.com/rss/news_25.rss"}
]

def scrape_stock_radar():
    collection = get_collection()
    print("📡 Monitoring Stock Radar RSS feeds...")

    for source in RSS_SOURCES:
        feed = feedparser.parse(source["url"])
        print(f"Reading from {source['name']}...")

        for entry in feed.entries[:10]: # Top 10 from each source
            intel_doc = {
                "title": entry.title,
                "content": entry.summary if 'summary' in entry else "Click source for details.",
                "url": entry.link,
                "sourceType": "STOCK_SIGNAL",
                "sourceName": source["name"],
                "relatedTickers": [], # We can add keyword-based ticker detection here
                "publishedAt": datetime.utcnow()
            }

            # Upsert into MongoDB
            collection.update_one(
                {"url": intel_doc["url"]}, 
                {"$set": intel_doc}, 
                upsert=True
            )
    print("✅ Stock Radar Sync Complete.")

if __name__ == "__main__":
    scrape_stock_radar()