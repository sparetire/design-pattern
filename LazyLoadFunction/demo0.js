var flag = false;
let func = (function () {
	// TODO
	if (flag) {
		return function () {
			console.log('func0');
		};
	} else {
		return function () {
			console.log('func1');
		};
	}
})();

func();