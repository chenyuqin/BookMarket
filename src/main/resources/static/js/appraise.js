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
    // 待评价图书
    $("#pro li").eq(0).click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $.ajax({
            url: 'appraise/getNotApprBooks',
            type: 'Post',
            data: {'token': token},
            dataType: 'JSON',
            success: function (result) {
                $('.book_show').empty();
                if (result.length == 0) {
                    $('.book_show').append('<span style="\n' +
                        '    font-size: 25px;\n' +
                        '    font-family: cursive;\n' +
                        '    padding-left: 300px;\n' +
                        '    font-weight: bold;\n' +
                        '    height: 310px;\n' +
                        '    line-height: 337px;\n' +
                        '">暂无待评价图书！</span>');
                } else {
                    $.each(result, function (index, item) {
                        $('.book_show').append(
                            '<dl class="fl">\n' +
                            '                        <dt>\n' +
                            '                            <a href="' + "/book_detail.html?bid=" + item.id + '">\n' +
                            '                                <input type="hidden" value="' + item.id + '"/>\n' +
                            '                                <img style="width: 120px;" src="' + item.image1 + '"/>\n' +
                            '                            </a>\n' +
                            '                        </dt>\n' +
                            '                        <dd><a href="' + "/book_detail.html?bid=" + item.id + '" title="' + item.name + '">' + item.name + '</a></dd>\n' +
                            '                        <dd title="' + item.author + '">' + item.author + '</dd>\n' +
                            '                        <dd>' + item.remark + '人评价</dd>\n' +
                            '                        <dd><a class="appr_btn" href="javascript:void(0)">评价</a></dd>\n' +
                            '                    </dl>'
                        )
                    });
                }
                $('.appr_btn').click(function () {
                    var top = ($(window).height() - $('.pj').height())/2;
                    var left = ($(window).width() - $('.pj').width())/2;
                    var scrollTop = $(document).scrollTop();
                    var scrollLeft = $(document).scrollLeft();
                    $('.pj').css( { position : 'absolute', top : top + scrollTop, left : left + scrollLeft } );
                    $(".mask").show();
                    $(".pj").show();
                    $('.pj .level2').css('width', '100%');
                    $('.pj .desc').text("10分 极力推荐！");
                    $('#textareaid').val('');
                    var book_id = $(this).parent().siblings('dt').find('input').val();
                    $("#appr_save").unbind('click').bind('click', function () {
                        var star = ((parseInt($('.pj .level2').css('width').split("px")) / 130)*100).toFixed(2) + "%";
                        var remarkText = $('#textareaid').val();
                        $.ajax({
                            url: 'appraise/insertRemark',
                            type: 'Post',
                            data: {'token': token, 'book_id': parseInt(book_id),
                                'remarkText': remarkText, 'star': star},
                            dataType: 'JSON',
                            success: function (result) {
                                alert("已完成评价！");
                                window.location.reload();
                            }
                        });
                    });
                });
            }
        });
    });
    //已评价图书
    $("#pro li").eq(1).click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $.ajax({
            url: 'appraise/getApprBooks',
            type: 'Post',
            data: {'token': token},
            dataType: 'JSON',
            success: function (result) {
                $('.book_show').empty();
                if (result.length == 0) {
                    $('.book_show').append('<span style="\n' +
                        '    font-size: 25px;\n' +
                        '    font-family: cursive;\n' +
                        '    padding-left: 300px;\n' +
                        '    font-weight: bold;\n' +
                        '    height: 310px;\n' +
                        '    line-height: 337px;\n' +
                        '">您还未评价过任何图书！</span>');
                } else {
                    $.each(result, function (index, item) {
                        $('.book_show').append(
                            '<dl class="fl">\n' +
                            '                        <dt>\n' +
                            '                            <a href="' + "/book_detail.html?bid=" + item.id + '">\n' +
                            '                                <input type="hidden" value="' + item.id + '"/>\n' +
                            '                                <img style="width: 120px;" src="' + item.image1 + '"/>\n' +
                            '                            </a>\n' +
                            '                        </dt>\n' +
                            '                        <dd><a href="' + "/book_detail.html?bid=" + item.id + '" title="' + item.name + '">' + item.name + '</a></dd>\n' +
                            '                        <dd title="' + item.author + '">' + item.author + '</dd>\n' +
                            '                        <dd>' + item.remark + '人评价</dd>\n' +
                            '                        <dd><a class="appr_look_btn" href="javascript:void(0)">查看评价</a></dd>\n' +
                            '                    </dl>'
                        )
                    });
                    $('.appr_look_btn').click(function () {
                        var top = ($(window).height() - $('.chak').height())/2;
                        var left = ($(window).width() - $('.chak').width())/2;
                        var scrollTop = $(document).scrollTop();
                        var scrollLeft = $(document).scrollLeft();
                        $('.chak').css( { position : 'absolute', top : top + scrollTop, left : left + scrollLeft } );
                        $(".mask").show();
                        $(".chak").show();
                        var book_id = $(this).parent().siblings('dt').find('input').val();
                        $.ajax({
                            url: 'appraise/getRemarkByBookId',
                            type: 'Post',
                            data: {'token': token, 'book_id': parseInt(book_id)},
                            dataType: 'JSON',
                            success: function (result) {
                                $(".chak .level2").css('width', result.star);
                                var width_int = Math.round(
                                    parseFloat(result.star.split("%")[0]) / 10
                                );
                                if(width_int == 0) {
                                    $('.chak .desc').text(width_int + "分 双眼已瞎！");
                                } else if(width_int == 1) {
                                    $('.chak .desc').text(width_int + "分 超烂啊！");
                                } else if(width_int == 2) {
                                    $('.chak .desc').text(width_int + "分 不值一提！");
                                } else if(width_int == 3 || width_int == 4) {
                                    $('.chak .desc').text(width_int + "分 水准之下！");
                                } else if(width_int == 5 || width_int == 6) {
                                    $('.chak .desc').text(width_int + "分 聊胜于无！");
                                } else if(width_int == 7 || width_int == 8) {
                                    $('.chak .desc').text(width_int + "分 值得一看！");
                                } else if(width_int == 9 || width_int == 10) {
                                    $('.chak .desc').text(width_int + "分 极力推荐！");
                                }

                                $(".chak .remarkText").val(result.remarkText);
                            }
                        });
                    });
                }
            }
        });
    });

    $("#pro li").eq(0).click();
});