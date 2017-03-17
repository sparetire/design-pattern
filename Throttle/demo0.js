// 这种是保证一个频繁触发的函数只在最后执行一次
function debounce(fn, delay) {
	let timer = null;
	// 1.首先，肯定是返回一个函数，参数不重要先不考虑
	return function () {
		// 4.不如先在这里记下fn所需的参数，有了参数，那fn的上下文呢，也顺手记下
		let ctx = this;
		let args = arguments;
		// 2.如果有定时任务，就取消掉原有任务重新设置定时任务fn
		if (timer) {
			clearTimeout(timer);
			// 3.设置一个定时任务执行fn，但是fn可能需要参数，比如event对象等，
			// 那这里肯定不能直接setTimeout传fn，而只能通过一个匿名函数调用fn，参数从哪里来
			timer = setTimeout(function () {
				// 6.即便定时任务结束，timer还是会有值，这里清空掉
				timer = null;
				fn.apply(ctx, args);
			}, delay);
			// 7.如果不返回，则会继续再设置一个定时任务
			return false;
		}
		// 5.如果没有定时任务，就直接设置一个定时任务fn
		timer = setTimeout(function() {
			timer = null;
			fn.apply(ctx, args);
		}, delay);
	};
}

window.onresize = debounce(function (event) {
	console.log(event);
}, 2000);