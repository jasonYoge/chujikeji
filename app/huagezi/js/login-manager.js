$(function () {
	var btn_login = $('#btn_login');
	var btn_forget = $('#btn_forget');

	btn_login.on('click', function (event) {
		event.preventDefault();
		// $.post('http://182.92.10.18:8080/Huagezi/api/user/login', {
		// 	name: $('#name').val(),
		// 	password: $('#password').val()
		// });
		var resultForm = new FormData(document.getElementById('form'));
		console.log(document.getElementById('form'));
		console.log(resultForm);
		var obj = {};
		obj.name = $('#name').val();
		obj.password = $('#password').val();

		// $.ajax({
		// 	url: 'http://182.92.10.18:8080/Huagezi/api/user/login',
		// 	data: resultForm,
		// 	type: 'POST',
		// 	success: function (res) {
		// 		console.log(res);
		// 	}
		// });
		$.ajax({
            url:'http://182.92.10.18:8080/Huagezi/api/teachers/login',
            type:'POST',
            data:resultForm,
            cache:false,
            processData:false,
            contentType:false,
        }).done(function(data){
            console.log(data);
            // window.location.href = './teacher-index.html'
        }).fail(function(error){
            console.log(error);
        });
		// var xhr = new XMLHttpRequest();
		// xhr.open('POST', 'http://182.92.10.18:8080/Huagezi/api/update/pushDate');
		// xhr.setRequestHeader('Content-Type', 'multipart/form-data');
		// xhr.send(resultForm);
	});
});