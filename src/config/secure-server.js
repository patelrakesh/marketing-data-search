import https from "https"
import fs from "fs"

export default app => {
  const options = {
    cert: fs.readFileSync(process.env.CERT_FOLDER),
    key: fs.readFileSync(process.env.KEY_FOLDER)
  }
  return https.createServer(options, app)
}