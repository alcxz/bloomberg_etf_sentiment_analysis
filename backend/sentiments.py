from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from scraper import fetch_top20_etf

analyzer = SentimentIntensityAnalyzer()

def analyze_headlines():

    df = fetch_top20_etf()
    df["sentiment"] = df.apply(lambda x: analyzer.polarity_scores(x)["compound"], axis=1)

    results = []
    for _, row in df.iterrows():
        results.append({
            'headline': row['headline'],
            'date': row['date'],
            'sentiment': row['sentiment']
        })

    results.pop(0)
    return results

if __name__ == "__main__":
    print(analyze_headlines())
