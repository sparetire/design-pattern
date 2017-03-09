function Person(name) {
	let self = this instanceof Person ? this : Object.create(Person.prototype);
	self.name = name;
	return self;
}

const PersonProxy = (function () {
	let instance = null;
	return function (name) {
		if (!instance) {
			instance = new Person(name);
		}
		return instance;
	};
})();

let a = new PersonProxy('aaa');
let b = new PersonProxy('bbbb');

console.log(a.name);
console.log(b.name);