import express from "express"

import fs from "fs"

import { validationResult } from "express-validator"

import {fileURLToPath} from "url"

import { join, dirname } from "path"

import { proofValidation } from "./validation"

const filePath = fileURLToPath(import.meta.url)

const directory = dirname(filePath)

const JSONpath = join(directory, "proof.json")

const proofRouter = express.Router()

const getProof = () => JSON.parse(fs.readFileSync(JSONpath)) 

const writeProof = content => fs.writeFileSync(JSONpath, JSON.stringify(JSONpath))

proofRouter.post("/", proofValidation, (err, req, res, next) => {
    try {
        const errors = validationResult(req)
        if(errors.isEmpty()) {
            const newProof = {...req.body, id: uniqid(), createdAt: new Date(), updatedAt: new Date() }

            const proofArray = getProof()

            proofArray.push(newProof)

            writeProof(proofArray)

            res.status(201).send(proofArray)
        } else {
            res.status(createHttpError(400, "Some errors occurred in request body", {errors}))
        }
        
    } catch (error) {
        next(error)
    }
})

export default proofRouter