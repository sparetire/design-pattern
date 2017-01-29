Function.prototype.uncurrify = function () {
	let self = this;
	return function () {
		// 首先 self 同 demo0 中一样，依然是 Array.prototype.push
		// xxx.apply(a, arr) 可以翻译成 a.xxx
		// 所以这里等于
		// self.call(arguments)
		// Array.prototype.push.call(arguments)
		// 而这个 arguments 的结构类似 [arguments, 4]
		// 所以最终等价于
		// Array.prototype.push.call(arguments, 4)
		return Function.prototype.call.apply(self, arguments);
	};
};

let push = Array.prototype.push.uncurrify();

function foo(a, b, c) {
	push(arguments, 4);
	console.log(arguments);
}

foo(1, 2, 3);