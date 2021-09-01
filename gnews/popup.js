function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

function formatHeading(heading, len = 36) {
	if (heading.length > len) {
		return heading.slice(0, len) + "...";
	}
	return heading;
}

function openInNewTab(url) {
	window.open(url, "_blank").focus();
}

search_url = "https://gnewsapi.bluebeast.repl.co/search?";
summary_url = "https://gnewsapi.bluebeast.repl.co/summarize?url=";

document.getElementById("kys").addEventListener("click", function () {
	keywordPage = document.getElementById("keywordsPageX");
	summarizePage = document.getElementById("summarizePage");

	summarizePage.style.display = "none";
	keywordPage.style.display = "block";
});
document.getElementById("ys").addEventListener("click", function () {
	keywordPage = document.getElementById("keywordsPageX");
	summarizePage = document.getElementById("summarizePage");

	keywordPage.style.display = "none";
	summarizePage.style.display = "block";
});

document
	.getElementById("searchNavigator")
	.addEventListener("click", function () {
		home = document.getElementById("homePage");
		searchNews = document.getElementById("searchPage");

		home.style.display = "none";
		searchNews.style.display = "block";
	});

document
	.getElementById("summarizeNavigator")
	.addEventListener("click", function () {
		home = document.getElementById("homePage");
		summarizeNews = document.getElementById("keywordsPage");

		home.style.display = "none";
		summarizeNews.style.display = "block";

		chrome.tabs.query({ active: true }, (tabs) => {
			var data = JSON.parse(httpGet(summary_url + tabs[0].url));
			var summary = data["summary"];
			var keywords = data["keywords"];

			console.log(summary);
			console.log(keywords);

			for (keyword of keywords) {
				span = document.createElement("span");
				span.className = "keyword";
				span.innerHTML = `&nbsp;${keyword}&nbsp;`;
				document.getElementById("keywords").appendChild(span);
			}

			document.getElementById("summaryText").innerHTML = summary;
		});
	});

inputBox = document.getElementById("searchInput");
inputBox.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		st = document.getElementsByTagName("input")[0].value;
		search(st);
	}
});

function search() {
	search_term = document.getElementsByTagName("input")[0].value;
	res = httpGet(search_url + "search_term=" + search_term + "&number=3");
	search_data = JSON.parse(res);
	setData(search_data);
}

function setData(data) {
	document.getElementById("heading1").innerHTML = formatHeading(
		data[0]["title"]
	);
	document.getElementById("heading1").onclick = () => {
		openInNewTab(data[0]["link"]);
	};
	document.getElementById("issuer1").innerHTML = data[0]["issuer"];
	document.getElementById("date1").innerHTML = data[0]["date"];
	document.getElementById("newsImage1").src = data[0]["image"];

	document.getElementById("heading2").innerHTML = formatHeading(
		data[1]["title"]
	);
	document.getElementById("heading2").onclick = () => {
		openInNewTab(data[1]["link"]);
	};
	document.getElementById("issuer2").innerHTML = data[1]["issuer"];
	document.getElementById("date2").innerHTML = data[1]["date"];
	document.getElementById("newsImage2").src = data[1]["image"];

	document.getElementById("heading3").innerHTML = formatHeading(
		data[2]["title"]
	);
	document.getElementById("heading3").onclick = () => {
		openInNewTab(data[2]["link"]);
	};
	document.getElementById("issuer3").innerHTML = data[2]["issuer"];
	document.getElementById("date3").innerHTML = data[2]["date"];
	document.getElementById("newsImage3").src = data[2]["image"];
}
