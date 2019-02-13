$(document).ready(function () {

    $("#header").load("header.html");

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
            $('.cate').css('height', '29px');
            $(".opencate").html("<span>更多</span><i class=\"iconfont icon-zhankai\"></i>");
        } else {
            $('.cate').css('height', 'auto');
            $(".opencate").html("<span>收起</span><i class=\"iconfont icon-shouqi\"></i>");
        }
    });

    $(".openpublish").click(function () {
        if ($(".openpublish span").text() == "收起") {
            $('.publish').css('height', '29px');
            $(".openpublish").html("<span>更多</span><i class=\"iconfont icon-zhankai\"></i>");
        } else {
            $('.publish').css('height', 'auto');
            $(".openpublish").html("<span>收起</span><i class=\"iconfont icon-shouqi\"></i>");
        }
    });

    $(".openauthor").click(function () {
        if ($(".openauthor span").text() == "收起") {
            $('.author').css('height', '29px');
            $(".openauthor").html("<span>更多</span><i class=\"iconfont icon-zhankai\"></i>");
        } else {
            $('.author').css('height', 'auto');
            $(".openauthor").html("<span>收起</span><i class=\"iconfont icon-shouqi\"></i>");
        }
    });

    //根据url中的参数显示搜索结果
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

    //点击分类项时归类到筛选条件里
    $(".pri").click(function () {
        var i = $(this).index('.pri');
        $(".select").append("<div class=\"addressToCont fl choose\" id='price_choose'>\n" +
            "                     <span id='pri_choose'>" + $(".price dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_price").css("display", "none");
        queryByParam(1);
        $('#price_choose').unbind('click').bind('click', function () {
            $('#price_choose').remove();
            $(".all_price").css("display", "block");
            queryByParam(1);
        });
    });

    $(".appr").click(function () {
        var i = $(this).index('.appr');
        $(".select").append("<div class=\"addressToCont fl choose\" id='appraise_choose'>\n" +
            "                     <span id='appr_choose'>" + $(".appraise dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_appraise").css("display", "none");
        queryByParam(1);
        $('#appraise_choose').unbind('click').bind('click', function () {
            $('#appraise_choose').remove();
            $(".all_appraise").css("display", "block");
            queryByParam(1);
        });
    });

    $(".cou").click(function () {
        var i = $(this).index('.cou');
        $(".select").append("<div class=\"addressToCont fl choose\" id='discount_choose'>\n" +
            "                     <span id='cou_choose'>" + $(".count dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
            "                </div>");
        $(".all_count").css("display", "none");
        queryByParam(1);
        $('#discount_choose').unbind('click').bind('click', function () {
            $('#discount_choose').remove();
            $(".all_count").css("display", "block");
            queryByParam(1);
        });
    });

    queryByParam(1);

    $("#up_page").click(function () {
        var current = parseInt($(".zuo").text());
        if (current == 0 || current == 1) {
            alert("已经是第一页，点击无效！");
            return;
        }
        var updatePage = current - 1;
        $('.zuo').text(updatePage);
        queryByParam(updatePage);
    });

    $("#down_page").click(function () {
        var current = parseInt($(".zuo").text());
        if (current == $(".you").text()) {
            alert("已经是最后一页，点击无效！");
            return;
        }
        var updatePage = current + 1;
        $('.zuo').text(updatePage);
        queryByParam(updatePage);
    });

    $("#go_page").click(function () {
        var page = $("#page_num").val();
        checkNumber(page);
        if (page < 1 || page > parseInt($(".you").text())) {
            alert('请输入有效的页数！');
            return;
        }
        $(".zuo").text(page);
        queryByParam(page);
    });
});

function queryByParam(page) {
    //自动获取需要查询的已选条件
    var c1 = trim($('.address .addressTo').find(".choose2").eq(0).text());
    var c2;
    if (trim($('.address .addressTo').find(".choose2").eq(1).text()) != '') {
        c2 = trim($('.address .addressTo').find(".choose2").eq(1).text());
    }
    var c3;
    if (trim($('.address .addressTo').find(".choose2").eq(2).text()) != '') {
        c3 = trim($('.address .addressTo').find(".choose2").eq(2).text());
    }

    var pub_choose;
    if (trim($('#pub_choose').text()) != '') {
        pub_choose = trim($('#pub_choose').text());
    }

    var aut_choose;
    if (trim($('#aut_choose').text()) != '') {
        aut_choose = trim($('#aut_choose').text());
    }

    var pri_choose = trim($('#pri_choose').text());
    var s_pri;
    var h_pri;
    if (pri_choose != '') {
        if (pri_choose == "49以上") {
            s_pri = "49";
        } else {
            s_pri = pri_choose.split("-")[0];
            h_pri = pri_choose.split("-")[1];
        }
    }

    var appr_choose = trim($('#appr_choose').text());
    var s_appr;
    switch (appr_choose) {
        case "5星":
            s_appr = "100%";
            break;
        case "4星以上":
            s_appr = "80%";
            break;
        case "3星以上":
            s_appr = "60%";
            break;
        case "2星以上":
            s_appr = "40%";
            break;
        case "1星以上":
            s_appr = "20%";
            break;
    }

    var cou_choose = trim($('#cou_choose').text());
    var s_cou, h_cou;
    switch (cou_choose) {
        case "3折以下":
            s_cou = "0";
            h_cou = "3";
            break;
        case "3-5折":
            s_cou = "3";
            h_cou = "5";
            break;
        case "5-7折":
            s_cou = "5";
            h_cou = "7";
            break;
        case "7折以上":
            s_cou = "7";
            h_cou = "10";
            break;
    }

    $.ajax({
        url: 'searchByCate/searchByParam',
        type: 'Get',
        data: {
            "biggestCate": c1, "biggerCate": c2, "bigCate": c3,
            "publisher": pub_choose, "author": aut_choose, "slowPrice": s_pri,
            "highPrice": h_pri, "slowAppraise": s_appr, "slowDiscount": s_cou,
            "highDiscount": h_cou, "page": page
        },
        dataType: 'JSON',
        async: false,
        success: function (result) {
            $(".productNum b").text(result.count);

            if (result.cates == null || result.cates.length == 0) {
                $(".category").css("display", "none");
            } else {
                $(".category .cate").empty();
                $.each(result.cates, function (index, item) {
                    $(".category .cate").append(
                        '<dd><a class="textbook">' + item + '</a></dd>'
                    );
                });
            }

            $(".all_publish .publish").empty();
            if (result.publishers.length == 0) {
                $(".all_publish").css("display", "none");
            } else {
                $.each(result.publishers, function (index, item) {
                    $(".all_publish .publish").append(
                        '<dd><a class="pub">' + item + '</a></dd>'
                    );
                });
            }

            $(".all_author .author").empty();
            if (result.authors.length == 0) {
                $(".all_author").css("display", "none");
            } else {
                $.each(result.authors, function (index, item) {
                    $(".all_author .author").append(
                        '<dd><a class="aut">' + item + '</a></dd>'
                    );
                });
            }

            $(".productListWrap").empty();
            if (result.books.length == 0) {
                $('.productListWrap').html(
                    '<div class="notice_nobook">' +
                    '<i class="iconfont icon-meiyoushuju" style="font-size: 50px;"></i>' +
                    '<p>查无图书!</p>' +
                    '<p>可能造成该问题的原因有两个:</p>' +
                    '<p>①您的筛选条件较多，请适当减少筛选条件。</p>' +
                    '<p>②相关图书未收录，请联系管理员收录图书。</p>' +
                    '</div>'
                );
                $('.page').css("display", 'none');
                checkSlogan();
            } else {
                $.each(result.books, function (index, item) {
                    $(".productListWrap").append(
                        '<div class="productItem">\n' +
                        '                <div class="imgBox">\n' +
                        '                    <a href="http://localhost:8088/book_detail?bid=' + item.id + '" target="_blank">\n' +
                        '                        <img src="' + item.image1 + '" alt="" style="height:188px;width: 188px;">\n' +
                        '                    </a>\n' +
                        '                </div>\n' +
                        '                <div class="infoCont">\n' +
                        '                    <div class="saleRow">\n' +
                        '                        <div class="col fl" style="padding-right: 10px;">\n' +
                        '                            <span class="price">\n' +
                        '                                <span class="priceSign">¥</span>\n' +
                        '                                <span class="priceNum">' + item.price + '</span>\n' +
                        '                            </span>\n' +
                        '                        </div>\n' +
                        '                        <div class="col end">\n' +
                        '                            <span class="weekSale">\n' +
                        '                                <span class="num"><del>' + item.prePrice + '</del></span>\n' +
                        '                                <span class="num" style="color: red;">(' + item.discount + '折)</span>\n' +
                        '                            </span>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                    <div class="titleRow">\n' +
                        '                        <p>\n' +
                        '                            <a class="productTitle" title="' + item.name + '" href="http://localhost:8088/book_detail?bid=' + item.id + '" target="_blank">\n' +
                        '                                ' + item.name + '\n' +
                        '                            </a>\n' +
                        '                        </p>\n' +
                        '                        <p class="keyword" title="' + item.detail + '">\n' +
                        '                            ' + item.detail + '\n' +
                        '                        </p>\n' +
                        '                        <p class="star">\n' +
                        '                            <span class="level">\n' +
                        '                                <span style="width: ' + item.star + ';"></span>\n' +
                        '                            </span>\n' +
                        '                            <a href="#" target="_blank" name="itemlist-review">' + item.remark + '条评论</a>\n' +
                        '                        </p>\n' +
                        '                    </div>\n' +
                        '                    <!--</div>-->\n' +
                        '                    <div class="infoRow seller">\n' +
                        '                        <div class="addToCart">\n' +
                        '                            <a href="#" target="_blank">\n' +
                        '                                <span class="iconfont icon-gouwuche1" style="font-size: 17px;"></span> 加入购物车\n' +
                        '                            </a>\n' +
                        '                        </div>\n' +
                        '                        <div class="collect">\n' +
                        '                            <a href="#" target="_blank">\n' +
                        '                                <span class="iconfont icon-shoucang" style="font-size: 17px;"></span> 收藏\n' +
                        '                            </a>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '            </div>'
                    );
                });
                checkSlogan();
                $('.page').css("display", 'block');
            }

            //下方总页数
            $('.pageList').children("span").eq(1).text(result.pages);
            $('.you').text(result.pages);
            if (result.pages == 0 || result.pages == 1) {
                $(".zuo").text(result.pages);
                $(".you").text(result.pages);
                $('#fanye_zuo').css('color', "gray");
                $('#fanye_you').css('color', "gray");
                $('#up_page').css('background', "lightgray");
                $('#down_page').css('background', "lightgray");
            } else {
                if (result.pages == $(".zuo").text()) {
                    $('#fanye_zuo').css('color', "orangered");
                    $('#fanye_you').css('color', "gray");
                    $('#down_page').css('background', "lightgray");
                    $('#up_page').css('background', "#fff");
                } else {
                    if ($(".zuo").text() == 1) {
                        $('#fanye_zuo').css('color', "gray");
                        $('#fanye_you').css('color', "orangered");
                        $('#up_page').css('background', "lightgray");
                        $('#down_page').css('background', "#fff");
                    } else {
                        $('#fanye_zuo').css('color', "orangered");
                        $('#fanye_you').css('color', "orangered");
                        $('#up_page').css('background', "#fff");
                        $('#down_page').css('background', "#fff");
                    }
                }
            }

            $('#fanye_zuo').unbind('click').bind('click', function () {
                if ($('.zuo').text() == '0' || $('.zuo').text() == '1') {
                    return;
                }
                var updatePage = parseInt($('.zuo').text()) - 1;
                if (updatePage == 1) {
                    $('#fanye_zuo').css("color", "gray");
                    $('#up_page').css('background', "lightgray");
                    $('.zuo').text(updatePage);
                    queryByParam(updatePage);
                } else {
                    $('#fanye_zuo').css("color", "orangered");
                    $('#up_page').css('background', "#fff");
                    $('.zuo').text(updatePage);
                    queryByParam(updatePage);
                }
            });

            $('#fanye_you').unbind('click').bind('click', function () {
                if ($('.zuo').text() == $('.you').text()) {
                    return;
                }
                var updatePage = parseInt($('.zuo').text()) + 1;
                if (updatePage == $('.you').text()) {
                    $('#fanye_you').css("color", "gray");
                    $('#down_page').css('background', "lightgray");
                    $('.zuo').text(updatePage);
                    queryByParam(updatePage);
                } else {
                    $('#fanye_zuo').css("color", "orangered");
                    $('#up_page').css('background', "#fff");
                    $('.zuo').text(updatePage);
                    queryByParam(updatePage);
                }
            });

            $(".textbook").unbind('click').bind('click', function () {
                var i = $(this).index('.textbook');
                $(".title").append("<span class='fl'>&gt; </span>" +
                    "               <span class=\"fl choose2\">\n" +
                    "                    <a href=\"\" style=\"text-decoration: none\">" + $(".cate dd").eq(i).text() + "\n" +
                    "                        <i class=\"iconfont icon-zhankai\" style=\"font-size: 13px;\"></i>\n" +
                    "                    </a>\n" +
                    "                </span>");
                // $(".category").css("display", "none");
                queryByParam(1);
            });
            $(".pub").unbind('click').bind('click', function () {
                var i = $(this).index('.pub');
                $(".select").append("<div class=\"addressToCont fl choose\" id='publisher_choose'>\n" +
                    "                     <span id='pub_choose'>" + $(".publish dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
                    "                </div>");
                $(".all_publish").css("display", "none");
                queryByParam(1);
                $('#publisher_choose').unbind('click').bind('click', function () {
                    $('#publisher_choose').remove();
                    $(".all_publish").css("display", "block");
                    queryByParam(1);
                });
            });
            $(".aut").unbind('click').bind('click', function () {
                var i = $(this).index('.aut');
                $(".select").append("<div class=\"addressToCont fl choose\" id='author_choose'>\n" +
                    "                     <span id='aut_choose'>" + $(".author dd").eq(i).text() + " <i class=\"iconfont icon-cha\" style='font-size: 10px;opacity:0.4;'></i></span>\n" +
                    "                </div>");
                $(".all_author").css("display", "none");
                queryByParam(1);
                $('#author_choose').unbind('click').bind('click', function () {
                    $('#author_choose').remove();
                    $(".all_author").css("display", "block");
                    queryByParam(1);
                });
            });
        }
    });
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function checkSlogan() {
    var realHeight = $(document).height();
    if (realHeight <= 722) {
        $('#slogan').removeClass('slogan')
        $('#slogan').addClass('slogan2');
    } else {
        $('#slogan').removeClass('slogan2')
        $('#slogan').addClass('slogan');
    }
}

function checkNumber(nubmer) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

    if (!re.test(nubmer)) {
        alert("请输入数字！");
        return false;
    }
    return true;
}

