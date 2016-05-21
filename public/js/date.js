document.getElementById("aForm").onsubmit = function() {
	var dd = /^([12][0-9]|3[01]|0?[1-9])$/;
	var mmdd = /^(0?[1-9]|1[0-2])(\/|-|)([12][0-9]|3[01]|0?[1-9])$/;
	var yyyymmdd = /^([12]\d{3}|\d{2})(\/|-|)(0?[1-9]|1[0-2])(\/|-|)([12][0-9]|3[01]|0?[1-9])$/;
	var hhmm = /^(0?[0-9]|1[0-9]|2[0-3])(:)([0-5]?[0-9])$/;

	var dFormat = "YYYY/MM/DD HH:mm:ss";

	var now = moment();
	var vaildDate = $.extend(true, {}, now);
	var vaildDate = moment().set('hour', 17).startOf('hour');

	var datestr = document.getElementById('limit1').value;
	var dFormat = "YYYY/MM/DD HH:mm:ss";

	// console.log("now: " + now.format(dFormat))
	// console.log("Init vaildDate: " + vaildDate.format(dFormat))

	if (datestr.match(dd)) {
		console.log("match dd, datester: " + datestr + "now.date: " + now.date())
		vaildDate.set('date', datestr);
		if (datestr <= now.date()) {
			vaildDate.add(1, 'M');
		}
	} else if (datestr.match(mmdd)) {
		// 2016/02/11 に 0201の入力があった場合、 2017/02/01で無く、2016/02/01になってしまう(日付での期日超過判定を追記する必要あり)
		console.log("match mmdd, datester: " + datestr)
		var result = datestr.match(mmdd);
		m = result[1];
		console.log(m);
		d = result[3];
		if ((m == now.month() && d < now.date()) || (m < now.month())) {
			vaildDate.add(1, 'y');
		}
		vaildDate.set({
			'month': m - 1,
			'date': d
		})

	} else if (datestr.match(yyyymmdd)) {
		var result = datestr.match(yyyymmdd);
		y = Number(result[1]);
		if (y < 99) {
			y = 2000 + y;
		}
		vaildDate.set({
			'year': y,
			'month': result[3] - 1,
			'date': result[5]
		});

	} else if (datestr.match(hhmm)) {
		var result = datestr.match(hhmm);
		vailDate.set({
			'hour': result[1],
			'minute': result[3]
		})
		if (vaildDate < now) {
			vailDate.add(1, 'days')
		}
	}
	console.log(vaildDate.format(dFormat));
	return vaildDate;

}
