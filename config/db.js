const mongoose = require('mongoose');
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_CONNECT);
		console.log(`connect to db : ${conn.connection.host}`.blue.bold);
	} catch (error) {
		console.log(`Error: ${error}`.red);
		process.exit(1);
	}
};

module.exports = connectDB;
