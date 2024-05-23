import { Response, Request } from 'express'

import { StudentService } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    //?Will call the service functon to send this data

    const result = await StudentService.createStudentDatabase(studentData)

    //? send response to route

    res.status(200).json({
      success: true,
      message: 'Student is created Successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllStudentData = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getStudentData()

    res.status(200).json({
      success: true,
      message: 'Data Retrive Successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleData = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params

    const result = await StudentService.getSingleStudentData(studentId)

    res.status(200).json({
      success: true,
      message: 'Single Data Retrive Successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentController = {
  createStudent,
  getAllStudentData,
  getSingleData,
}
