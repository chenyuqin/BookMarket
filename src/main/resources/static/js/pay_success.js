$(function () {
    var token = sessionStorage.getItem('token');
    $.ajax({
        url: 'order/getLikeBooks',
        type: 'Post',
        data: {'token': token},
        dataType: 'JSON',
        success: function (result) {
            $.each(result, function (index, item) {
                if (index < 4) {
                    $('#first_recommend').append(
                        '<a href="' + "http://localhost:8088/book_detail.html?bid=" + item.id + '">\n' +
                        '                        <dl>\n' +
                        '                            <dt><img src="' + item.image1 + '"></dt>\n' +
                        '                            <dd><span class="book_name" title="' + item.name + '">' + item.name + '</span></dd>\n' +
                        '                            <dd><span class="author_name" title="' + item.author + '">' + item.author + '</span></dd>\n' +
                        '                        </dl>\n' +
                        '                    </a>'
                    )
                } else if (index == 5) {
                    $('#first_recommend').append(
                        '<a class="last" href="' + "http://localhost:8088/book_detail.html?bid=" + item.id + '">\n' +
                        '                        <dl>\n' +
                        '                            <dt><img src="' + item.image1 + '"></dt>\n' +
                        '                            <dd><span class="book_name" title="' + item.name + '">' + item.name + '</span></dd>\n' +
                        '                            <dd><span class="author_name" title="' + item.author + '">' + item.author + '</span></dd>\n' +
                        '                        </dl>\n' +
                        '                    </a>'
                    )
                } else if (index < 8) {
                    $('#second_recommend').append(
                        '<a href="' + "http://localhost:8088/book_detail.html?bid=" + item.id + '">\n' +
                        '                        <dl>\n' +
                        '                            <dt><img src="' + item.image1 + '"></dt>\n' +
                        '                            <dd><span class="book_name" title="' + item.name + '">' + item.name + '</span></dd>\n' +
                        '                            <dd><span class="author_name" title="' + item.author + '">' + item.author + '</span></dd>\n' +
                        '                        </dl>\n' +
                        '                    </a>'
                    );
                } else {
                    $('#second_recommend').append(
                        '<a class="last" href="' + "http://localhost:8088/book_detail.html?bid=" + item.id + '">\n' +
                        '                        <dl>\n' +
                        '                            <dt><img src="' + item.image1 + '"></dt>\n' +
                        '                            <dd><span class="book_name" title="' + item.name + '">' + item.name + '</span></dd>\n' +
                        '                            <dd><span class="author_name" title="' + item.author + '">' + item.author + '</span></dd>\n' +
                        '                        </dl>\n' +
                        '                    </a>'
                    )
                }
            });
            jQuery(".bottom").slide({
                titCell: ".hd ul",
                mainCell: ".bd .likeList",
                autoPage: true,
                effect: "leftLoop",
                vis: 1,
                autoPlay: true
            });
        }
    });
});