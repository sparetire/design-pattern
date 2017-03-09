function getSingle(constructor, time) {
	let cache = {};
	let className = constructor.prototype.constructor.name;
	return function () {
		if (!cache[className]) {
			// 借用构造函数，逻辑运算是为了给非构造函数使用，即对于普通函数调用，可能没有返回值，也能做到多次调用只执行一次
			cache[className] = constructor.apply(this, arguments) || true;
			if (time) {
				setTimeout(() => delete cache[className], time);
			}
		}
		return cache[className];
	};
}

function Person(name) {

	let self = this instanceof Person ? this : Object.create(Person.prototype);
	self.name = name;
	return self;
}

function test() {
	console.log('test');
}

let newTest = getSingle(test);
newTest();
newTest();

const PersonProxy = getSingle(Person, 3000);

let aaa = new PersonProxy('aaa');
console.log(aaa.name);

setTimeout(() => {
	let bbb = new PersonProxy('bbb');
	console.log(bbb.name);
}, 1000);