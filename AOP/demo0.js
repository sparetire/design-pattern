Function.prototype.before = function (beforeFn) {
	// 这里 self 是一个函数，即下面的 targetFn 自身
	let self = this;
	return function () {
		// 这里的 this 是这个匿名函数的 this
		// apply 用来确保 beforeFn/targetFn 的 this 和 newTargetFn 一致
		// arguments 保证了 beforeFn 可以先拦截到原函数的参数
		// 需要注意的是这里直接传递了 arguments，好处是可以真正做到拦截参数
		// 即 beforeFn 修改了 arguments 的内容，newTargetFn 得到被修改的参数，且修改参数这个动作对 newTargetFn 是透明的
		// 坏处是如果使用不当，arguments 被一直传递，可能会导致这个匿名函数很久都无法释放，导致内存问题
		// 如果拷贝 arguments 为数组，则不会有这样的问题，但也没办法做到 beforeFn 修改参数，newTargetFn 得到被修改的参数了
		// 会变成 beforeFn 修改了 arguments 不会影响到 newTargetFn
		beforeFn.apply(this, arguments);
		return self.apply(this, arguments);
	};
};

Function.prototype.after = function (afterFn) {
	let self = this;
	return function () {
		// 比之前的多一个先保存返回值
		let rst = self.apply(this, arguments);
		afterFn.apply(this, arguments);
		return rst;
	};
};

function targetFn(num) {
	console.log(num);
}

// 总的来讲，有赋值这步还是不太自然，毕竟 before 和 after 已经相当于注册了切面，
// 有足够的信息，但却还要赋值拿到新的函数，再调用新函数，而不能直接调用原有函数
let newTargetFn = targetFn.before(num => console.log(num - 1)).after(num => console.log(num + 1));

newTargetFn(5);
