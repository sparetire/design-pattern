function bind(fn, ctx) {
	return function () {
		fn.apply(ctx, arguments);
	};
}

function sayName() {
	console.log(this.name);
}

let obj = {
	name: 'tom'
};

sayName = bind(sayName, obj);

sayName();