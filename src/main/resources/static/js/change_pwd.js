$(function () {
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
    $("#change_btn").click(function () {
        if ($('.remima input').val() == '' || $('.remima input').val() == null) {
            alert("输入不能为空！");
            return;
        } else {
            var old_pwd = $('.remima').find('input').eq(0).val();
            var new_pwd = $('.remima').find('input').eq(1).val();
            var re_new_pwd = $('.remima').find('input').eq(2).val();
            var code = $('.remima').find('input').eq(3).val();
            $.ajax({
                url: 'changePwd/changePwd',
                type: 'Post',
                data: {'token': token, 'old_pwd': old_pwd, 'new_pwd': new_pwd,
                    're_new_pwd': re_new_pwd, 'code': code},
                dataType: 'JSON',
                success: function (result) {
                    if (result.state == 3) {
                        alert(result.message);
                        window.location.reload();
                    } else if (result.state == 2) {
                        alert(result.message);
                        getCode();
                    } else {
                        alert(result.message);
                    }
                }
            });
        }
    })
});

function getCode() {
    var imgCode = document.getElementById("imgVcode");
    imgCode.src = "verification/getCode?a=" + new Date();
    if ($("#txtVerifyCode").val() != null && $("#txtVerifyCode").val() != "") {
        $("#txtVerifyCode").focus();
        $("#txtVerifyCode").val("");
    }
}