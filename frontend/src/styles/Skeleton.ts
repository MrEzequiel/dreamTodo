import styled from 'styled-components'

interface ISkeletonProps {
  width?: number
  height?: number
  variant?: 'circle' | 'rectangle'
}

export const Skeleton = styled.div<ISkeletonProps>`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => (props.height ? `${props.height}px` : '100%')};
  background: linear-gradient(
    90deg,
    #313131 20%,
    #323232 28%,
    #383838 35%,
    #343434 42%,
    #353535 50%
  );
  background-size: 300% 100%;
  will-change: background-position;
  border-radius: ${props => (props.variant === 'circle' ? '50%' : '2px')};
  border: 2px solid ${props => props.theme.colors.g3};

  @keyframes skeleton-animation {
    0% {
      background-position: 100% 0%;
    }

    70% {
      background-position: -50% 0%;
    }

    100% {
      background-position: -50% 0%;
    }
  }

  animation: skeleton-animation 1.7s infinite ease;
`
