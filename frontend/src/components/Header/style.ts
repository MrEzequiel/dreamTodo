import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const HeaderWrapper = styled.header`
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.colors.g1};
  margin-bottom: 40px;

  .button-login {
    border: 2px dotted ${props => props.theme.colors.colorPrimary};
    padding: 8px 16px;
    margin-left: 20px;
    font-weight: 300;
    color: ${props => props.theme.colors.g7};
    height: auto;
  }
`

export const HeaderStyle = styled.div`
  ${Container()}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  .right {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;
  }

  .left {
    display: flex;
    align-items: center;

    p {
      font-weight: 300;
      color: ${props => props.theme.colors.g7};
    }
  }
`

export const ButtonCollections = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${props => props.theme.colors.g3};
  border-radius: 3px;
  padding: 5px;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);

  svg {
    color: ${props => props.theme.colors.g6};
  }
`

export const ProfilePill = styled.div`
  margin-left: 10px;
  border-radius: 1000px;
  background: ${props => props.theme.colors.g2};
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 280px;
`

export const ProfilePillText = styled.p`
  font-weight: 300;
  font-size: 1.4rem;
  margin: 0 4px 0 8px;

  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
