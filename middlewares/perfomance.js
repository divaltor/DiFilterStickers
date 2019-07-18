const { performance} = require('perf_hooks');

module.exports = async (ctx, next) => {
    const date = performance.now();
    await next();
    const res = performance.now() - date;
    console.log(`Response time: ${res}`);
};