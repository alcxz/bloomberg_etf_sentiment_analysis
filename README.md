# bloomberg_etf_sentiment_analysis

Tech Stack:
- React
- Python/Flask
- BeautifulSoup
- Sentiment Analysis using VADER

How it works:
- Visit the frontend and click analyze headlines
- Makes an API call to the backend which runs the scraper using BeautifulSoup on the Bloomberg News ETF headlines
- Recent headlines are analyzed using the VADER sentiment analysis model
- Results are sent back to the front end and displayed

Analysis on Results:
- VADER is not the most accurate for financial headlines
- Many neutral headlines scraped were not in fact neutral
- Some slightly positive headlines were not positive:
    i.e. Vanguard Set to Challenge BlackRock’s Grip on Ex-China ETF Trade was rated 0.0077, but can be indicative of some volitility
- The strongly positive and negative rated ones were correct

