// 这种是确保频繁触发的fn执行得不那么频繁，但不是只在最后执行一次
// 考虑这种情况，你拖着窗口缩放了二十秒没松手，原本要执行几百次fn，
// 现在每5秒执行一次，不是只执行一次，但是频率降低了
function throttle(fn, delay) {
	let timer = null, firstTime = true;
	return function () {
		let ctx = this, args = arguments;
		if (firstTime) {
			fn.apply(ctx, args);
			return firstTime = false;
		}
		if (timer) {
			return false;
		}
		timer = setTimeout(function () {
			// 好像有点多余
			clearTimeout(timer);
			// 同demo0
			timer = null;
			fn.apply(ctx, args);
		}, delay);
	};
}

window.onresize = throttle(function (event) {
	console.log(event);
}, 5000);