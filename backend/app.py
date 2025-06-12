from flask import Flask
from flask_cors import CORS
from scraper import fetch_top20_etf
from sentiments import analyze_headlines

app = Flask(__name__)
CORS(app)

@app.get("/api/sentiments")
def sentiments():
    results = analyze_headlines()
    
    return results


if (__name__) == "__main__":
    app.run()
