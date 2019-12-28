'use strict';

const uuid = require('uuid/v4');

exports.create = () => {
	return uuid();
};
