import express from 'express'
import { StudentController } from './student.controller'
const router = express.Router()

router.post('/create-student', StudentController.createStudent)

router.get('/', StudentController.getAllStudentData)

router.get('/:studentId', StudentController.getSingleData)

router.delete('/:studentId', StudentController.deleteDataFromDatabase)

export const StudentRoute = router
