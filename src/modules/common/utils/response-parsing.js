export default {
  generalResponse: controller => {
    return async (ctx, next) => {
      let result
      try {
        result = await controller(ctx, next)
      } catch (err) {
        console.log(err.message)
        ctx.throw(500, err)
      }
      ctx.type = 'json'
      ctx.body = result
    }
  }
}