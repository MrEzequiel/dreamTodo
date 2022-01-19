import styled from 'styled-components'

export const NotFoundStyle = styled.div`
  height: 80vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 7.2rem;
    color: ${props => props.theme.colors.colorPrimary};
  }

  p {
    font-size: 1.8rem;

    a {
      color: ${props => props.theme.colors.colorPrimary2};

      &:hover {
        color: ${props => props.theme.colors.colorPrimary};
        text-decoration: underline;
      }
    }
  }
`
