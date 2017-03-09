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
		        url: '/shopee/list',     //请求后台的URL（*）
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
			          title: '店铺',
		              align: 'center'
			    },{
				      field: 'purchaseDate',
				      title: '下单时间(平台时间)',
		              align: 'center',
		              formatter:'timeStampToTime'
				},{
			          field: 'payMethod',
			          title: '付款方式',
		              align: 'center',
		              visible:false
			    },{
				      field: 'subsidiesAmount',
				      title: '补贴金额',
		              align: 'center',
		              formatter:function(value,row,index){
		            	  return (parseFloat(row.escrowAmount)-parseFloat(row.total)).toFixed(2) + '(' + row.currency + ')';
		              }
				},{
		              field: 'currency',
		              title: '币种',
		              align: 'center',
		              visible:false
		        },{
		              field: 'escrowAmount',
		              title: '总额',
		              align: 'center',
		              formatter:function(value,row,index){
		            	  return value + '(' + row.currency + ')';
		              }
		        },{
		              field: 'country',
		              title: '国家',
		              align: 'center'
		        },{
		              field: 'purchaseId',
		              title: '订单编号',
		              align: 'center',
		              formatter:function(value,row,index){  
			          if(isNotNull(row.orderStatus)){
			        	  if (row.orderStatus=='推送跟踪号失败') {
							return '<div><p style="margin:0;"><span>'+value+'</span></p><p style="margin:0;"><span id="'+row.orderId+'Span" style="color:red">'+row.orderStatus+'<span></p></div>';
						  } else {
							  return '<div><p style="margin:0;"><span>'+value+'</span></p><p style="margin:0;"><span>'+row.orderStatus+'<span></p></div>';
						  }
			         }else{
				          return '-';
				       }
					} 
		        },{
		              field: 'orderStatus',
		              title: '订单状态',
		              align: 'center',
		              visible:false
		        },{
		              field: 'orderId',
		              title: '订单id',
		              align: 'center',
		              visible:false
		        },{
		              field: 'shippingCost',
		              title: '运费',
		              align: 'center',
		              visible:false
		        },{
		              field: 'shippingType',
		              title: '发货方式',
		              align: 'center',
		              visible:false
		        },{
		              field: 'buyerName',
		              title: '买家姓名',
		              align: 'center',
		              visible:false
		        },{
		              field: 'phonenumber',
		              title: '买家电话',
		              align: 'center',
		              visible:false
		        },{
		              field: 'zipCode',
		              title: '邮编',
		              align: 'center',
		              visible:false
		        },{
		              field: 'addres',
		              title: '详细地址',
		              align: 'center',
		              visible:false
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
		              field: 'productName',
		              title: '商品名称',
		              align: 'center',
		              visible:false
		        },{
		              field: 'sku',
		              title: 'sku',
		              align: 'center',
		              visible:false,
		              formatter:function(value,row,index){  
		            	  if(value!='' && row.itemSku!='') {
		            		  return row.itemSku + ' ' + value;
		            	  }
		            	  else if (value=='' && row.itemSku!='') {
		            		  return row.itemSku;
		            	  }
		              }
		        },{
		              field: 'variationName',
		              title: '商品属性',
		              align: 'center',
		              visible:false
		        },{
		              field: 'city',
		              title: '收货城市',
		              align: 'center',
		              visible:false
		        },{
		              field: 'state',
		              title: '州',
		              align: 'center',
		              visible:false
		        },{
		              field: 'country',
		              title: '收货国家',
		              align: 'center',
		              visible:false
		        },{
		              field: 'sizeValue',
		              title: '商品尺寸',
		              align: 'center',
		              visible:false
		        },{
		              field: 'quantity',
		              title: '商品数量',
		              align: 'center',
		              visible:false
		        },{
		              field: 'productInfo',
		              title: '商品信息',
		              align: 'center',
		              formatter:function(value,row,index){
		            	  var html = '<div><p>品名:'+row.productName+'</p><p>sku:';
		            	  if(row.itemSku!=null && row.itemSku!='' && row.sku!=null && row.sku!='') {
		            		  html += row.itemSku + '[' + row.sku + ']</p>';
		            	  } else {
		            		  html += row.itemSku+'</p>';
		            	  }
		            	  if(row.variationName!=null && row.variationName!='') {
		            		  html += '<p>属性：'+row.variationName+'</p>';
		            	  }
		            	  html += '</div>';
		            	  return html;
		              }
		        },{
		              field: 'price',
		              title: '数量及单价',
		              align: 'center',
		              formatter:function(value,row,index){
		            	  return '<div>'+row.quantity+'*'+value+'('+prow.currency+')'+'</div>';
		              }
		        },{
		              field: 'shipInfo',
		              title: '物流信息',
		              align: 'center',
		              formatter:function(value,row,index){
		            	   var cu = '';
		            	    var result; 
		            	   $.ajax({
		            		  type:"get",
		            		  url:"/shopee/getTrackNumberAndCompany",
		            		  data:{"orderId":prow.orderId},
		            		  async:false,
		            		  success:function(data){
		            			  if (!isNull(data) && data!=""){									
		            			  	result = data;	 
								  }else{
									  result = new Object();
									  result.transporter_name ="物流信息";
									  result.tracking_number = "暂时没有物流跟踪号";
								  }
		            			  },
		            		  error:function(){
		            			  $.jGrowl('请求错误');
		            		  }
		            		  
		            	  });
		            	  var sku = '';
						  if(row.sku!='') {
							  sku = row.sku;
						  } 
						  else if(row.itemSku!='') {
							  sku = row.itemSku;
						  }
		            	  return '<div class="'+sku+'-shipInfo"><p class="hidden">'+row.sku+'</p><p>运费:'+prow.shippingCost+cu+'</p><p>发货方式:'+prow.shippingType+'</p><p>'+result.transporter_name+' : '+result.tracking_number+'</p></div>';
		            	  
			      }
		        },{
		              field: 'address',
		              title: '发货地址',
		              align: 'center',
		              formatter:function(value,row,index){
		            	  var sku = '';
						  if(row.sku!='') {
							  sku = row.sku;
						  } 
						  else if(row.itemSku!='') {
							  sku = row.itemSku;
						  }
		            	  return '<div class="'+sku+'-address"><p>姓名:'+prow.buyerName+'</p><p>电话:'+prow.phonenumber+'</p><p>邮编:'+prow.zipCode+'</p><p>地址:'+prow.addres+'</p></div>';
		              }
		        },{
		              field: 'orderStatus',
		              title: '订单状态',
		              align: 'center',
		              formatter:function(value,row,index){
		            	  var sku = '';
						  if(row.sku!='') {
							  sku = row.sku;
						  } 
						  else if(row.itemSku!='') {
							  sku = row.itemSku;
						  }
		            	  if(prow.orderStatus=='推送跟踪号失败'){
		            		  //return '<div class="'+sku+'-orderStatus" disabled><p style="color:red" id="'+row.sku+'-failed'+'">'+prow.orderStatus+'</p>';
		            		  return '<div class="'+sku+'-orderStatus" disabled><p style="color:red" id="'+prow.orderId+'-failed'+'">推送跟踪号失败</p>'+''
		            		  +'<p><button class=\"btn btn-info\" id="update-'+sku+'" onClick="updateStatus(\''+prow.orderId+'\',this)">已手动推送跟踪号</button></p></div>';
		            	 } else {
		            		 return '<div class="'+sku+'-orderStatus"><p class="p_push" disabled>'+prow.orderStatus+'</p></div>';
		            	 }
		              }
		        }],//colmus结束
		    });//$(cur_table).bootstrapTable结束
		   };//InitSubTable结束
		   
		   //得到父表查询的参数
		   oTableInit.queryParams = function (params) {
			   //str   =   str.replace(/^\s+|\s+$/g,"");去除两端空格
			   //replace(/\s+/g,""); 去除所有空格
 		      var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
 		        limit: params.pageSize,  //页面大小
		        pageNumber: params.pageNumber, //页码
		        orderDateStart:$("#orderDateStart").val(),
		        orderDateEnd:$("#orderDateEnd").val(),
		        sku:$("#sku").val().trim(),
		        orderStatus:$("#orderStatus").val(),
		        orderNum:($("#Order_id").val()).replace(/^\s+|\s+$/g,""),
		        shopAccount: ($("#accountID").val()).replace(/^\s+|\s+$/g,"")
		        };
		      return temp; 
		      };// oTableInit.queryParams
		      
		      
		    return oTableInit;
		 };//TableInit
		 
		 
		//订单查询方法	  
		 $("#sel-button").click(function(){
			 $('#table').bootstrapTable('selectPage', 1);
			 if (!(($("#Order_id").val()).replace(/^\s+|\s+$/g,"")===($("#Order_id").val()).replace(/\s+/g,""))) {
				   $.jGrowl('输入的订单号中间不能有空格，请重新输入');
				   return;
			    }
			   if (!(($("#sku").val()).replace(/^\s+|\s+$/g,"")===($("#sku").val()).replace(/\s+/g,""))) {
				   $.jGrowl('输入的sku中间不能有空格，请重新输入');
				   return;
			    } 
			   var d = new Date();
				var startDate=$("#orderDateStart").val();
				var date2 = new Date(startDate);
			 	if (startDate != "" && date2 > d) {
					$.jGrowl('开始时间应小于北京时间');
					$("#orderDateStart").val("")
					return;
				}
				var endDate=$("#orderDateEnd").val();
				if(startDate!= "" && endDate!= ""){
						if(endDate<startDate){
							 $.jGrowl('结束时间应大于开始时间');
							 return;
					}
					
				}
		 	  $("#table").bootstrapTable('refresh');  
		 	  $.jGrowl('查询成功');

		 }); 
		
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
		
		//订单状态更新方法
		 function updateStatus(orderId,obj){
				$.ajax({
					method:"POST",
					url:"/shopee/updateStatus",
					data:{"orderId":orderId},
					beforeSend: function (request) {
	                    request.setRequestHeader(header, token);
	                }, 
					success:function(result){
						if(result){
							$.jGrowl('状态已修改为已推送跟踪号！');	
							$('#'+orderId+'-failed').html("已推送跟踪号").css('color','black');
							$("#"+orderId+"Span").html('已推送跟踪号').css('color','black');
							$(obj).hide();
						}
					},
					error:function(){
						$.jGrowl('订单状态修改失败，请重新修改！');
					}
				});
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
				  //改状态样式
				  var td_html;
				  for(var i=0;i<= $('.p_push').length;i++){
					  td_html = $('.p_push').eq(i).html();
					  if(td_html=='待导入易登'){
						  $('.p_push').eq(i).css({'color':'#4cabf2','border':'1px dashed #4cabf2','font-size':'16px','width':'124px','height':'34px','line-height':'30px'});
					  }else if(td_html=='已导入易登'){
						  $('.p_push').eq(i).css({'color':'#f27068','border':'1px dashed #f27068','font-size':'16px','width':'124px','height':'34px','line-height':'30px'});
					  }else if(td_html=='待推送跟踪号'){
						  $('.p_push').eq(i).css({'color':'#a37de9','border':'1px dashed #a37de9','font-size':'16px','width':'124px','height':'34px','line-height':'30px'});
					  }else if(td_html=='已推送跟踪号'){
						  $('.p_push').eq(i).css({'color':'#ff8f58','border':'1px dashed #ff8f58','font-size':'16px','width':'124px','height':'34px','line-height':'30px'});
					  }else if(td_html=='推送跟踪号失败'){
						  $('.p_push').eq(i).css({'color':'#8c9ba7','border':'1px dashed #8c9ba7','font-size':'16px','width':'124px','height':'34px','line-height':'30px'});
					  }
				  }
			  });
			});