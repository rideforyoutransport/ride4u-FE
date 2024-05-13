
let cb = undefined;

const setCb = a => {
	cb = a;
}

const showToast = item => {
	if(cb){
		cb(item.message,item.type==="success")
	}
}

const handleError = item => {
	if(cb){
		cb(item.data.error,false)
	}
}

export {
	 showToast,  handleError ,setCb
}
