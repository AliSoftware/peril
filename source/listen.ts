import chalk from "chalk"
import * as express from "express"

import { createServer } from "http"
import * as Primus from "primus"
import { setupPublicWebsocket } from "./api/api"
import { PUBLIC_API_ROOT_URL } from "./globals"
import logger from "./logger"

export let primus: any = null

export const startApp = (app: express.Express, callback: any) => {
  // Skip primus setup
  if (!PUBLIC_API_ROOT_URL) {
    app.listen(app.get("port"), callback)
    logger.info("")
    return
  }

  const httpServer = createServer(app as any)

  primus = new Primus(httpServer, { transformer: "websockets", iknowclusterwillbreakconnections: true })
  setupPublicWebsocket()

  // Call engine.listen instead of app.listen(port)
  app.listen(app.get("port"), () => {
    callback()

    const tick = chalk.bold.greenBright("✓")
    logger.info("  - " + tick + " Primus Sockets")
  })
}
