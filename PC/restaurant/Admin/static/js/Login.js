function htmlEncodeJQ(str) {
    return $('<span/>').text(str).html();
}
function htmlDecodeJQ(str) {
    return $('<span/>').html(str).text();
}
function removeHtmlTab(tab) {

    return tab.replace(/<[^<>]+?>/g,'');//删除所有HTML标签

}

function html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}


$(document).ready(function() {
    $('.input').on('focus', function() {
        $('.login').addClass('clicked');
    });
    $('.login').on('submit', function(e) {
        e.preventDefault();
        $('.login').removeClass('clicked').addClass('loading');

        var username=$("#input-username").val();
        var password=$("#input-password").val();

        if(username==""||username==null){
            alert("用户名不可为空");
            $('.login').removeClass('loading').addClass('clicked');
            return;
        }

        if(password==""||password==null){
            alert("密码不可为空");
            $('.login').removeClass('loading').addClass('clicked');
            return;
        }
        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: "API/Login.ashx",
                cache: false,
                data:{username:html2Escape(removeHtmlTab(htmlEncodeJQ(username))),password:html2Escape(removeHtmlTab(htmlEncodeJQ(password)))},//删除所有HTML标签},
                dataType: "json",
                success: function (result, statues, xml) {
                    var messages = result.res;
                    if(messages==1){
                        alert("登录成功");
                        window.location.href="index.aspx"
                    }
                    else {
                        alert("登录失败");
                        $('.login').removeClass('loading').addClass('clicked');
                    }
                },
                error: function () {
                    alert("false");
                }
            });
        },1000);


        return false;

    });
});