//确认操作弹窗
function confirm_box(suc,_this,clock,err){
	var _this = $(_this);//按钮对象
	$(".confirm").hide();//初始化
	$(".confirm_txt").text('是否确认'+_this.text())//弹窗提示信息更新
	$(".confirm").css({
		'position':'absolute',
		'top':_this.position().top+_this.outerHeight(true)+14,
		'left':_this.position().left
	})//弹窗定位
	$(".confirm").show();//弹窗显示
	if(clock) clock_screen(clock);//锁屏//需要确认弹窗的层级比锁的层级要高
	$(".close_x").off('click');
	$('.close_x').click(function(e){//弹窗去除
		var e = window.event || arguments.callee.caller.arguments[0];
		e.stopPropagation();
		$(this).parents('.confirm').hide(); if(clock) clearClock(clock)//解锁
	});
	$(".confirm button:last").off('click');
	$(".confirm button:last").click(function(e){
		var e = window.event || arguments.callee.caller.arguments[0];
		e.stopPropagation();
		if(err) err();//取消回调
		$(this).parents('.confirm').hide(); if(clock) clearClock(clock)//直接取消//解锁
	});
	$(".confirm button:first").off('click');
	$(".confirm button:first").click(function(e){
		var e = window.event || arguments.callee.caller.arguments[0];
		e.stopPropagation();
		if(suc){
			suc(); 
			$(this).parents('.confirm').hide(); 
			if(clock) clearClock(clock)//成功回调//解锁
		} 
		else alert('请传递成功回调参数');//提示用法错误
	});
}