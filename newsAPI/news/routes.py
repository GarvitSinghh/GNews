from news import app, get_news, summarizer
from flask import request, jsonify


@app.route("/search", methods=["GET", "POST"])
def search():
    search_term = request.args.get("search_term")
    number = request.args.get("number")
    news = get_news.get_results(search_term=search_term, number=int(number))
    return jsonify(news)


@app.route("/summarize", methods=["GET", "POST"])
def summarize():
    url = request.args.get("url")
    summary = summarizer.get_summary(url, n=2)
    return jsonify(summary)

