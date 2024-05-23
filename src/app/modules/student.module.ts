import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<Guardian>({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
})

const localGurdianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  job: { type: String, required: true },
})

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,

  age: { type: String, required: true },
  gender: ['male', 'female'],
  email: { type: String, required: true },
  enrolledCourses: { type: String, required: true },
  enrollmentDate: { type: String, required: true },
  isActive: ['active', 'inactive'],
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  phoneNumber: { type: String, required: true },
  guardian: guardianSchema,
  localGurdian: localGurdianSchema,
})

const StudentModel = model<Student>('Student', studentSchema)

export default StudentModel
