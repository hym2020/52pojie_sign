import request from 'request'


export default function(){
	return new Promise(resolve => {
		const req = request({
			url: "https://www.52pojie.cn/"
		}, () => {
			resolve({
				hostURL: `https://${req.uri.hostname}`,
				hostname: req.uri.hostname
			})
		})	
	})
}