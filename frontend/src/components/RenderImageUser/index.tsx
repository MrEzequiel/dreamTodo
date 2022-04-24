import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RenderImageCover } from './style'

interface IRenderImageUser {
  fashion?: React.CSSProperties
  width?: number | string
  height?: number | string
  url?: string
  alt?: string
}

const RenderImageUser: React.FC<IRenderImageUser> = ({
  fashion,
  width = 40,
  height = 40,
  alt,
  url
}) => {
  const [iconPlaceholder, setIconPlaceholder] = useState(!url)

  const handleImageError = () => {
    setIconPlaceholder(true)
  }

  return (
    <RenderImageCover width={width} height={height} style={fashion}>
      {iconPlaceholder ? (
        <FaUser />
      ) : (
        <img onError={handleImageError} alt={alt} src={url} />
      )}
    </RenderImageCover>
  )
}

export default RenderImageUser
