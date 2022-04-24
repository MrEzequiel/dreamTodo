import { FC } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { LoadingWrapper } from './style'

interface LoadingIndicatorProps {
  size?: number
  color?: string
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ size = 20, color }) => {
  return (
    <LoadingWrapper>
      <VscLoading size={size} color={color} />
    </LoadingWrapper>
  )
}

export default LoadingIndicator
