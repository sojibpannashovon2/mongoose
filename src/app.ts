import express, { Application, Request, Response } from 'express'
// const morgan = require("morgan");
const app: Application = express()

import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route'

//parser

app.use(express.json())

app.use(cors())

//application Routes
app.use('/api/v1/students', StudentRoute)
// app.use('/api/v1/students', StudentRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app

// console.log(process.cwd());
