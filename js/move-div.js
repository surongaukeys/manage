    var moveDiv=document.getElementById("moveDiv");
    var MD=document.getElementById("MD");  
        var a=0;
        var b=0;

        moveDiv.onmouseover=function(){
           moveDiv.style.cursor="move";
        }
        moveDiv.onmousedown=function(event)
        {
            MD.style.cursor="move";
            var e=event||window.event;

            var x1=e.clientX;
            var y1=e.clientY;
            var x=e.clientX-this.offsetLeft;
            var y=e.clientY-this.offsetTop;
            
            a=MD.style.left==''?0:parseInt(MD.style.left);
            b=MD.style.top==''?0:parseInt(MD.style.top);

            document.onmousemove=function(e)
            {
                var ev=e||window.event;
                var xx=ev.clientX;
                var yy=ev.clientY;

                MD.style.left=a+xx-x1+"px";
                MD.style.top=b+yy-y1+"px";
                
            }
        }

        document.onmouseup=function()
        {
            MD.style.cursor="default";
            document.onmousemove=null;
        }