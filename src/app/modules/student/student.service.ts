import Student from '../student.module'
import { TStudent } from './student.interface'

const createStudentDatabase = async (studentData: TStudent) => {
  //! Statics Method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User Already Exists')
  }
  //?built in static method used here
  const result = await Student.create(studentData)

  //!create own instance
  // const student = new Student(studentData)

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User Already Exists')
  // }

  // const result = await student.save()

  return result
}

const getStudentData = async () => {
  const result = await Student.find()
  return result
}
const getSingleStudentData = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

export const StudentService = {
  createStudentDatabase,
  getStudentData,
  getSingleStudentData,
}
