var media = document.getElementById('media');
var searchresults = document.getElementById('results');
var Searchinput = document.querySelector('.search');
var server = window.location.href;
var title = [];
document.addEventListener('DOMContentLoaded', function() {
	new GreenAudioPlayer('.music');
});
async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST', 
		mode: 'cors', 
		cache: 'no-cache', 
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', 
		referrerPolicy: 'no-referrer', 
		body: JSON.stringify(data) 
	});
	return await response.json(); 
} 
async function fetchAsync (url) {
  let response = await fetch(`${server}/available?url=${url}`);
  let data = await response.json();
	var media = document.getElementById('media');
	if (data.id != null) {
		media.innerHTML = `<source src="${server}/local/${data.id}.mp3" type="audio/mp3" preload="auto">`;
	} else {
		media.innerHTML = `<source src="${server}/stream?url=${url}" type="audio/mp3">`;
	}
	media.load();
}

async function Source(url) {
	await fetchAsync(url);
}

function search() {
	if (event.key === 'Enter') {
		var limit = 50;
	} else { return; }
	searchresults.innerHTML = "";
	var query = Searchinput.value
	fetch(`${server}search?url=${query}&lim=${limit}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			for (var n = 0; n < data.items.length; n++) {
				var html = `
				<div class="result" id="${data.items[n].link}" onclick="Source(this.id);">
					<img class="thumb" src="${data.items[n].thumbnail}">
					<div class="info">
						<h3 class="title">${data.items[n].title}</h3>
						<p class="authur">authur: ${data.items[n].author.name}</p>
						<p class="views">views: ${data.items[n].views}</p>
					</div>
				</div>
				`;
				searchresults.innerHTML += html;
			}
		});
}