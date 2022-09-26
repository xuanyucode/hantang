//封装发送Ajax函数
//options接收传递对象
//options.type 请求的方法
// options.url  接口地址
//options.async 是否为异步
//options.data 传递给接口的参数,需要转换为查询字符串
//options.success 是一个函数，作为回调函数，用于获取结果，结果在回调函数的参数中

//声明变量，保用于保存服务器地址
var baseURL='http://127.0.0.1:3000'
function request(options){
	// console.log(options.data)
	//将传递给接口的参数转为查询字符串
	var arr=[]
	for(var k in options.data){
		//k参数名   options.data[k]参数值
		arr.push(k+'='+options.data[k])
	}
	var params=arr.join('&')
	console.log(params)
	// 如果没有传递是否为异步，设置默认为异步
	options.async=options.async || true
	//创建HTTP请求对象
	var xhr=new XMLHttpRequest()
	//将请求方法转大写
	var　method=options.type.toUpperCase()
	//判断请求方法，GET和DELETE相同，PUT和POST相同
	if(method==='GET'||method==='DELETE'){
		//打开服务器连接，请求接口,把参数拼接到接口地址后面
		xhr.open(method,baseURL+options.url+'?'+params,options.async)
		//发送请求
		xhr.send()
	}else if(method==='PUT'||method==='POST'){
		//打开服务器连接，请求接口
		xhr.open(method,baseURL+options.url,options.async)
		//设置请求的内容类型
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8')
		//发送请求,将参数放入到请求主体
		xhr.send(params)
	}
	//添加事件，监听响应
	xhr.onload=function(){
		//将响应的主体 JSON转为JS 传递到外部
		options.success(JSON.parse(xhr.responseText))
	}
}
/*
request({
	type:'GET',
	url:'http://127.0.0.1:3000/v1/emps',
	async:true,
	data:{
		eid:23,
		a:1,
		b:2
	},
	success:function(res){
		console.log(res)
	}
})
*/