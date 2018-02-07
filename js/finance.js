var app = angular.module('finance',[]);
//var urlip = "http://"+document.location.host+"/";
var urlip = "http://192.168.1.5:8083/";
var nbox = [
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
	"texa":"Summary",
	"active":true
},
{
	"urlb":"summary.html",
	"texa":"Daily Summary"
},
{
	"urlb":"user.html",
	"texa":"订单管理"
},{
	"urlb":"third.html",
	"texa":"Third"
}];
app.controller("financtrl",function(){
		this.nbox = nbox;
	// var sel=document.getElementById("ball");
	// sel.onchange=function(){
	// 	if(sel.options[sel.selectedIndex].value !=""){
	// 		var pid = sel.options[sel.selectedIndex].value;
	// 		console.log(pid)
	// }}
});
var dobox = [
{"worda":"",
"wordb":"场次数量",
"wordc":"原始投注额",
"wordd":"交易额",
"worde":"中奖金额",
"wordf":"盈利率"},
{"worda":"",
"wordb":"NO. Match",
"wordc":"TotalInvestment",
"wordd":"Investment",
"worde":"Payout",
"wordf":"Payout Ratio"},
{"worda":"",
"wordb":"",
"wordc":"人民币 RMB",
"wordd":"人民币 RMB",
"worde":"人民币 RMB",
"wordf":"%"}];

app.controller("fincectrl",function($scope,$http){
	this.dobox = dobox;
	
	var woDate = new Date();
	this.date = woDate.toLocaleDateString(); 
		
	var month = woDate.getMonth()+1;
	this.month = (month<10 ? "0"+month:month);
		
	var time,week,checkDate = new Date(new Date());
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    time = checkDate.getTime();
    checkDate.setMonth(0);
    checkDate.setDate(1);
	week=Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
			
	this.weeking =week;
		
	var _get = function(year,month,day){
		$http.get(urlip +'account/dailyFinancialStatements/queryAll?year='+year+'&month='+month+'&day='+day)
		.success(function(data){
			if(data){
				$scope.modelToday = data.modelToday;
				$scope.modelWeek = data.modelWeek;
				$scope.modelMonth = data.modelMonth;
				$scope.modelYear = data.modelYear;
				$scope.financebox = data.modelList;
				$scope.total = data.total;
			}else{
				alert("加载失败")
			};
		}).error(function(data){
			alert("error")
		})
	}
	var time =  new Date();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var day = time.getDate();
	var sel=document.getElementById("ball");
	var pid = sel.options[sel.selectedIndex].value;
	$("#d12").val(year+"-"+month+"-"+day);
	//初始化第一页 
	console.log(year,month,day,pid,"0");
	_get(year,month,day,pid); 
	$scope.data = function(){
		//alert()
		var	year = "";
		var	month = "";
		var	day = "";
		var sel=document.getElementById("ball");
		var pid = sel.options[sel.selectedIndex].value;
		var data = $("#d12").val();
		var sort = data.split("-");
		if(sort.length ==3){
			year=sort[0];
			month=sort[1];
			day=sort[2];
		}else if(sort.length ==2){
			year=sort[0];
			month=sort[1];
		}else{
			year=sort;
		}
		week =getYearWeek(year, month, day);
		//var weekofyear =  (((new Date())-(new Date("2017-12-27")))/(24*60*60*7*1000)|0) +1
		//alert(weekofyear);
		//this.weekk = weekofyear;
		//this.month = month;
		document.getElementById("week").innerText = week;	
		document.getElementById("vor").innerText = month;
		//console.log(year,month,day,pid,"4");
		_get(year,month,day,pid); 
	}
//		_get();     //初始化
	
//导出功能
	$scope.export=function(){
		var	year = "";
		var	month = "";
		var	day = "";
		var time = $("#d12").val();
		if(time =="" || time ==null){
			layer.msg("请先选择要导出的日期");
		}else{
			var sort = time.split("-");
			if(sort.length ==3){
				year=sort[0];
				month=sort[1];
				day=sort[2];
			}else if(sort.length ==2){
				year=sort[0];
				month=sort[1];
			}else{
				year=sort;
			}
			window.open(urlip +'account/dailyFinancialStatements/summaryExcel?year='+year+"&month="+month+"&day="+day);
		} 
	}
	
});

var getYearWeek = function (a, b, c) { 
    var d1 = new Date(a, b-1, c), d2 = new Date(a, 0, 1), 
    d = Math.round((d1 - d2) / 86400000); 
    return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7); 
};







