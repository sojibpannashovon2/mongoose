import express, { Application, Request, Response } from 'express'
// const morgan = require("morgan");
const app: Application = express()

import cors from 'cors'

//parser

app.use(express.json())

app.use(cors())

//midleware

// app.use(morgan());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app

// console.log(process.cwd());
