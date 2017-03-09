		$(function () {
		    //1.初始化Table
		    var oTable = new TableInit();
		    oTable.Init();
		   
		  });
		  /* 
		  当日期输入框获取焦点的时候 触发此函数
		  
		  */
		  function onfocus(){
			  $('.datetimepicker').css("z-index",1);
		  }
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
			          title: '订单编号',
		              align: 'center'
			    },{
			          field: 'payMethod',
			          title: '网站',
		              align: 'center',
		              visible:false
			    },{
				      field: 'purchaseDate',
				      title: '下单时间(平台时间)',
		              align: 'center',
		              formatter:'timeStampToTime',
		              sortStable:true

				},{
				      field: 'subsidiesAmount',
				      title: '订单总额',
		              align: 'center'
				},{
		              field: 'currency',
		              title: '收件人邮箱',
		              align: 'center',
		        },{
		              field: 'escrowAmount',
		              title: '订单状态',
		              align: 'center',
		              
		        },{
		              field: 'country',
		              title: '付款方式',
		              align: 'center'
		        },{
		              field: 'purchaseId',
		              title: '物流方式',
		              align: 'center' 
		        },{
		              field: 'orderStatus',
		              title: '付款状态',
		              align: 'center',
		        },{
		              field: 'orderId',
		              title: '易登是否抓取',
		              align: 'center',
		        }],
		         //注册加载子表的事件
		        onExpandRow: function (index, row, $detail) {
		        	oTableInit.InitSubTable(index, row, $detail);
	            },
	            onLoadSuccess:function(data){
		    		var data = $('#table').bootstrapTable('getData', true);
		    		var pageNumber = $('#table').bootstrapTable('getOptions').pageNumber;
		    		if(data.length==0 && pageNumber!=1) {
		    			$('#table').bootstrapTable('selectPage', 1);
		    		}
		    	}
		      });
		    };
		    //初始化加载子表的方法
		      oTableInit.InitSubTable = function (index, prow, $detail){
		    	var orderId = prow.orderId;
		    	var cur_table = $detail.html('<table id="subtable" style="font-family:微软雅黑;font-size:14px;"></table>').find('table');
		    	$(cur_table).bootstrapTable({
		    	url: '/shopee/sublist',
		    	method: 'get',
		    	queryParams: { orderId: orderId },
		    	ajaxOptions: { orderId: orderId },
		    	onLoadSuccess:function(data){
		    		 if (data.length>1) {
						//如果大于1   说明订单条数大于一  则 需要合并单元格
						//获取每一个商品的sku
						 for (var i = 0; i < data.length; i++) {
							 $.each(data[i], function (key, value) {
								 var sku = '';
								 if(key=='sku' && value!='') {
									 sku = value;
								 } 
								 else if(key=='itemSku' && value!='') {
									 sku = value;
								 }
							    if (sku!=''){
		                            if (i!=0) {
										//如果是有多条订单的话，就删除第一条之后的需要合并的单元数据
										$("."+sku+"-shipInfo").parent().remove();
										$("."+sku+"-address").parent().remove();
										$("."+sku+"-orderStatus").parent().remove();
									}							
								    $("."+sku+"-shipInfo").parent().prop("rowspan",data.length);
									$("."+sku+"-address").parent().prop("rowspan",data.length);
									$("."+sku+"-orderStatus").parent().prop("rowspan",data.length);
								}
						    }); 
						} 
			       }
               },//onLoadSuccess
		       columns: [{
		              field: 'sku',
		              title: 'SKU',
		              align: 'center',
		              
		        },{
		              field: 'productName',
		              title: '品名',
		              align: 'center',
		        },{
		              field: 'variationName',
		              title: '变参属性',
		              align: 'center',
		        },{
		              field: 'city',
		              title: '单价',
		              align: 'center',
		        },{
		              field: 'state',
		              title: '数量',
		              align: 'center',
		        },{
		              field: 'country',
		              title: '订单状态',
		              align: 'center',
		        }],//colmus结束
		    });//$(cur_table).bootstrapTable结束
		   };//InitSubTable结束
		   
		   //得到父表查询的参数
		   oTableInit.queryParams = function (params) {
			   //str   =   str.replace(/^\s+|\s+$/g,"");去除两端空格
			   //replace(/\s+/g,""); 去除所有空格
 		      var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
 		       // limit: params.pageSize,  //页面大小
		       // pageNumber: params.pageNumber, //页码
		       // orderDateStart:$("#orderDateStart").val(),
		        ///orderDateEnd:$("#orderDateEnd").val(),
		       // sku:$("#sku").val().trim(),
		       // orderStatus:$("#orderStatus").val(),
		       // orderNum:($("#Order_id").val()).replace(/^\s+|\s+$/g,""),
		       // shopAccount: ($("#accountID").val()).replace(/^\s+|\s+$/g,"")
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
		
		//日历插件配置方法
		 $(".form_datetime").datetimepicker({
		 		format:'yyyy-mm-dd',
		 		autoclose:true,
		 		language: 'zh-CN',
		         minView:'2',
		         //展示到天数就行
		       
		 });
		
		
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
		
		  //改table展开样式
		  $(function(){
			  var parent;
			  $('#table').on('load-success.bs.table',function(){
				  cf();
				  function cf(){
					  $('.detail-icon').click(function(event){
						  $('tr').find('td').removeClass('gre-bak');
						  $('.detail-view').prev().find('td').addClass('gre-bak');
					  }) ;
				  };
				  
			  });
			});

/** ******************************高级搜索模块展示和隐藏********************************** */
function searchH()
{
    // 不能直接使用jquery的对象调用
    $('#searchH').toggle();
}

function searchResult(){
	$('#editModal').modal('toggle');
}