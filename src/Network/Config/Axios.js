import { api } from '../Api/config';
import * as Crypto from "../../utils/Crypto";
import axios from 'axios';
import { Wrapper } from './NetworkWrapper'
import { showToast } from '../../utils/Toast';

let isRefreshing = false;


axios.defaults.baseURL = api;
axios.defaults.timeout = 62500;
axios.interceptors.response.use(response => response, function (error) {
	const err = error.response;
	if (err && err.status === 401 && err.config) {
		const originalRequest = err.config;
		if (!isRefreshing) {
			isRefreshing = true;
			getRefreshToken()
				.then(function (success) {
					onRefreshed(success.data.access_token)
				}).catch(err => {
					window.localStorage.clear()
            		window.location.reload()
				});
		}
		return new Promise((resolve, reject) => {
			subscribeTokenRefresh(token => {
				originalRequest.headers['Authorization'] = 'Bearer ' + token;
				resolve(axios(originalRequest));
			});
		});
	} else {
		if (err)
		showToast({
			type:"danger",
			message:err.data.message
		})
			return Promise.reject(err);
	}
});

axios.interceptors.request.use(async function (config) {
	const token = Crypto.get('access_token');
	if (token !== null && token !== "") {
		config.headers.Authorization = `Bearer ${token}`;

	}
	return config;
}, function (err) {
	return Promise.reject(err);
});

function getRefreshToken() {
	let refreshtoken = Crypto.get("refresh_token");
	if (!refreshtoken) {
		localStorage.clear()
		window.location.reload();
	}
	return axios.post(`${api}auth/refresh`, {
		token: refreshtoken
	});
}

let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
	refreshSubscribers.push(cb);
}

const onRefreshed = (token) => {
	setTokens(token);
	isRefreshing = false;
	refreshSubscribers = refreshSubscribers.filter(cb => {
		cb(token);
		return false;
	});
	refreshSubscribers = [];
}

const setTokens = (token) => {
	Crypto.set('token', token);
}

const MainApis = new Wrapper(api)

const get = MainApis.get;
const post = MainApis.post;
const patch = MainApis.patch;
const deleteApi = MainApis.delete;


export default axios;
export {
	axios,
	post,
	get,
	patch,
	deleteApi
}
