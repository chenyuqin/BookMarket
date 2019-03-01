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
    $.ajax({
        url: 'personalInfo/getPersonalInfo',
        type: 'Post',
        data: {'token': token},
        dataType: 'JSON',
        success: function (result) {
            $("#name").text(result.name);
            if (result.birthday != null) {
                $("#birthday").text(result.birthday);
            }
            if (result.sex != null) {
                if (result.sex == 0) {
                    $("#sex").text("男");
                } else {
                    $("#sex").text("女");
                }
            }
            if (result.hobby != null) {
                $("#hobby").text(result.hobby);
            }
            if (result.introdution != null) {
                $("#introdution").text(result.introdution);
            }
        }
    });

    $("#edit1").click(function () {
        $(".mask").show();
        $(".bj").show();
        $.ajax({
            url: 'personalInfo/getPersonalInfo',
            type: 'Post',
            data: {'token': token},
            dataType: 'JSON',
            success: function (result) {
                $(".bj .bj_name").val(result.name);
                if (result.birthday != null) {
                    $(".bj .bj_birthday").val(result.birthday);
                }
                if (result.sex != null) {
                    if (result.sex == 0) {
                        $(".bj :radio[name='sex']").eq(0).prop("checked", "checked");
                    } else {
                        $(".bj :radio[name='sex']").eq(1).prop("checked", "checked");
                    }
                }
                if (result.hobby != null) {
                    $(".bj .bj_hobby").val(result.hobby);
                }
                if (result.introdution != null) {
                    $(".introdution").val(result.introdution);
                }
            }
        });
    });

    $('.bj_save').click(function () {
        var name = $(".bj .bj_name").val();
        var sex = $(".bj :radio[name='sex']:checked").val();
        var birthday = $(".bj .bj_birthday").val();
        var hobby = $(".bj .bj_hobby").val();
        var introdution = $(".introdution").val();

        $.ajax({
            url: 'personalInfo/savePersonalInfo',
            type: 'Post',
            data: {'token': token, 'name': name, 'sex': sex, 'birthday': birthday,
                'hobby': hobby, 'introdution': introdution},
            dataType: 'JSON',
            success: function (result) {
                alert("信息修改完毕！");
                $(".bj").hide();
                sessionStorage.setItem('name', name);
                window.location.reload();
            }
        });

    });
});