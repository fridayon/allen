/*

#签到详情获取signheader and signkey，一定要签到详情界面获取到的
#看广告获取adheader and adkey
#看一个视频获取readheader and readkey

*/


const jsname='火山极速_小爱豆'
const $ = Env(jsname)
const notify = $.isNode() ?require('./sendNotify') : '';
$.idx = ($.idx = ($.getval("hotsooncount") || "1") - 1) > 0 ? `${$.idx + 1}` : ""; // 账号扩展字符
const hotsoonsignheaderArr = [],hotsoonsignkeyArr=[]
const hotsoonadheaderArr = [],hotsoonadkeyArr=[]
const hotsoonreadheaderArr = [],hotsoonreadkeyArr=[]
const hotsoonspamheaderArr = [],hotsoonspamkeyArr=[]
let hotsoonsignheader = $.getdata('hotsoonsignheader')
let hotsoonsigncookie = $.getdata('hotsoonsigncookie')

let hotsoonadheader = $.getdata('hotsoonadheader')
let hotsoonadkey = $.getdata('hotsoonadkey')
let no = 1;
let hotsoonreadheader = $.getdata('hotsoonreadheader')
let hotsoonreadkey = $.getdata('hotsoonreadkey')
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''

if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 
if ($.isNode()) {
//sign
  if (process.env.HOTSOONSIGNHEADER && process.env.HOTSOONSIGNHEADER.indexOf('#') > -1) {
   hotsoonsignheader = process.env.HOTSOONSIGNHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.HOTSOONSIGNHEADER && process.env.HOTSOONSIGNHEADER.indexOf('\n') > -1) {
   hotsoonsignheader = process.env.HOTSOONSIGNHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   hotsoonsignheader = process.env.HOTSOONSIGNHEADER.split()
  };
  if (process.env.HOTSOONSIGNKEY&& process.env.HOTSOONSIGNKEY.indexOf('#') > -1) {
   hotsoonsignkey = process.env.HOTSOONSIGNKEY.split('#');
  }
  else if (process.env.HOTSOONSIGNKEY && process.env.HOTSOONSIGNKEY.split('\n').length > 0) {
   hotsoonsignkey = process.env.HOTSOONSIGNKEY.split('\n');
  } else  {
   hotsignkey = process.env.HOTSOONSIGNKEY.split()
  };
//AD
if (process.env.HOTSOONADHEADER && process.env.HOTSOONADHEADER.indexOf('#') > -1) {
   hotsoonadheader = process.env.HOTSOONADHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.HOTSOONADHEADER && process.env.HOTSOONADHEADER.indexOf('\n') > -1) {
   hotsoonadheader = process.env.HOTSOONADHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   hotsoonadheader = process.env.HOTSOONADHEADER.split()
  };
  if (process.env.HOTSOONADKEY && process.env.HOTSOONADKEY.indexOf('#') > -1) {
   hotsoonadkey = process.env.HOTSOONADKEY.split('#');
  }
  else if (process.env.HOTSOONADKEY && process.env.HOTSOONADKEY.split('\n').length > 0) {
   hotsoonadkey = process.env.HOTSOONADKEY.split('\n');
  } else  {
   hotsoonadkey = process.env.HOTSOONADKEY.split()
  };
//video
if (process.env.HOTSOONREADHEADER && process.env.HOTSOONREADHEADER.indexOf('#') > -1) {
   hotsoonreadheader = process.env.HOTSOONREADHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.HOTSOONREADHEADER && process.env.HOTSOONREADHEADER.indexOf('\n') > -1) {
   hotsoonreadheader = process.env.HOTSOONREADHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   hotsoonreadheader = process.env.HOTSOONREADHEADER.split()
  };
  if (process.env.HOTSOONREADKEY && process.env.HOTSOONREADKEY.indexOf('#') > -1) {
   hotsoonreadkey = process.env.HOTSOONREADKEY.split('#');
  }
  else if (process.env.HOTSOONREADKEY && process.env.HOTSOONREADKEY.split('\n').length > 0) {
   hotsoonreadkey = process.env.HOTSOONREADKEY.split('\n');
  } else  {
   hotsoonreadkey = process.env.HOTSOONREADKEY.split()
  };
//Spam
if (process.env.HOTSOONSPAMHEADER && process.env.HOTSOONSPAMHEADER.indexOf('#') > -1) {
   hotsoonspamheader = process.env.HOTSOONSPAMHEADER.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.HOTSOONSPAMHEADER && process.env.HOTSOONSPAMHEADER.indexOf('\n') > -1) {
   hotsoonspamheader = process.env.HOTSOONSPAMHEADER.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   hotsoonspamheader = process.env.HOTSOONSPAMHEADER.split()
  };
  if (process.env.HOTSOONSPAMKEY && process.env.HOTSOONSPAMKEY.indexOf('#') > -1) {
   hotsoonspamkey = process.env.HOTSOONSPAMKEY.split('#');
  }
  else if (process.env.HOTSOONSPAMKEY && process.env.HOTSOONSPAMKEY.split('\n').length > 0) {
   hotsoonspamkey = process.env.HOTSOONSPAMKEY.split('\n');
  } else  {
   hotsoonspamkey = process.env.HOTSOONSPAMKEY.split()
  };
//sign
  Object.keys(hotsoonsignheader).forEach((item) => {
        if (hotsoonsignheader[item]) {
          hotsoonsignheaderArr.push(hotsoonsignheader[item])
        }
    });
    Object.keys(hotsoonsignkey).forEach((item) => {
        if (hotsoonsignkey[item]) {
          hotsoonsignkeyArr.push(hotsoonsignkey[item])
        }
    });
//step
Object.keys(hotsoonadheader).forEach((item) => {
        if (hotsoonadheader[item]) {
          hotsoonadheaderArr.push(hotsoonadheader[item])
        }
    });
    Object.keys(hotsoonadkey).forEach((item) => {
        if (hotsoonadkey[item]) {
          hotsoonadkeyArr.push(hotsoonadkey[item])
        }
    });
//read
Object.keys(hotsoonreadheader).forEach((item) => {
        if (hotsoonreadheader[item]) {
          hotsoonreadheaderArr.push(hotsoonreadheader[item])
        }
    });
    Object.keys(hotsoonreadkey).forEach((item) => {
        if (hotsoonreadkey[item]) {
          hotsoonreadkeyArr.push(hotsoonreadkey[item])
        }
    });
//Spam
Object.keys(hotsoonspamheader).forEach((item) => {
        if (hotsoonspamheader[item]) {
          hotsoonspamheaderArr.push(hotsoonspamheader[item])
        }
    });
    Object.keys(hotsoonspamkey).forEach((item) => {
        if (hotsoonspamkey[item]) {
          hotsoonspamkeyArr.push(hotsoonspamkey[item])
        }
    });
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    hotsoonsignheaderArr.push($.getdata('hotsoonsignheader'))
    hotsoonsignkeyArr.push($.getdata('hotsoonsignkey'))
    hotsoonadheaderArr.push($.getdata('hotsoonadheader'))
    hotsoonadkeyArr.push($.getdata('hotsoonadkey'))
    hotsoonreadheaderArr.push($.getdata('hotsoonreadheader'))
    hotsoonreadkeyArr.push($.getdata('hotsoonreadkey'))
    hotsoonspamheaderArr.push($.getdata('hotsoonspamheader'))
    hotsoonspamkeyArr.push($.getdata('hotsoonspamkey'))
    let hotsooncount = ($.getval('hotsooncount') || '1');
  for (let i = 2; i <= hotsooncount; i++) {
    hotsoonsignheaderArr.push($.getdata(`hotsoonsignheader${i}`))
    hotsoonsignkeyArr.push($.getdata(`hotsoonsignkey${i}`))
    hotsoonadheaderArr.push($.getdata(`hotsoonadheader${i}`))
    hotsoonadkeyArr.push($.getdata(`hotsoonadkey${i}`))
    hotsoonreadheaderArr.push($.getdata(`hotsoonreadheader${i}`))
    hotsoonreadkeyArr.push($.getdata(`hotsoonreadkey${i}`))
    hotsoonspamheaderArr.push($.getdata('hotsoonspamheader${i}'))
    hotsoonspamkeyArr.push($.getdata('hotsoonspamkey${i}'))
  }
}
!(async () => {
if (!hotsoonsignheaderArr[0]) {
    $.msg($.name, '【提示】请先获取火山视频极速版一cookie')
    return;
  }
   console.log(`------------- 共${hotsoonsignheaderArr.length}个账号----------------\n`)
  for (let h = 0; h < 12; h++) {
     console.log(`🚴‍♀️🚴‍♀️🚴‍♀️开始执行第${h+1}轮任务----------------🚴‍♀️🚴‍♀️🚴‍♀️\n`)
  for (let i = 0; i < hotsoonsignheaderArr.length; i++) {
    if (hotsoonsignheaderArr[i]) {
      message = ''
      hotsoonsignheader = hotsoonsignheaderArr[i];
      hotsoonsignkey = hotsoonsignkeyArr[i];
      hotsoonadheader = hotsoonadheaderArr[i];
      hotsoonadkey = hotsoonadkeyArr[i];
      hotsoonreadheader = hotsoonreadheaderArr[i];
      hotsoonreadkey = hotsoonreadkeyArr[i];
      hotsoonspamheader = hotsoonspamheaderArr[i];
      hotsoonspamkey = hotsoonspamkeyArr[i];
      $.index = i + 1;
      console.log(`\n开始【火山视频极速版${$.index}】`)
      //await userinfo()
      if (h == 0 && hour == 6 || h == 0 && hour == 7) await sign_in()
      if (h%4 == 0) await treasure_task()
      await control()
      for (let j = 0; j < 3; j++) {
      //await profit()
      await spam()
      //await skill()
      await watch_video()
      await $.wait(20000)
      }
      if (h == 11 && hour == 18 ||h == 11 && hour == 19 ) await showmsg()
  }
 }
      await $.wait(240000)
      }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
function GetCookie() {
 if($request&&$request.url.indexOf("hotsoon"&&"sign_in_detail")>=0) {
  const hotsoonsignheader = $request.url.split(`?`)[1]
    if (hotsoonsignheader) $.setdata(hotsoonsignheader,`hotsoonsignheader${$.idx}`)
    $.log(`[${jsname}] 获取sign请求: 成功,hotsoonsignheader: ${hotsoonsignheader}`)
    $.msg(`获取hotsoonsignheader: 成功🎉`, ``)
   const hotsoonsignkey = JSON.stringify($request.headers)
  if(hotsoonsignkey)        $.setdata(hotsoonsignkey,`hotsoonsignkey${$.idx}`)
    $.log(`[${jsname}] 获取sign请求: 成功,hotsoonsignkey: ${hotsoonsignkey}`)
    $.msg(`获取hotsoonsignkey: 成功🎉`, ``)
 }
 if($request&&$request.url.indexOf('hotsoon'&&"daily_read")>=0) {
	  const hotsoonreadheader = $request.url.split(`?`)[1]
	    if (hotsoonreadheader) $.setdata(hotsoonreadheader,`hotsoonreadheader${$.idx}`)
	    $.log(`[${jsname}] 获取read请求: 成功,hotsoonreadheader: ${hotsoonreadheader}`)
	    $.msg(`获取hotsoonreadheader: 成功🎉`, ``)
	   const hotsoonreadkey = JSON.stringify($request.headers)
	  if(hotsoonreadkey)        $.setdata(hotsoonreadkey,`hotsoonreadkey${$.idx}`)
	    $.log(`[${jsname}] 获取read请求: 成功,readkey: ${hotsoonreadkey}`)
	    $.msg(`获取hotsoonreadkey: 成功🎉`, ``)
	 }
 if($request&&$request.url.indexOf('hotsoon' && "draw_excitation_ad")>=0) {
	  const hotsoonadheader = $request.url.split(`?`)[1]
	    if (hotsoonadheader) $.setdata(hotsoonadheader,`hotsoonadheader${$.idx}`)
	    $.log(`[${jsname}] 获取AD请求: 成功,hotsoonadheader: ${hotsoonadheader}`)
	    $.msg(`获取hotsoonadheader: 成功🎉`, ``)
	   const hotsoonadkey = JSON.stringify($request.headers)
	  if(hotsoonadkey)        $.setdata(hotsoonadkey,`hotsoonadkey${$.idx}`)
	    $.log(`[${jsname}] 获取AD请求: 成功,hotsoonadkey: ${hotsoonadkey}`)
	    $.msg(`获取hotsoonadkey: 成功🎉`, ``)
	 }
    }
//签到
function sign_in() {
return new Promise((resolve, reject) => {
  let sign_inurl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/sign_in?${hotsoonsignheader}`,
    headers: JSON.parse(hotsoonsignkey),
}
   $.post(sign_inurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
          message += '📣签到\n'
      if(result.err_no == 0) {
          message += result.err_tips+'\n'
	  console.log(`【签到】${result.err_tips}；`)
      }else{
          message +='⚠️异常'+result.err_tips+'\n'
	  console.log(`【签到】⚠️异常，${result.err_tips}；`)
           }
          resolve()
    })
   })
  } 
//随机宝箱
function treasure_task() {
return new Promise((resolve, reject) => {
  let treasure_taskurl ={
	url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/treasure_task?${hotsoonsignheader}`,
    headers: JSON.parse(hotsoonsignkey),
}
   $.post(treasure_taskurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs) $.log(data)
      message += '📣随机宝箱\n'
      if(result.err_no == 0) {
           message += result.err_tips+result.data.tips+'\n'
	   console.log(`【宝箱】${result.err_tips}，获得:${result.data.tips}；`)
       }else{
    	   message += '⚠️异常'+result.err_tips+'\n'
	   console.log(`【宝箱】⚠️异常，${result.err_tips}；`)
       }
          resolve()
    })
   })
  } 
async function control(){
   if(hotsoonadkey){
      await ad();
   }else{
     $.log("跳过广告收益，您没有此活动")
     }
}
//广告
function ad() {
return new Promise((resolve, reject) => {
  let adurl ={
      url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/draw_excitation_ad?${hotsoonadheader}`,
      headers: JSON.parse(hotsoonadkey),
      body:`{

}`,
	 timeout: 60000,
}
   $.post(adurl,(error, response, data) =>{
     const result = JSON.parse(data)
     if(logs) $.log(data)
     message += '📣广告收益\n'
     if(result.err_no == 0) {
          message += '🎉'+result.err_tips+"获得:"+result.data.amount+'\n'
	  console.log(`【广告】🎉${result.err_tips}，获得:${result.data.amount}`)
      }else{
   	   message += '⚠️异常'+result.err_tips+'\n'
	   console.log(`【广告】⚠️异常，${result.err_tips}；`)
      }
         resolve()
   })
  })
 } 
//tasklist
/*function tasklist() {
return new Promise((resolve, reject) => {
  let tasklisturl ={
    url: `https://i.snssdk.com/luckycat/hotsoon/v1/task/page?&polaris_${hotsoonsignheader}`,
    headers :JSON.parse(hotsoonsignkey),
}
   $.get(tasklisturl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
      for(let i = 2;i<=7;i++){
        if(result.data.daily_tasks[i].completed == false) {
         no = result.data.daily_tasks[i].name.match(/\d+/)          
          break;
       }
         else if(result.data.daily_tasks[i].completed == true){
          no = result.data.daily_tasks[i+1].name.match(/\d+/)
           if(no == 'undefined') done;
         }
}
          resolve()
    })
   })
  } 
*/

//profit
function profit() {
return new Promise((resolve, reject) => {
  let profiturl ={
    url: `https://i-hl.snssdk.com/luckycat/hotsoon/v1/wallet/profit_detail_page?income_type=2&num=80&${hotsoonsignheader}`,
    headers :JSON.parse(hotsoonsignkey),
}
   $.get(profiturl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
for(let i =0;i<=result.data.profit_detail.score_income_list.length;i++){
if(result.data.profit_detail.score_income_list[i].desc.match(/\d+/)) {
         no = result.data.profit_detail.score_income_list[i].desc.match(/\d+/)          
$.log(no)
         break;
}
}
          resolve()
    })
   })
  } 



/*
//tasklist
function tasklist() {
return new Promise((resolve, reject) => {
  let tasklisturl ={
    url: `https://i.snssdk.com/luckycat/hotsoon/v1/task/page?&polaris_${hotsoonsignheader}`,
    headers :JSON.parse(hotsoonsignkey),
}
   $.get(tasklisturl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
      var a = result.data.daily_tasks.find(item => item.task_id === 1001).completed
      var b = result.data.daily_tasks.find(item => item.task_id === 1017).completed
      var c = result.data.daily_tasks.find(item => item.task_id === 1006).completed
      var d = result.data.daily_tasks.find(item => item.task_id === 1003).completed
      var e = result.data.daily_tasks.find(item => item.task_id === 1005).completed
      var f = result.data.daily_tasks.find(item => item.task_id === 1009).completed
      var g = result.data.daily_tasks.find(item => item.task_id === 1010).completed
      if(a) no=2
      if(b) no=5
      if(c) no=10
      if(d) no=20
      if(e) no=30
      if(f) no=60
      if(g) {      
      $.log('视频任务完成')
      message += '视频任务完成\n'
      if(!a)
      no=1
     }
      resolve()
    })
   })
  }

*/


//skill
/*function skill() {
return new Promise((resolve, reject) => {
  let skillurl ={
    url: `https://i-hl.snssdk.com/luckycat/hotsoon/v1/wallet/profit_detail_page?income_type=2&num=50&${hotsoonsignheader}`,
    headers :JSON.parse(hotsoonsignkey),
}
   $.get(skillurl,(error, response, data) =>{
     const result = JSON.parse(data)
        //if(logs)$.log(data)
  if(data.match(/\-\d+/)){
     message += '昨日金币'+data.match(/\-\d+/)+'\n'
     operate = 1;
   }else{
     operate = 0;
}
  return watch_video(no);      
          resolve()
    })
   })
  } 
*/

//Spam
function spam() {
return new Promise((resolve, reject) => {
  let spamurl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/spam/pre_check?${hotsoonspamheader}`,
    headers: JSON.parse(hotsoonspamkey),
    timeout: 60000,
}
   $.get(spamurl,(error, response, data) =>{
     const result = JSON.parse(data)
     console.log(`【Spam】${result.err_tips}；`)
          resolve()
    })
   })
  } 

//看视频
function watch_video() {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_1m?version_code=7.6.1&app_name=live_stream_lite&vid=F8488563-79A8-4F10-8313-B25025043D7F&device_id=68445942781&channel=App%20Store&new_nav=0&aid=1350&ab_version=2067445,2063843,1944969,2056421,1698610,1776523,1479194,1258912,1810159,1521584,2071008,2054328,2008903,2071381,2031266,1751686,2032795,1432944,1569025,2002020,1568501,2061162,1802649,1618171,2076907,1830688,2078562,1340192,2080540,2063340,2027697,1880619,1917928,2071181,1993142,1856843,1801795,2033170,1978301,2014044,1747490,1745644,1972816,2066270,1317441,2025428,692223,2034632,1683111,1974796,2062707,2069850,1788903,1399159,1019139,2000818,1992860,1032070,1973126,2050796,1540549,2034028,1502678,2003549,1477984,2078274,1572498,2065549,1409058,1837386,2080075,1625927,1568501&ab_group=1568501&screen_width=750&client_request_id=d31ea4c1ad0e0c1ef534b1b11d2b5a75&openudid=212febcfeb5820b579e6d22c17bf89b70f07fc40&live_sdk_version=7.6.1&update_version_code=7611&os_api=18&ws_status=CLOSED&ac=WIFI&mccmnc=&os_version=14.0&client_version_code=761&device_platform=iphone&iid=4327299917021549&device_type=iPad7,5&idfa=71A7ADD8-40B1-4D5F-BCA0-73E278451A36`,
    headers: {
    "x-tt-trace-id": "00-0d9649a409fefb233fd2939fd1610546-0d9649a409fefb23-01",
    "Connection": "keep-alive",
    "Accept-Encoding": "gzip, deflate",
    "X-SS-Cookie": "d_ticket=c34ab6943249c08f88595471efa5a6dea8305; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; install_id=4327299917021549; passport_csrf_token=c956d22d750f9e061a72a25adb20da32; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf",
    "sdk-version": "1",
    "Content-Type": "application/json; encoding=utf-8",
    "x-Tt-Token": "0094fa705bf6685d07cd4adbe28f457c44a2441c559b1bf506ddf511bc2a88c4ed6fb70bba6f975605ef0848bb6a49631959",
    "X-SS-STUB": "D41D8CD98F00B204E9800998ECF8427E",
    "X-Khronos": "1602250753",
    "User-Agent": "HotsoonLite 7.6.1 rv:7611 (iPad; iOS 14.0; zh_CN) Cronet",
    "tt-request-time": "1602250754092",
    "Cookie": "passport_csrf_token=c956d22d750f9e061a72a25adb20da32; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27",
    "Host": "ib-hl.snssdk.com",
    "X-Gorgon": "8402e01000005844b05907fce6e801035aca05ca04e9adaacc87",
    "Accept": "application/json",
    "Content-Length": "0"
},
    timeout: 60000,
}
   $.post(watch_videourl,async(error, response, data) =>{
     const result = JSON.parse(data)
       //$.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
           //return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
          await watch_video2()
      }
          resolve()
    })
   })
  } 

function watch_video2() {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_2m?version_code=7.6.1&app_name=live_stream_lite&vid=F8488563-79A8-4F10-8313-B25025043D7F&device_id=68445942781&channel=App%20Store&new_nav=0&aid=1350&ab_version=2067445,2063843,1944969,2056421,1698610,1776523,1479194,1258912,1810159,1521584,2071008,2054328,2008903,2071381,2031266,1751686,2032795,1432944,1569025,2002020,1568501,2061162,1802649,1618171,2076907,1830688,2078562,1340192,2080540,2063340,2027697,1880619,1917928,2071181,1993142,1856843,1801795,2033170,1978301,2014044,1747490,1745644,1972816,2066270,1317441,2025428,692223,2034632,1683111,1974796,2062707,2069850,1788903,1399159,1019139,2000818,1992860,1032070,1973126,2050796,1540549,2034028,1502678,2003549,1477984,2078274,1572498,2065549,1409058,1837386,2080075,1625927,1568501&ab_group=1568501&screen_width=750&client_request_id=0ad243569e6666088bd395cd41b33d62&openudid=212febcfeb5820b579e6d22c17bf89b70f07fc40&live_sdk_version=7.6.1&update_version_code=7611&os_api=18&ws_status=CLOSED&ac=WIFI&mccmnc=&os_version=14.0&client_version_code=761&device_platform=iphone&iid=4327299917021549&device_type=iPad7,5&idfa=71A7ADD8-40B1-4D5F-BCA0-73E278451A36`,
    headers: {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "Content-Type": "application/json; encoding=utf-8",
    "Cookie": "passport_csrf_token=c956d22d750f9e061a72a25adb20da32; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27",
    "Host": "ib-hl.snssdk.com",
    "User-Agent": "HotsoonLite 7.6.1 rv:7611 (iPad; iOS 14.0; zh_CN) Cronet",
    "X-Gorgon": "8402c00a000097debdbb88d944fb26f7cd9960737d4429ab947c",
    "X-Khronos": "1602250834",
    "X-SS-Cookie": "d_ticket=c34ab6943249c08f88595471efa5a6dea8305; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; install_id=4327299917021549; passport_csrf_token=c956d22d750f9e061a72a25adb20da32; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf",
    "X-SS-STUB": "D41D8CD98F00B204E9800998ECF8427E",
    "sdk-version": "1",
    "tt-request-time": "1602250834698",
    "x-Tt-Token": "0094fa705bf6685d07cd4adbe28f457c44a2441c559b1bf506ddf511bc2a88c4ed6fb70bba6f975605ef0848bb6a49631959",
    "x-tt-trace-id": "00-0d97848209fefb233fd8f872db6d0546-0d97848209fefb23-01"
    },
    timeout: 60000,
}
   $.post(watch_videourl,async(error, response, data) =>{
     const result = JSON.parse(data)
       //$.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
           //return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
          await watch_video5()
      }
          resolve()
    })
   })
  } 

function watch_video5() {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_5m?version_code=7.6.1&app_name=live_stream_lite&vid=F8488563-79A8-4F10-8313-B25025043D7F&device_id=68445942781&channel=App%20Store&new_nav=0&aid=1350&ab_version=2067445,2063843,1944969,2056421,1698610,1776523,1479194,1258912,1810159,1521584,2071008,2054328,2008903,2071381,2031266,1751686,2032795,1432944,1569025,2002020,1568501,2061162,1802649,1618171,2076907,1830688,2078562,1340192,2080540,2063340,2027697,1880619,1917928,2071181,1993142,1856843,1801795,2033170,1978301,2014044,1747490,1745644,1972816,2066270,1317441,2025428,692223,2034632,1683111,1974796,2062707,2069850,1788903,1399159,1019139,2000818,1992860,1032070,1973126,2050796,1540549,2034028,1502678,2003549,1477984,2078274,1572498,2065549,1409058,1837386,2080075,1625927,1568501&ab_group=1568501&screen_width=750&client_request_id=d752c01df8c5d54b44c565774a1e4720&openudid=212febcfeb5820b579e6d22c17bf89b70f07fc40&live_sdk_version=7.6.1&update_version_code=7611&os_api=18&ws_status=CLOSED&ac=WIFI&mccmnc=&os_version=14.0&client_version_code=761&device_platform=iphone&iid=4327299917021549&device_type=iPad7,5&idfa=71A7ADD8-40B1-4D5F-BCA0-73E278451A36`,
    headers: {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "Content-Type": "application/json; encoding=utf-8",
    "Cookie": "passport_csrf_token=c956d22d750f9e061a72a25adb20da32; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27",
    "Host": "ib-hl.snssdk.com",
    "User-Agent": "HotsoonLite 7.6.1 rv:7611 (iPad; iOS 14.0; zh_CN) Cronet",
    "X-Gorgon": "840240180000a57f077baf9ff5f1d4fddced8ec9cfb7252135a8",
    "X-Khronos": "1602250885",
    "X-SS-Cookie": "d_ticket=c34ab6943249c08f88595471efa5a6dea8305; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; install_id=4327299917021549; passport_csrf_token=c956d22d750f9e061a72a25adb20da32; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf",
    "X-SS-STUB": "D41D8CD98F00B204E9800998ECF8427E",
    "sdk-version": "1",
    "tt-request-time": "1602250885588",
    "x-Tt-Token": "0094fa705bf6685d07cd4adbe28f457c44a2441c559b1bf506ddf511bc2a88c4ed6fb70bba6f975605ef0848bb6a49631959",
    "x-tt-trace-id": "00-0d984b4a09fefb233fd21ad354d20546-0d984b4a09fefb23-01"
},
    timeout: 60000,
}
   $.post(watch_videourl,async(error, response, data) =>{
     const result = JSON.parse(data)
       //$.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
          // return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
          await watch_video10()
      }
          resolve()
    })
   })
  } 

function watch_video10() {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_10m?version_code=7.6.1&app_name=live_stream_lite&vid=F8488563-79A8-4F10-8313-B25025043D7F&device_id=68445942781&channel=App%20Store&new_nav=0&aid=1350&ab_version=2067445,2063843,1944969,2056421,692223,2050796,1502678,1258912,1810159,1521584,2071008,2054328,2071381,2031266,1751686,2032795,1432944,1569025,2002020,1568501,2061162,2008903,1618171,2076907,1830688,1340192,2078562,1801795,2063340,2027697,1880619,1917928,2071181,1993142,1856843,2080540,2033170,1978301,2014044,1747490,1745644,1972816,2066270,1317441,2025428,1698610,2034632,1683111,1974796,2062707,2069850,1788903,1399159,1019139,2000818,1992860,1032070,1973126,1776523,1540549,2034028,1479194,1802649,2003549,1477984,2078274,1572498,1409058,1837386,2080075,1625927,1568501&ab_group=1568501&screen_width=750&client_request_id=c70c7b26d10216ae5c6f20d6057fd0da&openudid=212febcfeb5820b579e6d22c17bf89b70f07fc40&live_sdk_version=7.6.1&update_version_code=7611&os_api=18&ws_status=CLOSED&ac=WIFI&mccmnc=&os_version=14.0&client_version_code=761&device_platform=iphone&iid=4327299917021549&device_type=iPad7,5&idfa=71A7ADD8-40B1-4D5F-BCA0-73E278451A36`,
    headers: {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "Content-Type": "application/json; encoding=utf-8",
    "Cookie": "passport_csrf_token=c956d22d750f9e061a72a25adb20da32; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; excgd=20201009",
    "Host": "ib-hl.snssdk.com",
    "User-Agent": "HotsoonLite 7.6.1 rv:7611 (iPad; iOS 14.0; zh_CN) Cronet",
    "X-Gorgon": "8402609f00000dd849bfaac34ac079723dc0bd222ff351446280",
    "X-Khronos": "1602254020",
    "X-SS-Cookie": "excgd=20201009; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; install_id=4327299917021549; passport_csrf_token=c956d22d750f9e061a72a25adb20da32; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf",
    "X-SS-STUB": "D41D8CD98F00B204E9800998ECF8427E",
    "sdk-version": "1",
    "tt-request-time": "1602254020728",
    "x-Tt-Token": "0094fa705bf6685d07cd4adbe28f457c44a2441c559b1bf506ddf511bc2a88c4ed6fb70bba6f975605ef0848bb6a49631959",
    "x-tt-trace-id": "00-0dc821ef09fefb233fda2585d8390546-0dc821ef09fefb23-01"
    },
    timeout: 60000,
}
   $.post(watch_videourl,async(error, response, data) =>{
     const result = JSON.parse(data)
       //$.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
           //return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
          await watch_video20()
      }
          resolve()
    })
   })
  } 

function watch_video20() {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_20m?version_code=7.6.1&app_name=live_stream_lite&vid=F8488563-79A8-4F10-8313-B25025043D7F&device_id=68445942781&channel=App%20Store&new_nav=0&aid=1350&ab_version=2067445,2063843,1944969,2056421,692223,2050796,1502678,1258912,1810159,1521584,2071008,2054328,2008903,2031266,1477984,2032795,1432944,1569025,2002020,1568501,2061162,2071381,1618171,2076907,1830688,2078562,1340192,2080540,2063340,2027697,1880619,1917928,2071181,1993142,1440145,1856843,1801795,2033170,1978301,2014044,1747490,1745644,1972816,2066270,1317441,2025428,1698610,2034632,1683111,1974796,2062707,2069850,1788903,1399159,1019139,2000818,1992860,1032070,1973126,1776523,1540549,2034028,1479194,1802649,2003549,1751686,2078274,1572498,2065549,1409058,1837386,2080075,1625927,1568501&ab_group=1568501&screen_width=750&client_request_id=e8dbe1a04ae9975796fe111ff61dd0f7&openudid=212febcfeb5820b579e6d22c17bf89b70f07fc40&live_sdk_version=7.6.1&update_version_code=7611&os_api=18&ws_status=CLOSED&ac=WIFI&mccmnc=&os_version=14.0&client_version_code=761&device_platform=iphone&iid=4327299917021549&device_type=iPad7,5&idfa=71A7ADD8-40B1-4D5F-BCA0-73E278451A36`,
    headers: {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "Content-Type": "application/json; encoding=utf-8",
    "Cookie": "passport_csrf_token=c956d22d750f9e061a72a25adb20da32; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; excgd=20201009",
    "Host": "ib-hl.snssdk.com",
    "User-Agent": "HotsoonLite 7.6.1 rv:7611 (iPad; iOS 14.0; zh_CN) Cronet",
    "X-Gorgon": "8402005c0000e346a06eca35e4083477cbefe994af17d16c4cdf",
    "X-Khronos": "1602254766",
    "X-SS-Cookie": "excgd=20201009; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; install_id=4327299917021549; passport_csrf_token=c956d22d750f9e061a72a25adb20da32; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf",
    "X-SS-STUB": "D41D8CD98F00B204E9800998ECF8427E",
    "sdk-version": "1",
    "tt-request-time": "1602254766819",
    "x-Tt-Token": "0094fa705bf6685d07cd4adbe28f457c44a2441c559b1bf506ddf511bc2a88c4ed6fb70bba6f975605ef0848bb6a49631959",
    "x-tt-trace-id": "00-0dd3845a09fefb233fddc8c122140546-0dd3845a09fefb23-01"
    },
    timeout: 60000,
}
   $.post(watch_videourl,async(error, response, data) =>{
     const result = JSON.parse(data)
       //$.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
           //return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
          await watch_video30()
      }
          resolve()
    })
   })
  } 

function watch_video30() {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_30m?version_code=7.6.1&app_name=live_stream_lite&vid=F8488563-79A8-4F10-8313-B25025043D7F&device_id=68445942781&channel=App%20Store&new_nav=0&aid=1350&ab_version=2067445,2063843,1944969,2056421,692223,2050796,1502678,2081474,1258912,1810159,1521584,2071008,2054328,2081927,1802649,2031266,1751686,2032795,1432944,1569025,2002020,1568501,2061162,2081356,2071381,1618171,2076907,1830688,1340192,2081549,2078562,1801795,2063340,2027697,1880619,1917928,2081421,1993142,1856843,2080540,2033170,1978301,2014044,1747490,1745644,1972816,2066270,1317441,2025428,1698610,1683111,1974796,2062707,2069850,1788903,1399159,1019139,2000818,1992860,1032070,2071181,1973126,1776523,1540549,2034028,1479194,2003549,1477984,2078274,1572498,2008903,1409058,1837386,2080075,1625927,1568501&ab_group=1568501&screen_width=750&client_request_id=fcb586b356f13fdef8e167d23f05f603&openudid=212febcfeb5820b579e6d22c17bf89b70f07fc40&live_sdk_version=7.6.1&update_version_code=7611&os_api=18&ws_status=CONNECTED&ac=WIFI&mccmnc=&os_version=14.0&client_version_code=761&device_platform=iphone&iid=4327299917021549&device_type=iPad7,5&idfa=71A7ADD8-40B1-4D5F-BCA0-73E278451A36`,
    headers: {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "Content-Type": "application/json; encoding=utf-8",
    "Cookie": "odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; sid_tt=94fa705bf6685d07cd4adbe28f457c44; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf; excgd=20201010",
    "Host": "ib-hl.snssdk.com",
    "User-Agent": "HotsoonLite 7.6.1 rv:7611 (iPad; iOS 14.0; zh_CN) Cronet",
    "X-Gorgon": "84020074000075fc29cf87294840400b5c6ecc158296f052492f",
    "X-Khronos": "1602332469",
    "X-SS-Cookie": "excgd=20201010; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1602250593%7C5184000%7CTue%2C+08-Dec-2020+13%3A36%3A33+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf",
    "X-SS-STUB": "D41D8CD98F00B204E9800998ECF8427E",
    "sdk-version": "1",
    "tt-request-time": "1602332469653",
    "x-Tt-Token": "0094fa705bf6685d07cd4adbe28f457c44a2441c559b1bf506ddf511bc2a88c4ed6fb70bba6f975605ef0848bb6a49631959",
    "x-tt-trace-id": "00-12752b0c09fefb233fd1ff679fae0546-12752b0c09fefb23-01"
    },
    timeout: 60000,
}
   $.post(watch_videourl,async(error, response, data) =>{
     const result = JSON.parse(data)
       //$.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
           //return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
          await watch_video60()
      }
          resolve()
    })
   })
  } 

function watch_video60() {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_60m?version_code=7.6.1&app_name=live_stream_lite&vid=F8488563-79A8-4F10-8313-B25025043D7F&device_id=68445942781&new_nav=0&channel=App%20Store&aid=1350&ab_group=1568501&screen_width=750&client_request_id=c8e5da440832dc7eaa600d744edbcfae&openudid=212febcfeb5820b579e6d22c17bf89b70f07fc40&live_sdk_version=7.6.1&update_version_code=7611&os_api=18&ws_status=CONNECTED&ac=WIFI&mccmnc=&os_version=14.2&client_version_code=761&device_platform=iphone&iid=4327299917021549&device_type=iPad7,5&idfa=71A7ADD8-40B1-4D5F-BCA0-73E278451A36`,
    headers: {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Content-Length": "0",
    "Content-Type": "application/json; encoding=utf-8",
    "Cookie": "odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1610967020%7C5184000%7CFri%2C+19-Mar-2021+10%3A50%3A20+GMT; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; sid_tt=94fa705bf6685d07cd4adbe28f457c44; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf",
    "Host": "ib-hl.snssdk.com",
    "User-Agent": "HotsoonLite 7.6.1 rv:7611 (iPad; iOS 14.2; zh_CN) Cronet",
    "X-Gorgon": "8402a0650000c911010cd7f5a4e4f48b97888945e98bf187d1ab",
    "X-Khronos": "1611323914",
    "X-SS-Cookie": "install_id=4327299917021549; ttreq=1$dbe44cfcdabaa32e39e6a764c85d3c2c3fd111cf; sessionid=94fa705bf6685d07cd4adbe28f457c44; sessionid_ss=94fa705bf6685d07cd4adbe28f457c44; sid_guard=94fa705bf6685d07cd4adbe28f457c44%7C1610967020%7C5184000%7CFri%2C+19-Mar-2021+10%3A50%3A20+GMT; sid_tt=94fa705bf6685d07cd4adbe28f457c44; uid_tt=cf316afde271fa7023ae424b264f6d27; uid_tt_ss=cf316afde271fa7023ae424b264f6d27; d_ticket=c34ab6943249c08f88595471efa5a6dea8305; odin_tt=5a1e1602d0df8e51a054d1471e5d0230012426798e9a05aee97adf3903e2ac9d9873a7f4d346fc0adccbbd6cc7b23ba59192ad3cfec61514aeeabd7af0798dde",
    "X-SS-STUB": "D41D8CD98F00B204E9800998ECF8427E",
    "sdk-version": "1",
    "tt-request-time": "1611323907230",
    "x-Tt-Token": "0094fa705bf6685d07cd4adbe28f457c44017d3dc8b712eb077ce980b9c814a67cc8a4dbd735366447909f4d7c88506749044a3ec27055e0a0b094e6d8f810f996aa5fa5d4ee440343e282d3aa29f8fc878bac79c85f80ee81237dee7e70ebecf581d-1.0.1",
    "x-tt-trace-id": "00-2a639e1609fefb233fd6f518d7880546-2a639e1609fefb23-01"
    },
    timeout: 60000,
}
   $.post(watch_videourl,async(error, response, data) =>{
     const result = JSON.parse(data)
       //$.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
           //return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
      }
          resolve()
    })
   })
  } 


/*
function watch_video(no) {
return new Promise((resolve, reject) => {
  let watch_videourl ={
    url: `https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_${no}m?${hotsoonreadheader}`,
    headers: JSON.parse(hotsoonreadkey),
    timeout: 60000,
}
   $.post(watch_videourl,(error, response, data) =>{
     const result = JSON.parse(data)
       $.log('hotsoon'+no) 
       if(logs) $.log(data)
       message += '📣看视频\n'
      if(result.err_no == 10012){
          message += '⚠️异常:'+no+'时段任务完成\n'
	  console.log(`【视频】⚠️异常，${no}时段任务完成；`)
      }
      else if(result.err_no == 0) {
          message +='🎉'+result.err_tips+'获得:'+result.data.amount+"\n"
	  console.log(`【视频】🎉${result.err_tips}，获得:${result.data.amount}；`)
           return showmsg()
        }
      else{
          message += '⚠️异常:'+result.err_tips+'\n'+'慢点看，不要慌，一会恢复\n'
	  console.log(`【视频】⚠️异常，${result.err_tips}；`)
          //let other = '⚠️异常:'+result.err_tips+'请重新获取readkey\n'
          //$.msg(jsname,'',other)
          //return showmsg()
      }
          resolve()
    })
   })
  } 
  */
  
  
  
function showmsg(){
if(tz==1){
    if ($.isNode()){
     $.log(message)
    if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
       notify.sendNotify($.name,message)
     }
   }else{
      $.log(message)
    if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
       $.msg(jsname,'',message)
}
}
   }else{
       $.log(message)
    }
 }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
