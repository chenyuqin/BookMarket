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
        src = src.replace(/_w_/g,"_u_");

        $("#big-preview").css({
            "display": "block",
            "background": "url(" + src + ")" + " no-repeat " + -left * 7 / 4 + "px -" + top * 7 / 4 + "px"
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
            $("#first_img").attr("src", result.image1);
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

            //图书信息
            $("#book_name").text(result.name);
            if (result.detail != '' && result.detail != null) {
                $("#p-ad").text(result.detail);
                $("#p-ad").attr('title', result.detail);
            }
            $("#bookinfo_author").text(result.author);
            $("#bookinfo_publisher").text(result.publisher);
            $("#bookinfo_publishTime").text(result.publishTime);
            $("#jd-price").text(result.price);
            $("#jd-discount").text("(" + result.discount + "折)");
            $("#jd-prePrice").text("￥" + result.prePrice);
            $("#jd-remark").text(result.remark);
            $(".level span").css("width", result.star);
            $("#J_SpanStock").text(" " + result.stock + " ");

            //底部图书详情
            $("#bottom_book_info").find('span').eq(0).text(result.name);
            $("#bottom_book_info").find('span').eq(1).text(result.author);
            $("#bottom_book_info").find('span').eq(2).text(result.publisher);
            $("#bottom_book_info").find('span').eq(3).text(result.publishTime);
            $("#bottom_book_info").find('span').eq(4).text(result.isbn);
            if (result.bigCate != '' && result.bigCate != null) {
                $("#bottom_book_info").find('span').eq(5).text(result.category + " > " + result.biggestCate + " > " + result.biggerCate + " > " + result.bigCate);
            } else {
                $("#bottom_book_info").find('span').eq(5).text(result.category + " > " + result.biggestCate + " > " + result.biggerCate);
            }
            $("#bottom_book_info").find('span').eq(6).text(result.suit);
            $("#bottom_book_info").find('span').eq(7).text(result.packing);
            $("#bottom_book_info").find('span').eq(8).text(result.paper);

            //作者简介
            if (result.authorSummary != '' && result.authorSummary != null) {
                $("#bottom_author_info").html(result.authorSummary);
            } else {
                $("#bottom_author_info").html("暂无作者简介！");
            }
            $("#authorIntroduction-btn").click(function () {
                $("#authorIntroduction-show").css('display', 'none');
                $("#authorIntroduction-show-all").html($("#authorIntroduction-textarea").text()).css('display', 'block');
                $("#authorIntroduction-btn").css('display', 'none');
            });

            //内容简介
            if (result.contentSummary != '' && result.contentSummary != null) {
                $("#bottom_content_info").html(result.contentSummary);
            } else {
                $("#bottom_content_info").html("暂无内容简介！");
            }
            $("#content-btn").click(function () {
                $("#content-show").css('display', 'none');
                $("#content-show-all").html($("#content-textarea").text()).css('display', 'block');
                $("#content-btn").css('display', 'none');
            });

            //目录
            if (result.catalog != '' && result.catalog != null) {
                $("#bottom_catalog_info").html(result.catalog);
            } else {
                $("#bottom_catalog_info").html("暂无目录！");
            }
            $("#catalog-btn").click(function () {
                $("#catalog-show").css('display', 'none');
                $("#catalog-show-all").html($("#catalog-textarea").text()).css('display', 'block');
                $("#catalog-btn").css('display', 'none');
            });

            //同类书籍推荐
            $.each(result.sameCateBooks,function(index, item){
                $("#same_cate_book").append(
                    '<li>\n' +
                    '                <a target="_blank" href="http://localhost:8088/book_detail.html?bid=' + item.id + '">\n' +
                    // '                    <input type="hidden" value="' + item.id + '"/>\n' +
                    '                    <img src="' + item.image1 + '">\n' +
                    '                    <p class="title" title="' + item.name + '">' + item.name + '</p>\n' +
                    '                    <p class="author" title="' + item.author + '">' + item.author + '</p>\n' +
                    '                    <p class="price">￥' + item.price + '</p>\n' +
                    '                </a>\n' +
                    '            </li>'
                );
            });
        }
    });
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}