import React, { useEffect, useState } from 'react'

interface IType {
  regex: RegExp
  message: string
}

interface IValidations {
  [type: string]: IType
}

interface IUseFormProps {
  required?: boolean
  initialValue?: string
  type?: string | false
  customValidate?: (value: string) => string | null
}

const validations: IValidations = {
  link: {
    regex:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
    message: 'Link invalid'
  },

  email: {
    regex:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email invalid'
  }
}

const useForm = (objValidation?: IUseFormProps) => {
  objValidation = objValidation ?? {
    required: true,
    initialValue: '',
    type: false,
    customValidate: undefined
  }
  const { customValidate, initialValue, required, type } = objValidation

  const [value, setValue] = useState(initialValue ?? '')
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setIsValid(error === null ? true : false)
  }, [error])

  const validate = (value: string) => {
    if (customValidate) {
      setError(customValidate(value))
      return !customValidate(value)
    }

    if (required && !value.trim()) {
      setError('Fill this field')
      return false
    } else if (type && !validations[type].regex.test(value)) {
      setError(validations[type].message)
      return false
    }

    setError(null)
    return true
  }

  const handleChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (error) {
      validate(target.value)
    }

    setValue(target.value)
  }

  const handleBlur = () => {
    validate(value)
  }

  return { value, setValue, error, handleChange, handleBlur, validate, isValid }
}

export default useForm
