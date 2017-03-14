let tween = {
	linear(t, b, c, d) {
		// console.log('flag');
		return c * t / d + b;
	},
	easeIn(t, b, c, d) {
		// console.log('flag');
		return c * (t /= d) * t + b;
	},
	strongEaseIn(t, b, c, d) {
		// console.log('flag');
		return c * (t /= d) * t * t * t * t + b;
	},
	strongEaseOut(t, b, c, d) {
		// console.log('flag');
		return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
	},
	sineaseIn(t, b, c, d) {
		// console.log('flag');
		return c * (t /= d) * t * t + b;
	},
	sineaseOut(t, b, c, d) {
		// console.log('flag');
		return c * ((t = t/d - 1) * t * t + 1) + b;
	}
};

function Animate(dom) {
	this.dom = dom;
	this.startTime = 0;
	this.startPos = 0;
	this.endPos = 0;
	this.propertyName = null;
	this.easing = null;
	this.duration = null;
}

Animate.prototype.start = function (propertyName, endPos, duration, easing) {
	this.startTime = +new Date;
	this.startPos = this.dom.getBoundingClientRect()[propertyName];
	this.propertyName = propertyName;
	this.endPos = endPos;
	this.duration = duration;
	this.easing = tween[easing];
	let self = this;
	let handler = requestAnimationFrame(function () {
		if (self.step()) {
			cancelAnimationFrame(handler);
			return;
		}
		requestAnimationFrame(arguments.callee);
	});
};

Animate.prototype.step = function () {
	let t = +new Date;
	if (t >= this.startTime + this.duration) {
		this.update(this.endPos);
		return true;
	}
	let pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
	console.log(pos);
	this.update(pos);
};

Animate.prototype.update = function (pos) {
	console.log('flag');
	this.dom.style[this.propertyName] = pos + 'px';
};

window.onload = () => {
	let ball = document.getElementsByClassName('test')[0];
	let animation = new Animate(ball);
	animation.start('left', 500, 1000, 'sineaseOut');
};