import requests
from bs4 import BeautifulSoup


def get_results(search_term, number=3):
    base_url = "https://news.google.com/"
    page = requests.get(base_url + "search" + "?q=" + search_term + "&hl=en-US&gl=US&ceid=US:en")
    html_text = page.text
    soup = BeautifulSoup(html_text, "lxml")

    all_news = soup.find_all("article", class_="MQsxIb xTewfe R7GTQ keNKEd j7vNaf Cc0Z5d EjqUne")[:number]
    figures = soup.find_all("figure")[:number]
    news_list = []

    for i, news in enumerate(all_news):
        news_heading = news.find("h3").text
        news_issuer = news.find("div").find("a").text
        news_date = news.find("time").text
        news_link = news.find("a").get("href")
        news_image_link = figures[i].find("img").get("src")

        news_list.append(
            {
                "title": news_heading,
                "issuer": news_issuer,
                "date": news_date,
                "link": base_url + news_link[2:],
                "image": news_image_link
            }
        )

    return news_list
