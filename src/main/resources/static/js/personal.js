$(function () {
    var token = sessionStorage.getItem("token");
    $.ajax({
        url: 'personal/init',
        type: 'Post',
        data: {'token': token},
        dataType: 'JSON',
        success: function (result) {
            $(".nickname").text(result.user.name);
            $("#email").text("绑定邮箱：" + result.user.email);
            //TODO 处理待支付、待收货等数量显示

        }
    });
});