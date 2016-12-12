$(function () {
    var $btn_login = $('#btn_login');
    var $btn_forget = $('#btn_forget');
    var $toast = $('#toast');

    $btn_login.on('click', function (event) {
        event.preventDefault();

       var name = $('#name').val();
       var password = $('#password').val();

       if (!name || !password) {
            $toast.show();
            $toast.css('transition', 'opacity .5s linear');
            setTimeout(function () {
                $toast.css('opacity', 0.5);
            }, 500);
            setTimeout(function () {
                $toast.css('transition', 'none');
                $toast.hide();
                $toast.css('opacity', 1);
            }, 2000);
       }

       var post = {};
       post.name = name;
       post.pass = password;
       console.log(JSON.stringify(post));

       $.ajax({
            url: 'http://182.92.10.18:8080/Huagezi/api/user/login',
            data: JSON.stringify({
                name: name,
                pass: password
            }),
            // contentType: 'application/json',
            type: 'POST',
            success: function (res) {
                console.log(res);
            }
       });
    });
});
