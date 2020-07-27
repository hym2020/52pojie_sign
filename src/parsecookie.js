import fs from 'fs'
import path from 'path'
import atob from 'atob'
import linebot from 'linebot'
import getNewestURL from './getNewestURL'

const cookieDir = path.resolve('cookies')
	, cookiePath = path.resolve('cookies/52pojie.json')
	, botTokens = {
		channelId: process.env.LINECHANNEL,
		channelSecret: process.env.LINESECRET,
		channelAccessToken: process.env.LINECHANNELTOKEN
	  }

function makeCookies(){
	getNewestURL().then(newest => {
		const jsonFile = JSON.parse(atob(process.env.COOKIE))
							.filter(e => e.domain == newest.hostname)
							.map(e => {
								const mapping = {
									expirationDate: "expires",
									name: "key",
									sameSite: null,
									session: null,
									domain: "domain",
									hostOnly: "hostOnly",
									httpOnly: "httpOnly",
									path: "path",
									secure: "secure",
									storeId: null,
									value: "value",
									id: null
									}
									
									
									let o2 = {}
									
									
									
									Object.keys(e).forEach(r => {
										if(!mapping.hasOwnProperty(r) || mapping[r] === null)
											return
										
										if(r == "expirationDate"){
											o2[mapping.expirationDate] = new Date(e[r] * 1000).toISOString()
										}
										else
											o2[mapping[r]] = e[r]
									})

									return o2
								})
							.reduce((a,e) => Object.defineProperty(a, e.key, {value: e, enumerable:true}), {})
			, dist = {
				[newest.hostname]: {}
			}

		dist[newest.hostname]["/"] = jsonFile
		
		if(!fs.existsSync(cookieDir)){
			fs.mkdirSync(cookieDir)
		}
		
		fs.writeFileSync(cookiePath, JSON.stringify(dist), 'utf8')
		fs.writeFileSync(path.resolve('newestHistURL'), newest.hostURL, 'utf8')
	})
}


function checkCookies(){
	
	function sendMessage(){
		const bot = linebot({...botTokens})
		bot.push(process.env.LINE_USERID, 'SITE: 52pojie cookies is about to expired')
	}

	
	if(fs.existsSync(cookiePath)){
		const sitecookies = JSON.parse(fs.readFileSync(cookiePath, 'utf8'))
			, authKey = Object.keys(sitecookies[Object.keys(sitecookies)[0]]["/"]).find(e => /auth/.test(e))
		
		if(new Date().getTime() >= new Date(sitecookies[Object.keys(sitecookies)[0]]["/"][authKey].expires).getTime())
			sendMessage()
	}
}

if(process.argv[2] == "make")
	makeCookies()
else if(process.argv[2] == "check")
	checkCookies()