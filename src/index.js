import login from '../core/discuzLogin'
import signup from './mySign'
import fs from 'fs'
import path from 'path'


const sleep = sec => new Promise(resolve => setTimeout(resolve, sec*1000))

async function main(){
	console.log('取得真實位址...')
	const siteURL = fs.readFileSync(path.resolve('newestHistURL'), 'utf8')
	console.log('/------------------------------------/')
	console.log('/------------------------------------/')
	
	
	
	console.log('正在使用腳本登錄...')
	const logger = new login('52pojie', '', '', siteURL , true, true)
	const r = await logger.siteUtils.sendGetRequest(siteURL)
	console.log('/------------------------------------/')
	console.log('/------------------------------------/')
	
	
	
	
	console.log('確認Cookie是否為登陸狀態...')
	let isLogin = logger.siteUtils.isLogin()
	console.log('/------------------------------------/')
	console.log('/------------------------------------/')
	if(!isLogin){
		console.log('Cookie錯誤，未登錄')
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		return
	}
	else{
		
		
		
		
		console.log('正在準備簽到...')
		await sleep(3);
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
	
	
	
	
		
		const signupRst = await signup(logger)
		if(!signupRst){
			console.log('簽到出錯!!')
			console.log('/------------------------------------/')
			console.log('/------------------------------------/')
			return
		}
		console.log('成功，簽到結果為...')
		console.log(signupRst)
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		return;
	}
}

main()