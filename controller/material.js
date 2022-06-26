const fs = require('fs');
const fetch = require('node-fetch');
const Material = require('../model/material');

const getById = async (req, res) => {
	const { material } = req.body;

	const key = material.map((val) => {
		return { material_id: val };
	});
	try {
		const x = await Material.find({
			$or: key,
		});
		return res.status(200).json(x);
	} catch (error) {
		console.log(error);
	}
};

// POST
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

	for (let i = 0; i < 2000; ++i) {
		const get = await fetch(
			`https://sg-wiki-api-static.hoyolab.com/hoyowiki/wapi/entry_page?entry_page_id=${
				i + 52
			}`
		);
		const data = await get.json();
		promises.push(doSomethingAsync(data));
	}

	Promise.all(promises)
		.then((results) => {
			let data = JSON.stringify(results);
			fs.writeFileSync('data.json', data, function (err) {
				if (err) throw err;
				console.log('complete');
			});

			// Material.insertMany(results)
			// 	.then(function () {
			// 		console.log('Data inserted'); // Success
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error); // Failure
			// 	});
		})
		.catch((e) => {
			// Handle errors here
			console.log(e);
		});
}

const material = async (req, res) => {
	test();
};

// get all
const getAllMaterial = async (req, res) => {
	const arr = [];
	let rawdata = fs.readFileSync('test.json');
	let material = JSON.parse(rawdata);
	const x = material.map((val) => {
		const value = val;
		let u = {
			id: value.id,
			name: value.name,
			desc: value.desc,
			icon_url: value.icon_url,
			header_img_url: value.header_img_url,
			modules: {
				name: value.modules[0].name,
				has_edit_permission: value.modules[0].has_edit_permission,
				is_poped: value.modules[0].is_poped,
				components: {
					component_id: value.modules[0].components[0].component_id,
					layout: value.modules[0].components[0].layout,
					data: JSON.parse(value.modules[0].components[0].data),
					style: value.modules[0].components[0].style,
				},
			},
			filter_values: { object_type: value.filter_values.object_type?.values.toString() },
			menu_id: value.menu_id,
			menu_name: value.menu_name,
		};
		arr.push(u);
	});

	let data = JSON.stringify(arr);
	fs.writeFileSync('fix.json', data, function (err) {
		if (err) throw err;
		console.log('complete');
	});
	return res.status(200).json(x);
};
module.exports = { getAllMaterial, getById, material };
