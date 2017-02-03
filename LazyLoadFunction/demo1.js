var flag = false;

function func(params) {
	if (flag) {
		func = function () {
			console.log('func0');
		};
	} else {
		func = function () {
			console.log('func1');
		};
	}
	return func();
}

func();