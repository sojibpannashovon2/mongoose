import { z } from 'zod'
import validator from 'validator'

// Define custom error messages
// const REQUIRED_ERROR = 'This field is required'
const MIN_LENGTH_ERROR = 'Minimum 20 characters required'
const MAX_LENGTH_ERROR = 'Maximum 20 characters required'
const CAPITALIZED_ERROR = 'First name must be capitalized'
const VALID_EMAIL_ERROR = 'Invalid email address'
const GENDER_ENUM_ERROR = 'Gender must be one of "male", "female", or "other"'
const BLOOD_GROUP_ENUM_ERROR = 'Invalid blood group'
const ALPHA_ERROR = 'Last name must contain only letters'

// UserName schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, MIN_LENGTH_ERROR)
    .max(20, MAX_LENGTH_ERROR)
    .refine(
      (val) => {
        const firstNameStr = val.charAt(0).toUpperCase() + val.slice(1)
        return firstNameStr === val
      },
      { message: CAPITALIZED_ERROR },
    ),

  middleName: z.string().min(1, MIN_LENGTH_ERROR),

  lastName: z
    .string()
    .min(1, MIN_LENGTH_ERROR)
    .refine((val) => validator.isAlpha(val), { message: ALPHA_ERROR }),
})

// Guardian schema
const guardianSchema = z.object({
  name: z.string().min(1, MIN_LENGTH_ERROR),
  relationship: z.string().min(1, MIN_LENGTH_ERROR),
  phoneNumber: z.string().min(1, MIN_LENGTH_ERROR),
  email: z
    .string()
    .optional()
    .refine((val) => !val || validator.isEmail(val), {
      message: VALID_EMAIL_ERROR,
    }),
})

// LocalGuardian schema
const localGuardianSchema = z.object({
  name: z.string().min(1, MIN_LENGTH_ERROR),
  relationship: z.string().min(1, MIN_LENGTH_ERROR),
  phoneNumber: z.string().min(1, MIN_LENGTH_ERROR),
  email: z
    .string()
    .optional()
    .refine((val) => !val || validator.isEmail(val), {
      message: VALID_EMAIL_ERROR,
    }),
  job: z.string().min(1, MIN_LENGTH_ERROR),
})

// Address schema
const addressSchema = z
  .object({
    street: z.string().min(1, MIN_LENGTH_ERROR),
    city: z.string().min(1, MIN_LENGTH_ERROR),
    state: z.string().min(1, MIN_LENGTH_ERROR),
    postalCode: z.string().min(1, MIN_LENGTH_ERROR),
  })
  .optional()

// Student schema
const studentSchema = z.object({
  id: z.string().min(1, MIN_LENGTH_ERROR),
  password: z.string().max(20, MIN_LENGTH_ERROR),
  name: userNameSchema,
  age: z.string().min(1, MIN_LENGTH_ERROR).max(20, MAX_LENGTH_ERROR),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: GENDER_ENUM_ERROR }),
  }),
  email: z
    .string()
    .min(1, MIN_LENGTH_ERROR)
    .refine((val) => validator.isEmail(val), { message: VALID_EMAIL_ERROR }),
  enrolledCourses: z.string().min(1, MIN_LENGTH_ERROR),
  enrollmentDate: z.string().min(1, MIN_LENGTH_ERROR),
  isActive: z.enum(['active', 'inactive', 'other']).default('active'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: BLOOD_GROUP_ENUM_ERROR }),
  }),
  address: addressSchema,
  phoneNumber: z.string().min(1, MIN_LENGTH_ERROR).optional(),
  guardian: guardianSchema,
  localGurdian: localGuardianSchema,
})

export default studentSchema
