import React, { useState } from 'react'

interface IType {
  regex: RegExp
  message: string
}

interface IValidations {
  [type: string]: IType
}

const validations: IValidations = {
  link: {
    regex:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
    message: 'Link invalid'
  }
}

const useForm = (
  required = true,
  initialValue?: string,
  type?: string | false,
  customValidate?: (value: string) => string | null
) => {
  const [value, setValue] = useState(initialValue ?? '')
  const [error, setError] = useState<string | null>('')

  function validate(value: string) {
    if (type === false) return true

    if (required && !value.trim()) {
      setError('Fill this field')
      return false
    } else if (type && !validations[type].regex.test(value)) {
      setError(validations[type].message)
      return false
    } else {
      setError(null)
      return true
    }
  }

  function handleChange({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (error) {
      if (customValidate) {
        const customError = customValidate(value)
        setError(customError)
      } else {
        validate(target.value)
      }
    }
    setValue(target.value)
  }

  function handleBlur() {
    if (customValidate) {
      const customError = customValidate(value)
      setError(customError)
    } else {
      validate(value)
    }
  }

  return { value, setValue, error, handleChange, handleBlur, validate }
}

export default useForm
