$(document).ready(function () {
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
});