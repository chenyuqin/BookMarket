$(function () {
    //将回车键注册为按关键字搜索
    document.onkeydown = function (e) {
        if ((e || event).keyCode == 13)
            $("#search").click();
    };
    //判断是否登录
    if (sessionStorage.getItem('id') != "" && sessionStorage.getItem('id') != null) {
        $("#top_tools").html(
            "<span style=\"color: black;font-size: 15px;font-family: monospace;font-weight: 600;\">欢迎您，<span style=\"color: blue;\">" + sessionStorage.getItem('name') + "</span></span>\n" +
            "                <span style=\"margin:0 .5em;color:#424242;\">|</span>\n" +
            "                <a href=\"login.html\" id=\"logout\" target='_blank'>\n" +
            "                <span class=\"iconfont icon-dengchu\">&nbsp;登出</span></a>\n" +
            "                <span style=\"margin:0 .5em;color:#424242;\">|</span>"
        );
    } else {
        $("#top_tools").html(
            "<a href=\"login.html\" id=\"login\" target='_blank'>\n" +
            "                        <span class=\"iconfont icon-dengru\">&nbsp;登录</span></a>\n" +
            "                    <span style=\"margin:0 .5em;color:#424242;\">|</span>\n" +
            "                    <a href=\"register.html\" id=\"register\" target='_blank'>\n" +
            "                        <span class=\"iconfont icon-zhuce\"> 注册</span></a>\n" +
            "                    <span style=\"margin:0 .5em;color:#424242;\">|</span>"
        );
    }
    //消息通知
    $("#dd").hover(function () {
        $("#load").slideToggle("fast");
    });
    $("#load").mouseleave(function () {
        $("#load").css('display', 'none');
    });
    //搜索事件处理
    $("#search").click(function () {
        var query_string = trim($("#query_string").val());
        if (query_string == '' || query_string == null) {
            alert("请输入需要查询的信息!");
            return;
        }
        $("#query_string").val("");
        window.open("http://localhost:8088/search.html?q=" + query_string);
    });
});