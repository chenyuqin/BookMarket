$(function () {
    var $username = $('.user');	//用户名
    var $pass = $('.pass');	//密码
    var $codes = $('.codes');	//验证码
    var $usernamelogin = $('#usernamelogin');
    var $password = $('.password');
    var $code = $('.code');

    $username.on('focus', function () {
        $usernamelogin.css('border-color', '#646464');
        $('#liDivErrorMessage').css('display', 'block');
        $('.error_choose').css('display', 'none');
    }).on('blur', function () {
        $usernamelogin.css('border-color', '');
        $('#liDivErrorMessage').css('display', 'none');
        if ($username.val() != '') {
            $('.error_choose').css('display', 'block');
        } else {
            $('.error_choose').css('display', 'none');
        }
    });

    $pass.on('focus', function () {
        $password.css('border-color', '#646464');
        $('#login_password_error').css('display', 'block');
    }).on('blur', function () {
        $password.css('border-color', '');
        $('#login_password_error').css('display', 'none');
    });

    $codes.on('focus', function () {
        $code.css('border-color', '#646464');
        $('#login_vcode_error').css('display', 'block');
    }).on('blur', function () {
        $code.css('border-color', '');
        $('#login_vcode_error').css('display', 'none');
    });

    var $autologin = $('#autologin');
    var $auto_tip = $('#auto_tip');
    $autologin.on('change', function () {
        if ($(this).prop('checked')) {
            $auto_tip.html('请勿在公用电脑上勾选此选项');
        } else {
            $auto_tip.html('七天内自动登录');
        }
    });
});

function getCode() {
    var imgCode = document.getElementById("imgVcode");
    imgCode.src = "verification/getCode?a=" + new Date();
    if ($("#txtVerifyCode").val() != null && $("#txtVerifyCode").val() != "") {
        $("#txtVerifyCode").focus();
        $("#txtVerifyCode").val("");
    }
}

function login() {
    var name_or_email = $('.user').val();	//用户名
    var password = $('.pass').val();	//密码
    var yzm = $('.codes').val();	//验证码
    var type = $("input[name=supertype]:checked").val();
    if (type == 1) {
        //正则匹配邮箱
        var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if (!myReg.test(name_or_email)) {
            alert("请输入正确的邮箱地址！");
            getCode();
            $(".user").focus();
            return false;
        }
    }
    $.ajax({
        url: 'login/login',
        type: 'Post',
        data: {'name_or_email': name_or_email, 'password': password, 'yzm': yzm, 'type': type},
        dataType: 'JSON',
        success: function (result) {
            if (result.state == 2) {
                alert(result.message);
                getCode();
            } else if (result.state == 1) {
                alert(result.message);
                getCode();
                $('.user').focus();
            } else {
                sessionStorage.setItem('id', result.data.id);
                sessionStorage.setItem('name', result.data.name);
                sessionStorage.setItem('token', result.data.token);
                if (result.data.referrerUrl == null || result.data.referrerUrl == 'null') {
                    history.back(-1);
                } else {
                    window.location.href = result.data.referrerUrl;
                }

            }
        }
    });
}