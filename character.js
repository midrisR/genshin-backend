const Character = require('../model/character');
const Material = require('../model/material');
const fs = require('fs');
const fetch = require('node-fetch');

const view = async (req, res) => {
	try {
		const character = await Character.find();
		return res.status(200).json(character);
	} catch (error) {
		return res.status(400).json(error);
	}
};

// find by vision or rate
const filtering = async (req, res) => {
	const { id } = req.params;
	try {
		const character = await Character.findById(id);
		const material = await Material.find();
		return res.status(200).json({ character, material });
	} catch (error) {
		return res.status(400).json(error);
	}
};

const store = async (req, res) => {
	let urllist = [];
	const newArr = [];
	let i = 0;
	for (i; i < 53; i++) {
		try {
			const response = await fetch(
				`https://sg-wiki-api-static.hoyolab.com/hoyowiki/wapi/entry_page?entry_page_id=${
					i + 1
				}`
			);
			const data = await response.json();
			urllist.push(data.data.page);
		} catch (error) {
			console.log(error);
		}
	}
	if (urllist.length > 0) {
		urllist.map((val) => {
			let y = {
				entry_page_id: val.id,
				name: val.name,
				icon_url: val.icon_url,
				desc: val.desc,
				header_img_url: val.header_img_url,
				filter_values: {
					character_property: val.filter_values.character_property?.values.toString(),
					character_weapon: val.filter_values.character_weapon?.values.toString(),
					character_vision: val.filter_values.character_vision?.values.toString(),
					character_region: val.filter_values.character_region?.values.toString(),
					character_rarity: val.filter_values.character_rarity?.values.toString(),
				},
				modules: val.modules.map((data) => ({
					name: data.name,
					has_edit_permission: data.has_edit_permission,
					is_poped: data.is_poped,
					components: [
						{
							component_id: data.components[0].component_id,
							layout: data.components[0].layout,
							data: JSON.parse(data.components[0].data),
							style: data.components[0].style,
						},
					],
				})),
			};
			newArr.push(y);
		});
		setTimeout(async () => {
			try {
				const x = await Character.insertMany(newArr);
				return res.status(201).json({ success: true, data: newArr });
			} catch (error) {
				return res.status(400).json(error);
			}
		}, 5000);
	}
};
function doSomethingAsync(value) {
	return new Promise((resolve) => {
		setTimeout(() => {
			// console.log('Resolving ' + value);
			resolve(value);
		}, Math.floor(Math.random() * 1000));
	});
}

async function test() {
	const promises = [];

	for (let i = 0; i < 1563; ++i) {
		const get = await fetch(
			`https://sg-wiki-api-static.hoyolab.com/hoyowiki/wapi/entry_page?entry_page_id=${
				i + 52
			}`
		);
		const data = await get.json();
		if (data.data !== null) promises.push(doSomethingAsync(data.data.page));
	}

	Promise.all(promises)
		.then((results) => {
			Material.insertMany(results)
				.then(function () {
					console.log('Data inserted'); // Success
				})
				.catch(function (error) {
					console.log(error); // Failure
				});
		})
		.catch((e) => {
			// Handle errors here
			console.log(e);
		});
}

const material = async (req, res) => {
	test();
};

const getAllMaterial = async (req, res) => {
	const material = await Material.find();
	const u = material.forEach(function (doc) {
		return Material.remove({ _id: { $gt: doc._id }, id: doc.id });
	});

	return res.status(200).json(u);
};

module.exports = { view, store, filtering, material, getAllMaterial };
