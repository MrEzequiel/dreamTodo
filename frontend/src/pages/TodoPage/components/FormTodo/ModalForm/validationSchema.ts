import * as yup from 'yup'

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters long')
    .max(50, 'Title must be at most 50 characters long'),

  decription: yup
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .max(500, 'Description must be at most 500 characters long')
})

export default validationSchema
