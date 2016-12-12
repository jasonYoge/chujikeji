$(function () {
	var $btn_confirm = $('#btn_confirm'),
		$tel_mail = $('#tel_mail'),
		$identifying_code = $('#identifying_code'),
		$get_identifying_code = $('#get_identifying_code'),
		$password = $('#password'),
		$repeat_password = $('#repeat_password'),
		$toast_password = $('#toast_password'),
		$password_group = $('.password');

	$btn_confirm.on('click', function () {
		if ($password.val() !== $repeat_password.val()) {
			$toast_password.show();
			$toast_password.css('transition', 'opacity .5s linear');
			setTimeout(function () {
				$toast_password.css('opacity', 0.5);
			}, 500);
			setTimeout(function () {
				$toast_password.css('transition', 'none');
				$toast_password.hide();
				$toast_password.css('opacity', 1);
			}, 2000);
			$password_group.addClass('weui-cell_warn');
		}
	});

	$password.on('focus', function () {
		$password.parent().parent().removeClass('weui-cell_warn');
	});

	$repeat_password.on('focus', function () {
		$repeat_password.parent().parent().removeClass('weui-cell_warn');
	});
});