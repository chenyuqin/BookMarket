$(function () {

    var q = getUrlParam('q');
    if (q != "" && q != null && q != undefined) {
        $(".three").show();
        $(".one").hide();
        $(".two").hide();
        $(".forCon ul li").eq(2).addClass("on").siblings("li").removeClass("on");
    }

    /************商品筛选***************/
    $(".choice .default").click(function () {
        $(this).siblings("ul").toggle();
        $(this).toggleClass("on");
    });
    $(".choice .select li").click(function () {
        var txt = $(this).text();
        $(".choice .default").text(txt).removeClass("on");
        $(this).parent("ul").slideUp('fast');
    });
    /*************鼠标悬浮*************/
    $(".proList li").on('mouseenter', function () {
        var html = "";
        html = '<p class="quick">快速浏览</p>';
        $(this).css('border', '1px solid #000').append(html);
        $(".quick").on('click', function () {
            $(".mask").show();
            $(".proDets").show();
        });
        $(".btns .cart").click(function () {
            if ($(".categ p").hasClass("on")) {
                $(".proDets").hide();
                $(".mask").hide();
            }
        });
    });
    $(".proList li").on('mouseleave', function () {
        $(this).find("p").remove();
        $(this).css('border', '1px solid #fff');
    });
    //关闭按钮
    $(".off").click(function () {
        $(".mask").hide();
        $(".proDets").hide();
        $(".pleaseC").hide();
    });
    $(".off2").click(function () {
        $(".mask").hide();
        $(".proDets").hide();
        $(".pleaseD").hide();
    });
    /**********************************************共用*****************************************************/
    /**********************商品提示************************************/
    $(".proIntro .smallImg p img").hover(function () {
        $(this).parents(".smallImg").find("span").remove();
        var lf = $(this).position().left;
        var con = $(this).attr("alt");
        $(this).parent("p").addClass('on');
        $(this).parents(".smallImg").append('<span>' + con + '</span>');
        $(".smallImg").find("span").css("left", lf);
    }, function () {
        $(this).parents(".smallImg").find("span").remove();
        $(this).parent("p").removeClass('on');
    });
    $(".proIntro .smallImg img").click(function () {
        var offset = $(this).attr("data-src");
        //小弹框和详情页图片大小不一样
        $(this).parents(".proCon").find('.proImg').children(".det").attr("src", offset).css({
            'width': '580px',
            'height': '580px'
        });
        $(this).parents(".proCon").find('.proImg').children(".list").attr("src", offset).css({
            'width': '360px',
            'height': '360px'
        });
        $(this).parents(".smallImg").find("span").remove();
        $(this).parent("p").addClass('on').siblings().removeClass('on');
        //移除鼠标离开事件
        $(this).off("mouseleave").parent('p').siblings().find('img').on('mouseleave', function () {
            $(this).parents(".smallImg").find("span").remove();
            $(this).parent("p").removeClass('on');
        })
    });
    /**********************无规格不结算************************************/
    $(".btns a").click(function () {
        if ($(".categ p").hasClass("on")) {
            if ($(this).children().hasClass("buy")) {
                $(this).attr("href", "order.html");
            }
            $(".proIntro").css("border", "none");
            $(".num .please").hide();
        } else {
            $(".proIntro").css("border", "1px solid #c10000");
            $(".num .please").show();
        }
    })
    /*************************小图切换大图*****************************/
    $(".smallImg > img").mouseover(function () {
        $(this).css("border", "1px solid #c10000").siblings("img").css("border", "none");
        var src = $(this).attr("data-src");
        $(this).parent().siblings(".det").attr("src", src).css({'width': '580px', 'height': '580px'});
        $(this).parent().siblings(".list").attr("src", src).css({'width': '360px', 'height': '360px'});
    })

    /**********proDetail tab***************/
    $(".msgTit a").click(function () {
        var index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".msgAll").children("div").eq(index).show().siblings().hide();
    });

    /***********************order***************/
    $(".addre").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $(".way img").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $(".dis span").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    });
    $(".addre").on('click', '.setDefault', function () {
        $(this).next().remove();
        $(this).parent("p").prev().append('<span class="default">[默认地址]</span>').parents('.addre').addClass("on").siblings().removeClass("on")
            .find(".default").remove().end().find(".tit p").eq(1).prepend('<a href="#" class="setDefault">设为默认</a><span>|</span>');
        $(this).parent("p").prev().parents('.addre').prependTo(".addres");
        $(this).remove();
    })
    /************************ok************************/
    var seconds = $(".ok span").text();

    function time() {
        seconds--;
        $(".ok span").text(seconds);
        if (seconds == 0) {
            window.location.href = ("order.html")
        }
    }

    setInterval(time, 1000);
    /************************forget************************/
    $(".next").click(function () {
        var name = $('#name').val();	//用户名
        var yzm = $('#yzm').val();	//验证码
        $.ajax({
            url: 'forget/forget',
            type: 'Get',
            data: {'name':name, 'yzm':yzm},
            dataType: 'JSON',
            success: function(result){
                if (result.state == 2) {
                    alert(result.message);
                    getCode();
                } else if (result.state == 1) {
                    alert(result.message);
                    getCode();
                    $('#name').focus();
                } else {
                    $('#email').text(result.data);
                    $(".two").show();
                    $(".one").hide();
                    $(".forCon ul li").eq(1).addClass("on").siblings("li").removeClass("on");
                }
            }
        });
    });

    $(".next1").click(function () {
        var email = $('#email').text();
        console.log(email);
        var href = gotoEmail(email);
        if (href != "") {
            window.location.href = "http://" + href;
        } else {
            alert("抱歉！未找到对应的邮箱地址，请自己登录邮箱查看邮件！");
        }
    });

    $("#done").click(function () {
        var password = $('#password').text();
        var re_password = $('#re_password').text();
        if (password != re_password) {
            alert("两次密码输入不一致，请重新输入!");
            return;
        }
        var token = getUrlParam('token');
        $.ajax({
            url: 'forget/change',
            type: 'Post',
            data: {'password':password, 'token':token},
            dataType: 'JSON',
            success: function(result){
                if (result.state == 0) {
                    window.location.href = 'changeSuccess.html';
                } else {
                    alert(result.message);
                }
            }
        });
    });
});

function gotoEmail($mail) {
    $t = $mail.split('@')[1];
    if ($t == '163.com') {
        return 'mail.163.com';
    } else if ($t == 'vip.163.com') {
        return 'vip.163.com';
    } else if ($t == '126.com') {
        return 'mail.126.com';
    } else if ($t == 'qq.com' || $t == 'vip.qq.com' || $t == 'foxmail.com') {
        return 'mail.qq.com';
    } else if ($t == 'gmail.com') {
        return 'mail.google.com';
    } else if ($t == 'sohu.com') {
        return 'mail.sohu.com';
    } else if ($t == 'tom.com') {
        return 'mail.tom.com';
    } else if ($t == 'vip.sina.com') {
        return 'vip.sina.com';
    } else if ($t == 'sina.com.cn' || $t == 'sina.com') {
        return 'mail.sina.com.cn';
    } else if ($t == 'tom.com') {
        return 'mail.tom.com';
    } else if ($t == 'yahoo.com.cn' || $t == 'yahoo.cn') {
        return 'mail.cn.yahoo.com';
    } else if ($t == 'tom.com') {
        return 'mail.tom.com';
    } else if ($t == 'yeah.net') {
        return 'www.yeah.net';
    } else if ($t == '21cn.com') {
        return 'mail.21cn.com';
    } else if ($t == 'hotmail.com') {
        return 'www.hotmail.com';
    } else if ($t == 'sogou.com') {
        return 'mail.sogou.com';
    } else if ($t == '188.com') {
        return 'www.188.com';
    } else if ($t == '139.com') {
        return 'mail.10086.cn';
    } else if ($t == '189.cn') {
        return 'webmail15.189.cn/webmail';
    } else if ($t == 'wo.com.cn') {
        return 'mail.wo.com.cn/smsmail';
    } else if ($t == '139.com') {
        return 'mail.10086.cn';
    } else {
        return '';
    }
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function getCode() {
    var imgCode = document.getElementById("codeImg");
    imgCode.src = "verification/getCode?a=" + new Date();
    if ($("#yzm").val() != null && $("#yzm").val() != "") {
        $("#yzm").focus();
        $("#yzm").val("");
    }
}
