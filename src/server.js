import express from "express";

import listEndpoints from "express-list-endpoints"

import proofRouter from "./proof/index.js";

import cors from "cors"

// import { errorHandler } from "./errorHandler.js";

const server = express()

const port = 3001

server.use(express.json())

server.use(cors())

server.use("/proof", proofRouter)

// server.use(errorHandler)

console.table(listEndpoints(server))

server.listen(port, () => {
    console.log("🟢 Server is listening on port: ", port)
})

server.on("error", (err) => {
    console.log("🔴 Server is not running due to: ", err)
})