Function.prototype.uncurrify = function () {
	// 保存原函数，下面的例子中，self 即 Array.prototype.push
	let self = this;
	return function () {
		// obj 即 push 的第一个参数，也就是下面 push 的第一个参数 arguments
		// 同时这个匿名函数的 arguments 减少了一个元素，剩下的即只有4，此时 arguments 的内部是 [4]
		let obj = Array.prototype.shift.call(arguments);
		// 此时 self 是 Array.prototype.push, obj 是 push 的第一个参数 arguments，arguments是类似这样的数组 [4]
		// 即相当于 Array.prototype.push.apply(arguments, [4])
		return self.apply(obj, arguments);
	};
};

let push = Array.prototype.push.uncurrify();

function foo(a, b, c) {
	push(arguments, 4);
	console.log(arguments);
}

foo(1, 2, 3);