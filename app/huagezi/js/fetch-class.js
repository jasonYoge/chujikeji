function fetchClass (url) {
	var result;

	$.getJSON(url, function (res) {
		result = res;
	});

	return result;
}
