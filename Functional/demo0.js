function compose() {
	let args = arguments;
	return function () {
		let len = args.length - 1;
		let rst = args[len].apply(this, arguments);
		while (len--) {
			rst = args[len].call(this, rst);
		}
		return rst;
	};
}

function f(a, b) {
	return a + b;
}

function g(x) {
	return x * x;
}

let test = compose(g, f);

console.log(test(1, 1));