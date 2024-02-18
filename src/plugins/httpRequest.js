import axios from 'axios';

const config = {
	baseUrl: 'http://localhost:5173/',
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
		'uuid': '123-abc',
	},
};

export default (options) => axios.create(config).request(options);
