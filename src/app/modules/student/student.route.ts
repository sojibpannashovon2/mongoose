import express from 'express'
import { StudentController } from './student.controller'
const router = express.Router()

router.post('/create-student', StudentController.createStudent)

router.get('/', StudentController.getAllStudentData)

router.get('/:studentId', StudentController.getSingleData)

export const StudentRoute = router
