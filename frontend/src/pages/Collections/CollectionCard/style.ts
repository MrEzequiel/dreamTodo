import styled from 'styled-components'

export const CollectionCardWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
`

export const EmptyCollection = styled.div`
  margin: 0 auto;
  width: max-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  @keyframes anime-up {
    from {
      opacity: 0;
      transform: translateY(-40px);
    }
    to {
      opacity: initial;
      transform: initial;
    }
  }

  animation: anime-up 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  svg {
    color: ${props => props.theme.colors.colorPrimary};
  }

  p {
    color: ${props => props.theme.colors.g7};
    text-align: center;

    a {
      color: ${props => props.theme.colors.colorPrimary2};

      &:hover {
        color: ${props => props.theme.colors.colorPrimary};
        text-decoration: underline;
      }
    }
  }
`
