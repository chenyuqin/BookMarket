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

    $("#dd").hover(function () {
        $("#load").slideToggle("fast");
    });

    $("#load").mouseleave(function () {
        $("#load").css('display', 'none');
    });

    //最新动态
    $.ajax({
        url: 'index/notice',
        type: 'Get',
        data: {},
        dataType: 'JSON',
        success: function(result){
            var inner_html = "";
            $.each(result,function(index, item){
                inner_html = inner_html +
                    "<li><a href=\"" + item.url + "\" title=\"" + item.title + "\">" + item.title + "</a></li>"
                ;
            });
            $('#notice').html(inner_html);
        }
    });

    //猜你喜欢
    $.ajax({
        url: 'index/guessYouLike',
        type: 'Get',
        data: {},
        dataType: 'JSON',
        success: function(result){
            $('#guessYouLike').append(
                "<div class=\"book-png\">\n" +
                "                    <a href=\"" + "http://localhost:8088/book_detail.html?bid=" + result.id + "\"><img src=\"" + result.image1 + "\"/></a>\n" +
                "                </div>\n" +
                "                <div class=\"page-box\">\n" +
                "                    <p><a href=\"" + "http://localhost:8088/book_detail.html?bid=" + result.id + "\" title=\"" + result.name + "\">" + result.name + "</a></p>\n" +
                "                    <p title=\"" + result.author + "\" style=\"opacity:0.8;\">" + result.author + "</p>\n" +
                "                </div>"
            );
        }
    });

    //新书上架
    $.ajax({
        url: 'index/getTenNewBook',
        type: 'Get',
        data: {},
        dataType: 'JSON',
        success: function(result){
            var ten_book_html = "";
            $.each(result,function(index, item){
                ten_book_html = ten_book_html +
                    "<li>\n" +
                    "                            <div>\n" +
                    "<input type=\"hidden\" value=\"" + item.id + "\" />" +
                    "                                <img src=\"" + item.image1 + "\"/>\n" +
                    "                                <p class=\"book_name\" title=\"" + item.name + "\">" + item.name + "</p>\n" +
                    "                                <p class=\"author\" title=\"" + item.author + "\">" + item.author + "</p>\n" +
                    "                                <p class=\"price\">￥" + item.price + "\n" +
                    // "                                    <del>￥" + item.prePrice + "</del>\n" +
                    "                                </p>\n" +
                    "                            </div>\n" +
                    "                        </li>"
                ;
            });
            $('#ten_new_book').html(ten_book_html);

        }
    });

    //打折优惠
    $('#discount_cate a').click(function () {
        $('#discount_cate .tab-active').removeClass('tab-active');
        $(this).addClass('tab-active');
        var type = $('#discount_cate .tab-active').index();
        $.ajax({
            url: 'index/getDiscountBook',
            type: 'Get',
            data: {'type':type},
            dataType: 'JSON',
            success: function(result){
                var ten_book_html = "";
                $.each(result,function(index, item){
                    ten_book_html = ten_book_html +
                        "<li>\n" +
                        "                            <div>\n" +
                        "<input type=\"hidden\" value=\"" + item.id + "\" />" +
                        "                                <img src=\"" + item.image1 + "\"/>\n" +
                        "                                <p class=\"book_name\" title=\"" + item.name + "\">" + item.name + "</p>\n" +
                        "                                <p class=\"author\" title=\"" + item.author + "\">" + item.author + "</p>\n" +
                        "                                <p class=\"price\">￥" + item.price + "\n" +
                        "                                    <span>(" + item.discount + "折)</span>\n" +
                        "                                    <del>￥" + item.prePrice + "</del>\n" +
                        "                                </p>\n" +
                        "                                <p>\n" +
                        "                                    <span class=\"cate\" title=\"" + item.category + " > " + item.biggestCate + " > " + item.biggerCate + "\">\n" +
                        "                                        分类：" + item.category + " > " + item.biggestCate + " > " + item.biggerCate + "\n" +
                        "                                    </span>\n" +
                        "                                </p>\n" +
                        "                                <p class=\"star\">\n" +
                        "                                    <span class=\"level\">\n" +
                        "                                        <span style=\"width: \" + item.star + \";\"></span>\n" +
                        "                                    </span>\n" +
                        "                                    <a href=\"#\" target=\"_blank\" name=\"itemlist-review\">" + item.remark + "条评论</a>\n" +
                        "                                </p>\n" +
                        "                            </div>\n" +
                        "                        </li>"
                    ;
                });
                $('#ten_discount_book').html(ten_book_html);
            }
        });
    });
    $('#discount_cate .tab-active').click();

    //销量排行榜
    $('#sale_rank_cate a').click(function () {
        $('#sale_rank_cate .tab-active').removeClass('tab-active');
        $(this).addClass('tab-active');
        var type = $('#sale_rank_cate .tab-active').index();
        $.ajax({
            url: 'index/getSaleRankBook',
            type: 'Get',
            data: {'type':type},
            dataType: 'JSON',
            success: function(result){
                var ten_book_html = "";
                $.each(result,function(index, item){
                    ten_book_html = ten_book_html +
                        "<li>\n" +
                        "                            <div>\n" +
                        "<input type=\"hidden\" value=\"" + item.id + "\" />" +
                        "                                <img src=\"" + item.image1 + "\"/>\n" +
                        "                                <p class=\"book_name\" title=\"" + item.name + "\">" + item.name + "</p>\n" +
                        "                                <p class=\"author\" title=\"" + item.author + "\">" + item.author + "</p>\n" +
                        "                                <p class=\"price\">￥" + item.price + "\n" +
                        "                                    <span>(" + item.discount + "折)</span>\n" +
                        "                                    <del>￥" + item.prePrice + "</del>\n" +
                        "                                </p>\n" +
                        "                                <p>\n" +
                        "                                    <span class=\"cate\" title=\"" + item.category + " > " + item.biggestCate + " > " + item.biggerCate + "\">\n" +
                        "                                        分类：" + item.category + " > " + item.biggestCate + " > " + item.biggerCate + "\n" +
                        "                                    </span>\n" +
                        "                                </p>\n" +
                        "                                <p class=\"star\">\n" +
                        "                                    <span class=\"level\">\n" +
                        "                                        <span style=\"width: \" + item.star + \";\"></span>\n" +
                        "                                    </span>\n" +
                        "                                    <a href=\"#\" target=\"_blank\" name=\"itemlist-review\">" + item.remark + "条评论</a>\n" +
                        "                                </p>\n" +
                        "                                <p class=\"sales\">\n" +
                        "                                    <span>总销量：" + item.sales + "本</span>\n" +
                        "                                </p>\n"
                        "                            </div>\n" +
                        "                        </li>"
                    ;
                });
                $('#ten_sale_rank_book').html(ten_book_html);
            }
        });
    });
    $('#sale_rank_cate .tab-active').click();
});

(function ($) {
    //扩展方法获取url参数
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);

