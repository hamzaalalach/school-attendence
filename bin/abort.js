module.exports = {
	notFound: res => {
		return res.status(404).json({
			success: false,
			error: 404,
			message: 'Not Found'
		});
	},
	internalServer: (res, message) => {
		return res.status(500).json({
			success: false,
			error: 500,
			message
		});
	},
	unprocessable: res => {
		return res.status(422).json({
			success: false,
			error: 422,
			message: 'unprocessable'
		});
	},
	conflict: res => {
		return res.status(409).json({
			success: false,
			error: 409,
			message: 'Conflict'
		});
	}
};
