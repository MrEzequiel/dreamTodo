import styled, { css } from 'styled-components'

export const CollectionCardWrapper = styled.div<{ isFetching: boolean }>`
  opacity: 1;
  position: relative;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;

  transition: all 500ms ease;

  ${({ isFetching }) =>
    isFetching &&
    css`
      opacity: 0.5;
      pointer-events: none;

      & > * {
        pointer-events: none;
      }
    `}
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);

  @keyframes show-up {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px) scale(0.9);
    }

    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  animation: show-up 0.3s ease-in-out forwards;

  svg {
    color: ${({ theme }) => theme.colors.colorPrimary};
  }
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
