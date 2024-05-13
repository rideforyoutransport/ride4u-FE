import { axios } from "./Axios";
import qs from 'qs'

class Wrapper {

	url;

	Cancellable = (promise, mCancel = false) => {
		let hasCompleted = false;
		const wrappedPromise = new Promise((resolve, reject) => {
			promise.then(
				val => {
					if (hasCompleted) {
						reject({ isCanceled: true })
					} else {
						hasCompleted = true;
						resolve(val)
					}
				},
				error => {
					if (hasCompleted) {
						reject({ isCanceled: true })
					} else {
						reject(error);
					}
				}
			);
		});
		return {
			promise: wrappedPromise,
			cancel() {
				hasCompleted = true;
				if (mCancel) {
					mCancel()
				}
			},
			isCancellable() {
				return !hasCompleted;
			}
		};
	};


	constructor(url) {
		this.url = url;
	}





	get = (url, cb, data = {}) => {
		if (url.startsWith("/")) {
			url = url.substr(1, url.length)
		}
		let self = this;
		let cancel = false;
		let cancelToken = new axios.CancelToken(function executor(c) {
			cancel = c;
		});
		let cancellable = self.Cancellable(
			axios.get(`${this.url}${url}`, {
				params: data,
				paramsSerializer: params =>  qs.stringify(params, { arrayFormat: 'repeat' }),
				cancelToken
			}), cancel
		);
		cancellable.promise.then(res => {
				cb(null, res.data)
		}).catch(err => {
			if (err && !err.isCanceled) {
				cb(err)

			}
		});
		return cancellable;
	}


	delete = (url, cb, data = {}) => {
		if (url.startsWith("/")) {
			url = url.substr(1, url.length)
		}
		let self = this;
		let cancellable = self.Cancellable(
			axios.delete(`${self.url}${url}`, data)
		);
		cancellable.promise.then(res => {
			cb(null, res.data)
		}).catch(err => {
			if (err && !err.isCanceled) {
				cb(err)
			}
		});
		return cancellable;
	}

	post = (url, data, cb) => {
		if (url.startsWith("/")) {
			url = url.substr(1, url.length)
		}
		let self = this;
		let cancellable = self.Cancellable(
			axios.post(`${self.url}${url}`, data, {
				headers: {
					'Content-Type': 'application/json',
				}
			})
		);
		cancellable.promise.then(res => {
			cb(null, res.data)

		}).catch(err => {
			if (err && !err.isCanceled) {
				cb(err)

			}
		});
		return cancellable;
	}


	patch = (url, data, cb) => {
		if (url.startsWith("/")) {
			url = url.substr(1, url.length)
		}
		let self = this;
		let cancellable = self.Cancellable(
			axios.patch(`${this.url}${url}`, data)
		);
		cancellable.promise.then(res => {
			cb(null, res.data)
		}).catch(err => {
			if (err && !err.isCanceled) {
				cb(err)
			}
		});
		return cancellable;
	}



}


export {
	Wrapper
}
