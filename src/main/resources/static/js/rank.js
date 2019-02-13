$(function () {
    getRankBooks(getQueryString('category'), null, 1);
    $('.own').find('span').eq(2).text($('.list-box dt').eq(getQueryString('category')).text());
    $('.list-box dt').attr('off', true);
    var category = getQueryString('category');
    if (category != null && category != "") {
        $('.list-box dt').eq(category).addClass('active').siblings('dd').show();
        $('.list-box dt').eq(category).attr('off', '');
    }
    $('.list-box dt').on('click', function () {
        $('.list-box dt').siblings('dd').hide();
        $('.active').removeClass("active");
        $(this).addClass('active').siblings('dd').show();
        $(this).attr('off', '');
        $('.own').find('span').eq(2).text($(this).text());
        getRankBooks($(this).parent().index(), null, 1);
        $('html,body').animate({scrollTop: 0}, 0);
    });
    $('.list-box dl dd').on('click', function () {
        $('.active').removeClass('active');
        $(this).children('a').addClass('active');
        $('.own').find('span').eq(2).text($(this).siblings('dt').text() + " > " + $(this).children('a').text())
        getRankBooks($(this).parent().index(), $(this).children('a').text(), 1);
        $('html,body').animate({scrollTop: 0}, 0);
    });

    $("#up_page").click(function () {
        var page = parseInt($(".pageList").find("span").eq(1).text());
        if (page == 1) {
            $("#up_page").css("background-color", 'rgba(34,36,64,0.59)');
            return;
        } else if (page == 2) {
            $("#down_page").css("background-color", '#fff');
            $("#up_page").css("background-color", 'rgba(34,36,64,0.59)');
        } else if (page < 11) {
            $("#down_page").css("background-color", '#fff');
        }
        $(".pageList").find("span").eq(1).text(page - 1);
        getRankBooks(null, $('.active').text(), page - 1);
    })

    $("#down_page").click(function () {
        var page = parseInt($(".pageList").find("span").eq(1).text());
        if (page == 10) {
            return;
        } else if (page == 9) {
            $("#up_page").css("background-color", '#fff');
            $("#down_page").css("background-color", 'rgba(34,36,64,0.59)');
        } else if (page > 0) {
            $("#up_page").css("background-color", '#fff');
        }
        $(".pageList").find("span").eq(1).text(page + 1);
        getRankBooks(null, $('.active').text(), page + 1);
    })
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getRankBooks(category, type, page) {

    $.ajax({
        url: 'rank/rank',
        type: 'Get',
        data: {'category': category, 'type': type, 'page': page},
        dataType: 'JSON',
        async: false,
        success: function (result) {
            $("#list-cont").empty();
            $.each(result, function (index, item) {
                var rankNo = parseInt(item.rankNo + 10 * page - 10);
                var inner_html = '';
                if (rankNo == 1 || rankNo == 2 || rankNo == 3) {
                    inner_html = '                <p class=\"rank_num_top\">' + (item.rankNo + 10 * page - 10) + '.</p>\\n';
                } else {
                    inner_html = '                <p class=\"rank_num\">' + (item.rankNo + 10 * page - 10) + '.</p>\\n';
                }
                $("#list-cont").append(
                    '<div class="item">\n' +
                    '<input type="hidden" value="' + item.id + '"/>' +
                    inner_html +
                    '                <div class="img">\n' +
                    '                    <a href="' + "http://localhost:8088/book_detail.html?bid=" + item.id + '">\n' +
                    '                        <img src="' + item.image1 + '"/>\n' +
                    '                    </a>\n' +
                    '                </div>\n' +
                    '                <div class="desc">\n' +
                    '                    <a class="book_name" target="_blank" title="' + item.name + '" href="' + "http://localhost:8088/book_detail.html?bid=" + item.id + '">' + item.name + '</a>\n' +
                    '                    <p class="star">\n' +
                    '                                    <span class="level">\n' +
                    '                                        <span style="width: ' + item.star + ';"></span>\n' +
                    '                                    </span>\n' +
                    '                        <a href="#" target="_blank" name="itemlist-review">' + item.remark + '条评论</a>\n' +
                    '                        <span>' + item.star + '好评</span>\n' +
                    '                    </p>\n' +
                    '                    <p class="author">\n' +
                    '                        <a title="' + item.author + '">' + item.author + '</a>\n' +
                    '                    </p>\n' +
                    '                    <p class="publish">' + item.publishTime + ' <a> ' + item.publisher + '</a></p>\n' +
                    '                    <p class="price">\n' +
                    '                        <span class="pri">￥' + item.price + '</span>\n' +
                    '                        <span class="pri_del"><del>￥' + item.prePrice + '</del></span>\n' +
                    '                        <span class="pri_acc">(' + item.discount + '折)</span>\n' +
                    '                    </p>\n' +
                    '                    <p class="sales">\n' +
                    '                        <span>总销量：' + item.sales + '本</span>\n' +
                    '                    </p>\n' +
                    '                    <p>\n' +
                    '                        <input type="button" class="add_to_cart" value="加入购物车"/>\n' +
                    '                        <input type="button" class="collect" value="收藏"/>\n' +
                    '                    </p>\n' +
                    '                </div>\n' +
                    '            </div>'
                );
            });
        }
    });
}