import express from "express"

import fs from "fs"

// import { validationResult } from "express-validator"

import {fileURLToPath} from "url"

import { join, dirname } from "path"

import createHttpError from "http-errors"

import uniqid from "uniqid"

// import { proofValidation } from "./validation.js"

const filePath = fileURLToPath(import.meta.url)

const directory = dirname(filePath)

const JSONpath = join(directory, "proof.json")

const proofRouter = express.Router()

const getProof = () => JSON.parse(fs.readFileSync(JSONpath)) 

const writeProof = (content) => fs.writeFileSync(JSONpath, JSON.stringify(content))

proofRouter.post("/", (req,res,next) => {
    try {
        const proofArray = getProof()
        const newProof = {...req.body, id: uniqid(), createdAt: new Date()}
        proofArray.push(newProof)
        writeProof(proofArray)
        res.send(proofArray)
    } catch (error) {
        next(error)
    }
})

proofRouter.get("/", (req, res, next) => {
    try {
        const proofs = getProof()
        res.status(200).send(proofs)
    } catch (error) {
        next(error)
    }
})

proofRouter.put("/:id", (req,res,next) => {
    try {
        const proofArray= getProof()
        const index = proofArray.findIndex(proof => proof.id === req.params.id )
        const oldProof = proofArray[index]
        const newProof = {...oldProof, ...req.body}

        proofArray[index] = newProof
        writeProof(proofArray)

        res.send(proofArray)


        }
        catch (error) {
        next(error)
    }
})

proofRouter.delete("/:id", (req, res, next) => {
    try {
        const proofArray = getProof()
        const remainingProof = proofArray.filter(proof => proof.id !== req.params.id)
       writeProof(remainingProof)
       res.send(remainingProof)

    } catch (error) {
        next(error)
    }
})

export default proofRouter