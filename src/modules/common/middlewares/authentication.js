/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken'
const specialAuthString = 'bf7fedbe-970b-418c-8645-d39c824baf20'

export default {

  verifyToken: () => {
    return async (ctx, next) => {
      let token = ctx.headers['authorization']
      if (token) {
        let verifySecret
        
          verifySecret = process.env.PITCHDB_SERVER_SECRET
        
        try {
          ctx.decoded = jwt.verify(token.split(" ")[1], verifySecret)
        } catch (err) {
          ctx.throw(401, 'invalid token');
        }
        await next();
      } else {
        ctx.throw(400, 'token required');
      }
    }
  },

  verifySpecialAuthString: () => {
    return async (ctx, next) => {
      let authString = ctx.headers['authorization']
      if (authString === specialAuthString) {
        await next();
      } else {
        ctx.throw(400, 'auth string required');
      }
    }
  },

  verifyPrivileges: () => {
    return async (ctx, next) => {
      let path = ctx.path
      let userPrivileges = ctx.decoded ? ctx.decoded.privileges.split(',') : [];
      
      if (path.startsWith('/api/businesses/public')) {
        if (userPrivileges.includes('betaUser') || userPrivileges.includes('superAdmin')) {
          await next();
        } else {
          ctx.throw(403, 'insufficent privileges');
        }        
      } 
    }
  }
}