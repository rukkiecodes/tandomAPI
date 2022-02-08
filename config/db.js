const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connect: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB
