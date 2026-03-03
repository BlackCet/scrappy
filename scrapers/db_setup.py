import os
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Robust path to find .env in the root
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

def get_collection():
    uri = os.getenv("MONGO_URI")
    if not uri:
        print("Error: MONGO_URI not found in .env file!")
        return None
        
    client = MongoClient(uri)
    
    # Manually specify the database name here
    # This ensures PyMongo doesn't complain about "No default database"
    db = client['intel_db'] 
    
    # 'intels' is the collection name (Mongoose pluralizes it automatically)
    return db["intels"]