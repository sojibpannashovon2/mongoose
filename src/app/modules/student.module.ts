import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student/student.interface'
import validator from 'validator'

import bcrypt from 'bcrypt'
import config from '../config'

const userNameSchema = new Schema<TUserName, StudentModel>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, `Max Allowed Length is 20 Characters`],
    validate: {
      validator: function (VALUE: string) {
        const firstNameStr = VALUE.charAt(0).toUpperCase() + VALUE.slice(1)

        return firstNameStr === VALUE
      },
      message: `{VALUE} is not Capitilized form`,
    },
  },
  middleName: {
    type: String,
    required: [true, 'Middle name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],

    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: `{VALUE} is not define`,
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: {
    type: String,
    required: [true, `Email is Required`],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: `{VALUE} is not Valid Email`,
    },
  },
})

const localGurdianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  job: { type: String, required: true },
})

const studentSchema = new Schema<TStudent>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: {
    type: userNameSchema,
    required: true,
  },

  age: { type: String, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: `The Gender fill will be one of the "male", "female" or "others" `,
    },
    required: true,
  },
  email: { type: String, required: true },
  enrolledCourses: { type: String, required: true },
  enrollmentDate: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: `{VALUE} is not vaild`,
    },
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  phoneNumber: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGurdian: {
    type: localGurdianSchema,
    required: true,
  },
})

//? pre save middlware/  hook: wil work on
//? create() , save() before new data create

studentSchema.pre('save', async function (next) {
  console.log(this, `pre hook: firstly save data`)
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt))
  next()
})

//?post save middleware / hook

studentSchema.post('save', function () {
  console.log(this, `Post hook: after saveing previous data`)
})

//! statics Method

studentSchema.statics.isUserExists = async function (id: string) {
  const existsUser = await Student.findOne({ id: id })
  return existsUser
}

//! Instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id })
//   return existingUser
// }

const Student = model<TStudent, StudentModel>('Student', studentSchema)

export default Student
