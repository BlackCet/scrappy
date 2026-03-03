import feedparser
import urllib.parse
from datetime import datetime
from db_setup import get_collection

def scrape_ceos_reliable():
    collection = get_collection()
    ceos = [
        {"name": "Sam Altman", "ticker": "MSFT"},
        {"name": "Elon Musk", "ticker": "TSLA"},
        {"name": "Satya Nadella", "ticker": "MSFT"},
        {"name": "Sundar Pichai", "ticker": "GOOGL"}
    ]

    for ceo in ceos:
        print(f"📡 Intercepting news for {ceo['name']}...")
        # Encode name for URL (e.g., Sam+Altman)
        query = urllib.parse.quote(ceo['name'])
        rss_url = f"https://news.google.com/rss/search?q={query}+when:7d&hl=en-IN&gl=IN&ceid=IN:en"
        
        try:
            feed = feedparser.parse(rss_url)
            
            if not feed.entries:
                print(f"⚠️ No recent news found for {ceo['name']}.")
                continue

            for entry in feed.entries[:5]:
                doc = {
                    "title": entry.title,
                    "content": f"Latest intelligence report regarding {ceo['name']}. Source: {entry.source.get('text', 'News')}",
                    "url": entry.link,
                    "sourceType": "CEO_COMM",
                    "sourceName": ceo['name'],
                    "relatedTickers": [ceo['ticker']],
                    "publishedAt": datetime.utcnow()
                }
                
                # Use update_one with upsert to avoid duplicates
                collection.update_one({"url": doc["url"]}, {"$set": doc}, upsert=True)
            
            print(f"✅ {ceo['name']} Data Stream Secured.")
        except Exception as e:
            print(f"❌ Error fetching {ceo['name']}: {e}")

if __name__ == "__main__":
    scrape_ceos_reliable()