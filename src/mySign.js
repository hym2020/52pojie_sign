async function signUp(myLogger){
	
	const { siteUtils, hostURL } = myLogger

	
	try{
		const rst = (await siteUtils.sendGetRequest(`${hostURL}/home.php?mod=task&do=apply&id=2`, {}, true, 'gb2312')).body
		console.log(rst)
		if(/本期您已申请过此任务/.test(rst))
			return Promise.resolve('已經簽過')
		if(/任务已成功完成/)
			return Promise.resolve('成功簽到')
		else
			return Promise.resolve('未知內容，請稍後查看')
		
	}
	catch(e){
		console.log('Sign Error: ' + e.message)
		return Promise.resolve(false)
	}
}

export default signUp
