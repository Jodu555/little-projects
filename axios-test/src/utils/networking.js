import axios from 'axios';

function updateStats(response) {
	response.customData = response.customData || {};
	response.customData.time = new Date().getTime() - response.config.customData.startTime;

	response.customData.size = JSON.stringify(response.data).length + JSON.stringify(response.headers).length;
	return response;
}

const networking = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
	timeout: 1000,
	headers: { 'auth-token': 'foobar' },
});

networking.interceptors.request.use((request) => {
	request.customData = request.customData || {};
	request.customData.startTime = new Date().getTime();
	return request;
});

networking.interceptors.response.use(updateStats, (e) => Promise.reject(updateStats(e.response)));

export default networking;
