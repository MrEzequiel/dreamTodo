import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/UserContext'
import routesPaths from '../../utils/routesPaths'

import InputStyle, { FileInputStyle, HelperTextStyle } from '../../styles/Input'
import Button from '../../styles/Button'
import Title from '../../styles/Title'

import { useNotification } from '../../context/NotificationContext'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  ImageWrapper,
  SettingItemTitle,
  SettingsWrapper,
  UserSettingsContainer,
  UserSettingsTitle
} from './style'
import RenderImageUser from '../../components/RenderImageUser'
import { FaUpload } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { putUser } from '../../functions/User/putUser'

const schema = yup.object().shape({
  name: yup.string().required('Username is required'),
  email: yup.string().required('Email is required').email('Email is invalid')
})

const UserSettings: FC = () => {
  const { createNotification } = useNotification()
  const {
    user: { user }
  } = useAuth()

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const [userImage, setUserImage] = useState<{
    file: File | null
    url: string | null
  }>({
    file: null,
    url: user?.imageURL || null
  })

  const { mutate, isLoading } = useMutation(putUser, {
    onSuccess: () => {
      createNotification('success', 'User settings updated')
    },
    onError: () => {
      createNotification('error', 'oops, something went wrong')
    }
  })

  const submit = handleSubmit(data => {
    const formData = new FormData()
    formData.append('id', user.id)
    formData.append('name', data.name)
    formData.append('email', data.email)
    if (userImage.file) formData.append('image', userImage.file)

    mutate({ data: formData })
  })

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setUserImage({ file: null, url: null })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      if (data) {
        setUserImage({
          file,
          url: data
        })
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <UserSettingsContainer>
      <UserSettingsTitle>
        <Title size="2.8rem" separator as="p">
          <Link to={routesPaths.collection} className="link-to-home">
            Home
          </Link>{' '}
          / Edit Profile
        </Title>
      </UserSettingsTitle>

      <SettingsWrapper as="form" onSubmit={submit}>
        <div>
          <SettingItemTitle>Image</SettingItemTitle>

          <ImageWrapper>
            <FileInputStyle style={{ margin: '0 30px 0 0', cursor: 'default' }}>
              {userImage.url ? (
                <RenderImageUser
                  url={userImage.url}
                  width="100%"
                  height="100%"
                />
              ) : (
                <FaUpload />
              )}
            </FileInputStyle>

            <Button color="primary" type="button" style={{ padding: 0 }}>
              <label style={{ padding: '8px 16px', cursor: 'pointer' }}>
                <input
                  type="file"
                  onChange={handleUploadImage}
                  style={{ display: 'none' }}
                />
                Edit
              </label>
            </Button>
            <Button
              outlined
              color="error"
              type="button"
              onClick={() =>
                setUserImage({
                  file: null,
                  url: null
                })
              }
            >
              Delete
            </Button>
          </ImageWrapper>
        </div>

        <div>
          <SettingItemTitle>Name</SettingItemTitle>
          <Controller
            name="name"
            control={control}
            defaultValue={user?.name}
            render={({ field }) => (
              <>
                <InputStyle
                  {...field}
                  type="text"
                  isValid={!Boolean(errors?.name)}
                  style={{ padding: '20px 10px', fontSize: '1.8rem' }}
                />
                {errors?.name && (
                  <HelperTextStyle isError>
                    {errors?.name?.message}
                  </HelperTextStyle>
                )}
              </>
            )}
          />
        </div>

        <div>
          <SettingItemTitle>Email</SettingItemTitle>
          <Controller
            name="email"
            defaultValue={user?.email}
            control={control}
            render={({ field }) => (
              <>
                <InputStyle
                  {...field}
                  type="email"
                  isValid={!Boolean(errors?.email)}
                  style={{ padding: '20px 10px', fontSize: '1.8rem' }}
                />
                {Boolean(errors?.email) && (
                  <HelperTextStyle isError>
                    {errors?.email.message}
                  </HelperTextStyle>
                )}
              </>
            )}
          />
        </div>

        <div>
          <Button type="submit" loading={isLoading}>
            Save Profile
          </Button>
        </div>
      </SettingsWrapper>
    </UserSettingsContainer>
  )
}

export default UserSettings
