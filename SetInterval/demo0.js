function getSetInterval(fn, interval, ctx) {
	let handler = {
		stop: false
	};
	return function () {
		let args = arguments;
		Array.prototype.push.call(args, handler);
		setTimeout(function() {
			let rst = fn.apply(ctx, args);
			if (rst) {
				return;
			}
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