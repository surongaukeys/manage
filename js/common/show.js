function show(tableId){
	 $('#'+tableId).bootstrapTable({
		onColumnSwitch:function(name,checked){
			//如果被选中
			if(!checked){
				localStorage.colums1 += name+",";
				 }else{
			//如果取消选中，则剔除
				var s = localStorage.colums1;
				var st = s.substring(0, s.indexOf(name));
				var end = s.substring(s.indexOf(name)+1);
				localStorage.colums1 = st+end;
			}
			
		},
		onLoadSuccess:function(id,status){
			var obj1 = localStorage.colums1;
			var obj = obj1.split(',');
			for ( var i in obj) {
			$('#'+tableId).bootstrapTable('hideColumn', obj[i]);
			}
		}
		});
}
//以上两种方式都可以实现效果  但是第一种比较笨拙  而且容易出错  推荐第二种。
function show1(tableId,pageId,account) {
	//localStorage.clear();
	$('#'+tableId).bootstrapTable({
		onColumnSwitch:function(name,checked){
			//如果被选中
			if(!checked){
				//以name的名字存储一个数值为name的值
				localStorage.setItem(name+'-'+pageId+'-'+account,name);
			 }else{
			//如果取消选中，则剔除
				localStorage.removeItem(name+'-'+pageId+'-'+account);
			}
			
		},
		onLoadSuccess:function(id,status){
			for(var  i = 0; i < localStorage.length; i++) {
				var name = localStorage.key(i);//获取第i对的名字
				//如果name中没有包含该页面的字段，则跳出此次循环
				if(name.match('-'+pageId+'-'+account)==null){
				//	alert(name.match('-'+pageId+'-'+account));
					continue;
				}
				$('#'+tableId).bootstrapTable('hideColumn', localStorage.getItem(name));
				
			}
			
		}
		});
	
	
}