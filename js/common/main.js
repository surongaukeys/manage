	function Dialog(fun,contents){
		var params ={content : contents || '',button1:'Cancel',button2:'Sure'};	
		params = $.extend({'position':{'zone':'center'},'overlay':true}, params);
		var id = 'dialogBox_' + Math.floor(Math.random() * 1e9);
		 var markup = [
	'<div id="' + id + '" class="alert-con">',
	       ' <div  class="alert-warning">',
			  '<div class="war-header">',
					'<span class="clo-war closePop">×</span>',
					'<h5 class="war-title">注意</h5>',
				'</div>',
				'<div class="war-body">',
				 params.content,
				'</div>',
				'<div class="war-footer">',
					'<button type="button" tag="ok" class="btn btn-success">确定</button>',
					'<button type="button" class="btn btn-default closePop">关闭</button>',
				'</div>',
			'</div>',
				'</div>'
	    ].join(''); 
	  
	    $(markup).hide().appendTo('body').fadeIn();
	    if($.isFunction(fun)){
	    	$('#' + id).find('button[tag=ok]').click(
	    			function(){
						$('.alert-con').remove();
						fun();
					}
	    			);
	    } 
		$(".closePop").click(function(){
			$(".alert-con").fadeOut(function(){
				$(this).remove();
			});
		})
		
	}
