$(function () {
	var $toast = $('#toast');
	var $list = $('#list');
	var $confirm = $('#confirm_btn');
	var $cancel = $('#cancel_btn');
	var $pickerPanel = $('#picker_panel');
	var $year = $('#year_month_day');
	var $hours = $('#hours');
	var $minites = $('#minites');
	var $seconds = $('#seconds');
	var $toast_success = $('#toast_success');
	var id;

	$.getJSON('http://182.92.10.18:8080/Huagezi/api/past/query?currentPage=1&maxRow=10', function (res) {
		if (res.body.length === 0) {
			$toast.show();
			setTimeout(function () {
				$toast.css('opacity', 0.5);
			}, 500);
			setTimeout(function () {
				$toast.hide();
				$toast.css('opacity', 1);
			}, 2000);
		} else {
			var html = '';
			//	拉取数据渲染
			res.body.forEach(function (data) {
				html+= '<li class="list-item">'
        			+  '<div class="list-item-title">'
        			+  '<p>' + data.bigTitle + ':《' + data.smallTitle + '》</p>'
        			+  '</div><div class="list-item-btn-group"><a href="javascript:;" data-id=' + data.curriculumId + ' class="list-item-btn set-time">设置推送时间</a>'
        			+  '<a href="javascript:;" data-id=' + data.curriculumId + ' class="list-item-btn set-time-immediately">立即推送</a>'
                                            + '</div></li>';
			});

			$list.html(html);
			//	显示选择推送面板
			$('.set-time').on('click', function (event) {
				id = $(event.target).data('id');
				console.log(id);
				$pickerPanel.show(1000);
			});
			//	立即推送逻辑实现
			$('.set-time-immediately').on('click', function (event) {
				$.post('http://182.92.10.18:8080/Huagezi/api/update/immediately', {
					curriculumId: $(event.target).data('id')
				});
				$toast_success.show();
				setTimeout(function () {
					$toast_success.css('opacity', 0.5);
				}, 500);
				setTimeout(function () {
					$toast_success.hide();
					$toast_success.css('opacity', 1);
				}, 2000);
			});
		}
	});
	//	选择推送逻辑实现
	$confirm.on('click', function () {
		var year_mouth_day = $year.text().split('-');
		var hours = $hours.text();
		var minites = $minites.text();
		var seconds = $seconds.text();
		var $toast = $('#toast_success');

		$pickerPanel.hide();
		$toast_success.show();
		setTimeout(function () {
			$toast_success.css('opacity', 0.5);
		}, 500);
		setTimeout(function () {
			$toast_success.hide();
			$toast_success.css('opacity', 1);
		}, 2000);

		var result = new Date(year_mouth_day[0], year_mouth_day[1] - 1, year_mouth_day[2] - 1,
			hours, minites, seconds).getTime();

		// $.post('http://182.92.10.18:8080/Huagezi/api/update/pushDate', {
		// 	curriculumId: id,
		// 	pushDate: result
		// });
		// var resultObj = {};
		// resultObj.curriculumId = id;
		// resultObj.pushDate = result;
		var resultObj = new FormData();
		var objj = {
			pushDate: result,
			curriculumId: id
		};
		resultObj.append('Curriculum',objj);
		// resultObj.append('pushDate', result);
		$.ajax({
			url: 'http://182.92.10.18:8080/Huagezi/api/update/pushDate',
			type: 'POST',
			data: bojj,
  			contentType: 'application/json',
    		success: function (res) {
    			console.log(123);
    		}
		});
		// var xhr = new XMLHttpRequest();
		// xhr.open('POST', 'http://182.92.10.18:8080/Huagezi/api/update/pushDate');
		// xhr.send(resultObj);
	});

	$cancel.on('click', function () {
		$pickerPanel.hide(1000);
	});

	$year.on('click', function () {
		weui.datePicker({
			start: new Date().getFullYear(),
			end: new Date().getFullYear() + 1,
			onConfirm: function (result) {
				var time = '';
				result.map(function (date, index) {
					if (index > 0) {
						date++;
					}
					time += date;
					if (index !== 2) {
						time += '-';
					}
				});
				$year.text(time);
			}
		});
	});
	//	选择小时按钮
	$hours.on('click', function () {
		var hoursArr = getHoursArray();
		weui.picker(hoursArr, {
			onConfirm: function (result) {
				$hours.text(result[0]);
			}
		});
	});
	//	选择分钟按钮
	$minites.on('click', function () {
		var minitesArr = getMinitesArray();
		weui.picker(minitesArr, {
			onConfirm: function (result) {
				$minites.text(result[0]);
			}
		});
	});
	//	选择秒按钮
	$seconds.on('click', function () {
		var secondsArr = getSecondsArray();
		weui.picker(secondsArr, {
			onConfirm: function (result) {
				$seconds.text(result[0]);
			}
		});
	})
});
//	获取小时数组
function getHoursArray () {
	var result = [];
	for (var i = 0; i < 24; i++) {
		var obj = {};
		obj.label = i.toString();
		obj.value = i;
		result.push(obj);
	}
	return result;
}
//	获取分钟数组
function getMinitesArray () {
	var result = [];
	for (var i = 0; i < 60; i++) {
		var obj = {};
		obj.label = i.toString();
		obj.value = i;
		result.push(obj);
	}
	return result;
}
//	获取秒数组
function getSecondsArray () {
	var result = [];
	for (var i = 0; i < 60; i++) {
		var obj = {};
		obj.label = i.toString();
		obj.value = i;
		result.push(obj);
	}
	return result;
}
