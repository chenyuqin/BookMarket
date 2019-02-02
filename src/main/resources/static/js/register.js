(function ($) {
    var $username = $('#username');
    var $email = $('#email');
    var $yzm = $('.yzm');

    $username.on('focus', function () {
        $username.next('span').css("display", "block");
        $username.next('span').text("用户名可用于登录、接收订单通知等服务");
        $username.next('span').css("color", "dimgray");
    });
    $username.on('blur', function () {
        if ($username.val() != "" && $username.val() != null) {
            $.ajax({
                url: 'register/checkUsername',
                type: 'Get',
                data: {'username':$username.val()},
                dataType: 'JSON',
                success: function(result){
                    if (result.state == 0) {
                        $username.next('span').text(result.message);
                        $username.next('span').css("color", "green");
                    } else {
                        $username.next('span').text(result.message);
                        $username.next('span').css("color", "red");
                    }
                }
            });
        } else{
            $username.next('span').css("display", "none");
        }
    });

    $email.on('focus', function () {
        $email.next('span').css("display", "block");
        $email.next('span').text("email可用于登录、找回密码、接收订单通知等服务");
        $email.next('span').css("color", "dimgray");
    });
    $email.on('blur', function () {
        //正则匹配邮箱
        var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if ($email.val()!="" && $email.val()!=null && !myReg.test($email.val())) {
            $email.next('span').text("邮箱格式不正确，请重新输入！");
            $email.next('span').css("color", "red");
            return;
        }
        if ($email.val() != "" && $email.val() != null) {
            $.ajax({
                url: 'register/checkEmail',
                type: 'Get',
                data: {'email':$email.val()},
                dataType: 'JSON',
                success: function(result){
                    if (result.state == 0) {
                        $email.next('span').text(result.message);
                        $email.next('span').css("color", "green");
                    } else {
                        $email.next('span').text(result.message);
                        $email.next('span').css("color", "red");
                    }
                }
            });
        } else{
            $email.next('span').css("display", "none");
        }
    });

    $yzm.on('focus', function () {
        $(this).next().next().next('span').css('display', 'block');
    });
    $yzm.on('blur', function () {
        $(this).next().next().next('span').css('display', 'none');
    });
})(jQuery);

function getCode() {
    var imgCode = document.getElementById("verificationCode");
    imgCode.src="verification/getCode?a=" + new Date();
    $("#yzm").focus();
    $("#yzm").val("");
}

function register() {
    //登录时进行校验
    var name = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var rePwd = $("#rePwd").val();
    var yzm = $("#yzm").val();//获取验证码
    //校验用户名是否为空
    if(name==""||name==null){
        alert("用户名不能为空！");
        $("#username").focus();
        return false;
    }
    if(email==""||email==null){
        alert("邮箱不能为空！");
        $("#email").focus();
        return false;
    }
    //正则匹配邮箱
    var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (!myReg.test(email)) {
        alert("邮箱格式不正确！");
        $("#email").focus();
        return false;
    }
    //判断密码是否为空
    if(password==""||password==null){
        alert("密码不能为空！");
        $("#password").focus();
        return false;
    }
    if(rePwd==""||rePwd==null){
        alert("确认密码不能为空！");
        $("#rePwd").focus();
        return false;
    }
    if (password != rePwd) {
        alert("两次密码不一致！");
        $("#rePwd").focus();
        $("#rePwd").val("");
        return false;
    }
    //判断验证码是否为空
    if(yzm==""||yzm==null){
        alert("验证码不能为空！");
        $("#yzm").focus();
        return false;
    }
    //注册请求
    $.ajax({
        url: 'register/register',
        type: 'POST',
        data: {'username':name,'password':password,'email':email,'yzm':yzm},
        dataType: 'JSON',
        success: function(result){
            if (result.state == 0) {
                alert(result.message);
                window.location.reload();
            } else if (result.state == 1) {
                alert(result.message);
                getCode();
            } else {
                alert(result.message);
                getCode();
            }
        }
    });
}
    
