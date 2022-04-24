import styled from 'styled-components'

export const LoadingWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    @keyframes rotate-loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    animation: rotate-loader 900ms cubic-bezier(1, 0.39, 0.17, 1) infinite;
  }
`
