import mongoose from 'mongoose'

export default {
  connectMongo: () => {
    mongoose.connect(process.env.MONGO_AUTH_CONNECTION_URL_DATA,
      {
        reconnectTries: 20,
        reconnectInterval: 1000,
        useNewUrlParser: true
      })
      .then(() =>
        console.log("Mongo connected")
        //winston.info("Mongo connected")
      )
      .catch(err =>
        console.log(err)
        //winston.error(err);
      )
  }
}