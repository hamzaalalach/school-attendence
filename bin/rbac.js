const roles = {
	chairman: [ 'teachers', 'branches' ],
	businessManager: [ 'students' ],
	branchManager: [ 'courses', 'sessions' ],
	teacher: [ 'presence' ]
};

const canAccess = (user, permission) => {
	const permissions = roles[user['mode']];

	if (!permissions) {
		return false;
	}

	if (permissions && permissions.includes(permission)) {
		return true;
	}

	return false;
};

module.exports = canAccess;
