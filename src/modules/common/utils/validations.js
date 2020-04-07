/* eslint-disable linebreak-style */
const strMinMax = { min: 0, max: 100 };

export default {
    checkKeywords: () => {
        return async (ctx, next) => {
            let keywords = ctx.query.keywords
            
            if (keywords && keywords.length > strMinMax.max) {
                ctx.throw(400, 'Too long');
            } else {
                await next();        
            }
          }
    }
}