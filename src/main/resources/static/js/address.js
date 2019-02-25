$(function () {
    //打开页面即加载已有的地址信息
    var token = sessionStorage.getItem('token');
    $.ajax({
        url: 'personal/init',
        type: 'Post',
        data: {'token': token},
        dataType: 'JSON',
        success: function (result) {
            $(".nickname").text(result.user.name);
        }
    });
    $.ajax({
        url: 'address/init',
        type: 'Post',
        data: {'token': token},
        dataType: 'JSON',
        success: function (result) {
            if (result.length == 0) {
                $('.Bott .you .add').css('justify-content', 'space-around');
            } else {
                $('.Bott .you .add').css('justify-content', 'normal');
            }
            $.each(result, function (index, item) {
                $(".add").append(
                    '<div class="myAddress">\n' +
                    '                    <input type="hidden" value="' + item.id + '"/>\n' +
                    '                    <p>' + item.name + '</p>\n' +
                    '                    <p>' + item.phone + '</p>\n' +
                    '                    <p>' + item.province + " " + item.city + " " + item.country + '</p>\n' +
                    '                    <p style="overflow: hidden;\n' +
                    '    text-overflow: ellipsis;\n' +
                    '    white-space: nowrap;" title="' + item.address + '">' + item.address + "(" + item.postcode + ")" + '</p>\n' +
                    '                </div>'
                );
            });
            $(".myAddress").hover(function () {
                var txt = "";
                txt = '<p class="addp"><a href="#"  id="readd">修改</a><a href="#" id="deladd">删除</a></p>';
                $(this).append(txt);
                //修改地址
                $("#readd").click(function () {
                    var id = $(this).parents(".myAddress").children().eq(0).val();
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
                $("#deladd").click(function () {
                    var id = $(this).parents(".myAddress").children().eq(0).val();
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
            }, function () {
                $(".addp").remove();
            });
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
});

function checkNumber(nubmer) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

    if (!re.test(nubmer)) {
        alert("手机号码不能包括非数字！");
        return false;
    }
    return true;
}




