$(function () {
    checkSlogan();
    var token = sessionStorage.getItem('token');
    $.ajax({
        url: 'cart/getCarts',
        type: 'Post',
        data: {'token': token},
        dataType: 'JSON',
        success: function (result) {
            if (result.length == 0 || result == null) {
                $(".table .goOn").show();
            } else {
                $.each(result, function (index, item) {
                    $('.table .goOn').before(
                        '<div class="th">\n' +
                        '                <div class="pro clearfix">\n' +
                        '                    <label class="fl">\n' +
                        '                        <input type="checkbox"/>\n' +
                        '                        <span></span>\n' +
                        '                    </label>\n' +
                        '                    <a class="fl" href="' + "http://localhost:8088/book_detail.html?bid=" + item.book_id + '" target="_blank">\n' +
                        '                        <dl class="clearfix">\n' +
                        '                            <dt class="fl">\n' +
                        '                                <input id="book_id" type="hidden" value="' + item.book_id + '"/>\n' +
                        '                                <input id="cart_id" type="hidden" value="' + item.cart_id + '"/>\n' +
                        '                                <img src="' + item.image1 + '">\n' +
                        '                            </dt>\n' +
                        '                            <dd class="fl">\n' +
                        '                                <p title="' + item.name + '">' + item.name + '</p>\n' +
                        '                                <p title="' + item.author + '">' + item.author + '</p>\n' +
                        '                            </dd>\n' +
                        '                        </dl>\n' +
                        '                    </a>\n' +
                        '                </div>\n' +
                        '                <div class="price">￥' + item.price + '</div>\n' +
                        '                <div class="number">\n' +
                        '                    <p class="num clearfix">\n' +
                        '                        <img class="fl sub" src="../static/img/cart/sub.jpg">\n' +
                        '                        <span class="fl">' + item.count + '</span>\n' +
                        '                        <img class="fl add" src="../static/img/cart/add.jpg">\n' +
                        '                    </p>\n' +
                        '                </div>\n' +
                        '                <div class="price sAll">￥' + (parseFloat(item.price) * parseFloat(item.count)).toFixed(2) + '</div>\n' +
                        '                <div class="price"><a class="del" href="#2">删除</a></div>\n' +
                        '            </div>'
                    )
                });
                checkSlogan();
                /*****************商品checkbox选择***********************/
                $("input[type='checkbox']").on('click', function () {
                    var sf = $(this).is(":checked");
                    var sc = $(this).hasClass("checkAll");
                    if (sf) {
                        if (sc) {
                            $("input[type='checkbox']").each(function () {
                                this.checked = true;
                            });
                            zg();
                            jisuan();
                        } else {
                            $(this).checked = true;
                            var len = $("input[type='checkbox']:checked").length;
                            var len1 = $("input").length - 1;
                            if (len == len1) {
                                $("input[type='checkbox']").each(function () {
                                    this.checked = true;
                                });
                            }
                            zg();
                            jisuan();
                        }
                    } else {
                        if (sc) {
                            $("input[type='checkbox']").each(function () {
                                this.checked = false;
                            });
                            zg();
                            jisuan();
                        } else {
                            $(this).checked = false;
                            var len = $(".th input[type='checkbox']:checked").length;
                            var len1 = $("input").length - 1;
                            if (len < len1) {
                                $('.checkAll').attr("checked", false);
                            }
                            zg();
                            jisuan();
                        }
                    }

                });
                /**************数量加减***************/
                $(".num .sub").click(function () {
                    var num = parseInt($(this).siblings("span").text());
                    if (num <= 1) {
                        $(this).attr("disabled", "disabled");
                    } else {
                        num--;
                        $(this).siblings("span").text(num);
                        //获取除了货币符号以外的数字
                        var price = $(this).parents(".number").prev().text().substring(1);
                        //单价和数量相乘并保留两位小数
                        $(this).parents(".th").find(".sAll").text('￥' + (num * price).toFixed(2));
                        jisuan();
                        zg();
                    }
                    var cart_id = $(this).parents(".th").find("#cart_id").val();
                    var token = sessionStorage.getItem('token');
                    $.ajax({
                        url: 'cart/updateCount',
                        type: 'Post',
                        data: {'token': token, 'cart_id': cart_id, 'num': num},
                        dataType: 'JSON',
                        success: function (result) {

                        }
                    });

                });
                $(".num .add").click(function () {
                    var num = parseInt($(this).siblings("span").text());
                    num++;
                    $(this).siblings("span").text(num);
                    var price = $(this).parents(".number").prev().text().substring(1);
                    $(this).parents(".th").find(".sAll").text('￥' + (num * price).toFixed(2));
                    jisuan();
                    zg();
                    var cart_id = $(this).parents(".th").find("#cart_id").val();
                    var token = sessionStorage.getItem('token');
                    $.ajax({
                        url: 'cart/updateCount',
                        type: 'Post',
                        data: {'token': token, 'cart_id': cart_id, 'num': num},
                        dataType: 'JSON',
                        success: function (result) {

                        }
                    });
                });
                //删除购物车商品
                $('.del').click(function () {
                    //单个删除
                    if ($(this).parent().parent().hasClass("th")) {
                        var index = $(this).parents(".th").index() - 1;
                        var cart_id = $(".th").eq(index).find('#cart_id').val();
                        var token = sessionStorage.getItem('item');
                        $.ajax({
                            url: 'cart/deleteById',
                            type: 'Post',
                            data: {'token': token, 'cart_id': cart_id},
                            dataType: 'JSON',
                            success: function (result) {
                                $(".th").eq(index).remove();
                                if ($(".th").length == 0) {
                                    $(".table .goOn").show();
                                }
                                checkSlogan();
                            }
                        });
                    } else {
                        //选中多个一起删除
                        if ($(".th input[type='checkbox']:checked").length == 0) {
                            $(".mask").show();
                            $(".pleaseC").show();
                        }
                        else {
                            $(".mask").show();
                            $(".tipDel").show();
                            $('.cer').click(function () {
                                $(".th input[type='checkbox']:checked").each(function (j) {
                                    index = $(this).parents('.th').index() - 1;
                                    var cart_id = $(".th").eq(index).find('#cart_id').val();
                                    var token = sessionStorage.getItem('item');
                                    $.ajax({
                                        url: 'cart/deleteById',
                                        type: 'Post',
                                        data: {'token': token, 'cart_id': cart_id},
                                        dataType: 'JSON',
                                        async: false,
                                        success: function (result) {
                                            $(".th").eq(index).remove();
                                            if ($(".th").length == 0) {
                                                $(".table .goOn").show();
                                            }
                                            checkSlogan();
                                        }
                                    });
                                });
                                $(".mask").hide();
                                $(".tipDel").hide();
                                zg();
                                jisuan();
                                checkSlogan();
                            })
                        }
                    }
                });
            }
        }
    });

    $('.count').click(function () {
        if ($(".th input[type='checkbox']:checked").length == 0) {
            $(".mask").show();
            $(".pleaseD").show();
            return;
        }
        var cart_ids = '';
        $(".th input[type='checkbox']:checked").each(function () {
            cart_ids += $(this).parents(".th").find('#cart_id').val() + "-";
        });
        cart_ids = cart_ids.split("-");
        cart_ids.pop();
        var timestamp = Date.parse(new Date());
        sessionStorage.setItem(timestamp, cart_ids);
        window.location.href="http://localhost:8088/balance.html?date="+timestamp;
    })
});

//计算总价
function jisuan() {
    var all = 0;
    var len = $(".th input[type='checkbox']:checked").length;
    if (len == 0) {
        $("#all").text('￥' + parseFloat(0).toFixed(2));
    } else {
        $(".th input[type='checkbox']:checked").each(function () {
            //获取小计里的数值
            var sAll = $(this).parents(".pro").siblings('.sAll').text().substring(1);
            //累加
            all += parseFloat(sAll);
            //赋值
            $("#all").text('￥' + all.toFixed(2));
        })
    }

}

//计算总共几件商品
function zg() {
    var zsl = 0;
    var index = $(".th input[type='checkbox']:checked").parents(".th").find(".num span");
    var len = index.length;
    if (len == 0) {
        $("#sl").text(0);
    } else {
        index.each(function () {
            zsl += parseInt($(this).text());
            $("#sl").text(zsl);
        })
    }
    if ($("#sl").text() > 0) {
        $(".count").css("background", "#c10000");
    } else {
        $(".count").css("background", "#8e8e8e");
    }
}

function checkSlogan() {
    var realHeight = $(document).height();
    if (realHeight < 724) {
        $('#slogan').removeClass('slogan')
        $('#slogan').addClass('slogan2');
    } else {
        $('#slogan').removeClass('slogan2')
        $('#slogan').addClass('slogan');
    }
}
