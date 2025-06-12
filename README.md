# Bloomberg News ETF Sentiment Analysis

## Tech Stack:
- React
- Python/Flask
- BeautifulSoup
- Sentiment Analysis using VADER

## How it works:
- Visit the frontend and click analyze headlines
- Makes an API call to the backend which runs the scraper using BeautifulSoup on the Bloomberg News ETF headlines
- Recent headlines are analyzed using the VADER sentiment analysis model
- Results are sent back to the front end and displayed

## Results:
![image](https://github.com/user-attachments/assets/5c7c3b75-006a-41c0-865e-9ab48468d43b)
![image](https://github.com/user-attachments/assets/c5e105b6-162f-4750-8716-701cd3ef0cb1)
![image](https://github.com/user-attachments/assets/46e47d1f-46f2-48c7-b922-8b437a3e6eee)


## Analysis on Results:
### Positives:
The strongly positive and negative rated ones were correct

### Negatives
![image](https://github.com/user-attachments/assets/69e88860-8c91-4d03-b6e1-086ff23e5d79)
One of the major problems with the model was that it gave a neutral rating to a lot of headlines that were not neutral at all. For example the headline shown above shows an ETF drawing in large amounts of investment which means people are buying the stock. With the amount it drew in, this certainly means that there is a level of confidence in the ETF and so this should be a very positive headline.

![image](https://github.com/user-attachments/assets/fd4c3ad7-98a8-4df7-9b52-edcecb11abf7)
Some slightly positive headlines were also not positive i.e. Vanguard Set to Challenge BlackRock’s Grip on Ex-China ETF Trade was rated 0.0077, but can be indicative of some volitility. While the coefficient is not large, I believe that since the model ranked so many neutral, it had to have detected some type of positive language in the headline. Thus this could be an example of a slight inaccuracy; thinking the headline was positive when it could be interpreted as negative (unstable and high volitility coming up).

### Additional Thoughts
I believe that VADER is not the most accurate for financial headlines, however, there could be an issue in the way that I was running inference with the model. However, I believe that since it was able to evaluate a number of the headlines, I think that VADER may not be the most equipped to deal with financial terminology.

Instead another model that could be considered would be finBERT on HuggingFace.

#### Disclaimer:
I don't have the most experience in creating projects like this so sorry if it was a bit scuffed. Also I accidentally leaked an env variable in a previous repo so that's why there may be a low commit count. And I also had an interview today but I tried to scrap together as much as I can. Thanks for reading through!
