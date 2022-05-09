import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNotification } from '../../../context/NotificationContext'
import sendEmailForForgotPassword from '../../../functions/User/forgotPassword'
import Button from '../../../styles/Button'
import InputStyle, { HelperTextStyle } from '../../../styles/Input'
import { Actions, FormStyle, Separator } from '../SignIn/style'
import { forgotPasswordValidation } from '../validations'

interface ForgotPasswordProps {
  setLogin: React.Dispatch<
    React.SetStateAction<'sign-in' | 'sign-up' | 'forgot-password'>
  >
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ setLogin }) => {
  const { createNotification } = useNotification()
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(forgotPasswordValidation),
    defaultValues: {
      email: ''
    }
  })

  const { mutate: mutateSendEmail, isLoading } = useMutation(
    sendEmailForForgotPassword,
    {
      onSuccess: () => {
        createNotification('success', 'Email sent successfully')
      },
      onError: (err: any) => {
        if (err?.response?.status === 400) {
          createNotification('error', 'Email not found')
        } else {
          createNotification('error', 'Something went wrong')
        }
      }
    }
  )

  const onSubmit = handleSubmit(data => {
    mutateSendEmail(data.email)
  })

  return (
    <>
      <FormStyle onSubmit={onSubmit}>
        <Controller
          control={control}
          defaultValue=""
          name="email"
          render={({ field }) => (
            <div>
              <InputStyle
                placeholder="Your email"
                {...field}
                isValid={!Boolean(errors.email)}
              />
              {Boolean(errors.email) && (
                <HelperTextStyle isError>
                  {errors.email?.message}
                </HelperTextStyle>
              )}
            </div>
          )}
        />
        <Button outlined={false} type="submit" loading={isLoading}>
          Send Email
        </Button>
      </FormStyle>
      <Separator>or</Separator>

      <Actions>
        <p>
          <a
            onClick={e => {
              e.preventDefault()
              setLogin('sign-up')
            }}
          >
            Dont have an <strong>account?</strong>
          </a>
        </p>

        <p>
          <a
            onClick={e => {
              e.preventDefault()
              setLogin('sign-in')
            }}
          >
            Already have an <strong>account?</strong>
          </a>
        </p>
      </Actions>
    </>
  )
}

export default ForgotPassword
