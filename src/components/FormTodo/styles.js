import styled from 'styled-components'
import { Container } from '../../styles/LayoutComponents'

export const FormWrapper = styled.div`
  ${Container()}
`

export const FormStyle = styled.form`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 60px;
  border: 2px solid ${props => props.theme.colors.g1};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0 15px;

  transition: border-color 500ms, box-shadow 700ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    border-color: ${props => props.theme.colors.colorPrimary};
    box-shadow: 0 0 0 4px ${props => props.theme.colors.colorPrimary2};
  }
`

export const InputStyle = styled.input`
  order: 2;
  height: 100%;
  width: 100%;
  font-size: 1.8rem;
`

export const ButtonStyle = styled.button`
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.colorPrimary};
  border-radius: 10px;
  width: 30px;
  height: 30px;
  color: ${props => props.theme.colors.g1};
`
