const Promise = require('bluebird');

function wait(time) {
	// time时间后调用resolve
	return new Promise(resolve => setTimeout(resolve, time));
}

// 注意这个bind，bind返回一个函数所以传给then没什么问题，但bind还可以接受之后的3000参数，类似currify缓存了参数并返回一个新函数，所以这个bind是有必要的
Promise.resolve().then(() => console.log('test0')).then(wait.bind(null, 3000)).then(() => console.log('test1'));