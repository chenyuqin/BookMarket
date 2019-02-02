/*鼠标放小图上，切换中图*/
$("#spec-list>ul").on("mouseover","li",function(){
    $(this).parent("ul").children("li").removeClass("active");
    $(this).addClass("active");
    var src=$(this).children("img")[0].src;
    src=src.replace(/_sma/,"");
    $("#preview>img")[0].src=src;
});
/*鼠标进入中图，显示大图*/
$("#superMark").mousemove(function(){
    $("#mark").css("display","block");
    var e=window.event||arguments[0];
    var x=e.offsetX;
    var y=e.offsetY;
    var markH=$("#mark").height();
    var top=y-markH/2 , left=x-markH/2;
    top=top<0?0:
        top>200?200:
            top;
    left=left<0?0:
        left>200?200:
            left;
    $("#mark").css({
        "top":top,
        "left":left
    });
    var src=$("#preview>img")[0].src;
    var i=src.lastIndexOf(".");
    $("#big-preview").css({
        "display":"block",
        "background":"url("+src.slice(0,i-2)
            +"_lar"
            +src.slice(i-2)
            +")"+" no-repeat "+-left*7/4+"px -"+top*7/4+"px"
    });

    $("#big-preview").css("display","block");
}).mouseout(function(){
    $("#mark").css("display","none");
    $("#big-preview").css("display","none");
});