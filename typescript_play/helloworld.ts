const fs = require(`fs`)
const request = require(`request`)
const cheerio = require(`cheerio`)

const file_util = require(`../util/file_util`)
const spydr_util = require(`../util/spydr_util`)
const globals = require(`./globals`)

const methods = (function() {
	return {

		// Scrapes and saves
		// =========================================================== //
		fetch_and_save: function(channel, file_name) {

			methods.fetch_feeds(channel, file_name, (data) => { // console.log(data)

				file_util.methods.saveHTML(`yts_${file_name}`, data.html) // HTML SAVE

				file_util.methods.saveJSON(`yts_${file_name}`, data.json) // JSON SAVE

			})

		},

		// Scrapes and matches
		// =========================================================== //
		fetch_and_match: function(channel, file_name) {

			methods.fetch_feeds(channel, file_name, (data) => { // console.log(data)

				methods.match_feeds(file_name, data.json)

			})

		},

		// Scrape feed
		// =========================================================== //
		fetch_feeds: function(channel, file_name, callback) {
			const url = `${globals.URL}/channel/${channel}/videos`

			request(url, function(err, res, html){
				if(!err){
					var json, $ = cheerio.load(html);

					var links, metas, vids, obj;
						links = $('#channels-browse-content-grid .yt-uix-tile-link')
						metas = $('#channels-browse-content-grid .yt-lockup-meta-info')
						vids = []

					for (var i = 0; i <= links.length - 1; i++) {
						obj = {
							id: links[i].attribs.href.split('=')[1],
							title: links[i].attribs.title,
							href: `https://www.youtube.com`+links[i].attribs.href,
							duration: links[i].next.children[0].data,
							views: metas[i].children[0].children[0].data
						};

						vids.push(obj);
					}

					json = { channel: file_name, channel_id: channel, data: vids };

				}

				callback({ url, file_name, json, html })

			})

		},

		// Match files
		// =========================================================== //
		match_files:function(file_name) {

			file_util.methods.readJSON(`yts_${file_name}`, function(feed) {

				methods.match_feeds(file_name, feed)

			})

		},

		// Match feeds
		// =========================================================== //
		match_feeds:function(file_name, feed) {

			let new_json, all, dict = {}, newItems = []
				new_json = { channel: file_name, channel_id: feed.channel_id, data: [] }
				all = spydr_util.methods.checkForAllFile(`/feeds/yts_${file_name}_all.json`, new_json)

			// populate the dict
			feed.data.forEach((item) => dict[item.id] = { match: null, item: item })

			// within dict loop, check if "feed" ids match with any "all" ids
			for (key in dict) { dict[key].match = all.data.some((item) => spydr_util.methods.matches(key, item.id)) }

			for (key in dict) { // loop dict again

				// add new attrs
				dict[key].item['active'] = true;
				dict[key].item['watched'] = false;

				// push unmatched items to newItems array
				if (!dict[key].match) newItems.push(dict[key].item)

			}

			if (newItems.length) { // If there are new items

				console.log('\x1b[32m%s\x1b[0m', `Adding ${newItems.length} new items to "yts_${file_name}_all.json" file`)

				new_json.data = [...newItems, ...all.data]; // add the new items

				file_util.methods.saveJSON(`yts_${file_name}_all`, new_json) // SAVE JSON

			} else if (newItems.length==0) { // Else, do nothing

				console.log(`\x1b[31m%s\x1b[0m`, `No new items for ${file_name} feed`)

			}

			return new_json
		},

		// Mark active
		// =========================================================== //
		mark_active:function(file_name, index, bool) {

			file_util.methods.readJSON(`yts_${file_name}_all`, function(new_json) {

				if (index=="all") {
					new_json.data.forEach((item) => item.active = typeof bool == 'boolean'? bool : !item.active);
				} else if (index=="all_watched") {
					new_json.data.forEach((item) => item.active = (item.watched)? bool : item.active);
				} else if (index=="all_unwatched") {
					new_json.data.forEach((item) => item.active = (!item.watched)? bool : item.active);
				} else {
					new_json.data[index].active = bool || !new_json.data[index].active;
					console.log(new_json.data[index])
				}

				file_util.methods.saveJSON(`yts_${file_name}_all`, new_json) // JSON SAVE

				return new_json
			})

		},

		// Mark watched
		// =========================================================== //
		mark_watched:function(file_name, index, bool) {

			file_util.methods.readJSON(`yts_${file_name}_all`, function(new_json) {

				if (index=="all") {
					new_json.data.forEach((item) => item.watched = typeof bool == 'boolean'? bool : !item.watched);
				} else if (index=="all_active") {
					new_json.data.forEach((item) => item.watched = (item.active)? bool : item.watched);
				} else if (index=="all_inactive") {
					new_json.data.forEach((item) => item.watched = (!item.active)? bool : item.watched);
				} else {
					new_json.data[index].watched = !new_json.data[index].watched;
					console.log(new_json.data[index])
				}

				file_util.methods.saveJSON(`yts_${file_name}_all`, new_json) // SAVE JSON

				return new_json
			})

		}

	}
}());

exports.methods = methods;