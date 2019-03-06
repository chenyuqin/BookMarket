$(function () {
    $.ajax({
        url: 'index/getNoticeById',
        type: 'Get',
        data: {'id': parseInt(getQueryString('id'))},
        dataType: 'JSON',
        success: function (result) {
            $("#title").text(result.title);
            $("#content").html(result.url);
        }
    });
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}