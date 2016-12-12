$(function () {
	var $region = $('#region'),
		$school = $('#school'),
		$grade = $('#grade');

	$.getJSON('http://182.92.10.18:8080/Huagezi/api/teachersList/query?currentPage=1&maxRow=10', function (res) {
		console.log(res);
	});

	var url = 'http://182.92.10.18:8080/Huagezi/api/teachersList/query?currentPage=1&maxRow=10';
	url += '&teachersRegion=武侯区';
	url += '&teachersSchool=金沙小学';
	url += '&teachersGrade=一年级';
	url += '&teachersClass=';

	$.getJSON(url, function (res) {
		console.log(res);
	});

});