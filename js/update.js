var wgtVer=null;
var wgtUrl = '';
var newVer = '';
function plusReady(){
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        wgtVer=inf.version;
        console.log("当前应用版本："+wgtVer);
    });
}
if(window.plus){
    plusReady();
}else{
    document.addEventListener('plusready',plusReady,false);
}

function checkUpdate(hide,ios){
	!hide && plus.nativeUI.showWaiting('正在检查更新...',{width:'130px',height:'110px'});
	var oldtoken = plus.storage.getItem('oldToken');
	mui.ajax(serverUrl+'/api/index/version',{
		dataType:'json',
		type:'post',
		timeout:5000,
		headers:{"token":oldtoken},
		success:function(data,type,xhr){
			console.log('检测更新'+JSON.stringify(data));
			if(ios){
				wgtUrl = data.data.ios_path_url;//下载地址 ios
				newVer = data.data.ios_versionNum;//远程版本号（ios
			}else{
				wgtUrl=  data.data.android_path_url;//下载地址 android
				newVer = data.data.versionNum;//远程版本号（android
			}
			 !hide && plus.nativeUI.alert("当前版本为最新版本！");
			 plus.nativeUI.closeWaiting();
		},
		error:function(xhr,type,errorThrown){
			console.error('操作响应失败');
			plus.nativeUI.closeWaiting();
			mui('当前网络不好，请重试！');
		}
	});
}

