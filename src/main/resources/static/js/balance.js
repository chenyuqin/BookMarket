$(function () {
    var date = getQueryString('date');
    var ids = sessionStorage.getItem(date);
    var token = sessionStorage.getItem('token');
    var count = sessionStorage.getItem('count');
    $.ajax({
        url: 'cart/getOrderInfo',
        type: 'Post',
        data: {'token': token, 'ids': ids, 'count': count},
        dataType: 'JSON',
        async: false,
        success: function (result) {
            $.each(result.addresses, function (index, item) {
                $('.orderCon .orderL .addres').append(
                    '<div class="addre fl">\n' +
                    '                    <input type="hidden" value="' + item.id + '"/>\n' +
                    '                    <div class="tit clearfix">\n' +
                    '                        <p class="fl">' + item.name + '</p>\n' +
                    '                        <p class="fr">\n' +
                    '                            <a href="#" class="del_">删除</a>\n' +
                    '                            <span>|</span>\n' +
                    '                            <a href="#" class="edit">编辑</a>\n' +
                    '                        </p>\n' +
                    '                    </div>\n' +
                    '                    <div class="addCon">\n' +
                    '                        <p>' + item.province + '&nbsp;' + item.city + '&nbsp;' + item.country + '</p>\n' +
                    '                        <p title="' + item.address + '">' + item.address + '</p>\n' +
                    '                        <p>' + item.phone + '</p>\n' +
                    '                    </div>\n' +
                    '                </div>'
                )
            });

            //修改地址
            $(".edit").click(function () {
                var id = $(this).parents(".addre").children().eq(0).val();
                $.ajax({
                    url: 'address/getById',
                    type: 'Post',
                    data: {'token': token, 'id': id},
                    dataType: 'JSON',
                    success: function (result) {
                        $(".mask").show();
                        $(".readd").show();
                        $("#readd_name").val(result.name);
                        $("#readd_phone").val(result.phone);
                        $("#c_prov").children().eq(0).text(result.province);
                        $("#c_city").children().eq(0).text(result.city);
                        $("#c_country").children().eq(0).text(result.country);
                        $("#readd_address").val(result.address);
                        $("#readd_postcode").val(result.postcode);
                        //修改地址的保存按钮
                        $('.readd .bc input').eq(0).click(function () {
                            var province;
                            var city;
                            var country;
                            var addr = c_showAddr();
                            if (!addr) {
                                province = null;
                                city = null;
                                country = null;
                            } else if (addr == true) {
                                return;
                            } else {
                                var split = addr.split("-");
                                province = split[0];
                                city = split[1];
                                country = split[2];
                            }

                            var name = $("#readd_name").val();
                            var phone = $("#readd_phone").val();
                            var address = $("#readd_address").val();
                            var postcode = $("#readd_postcode").val();
                            var token = sessionStorage.getItem('token');
                            if (!checkNumber(phone)) {
                                return;
                            }
                            $.ajax({
                                url: 'address/update',
                                type: 'Post',
                                data: {
                                    'token': token, 'name': name, 'phone': phone, 'province': province, 'city': city, 'country': country, 'address': address,
                                    'postcode': postcode, 'id': id
                                },
                                dataType: 'JSON',
                                success: function (result) {
                                    $(".readd").hide();
                                    alert("地址修改成功！");
                                    window.location.reload();
                                }
                            });
                        });
                        //修改地址的取消按钮
                        $('.readd .bc input').eq(1).click(function () {
                            $(".mask").hide();
                            $(".readd").hide();
                        });
                    }
                });
            });

            //删除地址
            $(".del_").click(function () {
                var id = $(this).parents(".addre").children().eq(0).val();
                $.ajax({
                    url: 'address/delete',
                    type: 'Post',
                    data: {'token': token, 'id': id},
                    dataType: 'JSON',
                    success: function (result) {
                        window.location.reload();
                    }
                });
            });

            $('.addre').click(function () {
                $('.addres .on').removeClass('on');
                $(this).addClass('on');
            });

            $.each(result.cartDtos, function (index, item) {
                $('.msg').append(
                    '<ul class="clearfix">' +
                    '   <li class="fl">\n' +
                    '                        <input id="msg_cart_id" type="hidden" value="' + item.cart_id + '" />' +
                    '<input id="msg_book_id" type="hidden" value="' + item.book_id + '" />' +
                    '                        <img style="width: 120px;" src="' + item.image1 + '">\n' +
                    '                    </li>\n' +
                    '                    <li class="fl">\n' +
                    '                        <p title="' + item.name + '">' + item.name + '</p>\n' +
                    '                        <p title="' + item.author + '">' + item.author + '</p>\n' +
                    '                        <p>数量：' + item.count + '</p>\n' +
                    '                    </li>\n' +
                    '                    <li class="fr">￥' + (parseInt(item.price) * parseInt(item.count)) + '</li>' +
                    '</ul>'
                );
            });

            $('.msg ul').click(function () {
                window.open("/book_detail.html?bid=" + $(this).find('#msg_book_id').val());
            });

            $(".totalPrice").text("￥" + result.totalPrice);
        }
    });

    $("#addxad").click(function () {
        $(".mask").show();
        $(".adddz").show();
    });

    //增加地址的保存按钮
    $('.adddz .bc input').eq(0).click(function () {
        if (!showAddr()) {
            return;
        }
        var all_address = showAddr();
        var name = $("#adddz_name").val();
        var phone = $("#adddz_phone").val();
        var address = $("#adddz_addrDetail").val();
        var postcode = $("#adddz_postcode").val();
        var split = all_address.split("-");
        var token = sessionStorage.getItem('token');
        if (!checkNumber(phone)) {
            return;
        }
        $.ajax({
            url: 'address/add',
            type: 'Post',
            data: {
                'token': token, 'name': name, 'phone': phone, 'province': split[0],
                'city': split[1], 'country': split[2], 'address': address,
                'postcode': postcode
            },
            dataType: 'JSON',
            success: function (result) {
                alert("地址添加成功！");
                window.location.reload();
            }
        });
    });
    //增加地址的取消按钮
    $('.adddz .bc input').eq(1).click(function () {
        $(".mask").hide();
        $(".adddz").hide();
    });

    $('.pay').click(function () {
        var address_id = $('.addres .on').find('input').val();
        var count = sessionStorage.getItem('count');
        if (address_id == undefined) {
            alert("请选择您的收件信息！");
            return;
        }
        var pay_way = $('.way img').index($('.way .on'));
        $.ajax({
            url: 'order/insertOrder',
            type: 'Post',
            data: {'token': token, 'address_id': parseInt(address_id), 'pay_way': parseInt(pay_way), 'ids': ids, 'count': count},
            dataType: 'JSON',
            success: function (result) {
                window.location.href="/pay_success.html"
            }
        });
    });
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function checkNumber(nubmer) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

    if (!re.test(nubmer)) {
        alert("手机号码不能包括非数字！");
        return false;
    }
    return true;
}