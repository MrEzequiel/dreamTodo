import * as yup from 'yup'

export const registerValidation = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
})

export const forgotPasswordValidation = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
})
