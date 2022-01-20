import { css } from 'styled-components'

export const Container = () => css`
  margin: 0 auto;
  max-width: ${props => props.theme.container};
  padding-left: 20px;
  padding-right: 20px;
`

export const SeparatorTitle = () => css`
  display: flex;
  align-items: center;

  &::before {
    content: '';
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.theme.colors.colorPrimary};
  }
`

export const FilledButton = () => css`
  background: ${props => props.theme.colors.colorPrimary};
  color: ${props => props.theme.colors.g1};
  font-weight: 500;
`

export const OutlinedButton = () => css`
  border: 2px solid ${props => props.theme.colors.colorPrimary2};
  color: ${props => props.theme.colors.g7};
`
