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

//?Get All data from mongodb
const getStudentData = async () => {
  const result = await Student.find()
  return result
}

//? get single data from mongodb
const getSingleStudentData = async (id: string) => {
  // const result = await Student.findOne({ id })
  //? Here I have to apply aggregation Query
  const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}
//? Delete single data from MongoDb
const deleteStudentData = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentService = {
  createStudentDatabase,
  getStudentData,
  getSingleStudentData,
  deleteStudentData,
}
