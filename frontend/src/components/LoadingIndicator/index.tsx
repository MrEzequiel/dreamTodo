import { FC } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { LoadingWrapper } from './style'

interface LoadingIndicatorProps {
  size?: number
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ size = 20 }) => {
  return (
    <LoadingWrapper>
      <VscLoading size={size} />
    </LoadingWrapper>
  )
}

export default LoadingIndicator
