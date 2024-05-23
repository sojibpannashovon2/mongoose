export type Guardian = {
  name: string
  relationship: string
  phoneNumber: string
  email?: string
}
export type LocalGuardian = {
  name: string
  relationship: string
  phoneNumber: string
  email?: string
  job: string
}

type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type Student = {
  id: string
  name: UserName

  age: string
  gender: 'male' | 'female'
  email: string
  enrolledCourses: string
  enrollmentDate: string
  isActive: 'active' | 'inactive'
  bloodGroup: BloodGroup
  address?: {
    street: string
    city: string
    state: string
    postalCode: string
  }
  phoneNumber?: string
  guardian: Guardian
  localGurdian: LocalGuardian
}
