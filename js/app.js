
//var serverUrl='http://abcd.zlzmm.com:7200';
var serverUrl='http://api.zlzmm.com';
mui.plusReady(function(){
	if(plus.storage.getItem('SURL')){
		serverUrl = plus.storage.getItem('SURL');
	}
})

//var serverUrl='http://hijiv2.zlzmm.com';
//var serverUrl='http://192.168.199.191:7200';
//var serverUrl='http://192.168.0.8:7200';

//var serverimgUrl='http://192.168.0.128:6789';
var serverimgUrl='http://hiji.hifete.com:6789';
var serverimgUrlE='';
//var propUrl = 'http://192.168.0.128:6789';
var propUrl = 'http://abcd.zlzmm.com:6789';
var fxUrl = 'http://abcd.zlzmm.com:6789/hongfanWeb/pages/';
//var propUrl = 'http://211.149.183.181:6789';

var PAYSERVER='http://hiji.hifete.com:7200/api/alipay/payment';
var WXPAYSERVER='http://hiji.hifete.com:7200/api/wechatpay/unified';
//var WXPAYSERVER='http://192.168.199.191:7200/api/wechatpay/unified';

//执行alert方法
function alertF(content){ //非姐的方法
	//alert(content)
}
function alertY(content){ //向前的方法
//	alert(content)
}

//banner跳转
window.bannerGo = function(id,url, name, route) {
	if(url.indexOf('http')>-1 || url.indexOf('HTTP')>-1){//远程
		if(route == 'one'){//层级
			var bannerTplHtml = 'bannerTpl.html';
		}else{
			var bannerTplHtml = '../bannerTpl.html';
		}
		if(url.indexOf('pro')>-1){//高级功能的h5
			localStorage.Burlname=url;
			openview({
				view: bannerTplHtml,
				id: "bannerTpl",
				extrasobj: {
					bannerUrl: url,
					bannerName: name,
					type:'pro'
				}
			})
		}else{
			openview({//用于普通页面 (如微信公众号)
				view: bannerTplHtml,
				id: "bannerTpl",
				extrasobj: {
					bannerUrl: url,
					bannerName: name
				}
			})
		}
	}else if(url.indexOf('&')>-1 ){//本地
		var localId = url.split('&')[1],
			localUrl = url.split('&')[0],
			localUId = url.split('&')[2] || -1;
		if (url.indexOf('tickets')>-1) {/*充话费*/
			if(plus.storage.getItem('myToken')){
				 openview({
					view: localUrl,
					create: true,
					extrasobj: {
						storeId:localId,//商铺主页
						goodcatId:localId,//特色馆分类
						goodsId:localId,//商品主页
						activityId:localId,//活动主页
						storeCouponId:localId,//优惠主页
						newsId:localId,//帖子详情： 帖子id
						userId:localUId,//帖子详情： 帖子userId
						Bcity:localId//优惠卷
					}
				})
			}else{//没登陆直接打开登录页面
				mui.toast('请登录');
				openview({
					view:'login.html'
				});
			}
		}else{
			openview({
				view: localUrl,
				create: true,
				extrasobj: {
					storeId:localId,//商铺主页
					goodcatId:localId,//特色馆分类
					goodsId:localId,//商品主页
					activityId:localId,//活动主页
					storeCouponId:localId,//优惠主页
					newsId:localId,//帖子详情： 帖子id
					userId:localUId,//帖子详情： 帖子userId
					shopId:localUId,//爱购商品详情
					Bcity:localId//优惠卷

				}
			})
		}



	}
	//点击量统计
	if(id){
		countClick(id);
	}
}

//弹窗跳转
window.popGo = function(id,url, name, route) {
	event.stopPropagation();
	if(url.indexOf('http')>-1 || url.indexOf('HTTP')>-1){//远程
		if(route == 'one'){//层级
			var bannerTplHtml = 'popTpl.html';
		}else{
			var bannerTplHtml = '../popTpl.html';
		}
		if(url.indexOf('pro')>-1){//高级功能的h5
			localStorage.Burlname=url;
			openview({
				view: bannerTplHtml,
				id: "bannerTpl",
				extrasobj: {
					bannerUrl: url,
					bannerName: name,
					type:'pro'
				}
			})
		}
	}else if(url.indexOf('&')>-1 ){//本地
		var localId = url.split('&')[1],
			localUrl = url.split('&')[0],
			localUId = url.split('&')[2] || -1;
			if(plus.storage.getItem('myToken')){
				 openview({
					view: localUrl,
					create: true,
					extrasobj: {
						storeId:localId,//商铺主页
						goodcatId:localId,//特色馆分类
						goodsId:localId,//商品主页
						activityId:localId,//活动主页
						storeCouponId:localId,//优惠主页
						newsId:localId,//帖子详情： 帖子id
						userId:localUId,//帖子详情： 帖子userId
						shopId:localUId,//爱购商品详情
						Bcity:localId//优惠卷
					}
				})
			}

	}
	//点击量统计
//	if(id){
//		countClick(id);
//	}
}
//banner点击统计量
function countClick(bnid){
	mui.plusReady(function(){
		var oldToken = plus.storage.getItem('oldToken');
		var cityNum = plus.storage.getItem('cityNum');
		var	myuserid = plus.storage.getItem('userid');
		mui.ajax(serverUrl+'/api/mall/clicks',{
			data:{'adID':bnid,'clickstype':'banner','fromType':'APP','userid':myuserid},
			dataType:'json',
			type:'post',
			timeout:8000,
			headers:{"token":oldToken,"city":cityNum},
			success:function(data,type,xhr){
				//alert(('banner点击'+JSON.stringify(data)))
				console.log('banner点击'+JSON.stringify(data));
				if(data.errno==0){
					console.log('点击次数'+data.data)
				}else{
					mui.toast('当前网络不好，请重试');
				}
			},
			error:function(xhr,type,errorThrown){
				mui.toast('当前网络不好，请重试');
				console.error('响应失败');
			}
		});
	})
}

//懒加载方法
window.lazyLoad = function(init,limit){
	var limit = limit || 100;
	var loadPics = mui('.loadPics');
	var H = window.innerHeight || 1000;//可视窗口高度(避免第一次不加载)
	window.onscroll = function(){
		if(H == 0){H = window.innerHeight;}
		if(loadPics.length){
		    var S = document.documentElement.scrollTop||document.body.scrollTop;   //滚动条滚过高度
		    [].forEach.call(loadPics,function(img,index){
	         	if(!img.getAttribute('data-src')){return}
		        //console.error( H + S - limit +'===='+ getTop(img) +'====='+loadPics.length)
	         	if(H + S - limit > getTop(img)){
	             	img.src=img.getAttribute("data-src");
	             	img.removeAttribute("data-src");
             		img.style.backgroundImage = 'url()';
	             	if(img.classList.contains('loadPics')){//减少每次滚动时遍历个数
	             		img.classList.remove('loadPics');
	             		loadPics = mui('.loadPics');
	             	}
	         	}
	        })
		}
	}
	window.onscroll();
	function getTop(e){//获取元素距离顶部高度方法
	    var T = e.offsetTop;
	    while(e = e.offsetParent ){
	        T += e.offsetTop
		}
	    return T
	}
}

/*图片高宽处理*/
 window.imgHeight =  function(obj){
 	if(obj.offsetHeight == 0){/*处理高宽都为零bug*/
 		var Delayloading = setTimeout(function(){
 			imgHeight(obj);
 			clearTimeout(Delayloading),Delayloading = null;
 		},500)
 	}else{
		if(obj.offsetHeight<obj.parentNode.offsetHeight){
			obj.style.height = '100%';
			obj.style.width = 'auto';
		}
		var timePicWidth = setTimeout(function(){
			obj.style.opacity = 1;
			clearTimeout(timePicWidth),timePicWidth = null;
		},50)
 	}
}
//关注和取消关注
function followBack(thisobj,likerId,curType){
	event.stopPropagation();
	function Success(){
		event.stopPropagation();
		thisobj.css('display','none');
		thisobj.siblings().css('display','block');
	}
	Success();
 	mui.plusReady(function(){
		var oldToken = plus.storage.getItem('oldToken');
		var cityNum = plus.storage.getItem('cityNum');
		var	myuserid = plus.storage.getItem('userid');
		mui.ajax(serverUrl+'/api/friends/likeusers',{
			data:{userId:myuserid,likeUserId:likerId},
			dataType:'json',
			type:curType,
			timeout:8000,
			headers:{"token":oldToken,"city":cityNum},
			success:function(data,type,xhr){
				console.log('关注操作返回',data);
				if(data.errno==0){
				}else{
					mui.toast('当前网络不好，请重试');
					Success();
				}
			},
			error:function(xhr,type,errorThrown){
				mui.toast('当前网络不好，请重试');
				console.error('关注操作响应失败');
				Success();
			}
		});
	})
}


function addCart(cartdata,userid,token){
	mui.ajax(serverUrl+'/api/mall/shpocar',{
		data:{user_id:userid,shopCar:cartdata,isSave:1},
		dataType:'json',
		type:'post',
		timeout:8000,
		headers:{"token":token,"city":1},
		success:function(data,type,xhr){
			console.log('cart返回',data);
			if(data.errno==0){
				mui.fire(plus.webview.getWebviewById('cart.html'),'refresh');
				mui.fire(plus.webview.getWebviewById('cart'),'refresh');
			}else{
				mui.toast('当前网络不好，请重试');
			}
		},
		error:function(xhr,type,errorThrown){
			mui.toast('当前网络不好，请重试');
			console.error('cart返回响应失败');
		}
	});
}
var PAYSERVER='http://hiji.hifete.com:7200/api/alipay/payment';



function showSfun1(msg,fun1){

	if(document.getElementById('shareWrap10')){
		console.log(msg);
	}else{
		var pathStr = '../';
		if(msg.myIsIndex){
			pathStr = '';
		}
		if(!/android/i.test(navigator.userAgent)){
			msg.thumbs = msg.pictures = [''];
		}
		if(fun1){fun1()};
	}
}


//点赞 和取消点赞 帖子
function likeThis(thisobj,newsId,referenceUserId,cityNum,myuserid,oldtoken,curType,imgSrc){
	mui.ajax(serverUrl + '/api/friends/newsinfo/newsId/'+newsId+'/userid/'+myuserid, {
		data:{'referenceUserId':referenceUserId},
		dataType: 'json',
		type: curType,
		timeout: 8000,
		headers: {"token": oldtoken,'city': cityNum},
		success: function(data, type, xhr) {
			console.log('点赞返回',data)
			if(data.errno == 0) {
    			thisobj.attr('src',imgSrc);
    			var likes = parseInt(thisobj.siblings('span').html());
    			if(curType == 'POST'){
    				likes = likes+1;
    				thisobj.siblings('span').html(likes);
    			}else{
    				likes = likes-1;
    				if(likes<0){
    					likes=0;
    				}
    				thisobj.siblings('span').html(likes);
    			}

			}else{
				mui.toast(data.errmsg);
			}
		},
		error: function(xhr, type, errorThrown) {
			console.error('点赞,响应失败');
			mui.toast('当前网络不好,请重试');
		}
	});
}

//收藏和取消收藏
function colltThis(thisobj,newsId,referenceUserId,cityNum,myuserid,oldtoken,curType,imgSrc){
	mui.ajax(serverUrl + '/api/friends/collector', {
		data:{'userId':myuserid,'newsId':newsId,'newsUserId':referenceUserId},
		dataType: 'json',
		type: curType,
		timeout: 8000,
		headers: {"token": oldtoken,'city': cityNum},
		success: function(data, type, xhr) {
			console.log('收藏',data)
			if(data.errno == 0) {
				if(data.data && data.data.type=='add'){
					mui.toast('收藏成功')
					thisobj.attr('src',imgSrc);
				}
				if(data.data && data.data==1){
					mui.toast('取消成功')
    				thisobj.attr('src',imgSrc);
				}
			}else{
				mui.toast('操作失败');
			}
		},
		error: function(xhr, type, errorThrown) {
			console.error('收藏,响应失败');
			mui.toast('当前网络不好,请重试');
		}
	});
}

function jubao(junsid,jbuid,myuserid,cityNum,oldToken){
	if(jbuid == myuserid){
		mui.toast('不能举报自己的帖子哦');
		$('#maskInfo').fadeOut(200);
	}else{
		mui.ajax(serverUrl + '/api/friends/report', {
			data:{'newsId':junsid,'userId':myuserid,'theNewsUserId':jbuid},
			dataType: 'json',
			type: 'post',
			timeout: 8000,
			headers: {"token": oldToken,'city': cityNum},
			success: function(data, type, xhr) {
				console.log('点赞返回',data);
				if(data.errno == 0){
					mui.toast('举报成功，管理员将在12小时内审核处理');
				}else if(data.errno == 1000) {
	    				mui.toast('审核处理中，管理员将在12小时内审核处理');
				}else{
					mui.toast('操作失败');
				}

				$('#maskInfo').fadeOut(200);
			},
			error: function(xhr, type, errorThrown) {
				console.error('举报,响应失败');
				mui.toast('当前网络不好,请重试');
			}
		});
	}

}






//格式化时间戳
function formatDate(v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //cond
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//获取分享有礼 时间区间 和邀请码(在商品详情页有调用)
function sharecode(){
	var myuserid = plus.storage.getItem('userid'),
	    cityNum  = plus.storage.getItem('cityNum'),
		oldToken = plus.storage.getItem('oldToken');

	mui.ajax(serverUrl+'/api/index/sharecode',{
		data:{"userId":myuserid},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers: {"token": oldToken,'city': cityNum},
		success:function(data,type,xhr){
			console.log('获取分享有礼 时间区间 和邀请码',data);
			var shareInfo ={};
			shareInfo.begin_date = data.data.begin_date;
			shareInfo.end_date = data.data.end_date;
			shareInfo.invitationCode = data.errmsg;
			console.log(shareInfo);
			plus.storage.setItem("shareInfo",JSON.stringify(shareInfo));
		},
		error:function(xhr,type,errorThrown){
			console.error('获取分享有礼 时间区间 和邀请码  ---- 失败');
		}
	});
}


/**
 * 加载到外部URL的文件，用于下载图片；
 */
/**
 * 打开长按事件
 * http://dev.dcloud.net.cn/mui/event/#gesture
 */
mui.init({
	gestureConfig: {
		longtap: true
	}
});
mui.plusReady(function() {
	document.addEventListener("longtap", function(event) {
		/**
		 * 获取目标节点的tagName
		 */
		var name = event.target.tagName;
		var parentname = event.target.parentNode.parentNode.className;
		name = name.toLowerCase();
		var className = event.target.className;
		/**
		 * 如果是图片，则弹出选择框决定是否下载；
		 */
		if((name === "img" && (className.indexOf('picOp')>-1 || className.indexOf('anImg')>-1 || className.indexOf('mui-zoom')>-1)) || parentname.indexOf('mui-imageviewer-item-center')>-1) {
			var imgUrl = event.target.src;
			console.log('图片地址：' + imgUrl);
			var filename = imgUrl.substring(imgUrl.lastIndexOf("/") + 1, imgUrl.length);
			var relativePath = "_downloads/" + filename;
			/**
			 * http://dev.dcloud.net.cn/mui/ui/#dialog
			 */
			mui.confirm("是否保存此图片", "确认保存？", ["保存", "取消"], function(event) {
				/**
				 * index从0开始
				 */
				var index = event.index;
				if(index == 0) {
					var dtask = plus.downloader.createDownload(imgUrl, {}, function(d, status) {
						if(status == 200) {
							//下载成功
							var fileName = d.filename;
							plus.gallery.save(fileName, function() {
								mui.toast('保存成功');
							}, function() {
								mui.toast('保存失败，请重试！');
							});
							console.log("下载成功=" + relativePath);
						} else {
							//下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
							console.log("下载失败=" + status + "==" + relativePath);
							//dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
							if(relativePath != null)
								delFile(relativePath);
						}
					});
					//启动下载任务
					dtask.start();

				}
				/*删除指定文件*/
				function delFile(relativePath) {
					plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
						entry.remove(function(entry) {
							console.log("文件删除成功==" + relativePath);
						}, function(e) {
							console.log("文件删除失败=" + relativePath);
						});
					});
				}
			});
		}
	});
});