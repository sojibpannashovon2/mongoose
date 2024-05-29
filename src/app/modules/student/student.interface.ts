import { Model } from 'mongoose'

export type TGuardian = {
  name: string
  relationship: string
  phoneNumber: string
  email?: string
}
export type TLocalGuardian = {
  name: string
  relationship: string
  phoneNumber: string
  email?: string
  job: string
}

type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type TUserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TStudent = {
  id: string

  password: string
  name: TUserName

  age: string
  gender: 'male' | 'female' | 'other'
  email: string
  enrolledCourses: string
  enrollmentDate: string
  isActive: 'active' | 'inactive' | 'other'
  bloodGroup: BloodGroup
  address?: {
    street: string
    city: string
    state: string
    postalCode: string
  }
  phoneNumber?: string
  guardian: TGuardian
  localGurdian: TLocalGuardian
}

//! Statics method

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

//! instance method
// export type StudentMethods = {

//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >
