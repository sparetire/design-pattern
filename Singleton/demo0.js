const Person = (function () {
	let instance = null;
	function Person(name) {
		let self = this instanceof Person ? this : Object.create(Person.prototype);
		if (instance) {
			return instance;
		} else {
			self.name = name;
			instance = self;
			return self;
		}
	}
	return Person;
})();

let a = new Person('aaa');
let b = new Person('bbb');

console.log(a.name);
console.log(b.name);
