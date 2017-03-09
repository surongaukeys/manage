$(function(){
	
	  /**
     * get请求
     */
	

	
   jQuery.CommonGetAjax = function (url, args, successCallback, failureCallback , async, dataType) {
	   async = (async==null || async=="" || typeof(async)=="undefined")? "false" : async;
       dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
		var u = url;
		jQuery.ajax({
			url : u,
			data: args,
			dataType : dataType,
			type : 'GET',
			async : async,
			beforeSend : function (request) {
				  var token = $("meta[name='_csrf']").attr("content");
			      var header = $("meta[name='_csrf_header']").attr("content"); 
			      if (token != "" && token != "undefined" && header != "" && header != "undefined"){
			    	  request.setRequestHeader(header, token);
			      }
			},
			success : function (response) {
				if (response.success){
					if (successCallback)
						successCallback(response);
				} else {
					if (failureCallback)
						failureCallback(response);
				}
			},
			error : function (e) {
				errorMess(e);
		     },
			complete : function(XMLHttpRequest, status) { // 请求完成后最终执行参数
				if (status == 'timeout') {// 超时,status还有success,error等值的情况
					ajaxTimeoutTest.abort();
					 $.jGrowl("请求超时");
				}
			}
		});
	};
	
	/**
	 * 判断是否有权限访问该url
	 */
	jQuery.isAccessAjax = function (url, args, successCallback, failureCallback , async, dataType) {
	    var updateFlag = false;
        async = (async==null || async=="" || typeof(async)=="undefined")? "false" : async;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
         var u = url;
         jQuery.ajax({
             url : u,
             data: args,
             dataType : dataType,
             type : 'GET',
             async : false,
             beforeSend : function (request) {
                   var token = $("meta[name='_csrf']").attr("content");
                   var header = $("meta[name='_csrf_header']").attr("content"); 
                   if (token != "" && token != "undefined" && header != "" && header != "undefined"){
                       request.setRequestHeader(header, token);
                   }
             },
             success : function (response) {
                 if (response.success){
                     updateFlag = true;
                 }
             },
             error : function (e) {
                 if(e.status == 200){
                     updateFlag = true;
                 }
                 else if (e.status == 404){
                      $.jGrowl("404,没有找到对应资源链接");
                 } else if (e.status == 401){
                    
                 } else if (e.status == 405){
                     
                 } else if (e.status == 500) {
                     $.jGrowl("系统出现异常，请稍后重试！");
                 } else {
                      $.jGrowl("系统出现异常，请稍后重试！");
                 }
              },
             complete : function(XMLHttpRequest, status) { // 请求完成后最终执行参数
                 if (status == 'timeout') {// 超时,status还有success,error等值的情况
                     ajaxTimeoutTest.abort();
                      $.jGrowl("请求超时");
                 }
             }
         });
         return updateFlag;
     };
	
	/**
	 * 判断是否有权限修改，无权限时跳viewUrl查看页面,有权限跳updateUrl修改页面
	 * updateUrl:跳转修改页面url
	 * viewUrl:跳转查看页面url
	 * args:参数
	 */
	jQuery.toUpdateOrViewAjax = function (updateUrl, viewUrl, args, successCallback, failureCallback , async, dataType) {
	       async = (async==null || async=="" || typeof(async)=="undefined")? "false" : async;
	       dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
	        var u = updateUrl;
	        jQuery.ajax({
	            url : u,
	            data: args,
	            dataType : dataType,
	            type : 'GET',
	            async : async,
	            beforeSend : function (request) {
	                  var token = $("meta[name='_csrf']").attr("content");
	                  var header = $("meta[name='_csrf_header']").attr("content"); 
	                  if (token != "" && token != "undefined" && header != "" && header != "undefined"){
	                      request.setRequestHeader(header, token);
	                  }
	            },
	            success : function (response) {
	                if (response.success){
	                    window.location.href = updateUrl;
	                } else {
	                    window.location.href = viewUrl;
	                }
	            },
	            error : function (e) {
	                if(e.status == 200){
	                    window.location.href = updateUrl;
	                }
	                else if (e.status == 404){
	                     $.jGrowl("404,没有找到对应资源链接");
	                } else if (e.status == 401){
	                    var messageObj = $.parseJSON(e.responseText);
	                   $.jGrowl(messageObj.message);
	                } else if (e.status == 405){
	                    window.location.href = viewUrl;
	                } else if (e.status == 500) {
	                    $.jGrowl("系统出现异常，请稍后重试！");
	                } else {
	                     $.jGrowl("系统出现异常，请稍后重试！");
	                }
	             },
	            complete : function(XMLHttpRequest, status) { // 请求完成后最终执行参数
	                if (status == 'timeout') {// 超时,status还有success,error等值的情况
	                    ajaxTimeoutTest.abort();
	                     $.jGrowl("请求超时");
	                }
	            }
	        });
	    };
	
    
    /**
     * post请求
     */
    jQuery.CommonPostAjax = function (url, args, successCallback, failureCallback , async, dataType) {
 	   async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
 		var u = url;
 		jQuery.ajax({
 			url : u,
 			dataType : dataType,
 			data : args,
 			type : 'POST',
 			async : async,
 			beforeSend : function (request) {
 				  var token = $("meta[name='_csrf']").attr("content");
			      var header = $("meta[name='_csrf_header']").attr("content"); 
			      if (token != "" && token != "undefined" && header != "" && header != "undefined"){
			    	  request.setRequestHeader(header, token);
			      }
 			},
 			success : function (response) {						
 				if (response.success){
 					if (successCallback)
 						successCallback(response);
 				} else {
 					if (failureCallback)
 						failureCallback(response);
 				}
 			},
 			error : function (e) {
 				errorMess(e);
 			},
 			complete : function(XMLHttpRequest, status) { // 请求完成后最终执行参数
				if (status == 'timeout') {// 超时,status还有success,error等值的情况
					ajaxTimeoutTest.abort();
					 $.jGrowl("请求超时");
				}
			}
 		});
 	};
 	
 	
 	  /**
     * PUT请求
     */
    jQuery.CommonPutAjax = function (url, args, successCallback, failureCallback , async, dataType) {
  	   async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
         dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
  		var u = url;
  		jQuery.ajax({
  			url : u,
  			dataType : dataType,
  			data : args,
  			type : 'PUT',
  			async : async,
  			beforeSend : function (request) {
  			  var token = $("meta[name='_csrf']").attr("content");
		      var header = $("meta[name='_csrf_header']").attr("content"); 
		      if (token != "" && token != "undefined" && header != "" && header != "undefined"){
		    	  request.setRequestHeader(header, token);
		      }
  			},
  			success : function (response) {						
  				if (response.success){
  					if (successCallback)
  						successCallback(response);
  				} else {
  					if (failureCallback)
  						failureCallback(response);
  				}
  			},
  			error : function (e) {
  				errorMess(e);
  			},
  			complete : function(XMLHttpRequest, status) { // 请求完成后最终执行参数
				if (status == 'timeout') {// 超时,status还有success,error等值的情况
					ajaxTimeoutTest.abort();
					 $.jGrowl("请求超时");
				}
			}
  		});
  	};
  	
  	
    /**
     * DELETE请求
     */
    jQuery.CommonDeleteAjax = function (url, args, successCallback, failureCallback , async, dataType) {
   	   async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
          dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
   		var u = url;
   		jQuery.ajax({
   			url : u,
   			dataType : dataType,
   			data : args,
   			type : 'DELETE',
   			async : async,
   			beforeSend : function (request) {
   			  var token = $("meta[name='_csrf']").attr("content");
		      var header = $("meta[name='_csrf_header']").attr("content"); 
		      if (token != "" && token != "undefined" && header != "" && header != "undefined"){
		    	  request.setRequestHeader(header, token);
		      }
   			},
   			success : function (response) {						
   				if (response.success){
   					if (successCallback)
   						successCallback(response);
   				} else {
   					if (failureCallback)
   						failureCallback(response);
   				}
   			},
   			error : function (e) {
   				errorMess(e);
   			},
   			complete : function(XMLHttpRequest, status) { // 请求完成后最终执行参数
				if (status == 'timeout') {// 超时,status还有success,error等值的情况
					ajaxTimeoutTest.abort();
					 $.jGrowl("请求超时");
				}
			}
   		});
   	};
    
   	function errorMess(e){
   		console.log(e);
		if (e.status == 404){
//			div.html('<h1>404</h1>');
			 $.jGrowl("404,没有找到对应资源链接");
		} else if (e.status == 401){
            var messageObj = $.parseJSON(e.responseText);
           $.jGrowl(messageObj.message);
        } else if (e.status == 405){
            var messageObj = $.parseJSON(e.responseText);
//            div.html("<h3>"+messageObj.message+"</h3>");
        	 $.jGrowl(messageObj.message);
        } else if (e.status == 500) {
		} else {
//			div.html('<h1>Error</h1>');
			 $.jGrowl("系统出现异常，请稍后重试！");
		}
   	}
    
   

});