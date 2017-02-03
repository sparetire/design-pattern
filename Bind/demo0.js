// 在浏览器下没问题，在node下有问题，node下console.log的某个地方用到了bind
Function.prototype.bind = function (ctx) {
	let self = this;
	return function () {
		self.apply(ctx, arguments);
	};
};


function sayName() {
	console.log(this.name);
}

let obj = {
	name: 'tom'
};

sayName = sayName.bind(obj);
sayName();