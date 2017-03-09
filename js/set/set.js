		$(function () {
		    //1.初始化Table
		    var oTable = new TableInit();
		    oTable.Init();
		   
		  });
		  var TableInit = function () {
		    var oTableInit = new Object();
		    //初始化Table
		    oTableInit.Init = function () {
		      $('#table').bootstrapTable({
		        url: '',     //请求后台的URL（*）
		        method: 'get',           //请求方式（*）
		        striped: false,           //是否显示行间隔色
		        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        pagination: true,          //是否显示分页（*）
		        sortable: true,           //是否启用排序
		        sortName:"timestamp",//按照下单时间排序
		        sortOrder: "asc",          //排序方式
		        sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
		        pageNumber:1,            //初始化加载第一页，默认第一页
		        pageSize: 20,            //每页的记录行数（*）
		        pageList: [20, 50, 100, 200],    //可供选择的每页的行数（*）
		        //strictSearch: true,
		        clickToSelect: true,        //是否启用点击选中行
		        queryParams: oTableInit.queryParams,//传递参数（*）
		        width:'auto',
		        uniqueId: "orderId",           //每一行的唯一标识，一般为主键列
		        cardView: false,    
		        iconSize:'lg',
		        contentType:"application/json",
		        queryParamsType:'',
		        // showPaginationSwitch:true,//是否显示分页
		        paginationVAlign:"bottom",
		        paginationDetailHAlign:"left",
		        paginationHAlign:"right",
		        footerStyle:function(value, row, index) {
		            return {
		                css: { "font-weight": "bold" }
		              };
		        },
		        detailView: true, //是否显示详细视图
		        iconSize:'lg',
		        columns: [{
			          field: 'shopeeName',
			          title: '币种',
		              align: 'center'
			    },{
			          field: 'payMethod',
			          title: '简称',
		              align: 'center',
			    },{
				      field: 'purchaseDate',
				      title: '单位',
		              align: 'center',

				},{
				      field: 'subsidiesAmount',
				      title: '汇率',
		              align: 'center',
		              formatter:function (value,row) {
		              	return '<a onclick="updateC()"></a>'
		              }
				},{
		              field: 'currency',
		              title: '修改人',
		              align: 'center',
		        },{
		              field: 'escrowAmount',
		              title: '修改时间',
		              align: 'center',
		              formatter:'timeStampToTime',
		              
		        }],
		         
	            onLoadSuccess:function(data){
		    		var data = $('#table').bootstrapTable('getData', true);
		    		var pageNumber = $('#table').bootstrapTable('getOptions').pageNumber;
		    		if(data.length==0 && pageNumber!=1) {
		    			$('#table').bootstrapTable('selectPage', 1);
		    		}
		    	}
		      });
		    };
		    
		   
		   //得到父表查询的参数
		   oTableInit.queryParams = function (params) {
			   //str   =   str.replace(/^\s+|\s+$/g,"");去除两端空格
			   //replace(/\s+/g,""); 去除所有空格
 		      var temp = { 
 		       
		        };
		      return temp; 
		      };// oTableInit.queryParams
		      
		      
		    return oTableInit;
		 };//TableInit
		 
		//日期格式转换方法
		Date.prototype.format = function(format) {
		       var date = {
		              "M+": this.getMonth() + 1,
		              "d+": this.getDate(),
		              "h+": this.getHours(),
		              "m+": this.getMinutes(),
		              "s+": this.getSeconds(),
		              "q+": Math.floor((this.getMonth() + 3) / 3),
		              "S+": this.getMilliseconds()
		       };
		       if (/(y+)/i.test(format)) {
		              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		       }
		       for (var k in date) {
		              if (new RegExp("(" + k + ")").test(format)) {
		                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
		                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		              }
		       }
		       return format;
		 }
		
		//时间转换方法
		 function timeStampToTime(timeStamp){
		 	var newDate = new Date();
		 	newDate.setTime(timeStamp);
		 	return newDate.format('yyyy-MM-dd hh:mm:ss');
		 }
		
		
		
		
		
		  function searchReset(){
				$('#queryForm')[0].reset();
				$('#accountID').val("");
				$('#orderStatus').val('');
				for(var i=0;i<$('.new-box').length;i++){
		         	$('.new-box').eq(i).find('li').not($('.new-box').eq(i).find('li').eq(0)).css('background','rgb(255, 255, 255)');
		         	$('.new-box').eq(i).find('li').eq(0).css({background:'#2CC3A9',color:'white'});
		         };
				//清除cookie
			    $('#account_table').bootstrapTable('refresh');
			}
		
		  function updateC (value) {
              $('#editModal').modal('show');
		  }


