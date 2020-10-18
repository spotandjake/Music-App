const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const request = require('request');
const ytsr = require('ytsr');
const fs = require('fs');
const logger = require('./logger');

const app = express();
let filter;
let url;

app.use(cors());
app.use(express.static('static'));

app.get('/', (req, res) => {
	logger.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} | index`)
	res.sendFile("static/index.html", { root: __dirname });
});

app.get('/stream', (req, res, next) => {
	logger.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} | stream`)
	var url = req.query.url;
	var audio = ytdl(url, {
		format: 'mp3',
		filter: 'audioonly'
	})
	audio.on('info', (info) => {
		try {
  		if (fs.existsSync(`static/local/${info.video_id}.mp3`)) {
    		logger.log("exists", false);
  		}
		} catch(err) {}
		res.header('Content-Disposition', `attachment; filename="${info.video_id}.mp3"`);
		audio.pipe(fs.createWriteStream(`static/local/${info.video_id}.mp3`));
		audio.pipe(res);
	});
});

app.get('/available', (req, res, next) => {
	logger.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} | available`)
	var url = req.query.url;
	var audio = ytdl(url, {
		format: 'mp3',
		filter: 'audioonly'
	})
	audio.on('info', (info) => {
		try {
  		if (fs.existsSync(`static/local/${info.video_id}.mp3`)) {
    		res.json({id: info.video_id})
  		} else {
				res.json({id: null})
			}
		} catch(err) {
			res.json({id: null})
		}
	});
});

app.get('/thumbnail', (req, res) => {
	logger.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} | thumbnail`)
	var url = req.query.url;
	res.setHeader("content-disposition", "attachment; filename=thumbnail.jpg");
	ytdl.getInfo(url, function(err, info) {
		request(info.player_response.videoDetails.thumbnail.thumbnails[info.player_response.videoDetails.thumbnail.thumbnails.length - 1].url).pipe(res);
	});
});
app.get('/search', (req, res) => {
	logger.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} | search`)
	var url = req.query.url;
	if (req.query.lim) {
		var limi = req.query.lim
	} else {
		var limi = 20
	}
	ytsr.getFilters(url, function(err, filters) {
		if (err) throw err;
		filter = filters.get('Type').find(o => o.name === 'Video');
		ytsr.getFilters(filter.ref, function(err, filters) {
			if (err) throw err;
			filter = filters.get('Duration').find(o => o.name.startsWith('Short'));
			var options = {
				limit: limi,
				nextpageRef: filter.ref,
			}
			ytsr(null, options, function(err, searchResults) {
				if (err) throw err;
				res.json(searchResults);
			});
		});
	});
});

app.listen(3000, () => logger.log('server started'));