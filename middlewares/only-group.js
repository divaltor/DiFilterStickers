module.exports = async (ctx, next) => {
    if (['supergroup', 'group'].includes(ctx.chat.type)) {
        return await next()
    }
};