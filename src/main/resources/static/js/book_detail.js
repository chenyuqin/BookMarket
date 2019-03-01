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
        src = src.replace(/_w_/g, "_u_");

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
        data: {'id': getQueryString('bid')},
        dataType: 'JSON',
        success: function (result) {
            //分类导航栏
            var inner_html =
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
                    "    <img src=\"" + result.image4 + "\" alt=\"\">\n" +
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
            $.each(result.sameCateBooks, function (index, item) {
                $("#same_cate_book").append(
                    '<li>\n' +
                    '                <a href="/book_detail.html?bid=' + item.id + '">\n' +
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

    $("#add_num").bind('click', function () {
        var num = parseInt($("#J_IptAmount").val());
        $("#sub_num").removeClass('disable-reduce');
        $("#sub_num").removeAttr('disabled');
        $("#J_IptAmount").val(num + 1);
    });

    $("#sub_num").bind('click', function () {
        var num = parseInt($("#J_IptAmount").val());
        if (num == 1) {
            return;
        }
        if (num == 2) {
            $("#sub_num").addClass('disable-reduce');
        }
        $("#J_IptAmount").val(num - 1);
    })

    //加入购物车
    $(".J_LinkAdd").click(function () {
        var count = parseInt($("#J_IptAmount").val());
        var book_id = parseInt(getQueryString('bid'));
        var token = sessionStorage.getItem('token');
        if (token != null && token != "" && token != undefined) {
            $.ajax({
                url: 'cart/add',
                type: 'Post',
                data: {'count': count, 'book_id': book_id, 'token': token},
                dataType: 'JSON',
                success: function (result) {
                    alert("加入购物车成功！");
                    document.getElementById("object").data = "header.html";
                    $("#J_IptAmount").val('1');
                }
            });
        } else {
            alert("请先登录！");
        }

    });

    //立即购买
    $(".J_LinkBuy").click(function () {
        var token = sessionStorage.getItem('token');
        if (token != null && token != "" && token != undefined) {
            var count = parseInt($("#J_IptAmount").val());
            var book_id = parseInt(getQueryString('bid'));
            var timestamp = Date.parse(new Date());
            sessionStorage.setItem(timestamp, book_id);
            sessionStorage.setItem('count', count);
            window.location.href = "/balance.html?date=" + timestamp;
        } else {
            alert("请先登录！");
        }
    });

    //评论模块
    $.ajax({
        url: 'bookDetail/getRemark',
        type: 'Get',
        data: {'id': getQueryString('bid')},
        dataType: 'JSON',
        success: function (result) {
            $("#allRemarkCount").text(" (" + result.remarkCount + ") ");
            $("#favorableRate").text(result.favorableRate);
            $("#allCount").text("全部（" + result.remarkCount + "）");
            $("#goodCount").text("好评（" + result.goodRemarkByCateDto.remarkCount + "）");
            $("#middleCount").text("中评（" + result.middleRemarkByCateDto.remarkCount + "）");
            $("#badCount").text("差评（" + result.badRemarkByCateDto.remarkCount + "）");

            //全部评论
            if (result.remarkCount == 0) {
                $("#allRemark").html("暂无评论！");
                $("#allRemark").addClass("noRemark");
            } else {
                $.each(result.everyRemarkDtos, function (index, item) {
                    if (item.status == 1) {
                        $("#allRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                    <span class="iconfont icon-yigoumai icon_yg"></span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    } else {
                        $("#allRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    }
                })
            }

            //好评
            if (result.goodRemarkByCateDto.remarkCount == 0) {
                $("#goodRemark").html("暂无好评！");
                $("#goodRemark").addClass("noRemark");
            } else {
                $.each(result.goodRemarkByCateDto.everyRemarkDtos, function (index, item) {
                    if (item.status == 1) {
                        $("#goodRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                    <span class="iconfont icon-yigoumai icon_yg"></span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    } else {
                        $("#goodRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    }
                })
            }

            //中评
            if (result.middleRemarkByCateDto.remarkCount == 0) {
                $("#middleRemark").html("暂无中评！");
                $("#middleRemark").addClass("noRemark");
            } else {
                $.each(result.middleRemarkByCateDto.everyRemarkDtos, function (index, item) {
                    if (item.status == 1) {
                        $("#middleRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                    <span class="iconfont icon-yigoumai icon_yg"></span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    } else {
                        $("#middleRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    }
                })
            }

            //差评
            if (result.badRemarkByCateDto.remarkCount == 0) {
                $("#badRemark").html("暂无差评！");
                $("#badRemark").addClass("noRemark");
            } else {
                $.each(result.badRemarkByCateDto.everyRemarkDtos, function (index, item) {
                    if (item.status == 1) {
                        $("#badRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                    <span class="iconfont icon-yigoumai icon_yg"></span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    } else {
                        $("#badRemarkUl").append(
                            '<li data-id="111" class="jieda-daan">\n' +
                            '                                                <div class="detail-about detail-about-reply">\n' +
                            '                                                    <a class="fly-avatar">\n' +
                            '                                                        <img src="../static/img/touxiang.png">\n' +
                            '                                                    </a>\n' +
                            '                                                    <div class="fly-detail-user">\n' +
                            '                                                        <a class="fly-link">\n' +
                            '                                                            <cite>' + item.name + '</cite>\n' +
                            '                                                        </a>\n' +
                            '                                                    </div>\n' +
                            '\n' +
                            '                                                    <div class="detail-hits">\n' +
                            '                                                        <span>' + item.remarkTime + '</span>\n' +
                            '                                                    </div>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="detail-body jieda-body photos">\n' +
                            '                                                    <p>' + item.remarkText + '</p>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="star4">\n' +
                            '                                                    <span class="level">\n' +
                            '                                                        <span style="width: ' + item.star + ';"></span>\n' +
                            '                                                    </span>\n' +
                            '                                                    <span style="color: orange">' + Math.round(parseFloat(item.star.replace(/%/g, "")) / 10) + '分</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div class="jieda-reply">\n' +
                            '                                                      <span class="jieda-zan zanok" type="zan">\n' +
                            '                                                        <i class="iconfont icon-zan"></i>\n' +
                            '                                                        <em>0</em>\n' +
                            '                                                      </span>\n' +
                            '                                                </div>\n' +
                            '                                            </li>'
                        );
                    }
                })
            }
        }
    });

    $('.btn_red').unbind('click').bind('click', function () {
        var book_id = getQueryString('bid');
        var token = sessionStorage.getItem('token');
        $.ajax({
            url: 'bookDetail/checkRemark',
            type: 'Post',
            data: {
                'token': token, 'book_id': parseInt(book_id)
            },
            dataType: 'JSON',
            success: function (result) {
                if (result.state == 0 || result.state == 1) {
                    alert(result.message);
                    return;
                } else {
                    var top = ($(window).height() - $('.pj').height()) / 2;
                    var left = ($(window).width() - $('.pj').width()) / 2;
                    var scrollTop = $(document).scrollTop();
                    var scrollLeft = $(document).scrollLeft();
                    $('.pj').css({position: 'absolute', top: top + scrollTop, left: left + scrollLeft});
                    $(".mask").show();
                    $(".pj").show();
                    $('.pj .level2').css('width', '100%');
                    $('.pj .desc').text("10分 极力推荐！");
                    $('#textareaid').val('');
                    $("#appr_save").unbind('click').bind('click', function () {
                        var star = ((parseInt($('.pj .level2').css('width').split("px")) / 129) * 100).toFixed(2) + "%";
                        var remarkText = $('#textareaid').val();
                        $.ajax({
                            url: 'bookDetail/insertRemarkByBookDetail',
                            type: 'Post',
                            data: {
                                'token': token, 'book_id': parseInt(book_id),
                                'remarkText': remarkText, 'star': star
                            },
                            dataType: 'JSON',
                            success: function (result) {
                                alert("完成评价！");
                                window.location.reload();
                            }
                        });
                    });
                }
            }
        });
    })
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}