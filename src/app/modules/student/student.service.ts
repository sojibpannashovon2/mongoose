import StudentModel from '../student.module'
import { Student } from './student.interface'

const createStudentDatabase = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getStudentData = async () => {
  const result = await StudentModel.find()
  return result
}
const getSingleStudentData = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

export const StudentService = {
  createStudentDatabase,
  getStudentData,
  getSingleStudentData,
}
