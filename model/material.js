const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
	material_id: {
		type: String,
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
		components: {
			component_id: {
				type: String,
			},
			layout: {
				type: String,
			},
			data: {
				list: {
					type: [],
				},
			},
			style: {
				type: String,
			},
		},
		filter_values: {
			object_type: {
				type: String,
			},
		},
		menu_id: {
			type: Number,
		},
		menu_name: {
			type: String,
		},
	},
});

module.exports = mongoose.model('Material', materialSchema);
