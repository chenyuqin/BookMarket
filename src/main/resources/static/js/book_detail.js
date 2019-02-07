$(function () {
    /*鼠标放小图上，切换中图*/
    $("#spec-list>ul").on("mouseover", "li", function () {
        $(this).parent("ul").children("li").removeClass("active");
        $(this).addClass("active");
        var src = $(this).children("img")[0].src;
        src = src.replace(/_sma/, "");
        $("#preview>img")[0].src = src;
    });
    /*鼠标进入中图，显示大图*/
    $("#superMark").mousemove(function () {
        $("#mark").css("display", "block");
        var e = window.event || arguments[0];
        var x = e.offsetX;
        var y = e.offsetY;
        var markH = $("#mark").height();
        var top = y - markH / 2, left = x - markH / 2;
        top = top < 0 ? 0 :
            top > 200 ? 200 :
                top;
        left = left < 0 ? 0 :
            left > 200 ? 200 :
                left;
        $("#mark").css({
            "top": top,
            "left": left
        });
        var src = $("#preview>img")[0].src;
        var i = src.lastIndexOf(".");
        $("#big-preview").css({
            "display": "block",
            "background": "url(" + src.slice(0, i - 2)
            + "_lar"
            + src.slice(i - 2)
            + ")" + " no-repeat " + -left * 7 / 4 + "px -" + top * 7 / 4 + "px"
        });

        $("#big-preview").css("display", "block");
    }).mouseout(function () {
        $("#mark").css("display", "none");
        $("#big-preview").css("display", "none");
    });

    //根据url中的bid参数初始化该图书的数据
    $.ajax({
        url: 'bookDetail/getBookById',
        type: 'Get',
        data: {'id':getQueryString('bid')},
        dataType: 'JSON',
        success: function(result){
            //分类导航栏
            var inner_html=
                "<a href=\"javascript:void(0);\">图书</a>\n" +
                "        <span>&nbsp;&gt;&nbsp;</span>\n" +
                "        <a href=\"javascript:void(0);\">" + result.category + "</a>\n" +
                "        <span>&nbsp;&gt;&nbsp;</span>\n" +
                "        <a href=\"javascript:void(0);\">" + result.biggestCate + "</a>\n" +
                "        <span>&nbsp;&gt;&nbsp;</span>\n" +
                "        <a href=\"javascript:void(0);\">" + result.biggerCate + "</a>"
            ;
            if (result.bigCate != '' && result.bigCate != null) {
                inner_html = inner_html +
                    "<span>&nbsp;&gt;&nbsp;</span>\n" +
                    "        <a href=\"javascript:void(0);\">" + result.bigCate + "</a>"
            }
            $("#cate").html(inner_html);

            //预览图加载
            inner_html = "<li class=\"active\">\n" +
                "                        <img src=\"" + result.image1 + "\" alt=\"\">\n" +
                "                    </li>";
            if (result.image2 != '' && result.image2 != null) {
                inner_html = inner_html +
                    "<li>\n" +
                    "    <img src=\"" + result.image2 + "\" alt=\"\">\n" +
                    "</li>"
            }
            if (result.image3 != '' && result.image3 != null) {
                inner_html = inner_html +
                    "<li>\n" +
                    "    <img src=\"" + result.image3 + "\" alt=\"\">\n" +
                    "</li>"
            }
            if (result.image4 != '' && result.image4 != null) {
                inner_html = inner_html +
                    "<li>\n" +
                    "    <img src=\"" + result.image4+ "\" alt=\"\">\n" +
                    "</li>"
            }
            if (result.image5 != '' && result.image5 != null) {
                inner_html = inner_html +
                    "<li>\n" +
                    "    <img src=\"" + result.image5 + "\" alt=\"\">\n" +
                    "</li>"
            }
            $("#preview_img").html(inner_html);
        }
    });
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}