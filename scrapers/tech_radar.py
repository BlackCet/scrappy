import requests
import feedparser
from datetime import datetime
from db_setup import get_collection

# Task 5: Engineering Blogs to track R&D
TECH_BLOGS = [
    {"name": "OpenAI", "url": "https://openai.com/news/rss.xml"},
    {"name": "Meta AI", "url": "https://ai.meta.com/blog/rss/"},
    {"name": "Google AI", "url": "https://blog.google/technology/ai/rss/"}
]

def scrape_hacker_news(collection):
    """Task 4: Hacker News for community projects"""
    print("🚀 Scanning Hacker News...")
    hn_api = "https://hacker-news.firebaseio.com/v0/topstories.json"
    try:
        top_ids = requests.get(hn_api, timeout=10).json()[:15]
        for item_id in top_ids:
            story = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{item_id}.json", timeout=10).json()
            if story and 'url' in story:
                doc = {
                    "title": story.get('title'),
                    "content": f"Trending community project: {story.get('title')}",
                    "url": story.get('url'),
                    "sourceType": "TECH_NEWS",
                    "sourceName": "Hacker News",
                    "relatedTickers": [],
                    "publishedAt": datetime.utcnow()
                }
                collection.update_one({"url": doc["url"]}, {"$set": doc}, upsert=True)
    except Exception as e:
        print(f"HN Error: {e}")

def scrape_big_tech_blogs(collection):
    """Task 5: Tracking Big Tech R&D"""
    print("🏢 Monitoring Big Tech R&D Blogs...")
    for blog in TECH_BLOGS:
        try:
            feed = feedparser.parse(blog["url"])
            for entry in feed.entries[:5]:
                doc = {
                    "title": entry.title,
                    "content": entry.summary[:200] + "..." if 'summary' in entry else "New R&D Update",
                    "url": entry.link,
                    "sourceType": "BIG_TECH_RD",
                    "sourceName": blog["name"],
                    "relatedTickers": [blog["name"].upper()],
                    "publishedAt": datetime.utcnow()
                }
                collection.update_one({"url": doc["url"]}, {"$set": doc}, upsert=True)
        except Exception as e:
            print(f"Blog Error ({blog['name']}): {e}")

def scrape_hackathons(collection):
    """Using a more stable Hackathon News source"""
    # HackerEarth and MLH usually have cleaner feeds than Devpost RSS
    feeds = [
        "https://www.hackerearth.com/challenges/rss/",
        "https://news.mlh.io/feed"
    ]
    
    for url in feeds:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:5]:
                doc = {
                    "title": entry.title,
                    "content": entry.summary[:200] if 'summary' in entry else "Hackathon Detail",
                    "url": entry.link,
                    "sourceType": "HACKATHON",
                    "sourceName": "HackEvents",
                    "relatedTickers": [],
                    "publishedAt": datetime.utcnow()
                }
                collection.update_one({"url": doc["url"]}, {"$set": doc}, upsert=True)
            print(f"✅ Feed {url} Synced.")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    col = get_collection()
    if col is not None:
        scrape_hacker_news(col)
        scrape_big_tech_blogs(col)
        scrape_hackathons(col)
        print("✅ Tech Intelligence Fully Updated.")