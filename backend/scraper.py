import re
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

def extract_date_from_url(url):
    match = re.search(r'/(\d{4}-\d{2}-\d{2})/', url)
    if match:
        return match.group(1)
    return None

def fetch_top20_etf():
    url = "https://www.bloomberg.com/markets/etfs"

    headers = {
        'User-Agent': 'Mozilla/5.0',
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    selectors = [
        'h3 a',
        'h2 a',
        'article a',
        '[class="headline"] a',
        '[class="title"] a',
        'a[href*="/news/articles/"]',
    ]

    for selector in selectors:
        elements = soup.select(selector)
        if elements:
            print(f"Found {len(elements)} elements with selector: {selector}")
            break

    all_links = soup.find_all('a', href=True)
    article_links = []

    for link in all_links:
        href = link.get('href', '')
        text = link.get_text(strip=True)

        if (('/news/' in href or '/articles/' in href) and 
            text and 
            len(text) > 20 and
            text[0].isupper()):

            article_links.append({
                'headline': text,
                'url': href if href.startswith('http') else f"https://www.bloomberg.com{href}/"
            })

    seen = set()
    unique_articles = []
    for article in article_links:
        if article['headline'] not in seen:
            seen.add(article['headline'])
            unique_articles.append(article)

    print(f"\nFound {len(unique_articles)} unique headlines")
    print("\n--- All Headlines ---")

    df = pd.DataFrame(unique_articles)
    df['date'] = df['url'].apply(extract_date_from_url)

    return df

if __name__ == "__main__":
    print(fetch_top20_etf())
