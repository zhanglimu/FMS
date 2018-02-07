var app = angular.module('user',['angular-loading-bar']);
//var server = "http://"+document.location.host+"/";
var urlip = "http://192.168.1.5:8083/";
	app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
	    cfpLoadingBarProvider.spinnerTemplate = '<div id="loadgif" style="width:66px;height:66px;position:absolute;top:30%;left:50%;"><img  alt="加载中..." src="img/loading.gif"/></div>';
	   	cfpLoadingBarProvider.latencyThreshold = 20;
	}]);
var usebox = [
{
	"urlb":"errorTicket.html",
	"texa":"错误票信息"
},
{
	"urlb":"allup.html",
	"texa":"Daily Allup"
},
{
	"urlb":"breakdown.html",
	"texa":"Daily Breakdown"
},
{
	"urlb":"single.html",
	"texa":"Daily Single"
},
{
	"urlb":"channel.html",
	"texa":"渠道统计报表"
},
{
	"urlb":"finance.html",
	"texa":"Summary"
},
{
	"urlb":"summary.html",
	"texa":"Daily Summary"
},
{
	"urlb":"user.html",
	"texa":"订单管理",
	"active":true
},{
	"urlb":"third.html",
	"texa":"Third"
}];

app.controller("userorctrl",function(){
	this.usebox = usebox;
});
//双击详情
app.factory('details', ['$http', '$q', '$location', function($http, $q, $location) {
    return {
        query: function(ticketInfo_id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
            	// url: './nddetail.txt'
                url:urlip +"account/orderManage/queryDetail?ticketInfo_id="+ticketInfo_id
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function(data) {
                deferred.reject(data);
				alert(er22rror);
            });
            return deferred.promise;
        } // end query
    };
}]);
//未回收
app.factory('norecycled', ['$http', '$q', '$location', function($http, $q, $location) {
    return {
        query: function(order_id,recycleP) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url:urlip +"account/orderManage/updateRecycleMoney?order_id="+order_id+"&recyclePrice="+recycleP
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function(data) {
                deferred.reject(data);
				alert(error99);
            });
            return deferred.promise;
        } // end query
    };
}]);
//申请取消接口
app.factory('quxiao', ['$http', '$q', '$location', function($http, $q, $location) {
    return {
        query: function(url) {
        	// alert(url);
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function(data) {
                deferred.reject(data);
				alert(errrrror);
            });
            return deferred.promise;
        } // end query
    };
}]);
//未中奖回收
app.factory('notWin', ['$http', '$q', '$location', function($http, $q, $location) {
    return {
        query: function(startime,endtime,agNum,page,size,trType,state,reState,inplay,tkId,uid) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                // url:urlip +"account/orderManage/updateNotWinning?startDate=2017-6-7&endDate=2017-6-22&agentNum=101&page=1&size=10"
            	url:urlip +"account/orderManage/updateNotWinning?startDate="+startime +"&endDate="+endtime+"&agent_id="+agNum+"&page="+page+"&size="+size+"&trade_type="+trType+"&state="+state+"&recycleState="+reState+"&inplay="+inplay+"&tkId="+tkId+"&uid="+uid
            }).success(function(data) {
                deferred.resolve(data);
				console.log(data);
            }).error(function(data) {
                deferred.reject(data);
				alert(erssssror);
            });
            return deferred.promise;
        } // end query
    };
}]);
//查询渠道
function ajax(){
	var counter = '';
	$.ajax({
		async:false,
		dataType:"json",
		// url:"./qudao.txt",
		url:urlip +"account/orderManage/queryAllAgent",
		type:"get",
		success:function(data){
			counter = data.agentList;
		},
		error:function(data){
			alert("errorhhhhhhh")
		}
	});
	return counter;
}
app.controller("userctrl",function($scope,$http,$location,details,norecycled,quxiao,notWin){
	$scope.tbox = ajax();
	//配置  
    $scope.count = 0;  
    $scope.p_pernum = 10;  
    //变量  
    $scope.p_current = 1;  
    $scope.p_all_page =0;  
    $scope.pages = []; 
	var _get = function(startime,endtime,agNum,page,size,trType,state,reState,inplay,tkId,uid){
		$scope.page1 = page; //为给导出获取分页
		$scope.size1 = size; //为给导出获取数量
		console.log("get",startime,endtime,agNum,page,size,trType,state,reState,inplay,tkId,uid)
		$http.get(urlip +"account/orderManage/queryAll?startDate="+startime +"&endDate="+endtime+"&agent_id="+agNum+"&page="+page+"&size="+size+"&trade_type="+trType+"&state="+state+"&recycleState="+reState+"&inplay="+inplay+"&tkId="+tkId+"&uid="+uid)
		// $http.get("./user.txt")
		.success(function(data){
			console.log(data)
			if(data){
				var count = data.total.size;
				console.log(data)
				$scope.bbox = data.modelList;
				for (var i = 0; i < $scope.bbox.length; i++) {
					if($scope.bbox[i].trade_type=="0"){
						$scope.bbox[i].tradeName ="未交易";
					}else if($scope.bbox[i].trade_type=="1"){
						$scope.bbox[i].tradeName ="交易成功";
					}else if($scope.bbox[i].trade_type=="2"){
						$scope.bbox[i].tradeName ="等待";
					}else if($scope.bbox[i].trade_type=="3"){
						$scope.bbox[i].tradeName ="交易失败";
					}else if($scope.bbox[i].trade_type=="4"){
						$scope.bbox[i].tradeName ="取消申请";
					}else if($scope.bbox[i].trade_type=="5"){
						$scope.bbox[i].tradeName ="通过";
					}else if($scope.bbox[i].trade_type=="6"){
						$scope.bbox[i].tradeName ="拒绝";
					}else if($scope.bbox[i].trade_type=="7"){
						$scope.bbox[i].tradeName ="取消";
					}else if($scope.bbox[i].trade_type=="44"){
						$scope.bbox[i].tradeName ="已取消申请";
					}else{
						$scope.bbox[i].tradeName ="-";
					}
						if($scope.bbox[i].trade_type=="4"){
							$scope.bbox[i].iscancel=true;
						}else{
							$scope.bbox[i].iscancel=false;
						}
					if($scope.bbox[i].state=="1"){
						$scope.bbox[i].stateName ="中奖";
					}else if($scope.bbox[i].state =="2"){
						$scope.bbox[i].stateName ="未中奖";
					}else if($scope.bbox[i].state =="3"){
						$scope.bbox[i].stateName ="Alive";
					}else{
						$scope.bbox[i].stateName ="-";
					}
					if ($scope.bbox[i].inplay=="0") {
						$scope.bbox[i].inplayName ="死球";
					}else{
						$scope.bbox[i].inplayName ="即场";
					}
					if($scope.bbox[i].ballType =="1"){
						$scope.bbox[i].ballTypeName ="竞彩足球";
					}else{
						$scope.bbox[i].ballTypeName ="篮球";
					}
					if($scope.bbox[i].addAwardAmount =="0"){
						$scope.bbox[i].addAwardAmount ="-";
					}else{
						$scope.bbox[i].addAwardAmount = $scope.bbox[i].addAwardAmount;
					}
					if($scope.bbox[i].rakeRate =="0"){
						$scope.bbox[i].rakeRate ="-";
					}else{
						$scope.bbox[i].rakeRate = $scope.bbox[i].rakeRate;
					}
					if($scope.bbox[i].recyclePrice =="-1" || $scope.bbox[i].recyclePrice ==="" || $scope.bbox[i].recyclePrice==null){
						$scope.bbox[i].recycleP ="未回收";
						if($scope.bbox[i].recyclePrice =="-1"){
							$scope.bbox[i].isNorecycle=false;
						}else{
							$scope.bbox[i].isNorecycle=true;
						}
					}else{
						$scope.bbox[i].recycleP = $scope.bbox[i].recyclePrice;
					}
				}
				$scope.total = data.total;
				$scope.count=count; 
				$scope.p_current = page;  
                $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum); 
                reloadPno();
			}else{
				alert("加载失败")
			};
		}).error(function(data){
			alert("erroreeeeeee")
		})
	}
	// 默认时间零点
// $("#startime").val(GetDateStrs(-7));
// 			function GetDateStrs(AddDayCount) {
// 		        var dd = new Date();
// 		        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
// 		        var y = dd.getFullYear();
// 		        var m = dd.getMonth()+1;//获取当前月份的日期
// 		        var mm="";
// 		        if((m+"").length==1){
// 		        	mm="0"+m;
// 		        }else{
// 		        	mm=m;
// 		        }
// 		        var d = dd.getDate();
// 		        var dds="";
// 		        if((d+"").length==1){
// 		        	dds="0"+d;
// 		        }else{
// 		        	dds=d;
// 		        }
// 		        return y+"-"+mm+"-"+dds+" 00:00:00";
// 		    }
	var time =  new Date();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var day = time.getDate();
	var hour = time.getHours();
	var minutes = time.getMinutes();  
	var second = time.getSeconds(); 
	// time.setTime(time.getTime()-7*24*60*60*1000);
	// var s1 = time.getFullYear()+"-" +(time.getMonth()+1)+ "-" +time.getDate()+" 00:00:00";
	// var star =$("#startime").val(s1);
	// var startime=star.val();
	// var end = $("#endtime").val(year+"-"+month+"-"+day+" 23:59:59");
	// var endtime =end.val();
	function GetDateStr(AddDayCount) { 
		var dd = new Date(); 
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1;//获取当前月份的日期 
		var d = dd.getDate(); 
		var hour = time.getHours();
		var minutes = time.getMinutes();  
		var second = time.getSeconds(); 
		return y+"-"+m+"-"+d; 
	} 
		//time.setTime(time.getTime()-1*24*60*60*1000);
		console.log(GetDateStr(1),"11");
	
	if(hour>=12){
		var s1 = GetDateStr(0)+" 12:00:00";
		var end = GetDateStr(0)+" 23:59:59";
	}else{
		var s1 = GetDateStr(-1)+" 12:00:00";
		var end = GetDateStr(0)+" 23:59:59";
	}
	
	var star =$("#startime").val(s1);
	var startime=star.val();
	var end =$("#endtime").val(end);
	var endtime =end.val();
	
	var agNum =$('#agentNum option:selected').val();
	var trType =$('#tradeType option:selected').val();
	var state =$('#state option:selected').val();
	var reState =$('#recycleState option:selected').val();
	var inplay =$('#inplay option:selected').val();
	var tkId = $("#tk").val();
	var uid = $("#uid").val();
	//初始化第一页 
	_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid); 
	console.log(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid);  
	$scope.cha = function(){
		var startime = $("#startime").val();
		var endtime =$("#endtime").val();
		var agNum =$('#agentNum option:selected').val();
		var trType =$('#tradeType option:selected').val();
		var state =$('#state option:selected').val();
		var reState =$('#recycleState option:selected').val();
		var inplay =$('#inplay option:selected').val();
		var tkId = $("#tk").val();
		var uid = $("#uid").val();
		
		if(startime=="" && endtime=="" && $scope.page1=="" && $scope.size1==""){
			layer.msg("请选择时间",{time:920});
		}else{
			if(startime =="" || endtime=="" || $scope.page1=="" || $scope.size1==""){
				layer.msg("请选择要查询的时间",{time:920});
			}else{
				_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
					console.log(data);  
				}); 
			}
		}
	}	
//初始化第一页
	// _get($scope.p_current,$scope.p_pernum,startime,endtime,function(){  
        //alert("我是第一次加载");  
//    });  
    //单选按钮选中  
    $scope.select= function(id){  
        // alert(id);  
    }  
    //首页  
    $scope.p_index = function(){  
        $scope.load_page(1);  
    }  
    //尾页  
    $scope.p_last = function(){  
        $scope.load_page($scope.p_all_page);  
    }  
    //加载某一页  
    $scope.load_page = function(page){    
		var startime = $("#startime").val();
		var endtime =$("#endtime").val();
		var agNum =$('#agentNum option:selected').val();
		var trType =$('#tradeType option:selected').val();
		var state =$('#state option:selected').val();
		var reState =$('#recycleState option:selected').val();
		var inplay =$('#inplay option:selected').val();
		var tkId = $("#tk").val();
		var uid = $("#uid").val();
		
		if(startime=="" && endtime=="" && $scope.page1=="" && $scope.size1==""){
			layer.msg("请选择时间",{time:920});
		}else{
			if(startime =="" || endtime=="" || $scope.page1=="" || $scope.size1==""){
				layer.msg("请选择要查询的时间",{time:920});
			}else{
				_get(startime,endtime,agNum,page,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
					//alert("123");  
				}); 
			}
		}
    };  
    //初始化页码  
    var reloadPno = function(){  
        $scope.pages=calculateIndexes($scope.p_current,$scope.p_all_page,8); 
	};   
	    var calculateIndexes = function (current, length, displayLength) {  
		var indexes = [];  
		var start = Math.round(current - displayLength / 2);  
		var end = Math.round(current + displayLength / 2);  
	    if (start <= 1) {  
	        start = 1;  
	        end = start + displayLength - 1;  
	        if (end >= length - 1) {  
	            end = length - 1;  
	        }  
	    }
	    if (end >= length - 1) {  
	        end = length;  
	        start = end - displayLength + 1;  
	        if (start <= 1) {  
	            start = 1;  
	        }  
	    }  
	    for (var i = start; i <= end; i++) {  
	        indexes.push(i);  
	    }  
	    return indexes;  
	  };
	//双击详情
	$scope.details=function(ticketInfo_id){
        var detai = details.query(ticketInfo_id);
        detai.then(function(data){
			 if(data){
				var html = "<p>订单ID</p>"+data.tkId;
                html = "<table class='pad'><thead><tr><th style='width:8%'>序号</th><th style='width:18%'>订单ID</th><th style='width:8%'>玩法</th><th style='width:34%'>投注内容</th>";
                html += "<th style='width:8%'>过关方式</th><th style='width:8%'>倍数</th><th style='width:8%'>中奖金额</th><th style='width:8%'>交易金额</th></tr></thead>";
					for (var i = 0; i < data.detailList.length; i++) {
						var l_code= data.detailList[i].l_code;// level match code: 一场比赛的赛事编码 +,+ 降关情况
						var l_codes=l_code.split(",");
						var betContents= data.detailList[i].betContent.split("/");
						var canceled = data.detailList[i].canceled;
						var cancel = canceled.split(",");
						
						var contents=""; 
						for (var j = 0; j < l_codes.length; j++) {
							if(contents==""){
								if(l_codes[j]=="0"){
									  if(cancel[j] == "VOID" ){
									  	contents="<font style='color:BLUE'>"+betContents[j]+"</font>";
									  }else{
									  	contents="<font style='color:#fe3c3c'>"+betContents[j]+"</font>"; 
									  }
								 }else{
									  contents=betContents[j]; 
								}
							}else{
								if(l_codes[j]=="0"){
									 if(cancel[j] == "VOID" ){
									   	contents=contents+"/"+"<font style='color:BLUE'>"+betContents[j]+"</font>"; 
									}else{ 
										contents=contents+"/"+"<font style='color:#fe3c3c'>"+betContents[j]+"</font>";
									 } 
								}else{
									   contents=contents+"/"+betContents[j];
								}
							} 
						}
						html += "<tbody><tr><td>"+(i+1)+data.detailList[i].stateMessage+"</td><td>"+data.detailList[i].tkId+"</td>";
						html += "<td>"+data.detailList[i].product+"</td><td>"+contents+"</td><td>"+data.detailList[i].local_m+"</td><td>"+data.detailList[i].num+"</td>";
						html += "<td>"+data.detailList[i].total_price+"￥</td><td>"+data.detailList[i].price_allup+"￥</td></tr></tbody>";
					}
				html +='</table>';  
                layer.confirm(html, {
					// title:'订单ID',
					area: ['80%', 'auto'],
                    btn: ['取消', '确定'],
                });
            }
        });
	}
	//未回收
	$scope.norecycled=function(recyclePrice,order_id,$index){
		var startime = $("#startime").val();
		var endtime =$("#endtime").val();
		var agNum =$('#agentNum option:selected').val();
		var trType =$('#tradeType option:selected').val();
		var state =$('#state option:selected').val();
		var reState =$('#recycleState option:selected').val();
		var inplay =$('#inplay option:selected').val();
		var tkId = $("#tk").val();
		var uid = $("#uid").val();
		console.log($index);
        if(recyclePrice==="" || recyclePrice==null){
			 var html = "<p class=''>回收金额：<input class='confirm_input' id='rmb'/></p>";
        layer.confirm(html, {
            btn: ['取消', '确认回收'],
		}, function() {
			layer.msg('取消了');
		},function(){
			var recycleP=$("#rmb").val();
			var nocycle = norecycled.query(order_id,recycleP);
				nocycle.then(function(data){
					console.log(order_id,recycleP);
					if(data.result.resultCode =="1"){
						layer.msg(data.result.resultMsg,{
							btn: ['确定', '取消'],
							end: function () {
								console.log("1111",startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid)
								_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
									console.log(data);
								});
							}
						});
					}else{
						layer.msg(data.result.resultMsg,{
							btn: ['确定', '取消'],
							end: function () {
								_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
									console.log(data);  
								});
							}
						});
					}
				},function(data){
			//		console.log(order_id);
				})
			});
		}  
	}
	//取消申请接口
	$scope.quxiao=function(trade_type,ticketInfo_id,order_id){
		console.log(ticketInfo_id,order_id);
		var startime = $("#startime").val();
		var endtime =$("#endtime").val();
		var agNum =$('#agentNum option:selected').val();
		var trType =$('#tradeType option:selected').val();
		var state =$('#state option:selected').val();
		var reState =$('#recycleState option:selected').val();
		var inplay =$('#inplay option:selected').val();
		var tkId = $("#tk").val();
		var uid = $("#uid").val();
		if(trade_type =="4"){
			layer.confirm("确定删除票？",{
				btn:['确定','拒绝'],
			},function(){
				url = urlip+"account/orderManage/deleteAlive?ticketInfo_id="+ticketInfo_id+"&order_id="+order_id;
				var qu = quxiao.query(url);
				qu.then(function(data){
					//打印返回的数据
					console.log(data.result.resultCode)
					if(data.result.resultCode =="1"){
						layer.msg(data.result.resultMsg,{
							btn: ['确定', '取消'],
							end: function () {
								_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
									console.log(data);  
								});
							}
						});
					}else{
						layer.msg(data.result.resultMsg,{
							btn: ['确定', '取消'],
							end: function () {
								location.reload();
							}
						});
					}
				},function(data){
					// console.log(data);
				})
			},function(){
				url = urlip+"account/orderManage/updateCancel?ticketInfo_id="+ticketInfo_id+"&order_id="+order_id;
				var ju = quxiao.query(url);
				ju.then(function(data){
					// console.log(data)
					if(data.result.resultCode =="1"){
						layer.msg(data.result.resultMsg,{
							btn: ['确定', '取消'],
							end: function () {
								_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
									console.log(data);  
								});
							}
						});
					}else{
						layer.msg(data.result.resultMsg,{
							btn: ['确定', '取消'],
							end: function () {
								location.reload();
							}
						});
					}
				},function(data){
					// console.log(data);
				})
			})
		}
	}
	//未中奖回收
	$scope.notWinning=function(){
		var startime = $("#startime").val();
		var endtime =$("#endtime").val();
		var agNum =$('#agentNum option:selected').val();
		var trType =$('#tradeType option:selected').val();
		var state =$('#state option:selected').val();
		var reState =$('#recycleState option:selected').val();
		var inplay =$('#inplay option:selected').val();
		var tkId = $("#tk").val();
		var uid = $("#uid").val();

		var noWn = notWin.query(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid);
		console.log("uuuu",startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid);
		noWn.then(function(data){
			console.log(data)
			if(data.result.resultCode =="1"){
				layer.msg(data.result.resultMsg,{
					btn: ['确定', '取消'],
					end: function () {
                		_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
							console.log("su",data);  
						});
            		}
				});
			}else{
				layer.msg(data.result.resultMsg,{
					btn: ['确定', '取消'],
					end: function () {
                		location.reload();
            		}
				});
			}
		},function(data){
			console.log(123);
		})
	}
//导出功能
	$scope.export=function(){
		var statetime = $("#startime").val();
		var endtime = $("#endtime").val();
		var agNum =$('#agentNum option:selected').val();
		var trType =$('#tradeType option:selected').val();
		var state =$('#state option:selected').val();
		var reState =$('#recycleState option:selected').val();
		var inplay =$('#inplay option:selected').val();
		var tkId = $("#tk").val();
		var uid = $("#uid").val();
		// console.log("uuuu",startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid);
		if(startime=="" || endtime=="" || $scope.page1=="" || $scope.size1==""){
			layer.msg("请先选择要导出的日期");
		}else{
			window.open(urlip +"account/orderManage//userManagementExcel?startDate="+startime +"&endDate="+endtime+"&agent_id="+agNum+"&page="+$scope.page1+"&size="+$scope.size1+"&trade_type="+trType+"&state="+state+"&recycleState="+reState+"&inplay="+inplay+"&tkId="+tkId+"&uid="+uid);
		} 
	}
// 刷新
	$scope.refresh=function(){
		_get(startime,endtime,agNum,$scope.p_current,$scope.p_pernum,trType,state,reState,inplay,tkId,uid,function(){  
			console.log("su",data);  
		});
	}
	//点击变色
	$scope.li_click = function (i) {
        $scope.navdown = i;
    };
});








