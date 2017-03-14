let Validator = (function () {
	let globalRules = {
		isNonEmpty(value) {
			return !!value;
		},
		minLength(value, length) {
			return value.length >= parseInt(length, 10);
		},
		isMobile(value) {
			return /^1[3|5|8][0-9]{9}$/.test(value);
		}
	};

	function V(rules) {
		let self = this instanceof V ? this : Object.create(V.prototype);
		let localRules = {};
		rules && Object.assign(localRules, rules);
		function check(data, rule, msg) {
			let rst = false;
			if (typeof rule === 'string') {
				let [ruleName, param] = rule.split(':');
				if (localRules[ruleName]) {
					rst = localRules[ruleName](data, param);
				} else if (globalRules[ruleName]) {
					rst = globalRules[ruleName](data, param);
				}
				if (!rst) {
					return msg || false;
				} else {
					return true;
				}
			} else {
				for (let key in rule) {
					let map = rule[key];
					let [ruleName, param] = map.split(':');
					if (localRules[ruleName]) {
						rst = localRules[ruleName](data, param);
					} else if (globalRules[ruleName]) {
						rst = globalRules[ruleName](data, param);
					}
					if (!rst) {
						return (msg && msg[key]) || false;
					}
				}
				return true;
			}
		}
		if (typeof V.prototype.add != 'function') {
			V.prototype.add = function (ruleName, operation) {
				if (typeof ruleName === 'string') {
					localRules[ruleName] = operation;
				} else if (typeof ruleName === 'object') {
					Object.assign(localRules, rules);
				} else {
					throw new Error('Invalid rules.');
				}
			};
		}
		if (typeof V.prototype.check != 'function') {
			V.prototype.check = function (data, map) {
				let rst = false;
				for (let key in data) {
					let {rule, msg} = map[key];
					rst = check(data[key], rule, msg);
					if (rst !== true) {
						return rst;
					}
				}
				return true;
			};
		}
		return self;
	}
	return V;
})();


let validator = new Validator({
	maxLength(value, len) {
		return value.length <= len;
	}
});

let rst = validator.check({
	name: '18668216172'
}, {
	name: {
		rule: ['isMobile', 'minLength:6'],
		msg: ['test', 'hello']
	}
});

console.log(rst);