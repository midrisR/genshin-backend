const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ? res.statusCode : 500;
	const error = [];
	if (err?.details) {
		err.details.forEach((element) => {
			error.push({
				[element.path]: [element.message],
			});
		});
	}
	const errorResponse = error.reduce((val, cur) => ({ ...val, ...cur }), {});
	res.status(statusCode);
	res.json({
		message: err?.details ? errorResponse : err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = { errorHandler };
