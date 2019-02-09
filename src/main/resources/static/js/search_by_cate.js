$(document).ready(function () {

    if (sessionStorage.getItem('id') != "" && sessionStorage.getItem('id') != null) {
        $("#top_tools").html(
            "<span style=\"color: black;font-size: 15px;font-family: monospace;font-weight: 600;\">欢迎您，<span style=\"color: blue;\">" + sessionStorage.getItem('name') + "</span></span>\n" +
            "                <span style=\"margin:0 .5em;color:#424242;\">|</span>\n" +
            "                <a href=\"login.html\" id=\"logout\">\n" +
            "                <span class=\"iconfont icon-dengchu\">&nbsp;登出</span></a>\n" +
            "                <span style=\"margin:0 .5em;color:#424242;\">|</span>"
        );
    } else {
        $("#top_tools").html(
            "<a href=\"login.html\" id=\"login\">\n" +
            "                        <span class=\"iconfont icon-dengru\">&nbsp;登录</span></a>\n" +
            "                    <span style=\"margin:0 .5em;color:#424242;\">|</span>\n" +
            "                    <a href=\"register.html\" id=\"register\">\n" +
            "                        <span class=\"iconfont icon-zhuce\"> 注册</span></a>\n" +
            "                    <span style=\"margin:0 .5em;color:#424242;\">|</span>"
        );
    }

    $('.price_text').focus(function () {
        $('.price_text').css("color", "#000");
        $('.interval').css("background", "#fff");
        $('.inner div').css("display", "block");
    });

    $('.price_text').blur(function () {
        $('.interval').css("background", "#efefef");
        $('.price_text').css("color", "#878787");
        $('.inner div').css("display", "none");
    });

    $('.btn_yes').mousedown(function () {
        event.preventDefault();
    });

    $('.btn_yes').click(function () {
        $('.interval').css("background", "#efefef");
        $('.price_text').css("color", "#878787");
        $('.inner div').css("display", "none");
    });

    //分类项较多时的更多和收起实现
    $(".opencate").click(function () {
        if ($(".opencate span").text() == "收起") {
            $(".cate dd").eq(6).nextAll().css("display", "none");
            $(".opencate").html("<span>更多</span><i class=\"iconfont icon-zhankai\"></i>");
        } else {
            $(".cate dd").eq(6).nextAll().css("display", "block");
            $(".opencate").html("<span>收起</span><i class=\"iconfont icon-shouqi\"></i>");
        }
    });

    $(".openpublish").click(function () {
        if ($(".openpublish span").text() == "收起") {
            $(".publish dd").eq(6).nextAll().css("display", "none");
            $(".openpublish").html("<span>更多</span><i class=\"iconfont icon-zhankai\"></i>");
        } else {
            $(".publish dd").eq(6).nextAll().css("display", "block");
            $(".openpublish").html("<span>收起</span><i class=\"iconfont icon-shouqi\"></i>");
        }
    });

    $(".openauthor").click(function () {
        if ($(".openauthor span").text() == "收起") {
            $(".author dd").eq(6).nextAll().css("display", "none");
            $(".openauthor").html("<span>更多</span><i class=\"iconfont icon-zhankai\"></i>");
        } else {
            $(".author dd").eq(6).nextAll().css("display", "block");
            $(".openauthor").html("<span>收起</span><i class=\"iconfont icon-shouqi\"></i>");
        }
    });

    $(".textbook").click(function () {
        var i=$(this).index('.textbook');
        $(".title").append("<span class='fl'>&gt; </span>" +
            "               <span class=\"fl choose2\">\n" +
            "                    <a href=\"\" style=\"text-decoration: none\">" + $(".cate dd").eq(i).text() + "\n" +
            "                        <i class=\"iconfont icon-zhankai\" style=\"font-size: 13px;opacity:0.4;\"></i>\n" +
            "                    </a>\n" +
            "                </span>");
        $(".category").css("display", "none");
    });

    //点击分类项时归类到筛选条件里
    $(".pub").click(function () {
        var i=$(this).index('.pub');
        $(".select").append("<div class=\"addressToCont fl choose\">\n" +
            "                     <span>" + $(".publish dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_publish").css("display", "none");
    });

    $(".aut").click(function () {
        var i=$(this).index('.aut');
        $(".select").append("<div class=\"addressToCont fl choose\">\n" +
            "                     <span>" + $(".author dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_author").css("display", "none");
    });

    $(".pri").click(function () {
        var i=$(this).index('.pri');
        $(".select").append("<div class=\"addressToCont fl choose\">\n" +
            "                     <span>" + $(".price dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_price").css("display", "none");
    });

    $(".appr").click(function () {
        var i=$(this).index('.appr');
        $(".select").append("<div class=\"addressToCont fl choose\">\n" +
            "                     <span>" + $(".appraise dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_appraise").css("display", "none");
    });

    $(".cou").click(function () {
        var i=$(this).index('.cou');
        $(".select").append("<div class=\"addressToCont fl choose\">\n" +
            "                     <span>" + $(".count dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_count").css("display", "none");
    });

    //根据url中的参数显示搜索结果
    var category = getQueryString('category');
    var c1 = decodeURI(getQueryString('c1'));
    var c2 = decodeURI(getQueryString('c2'));
    var c3 = decodeURI(getQueryString('c3'));
    if (c1 != 'null') {
        $(".address .addressTo").append(
            '<span class="fl choose2">\n' +
            '                    <a style="text-decoration: none">' + c1 + '\n' +
            '                        <i class="iconfont icon-zhankai" style="font-size: 13px;"></i>\n' +
            '                    </a>\n' +
            '                </span>'
        );
    }
    if (c2 != 'null') {
        $(".address .addressTo").append(
            '<span class="fl"> ></span>\n' +
            '                <span class="fl choose2">\n' +
            '                    <a style="text-decoration: none">' + c2 + '\n' +
            '                        <i class="iconfont icon-zhankai" style="font-size: 13px;"></i>\n' +
            '                    </a>\n' +
            '                </span>'
        );
    }
    if (c3 != 'null') {
        $(".address .addressTo").append(
            '<span class="fl"> ></span>\n' +
            '                <span class="fl choose2">\n' +
            '                    <a style="text-decoration: none">' + c3 + '\n' +
            '                        <i class="iconfont icon-zhankai" style="font-size: 13px;"></i>\n' +
            '                    </a>\n' +
            '                </span>'
        );
        $(".screen .category").hide();
    }
    $.ajax({
        url: 'searchByCate/search',
        type: 'Get',
        data: {'category':category, "c1":c1, "c2":c2, "c3":c3},
        dataType: 'JSON',
        success: function (result) {

        }
    });
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}