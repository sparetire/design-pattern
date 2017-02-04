// 作用见Setinterval
function getSetInterval(fn, interval, ctx) {
	return function () {
		let args = arguments;
		setTimeout(function () {
			let rst = fn.apply(ctx, args);
			if (rst) {
				return;
			}
			setTimeout(arguments.callee, interval);
		}, interval);
	};
}

// 1.首先，我们希望函数定时从数组arr中取count个元素执行fn，并且执行完成后调用回调函数cb
function thunk(arr, fn, count, interval, cb) {
	// 4.我们发现shift会修改传入的数组，有副作用，因此我们做一次浅拷贝
	let arrCopy = arr.slice();
	// 2.我们定义每次定时执行的任务task
	let task = function () {
		let len = Math.min(count, arrCopy.length),
			item = null;
		// 3.每次从数组中取count个元素，通过shift完成，如果不够就取数组的length个元素
		for (let i = 0; i < len; i++) {
			item = arrCopy.shift();
			fn(item);
		}
		// 5.当执行完后，我们执行回调函数，并终止定时器
		if (!arrCopy.length) {
			if (typeof cb === 'function') {
				cb();
			}
			return true;
		}
	};
	let start = getSetInterval(task, interval);
	start();
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
thunk(arr, function (item) {
	console.log(item);
}, 2, 3000, function () {
	console.log('done');
	console.log(arr);
});