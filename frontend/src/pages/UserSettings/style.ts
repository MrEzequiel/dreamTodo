import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const UserSettingsContainer = styled.div`
  ${Container()}
  padding-bottom: 40px;
`

export const UserSettingsTitle = styled.h2`
  .link-to-home {
    font-weight: 700;
    color: #717171;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`

export const SettingsWrapper = styled.div`
  background-color: ${props => props.theme.colors.g1};
  margin-top: 40px;
  padding: 40px;
  border-radius: 20px 20px 5px 5px;
  box-shadow: rgb(0, 0, 0, 0.2) 0px 20px 30px;

  display: flex;
  flex-direction: column;

  & > * {
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 2px groove ${props => props.theme.colors.g2};
  }

  & > *:first-child {
    padding-top: 0;
  }

  & > *:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

export const SettingItemTitle = styled.h4`
  margin-bottom: 15px;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.g8};
  text-transform: uppercase;
`

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
