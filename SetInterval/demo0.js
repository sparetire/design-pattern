// 1.首先我们需要定时执行的任务fn，以及时间间隔，可能还要fn的上下文
function getSetInterval(fn, interval, ctx) {
	// 2.我们希望返回一个函数，执行这个函数就开始定时任务，这个函数最好参数和fn一样
	return function () {
		// 4.既然fn的参数和返回的函数参数一样，就先保存下arguments
		let args = arguments;
		// 3.这个函数需要定时执行fn，但fn的参数从哪里来
		setTimeout(function() {
			// 5.这样有了参数，我们不直接使用setTimeout执行fn而是通过一个匿名函数，并且用apply把参数传给fn
			let rst = fn.apply(ctx, args);
			// 7.如果我们希望结束递归调用，最好再拿到fn的返回值，这算是某种约定吧，返回true就结束递归，
			// 这样对于没有返回的函数就一直定时执行下去
			if (rst) {
				return;
			}
			// 6.执行完一次定时任务，我们还希望在执行同样一次，最好的办法是递归，借用arguments.callee
			setTimeout(arguments.callee, interval);
		}, interval);
	};
}

let pc = {
	count: 0,
	add() {
		console.log(this.count++);
		if (this.count > 5) {
			return true;
		}
	}
};

let start = getSetInterval(pc.add, 2000, pc);
start();