$(function () {
    var token = sessionStorage.getItem('token');
    //订单Tab页切换
    $("#wa li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        var status = parseInt($("#wa li").index($(this)));
        $.ajax({
            url: 'order/getOrdersByStatus',
            type: 'Post',
            data: {'token': token, 'status': status},
            dataType: 'JSON',
            success: function (result) {
                if (result.length == 0) {
                    $("#order_show").empty();
                    $("#order_show").append('<span style="\n' +
                        '    font-size: 25px;\n' +
                        '    font-family: cursive;\n' +
                        '    padding-left: 320px;\n' +
                        '    font-weight: bold;\n' +
                        '    height: 300px;\n' +
                        '    line-height: 315px;\n' +
                        '">无相关订单！</span>');
                } else {
                    $("#order_show").empty();
                    var inner_html = '';
                    $.each(result, function (index, item) {
                        if (item.status == 1) {
                            inner_html += '<div class="dkuang deng">\n' +
                                '                    <p class="one">未支付</p>\n' +
                                '                    <div class="word clearfix">\n' +
                                '                        <ul class="fl clearfix">\n' +
                                '                            <li>' + item.createTime + '</li>\n' +
                                '                            <li>' + item.name + '</li>\n' +
                                '                            <li>订单号：' + item.order_id + '</li>\n' +
                                '                            <li>在线支付</li>\n' +
                                '                        </ul>\n' +
                                '                        <p class="fr">订单金额：<span>' + item.totalPrice + '</span>元</p>\n' +
                                '                    </div>\n' +
                                '                    <div class="shohou clearfix">\n' +
                                '                        <div class="fl">\n';

                            $.each(item.orderBookDtos, function (index, book) {
                                inner_html += '  <div class="shohou_div">\n' +
                                    '<a href="' + "http://localhost:8088/book_detail.html?bid=" + book.id + '" class="fl"><img\n' +
                                    '       src="' + book.image1 + '"/></a>\n' +
                                    '      <p class="fl shohou_div_p">\n' +
                                    '          <a title="' + book.name + '" href="' + "http://localhost:8088/book_detail?bid=" + book.id + '">' + book.name + '</a>\n' +
                                    '            <a title="' + book.author + '" href="javascript:void(0);">' + book.author + '</a>\n' +
                                    '   <a style="font-size: 13px">¥' + book.price + '×' + book.count + '</a>\n' +
                                    '            </p>\n' +
                                    '     </div>\n';
                            });
                            inner_html += '     </div>\n' +
                                '                        <div class="fr" style="padding: 30px;">\n' +
                                '                            <p class="fr">\n' +
                                '                                <a href="javascript:void(0);">立即支付</a>\n' +
                                '                                <a href="' + "order_detail.html?oid=" + item.order_id + '">订单详情</a>\n' +
                                '                            </p>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>'
                            $("#order_show").append(inner_html);
                            inner_html = '';
                        } else if (item.status == 2) {
                            inner_html += '<div class="dkuang">\n' +
                                '                    <p class="one">待发货</p>\n' +
                                '                    <div class="word clearfix">\n' +
                                '                        <ul class="fl clearfix">\n' +
                                '                            <li>' + item.createTime + '</li>\n' +
                                '                            <li>' + item.name + '</li>\n' +
                                '                            <li>订单号：' + item.order_id + '</li>\n' +
                                '                            <li>在线支付</li>\n' +
                                '                        </ul>\n' +
                                '                        <p class="fr">订单金额：<span>' + item.totalPrice + '</span>元</p>\n' +
                                '                    </div>\n' +
                                '                    <div class="shohou clearfix">\n' +
                                '                        <div class="fl">\n';

                            $.each(item.orderBookDtos, function (index, book) {
                                inner_html += '  <div class="shohou_div">\n' +
                                    '<a href="' + "http://localhost:8088/book_detail.html?bid=" + book.id + '" class="fl"><img\n' +
                                    '       src="' + book.image1 + '"/></a>\n' +
                                    '      <p class="fl shohou_div_p">\n' +
                                    '          <a title="' + book.name + '" href="' + "http://localhost:8088/book_detail?bid=" + book.id + '">' + book.name + '</a>\n' +
                                    '            <a title="' + book.author + '" href="javascript:void(0);">' + book.author + '</a>\n' +
                                    '   <a style="font-size: 13px">¥' + book.price + '×' + book.count + '</a>\n' +
                                    '            </p>\n' +
                                    '     </div>\n';
                            });
                            inner_html += '     </div>\n' +
                                '                        <div class="fr" style="padding: 30px;">\n' +
                                '                            <p class="fr">\n' +
                                '                                <a style="cursor: not-allowed" href="javascript:void(0);">等待发货</a>\n' +
                                '                                <a href="' + "order_detail.html?oid=" + item.order_id + '">订单详情</a>\n' +
                                '                            </p>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>'
                            $("#order_show").append(inner_html);
                            inner_html = '';
                        } else if (item.status == 3) {
                            inner_html += '<div class="dkuang deng">\n' +
                                '                    <p class="one fl">待收货</p>\n' +
                                '<div class="clearfix">\n' +
                                '                        <div class="fl vewwl">\n' +
                                '                            <a href="logistics.html" class="ckwl">查看物流</a>\n' +
                                '                            <div class="wuliu">\n' +
                                '                                <h4>圆通速递：858888888888888</h4>\n' +
                                '                                <ul>\n' +
                                '                                    <li>\n' +
                                '                                        <p>妥投投递并签收，已签收。签收人：本人签收</p>\n' +
                                '                                        <p>2016-12-03 17:30:00</p>\n' +
                                '                                    </li>\n' +
                                '                                    <li>\n' +
                                '                                        <p>深圳市南油速递营销部安排投递（投递员姓名：六六六。联系电话：14243452522;</p>\n' +
                                '                                        <p>2016-12-03 08:50:00</p>\n' +
                                '                                    </li>\n' +
                                '                                    <li>\n' +
                                '                                        <p>到达广东省邮政速递物流有限公司深圳航空邮件处理中心处理中心（经转）</p>\n' +
                                '                                        <p>2016-12-03 02:20:00</p>\n' +
                                '                                    </li>\n' +
                                '                                    <li>以上为最新跟踪信息<a href="logistics.html">查看全部</a></li>\n' +
                                '                                </ul>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>' +
                                '                    <div class="word clearfix">\n' +
                                '                        <ul class="fl clearfix">\n' +
                                '                            <li>' + item.createTime + '</li>\n' +
                                '                            <li>' + item.name + '</li>\n' +
                                '                            <li>订单号：' + item.order_id + '</li>\n' +
                                '                            <li>在线支付</li>\n' +
                                '                        </ul>\n' +
                                '                        <p class="fr">订单金额：<span>' + item.totalPrice + '</span>元</p>\n' +
                                '                    </div>\n' +
                                '                    <div class="shohou clearfix">\n' +
                                '                        <div class="fl">\n';
                            $.each(item.orderBookDtos, function (index, book) {
                                inner_html += '  <div class="shohou_div">\n' +
                                    '<a href="' + "http://localhost:8088/book_detail.html?bid=" + book.id + '" class="fl"><img\n' +
                                    '       src="' + book.image1 + '"/></a>\n' +
                                    '      <p class="fl shohou_div_p">\n' +
                                    '          <a title="' + book.name + '" href="' + "http://localhost:8088/book_detail?bid=" + book.id + '">' + book.name + '</a>\n' +
                                    '            <a title="' + book.author + '" href="javascript:void(0);">' + book.author + '</a>\n' +
                                    '   <a style="font-size: 13px">¥' + book.price + '×' + book.count + '</a>\n' +
                                    '            </p>\n' +
                                    '     </div>\n';
                            });
                            inner_html += '     </div>\n' +
                                '                        <div class="fr" style="padding: 30px;">\n' +
                                '                            <p class="fr">\n' +
                                '                                <a href="javascript:void(0);">确认收货</a>\n' +
                                '                                <a href="' + "order_detail.html?oid=" + item.order_id + '">订单详情</a>\n' +
                                '                            </p>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>'
                            $("#order_show").append(inner_html);
                            inner_html = '';
                        } else if (item.status == 4) {
                            inner_html += '<div class="dkuang deng">\n' +
                                '                    <p class="one">未评价</p>\n' +
                                '                    <div class="word clearfix">\n' +
                                '                        <ul class="fl clearfix">\n' +
                                '                            <li>' + item.createTime + '</li>\n' +
                                '                            <li>' + item.name + '</li>\n' +
                                '                            <li>订单号：' + item.order_id + '</li>\n' +
                                '                            <li>在线支付</li>\n' +
                                '                        </ul>\n' +
                                '                        <p class="fr">订单金额：<span>' + item.totalPrice + '</span>元</p>\n' +
                                '                    </div>\n' +
                                '                    <div class="shohou clearfix">\n' +
                                '                        <div class="fl">\n';

                            $.each(item.orderBookDtos, function (index, book) {
                                inner_html += '  <div class="shohou_div">\n' +
                                    '<a href="' + "http://localhost:8088/book_detail.html?bid=" + book.id + '" class="fl"><img\n' +
                                    '       src="' + book.image1 + '"/></a>\n' +
                                    '      <p class="fl shohou_div_p">\n' +
                                    '          <a title="' + book.name + '" href="' + "http://localhost:8088/book_detail?bid=" + book.id + '">' + book.name + '</a>\n' +
                                    '            <a title="' + book.author + '" href="javascript:void(0);">' + book.author + '</a>\n' +
                                    '   <a style="font-size: 13px">¥' + book.price + '×' + book.count + '</a>\n' +
                                    '            </p>\n' +
                                    '     </div>\n';
                            });
                            inner_html += '     </div>\n' +
                                '                        <div class="fr" style="padding: 30px;">\n' +
                                '                            <p class="fr">\n' +
                                '                                <a href="javascript:void(0);">前往评价</a>\n' +
                                '                                <a href="' + "order_detail.html?oid=" + item.order_id + '">订单详情</a>\n' +
                                '                            </p>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>'
                            $("#order_show").append(inner_html);
                            inner_html = '';
                        } else if (item.status == 5) {
                            inner_html += '<div class="dkuang">\n' +
                                '                    <p class="one">已完成</p>\n' +
                                '                    <div class="word clearfix">\n' +
                                '                        <ul class="fl clearfix">\n' +
                                '                            <li>' + item.createTime + '</li>\n' +
                                '                            <li>' + item.name + '</li>\n' +
                                '                            <li>订单号：' + item.order_id + '</li>\n' +
                                '                            <li>在线支付</li>\n' +
                                '                        </ul>\n' +
                                '                        <p class="fr">订单金额：<span>' + item.totalPrice + '</span>元</p>\n' +
                                '                    </div>\n' +
                                '                    <div class="shohou clearfix">\n' +
                                '                        <div class="fl">\n';

                            $.each(item.orderBookDtos, function (index, book) {
                                inner_html += '  <div class="shohou_div">\n' +
                                    '<a href="' + "http://localhost:8088/book_detail.html?bid=" + book.id + '" class="fl"><img\n' +
                                    '       src="' + book.image1 + '"/></a>\n' +
                                    '      <p class="fl shohou_div_p">\n' +
                                    '          <a title="' + book.name + '" href="' + "http://localhost:8088/book_detail?bid=" + book.id + '">' + book.name + '</a>\n' +
                                    '            <a title="' + book.author + '" href="javascript:void(0);">' + book.author + '</a>\n' +
                                    '   <a style="font-size: 13px">¥' + book.price + '×' + book.count + '</a>\n' +
                                    '            </p>\n' +
                                    '     </div>\n';
                            });
                            inner_html += '     </div>\n' +
                                '                        <div class="fr" style="padding: 30px;">\n' +
                                '                            <p class="fr">\n' +
                                '                                <a style="cursor: not-allowed" href="javascript:void(0);">订单完成</a>\n' +
                                '                                <a href="' + "order_detail.html?oid=" + item.order_id + '">订单详情</a>\n' +
                                '                            </p>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>     '
                            $("#order_show").append(inner_html);
                            inner_html = '';
                        }
                    });
                    //查看物流
                    $(".vewwl").hover(function () {
                        $(this).children(".wuliu").fadeIn(100);
                    }, function () {
                        $(this).children(".wuliu").fadeOut(100);
                    });
                }
            }
        });
    });
    $("#wa li").eq(0).click();
});