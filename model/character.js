const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
	entryPageId: {
		type: Number,
	},
	name: {
		type: String,
	},
	desc: {
		type: String,
	},
	icon_url: {
		type: String,
	},
	header_img_url: {
		type: String,
	},
	modules: {
		type: [],
	},
	filter_values: {
		character_region: String,
		character_property: String,
		character_rarity: String,
		character_weapon: String,
		character_vision: String,
	},
	menu_id: {
		type: Number,
	},
	menu_name: {
		type: String,
	},
});

module.exports = mongoose.model('Character', characterSchema);
