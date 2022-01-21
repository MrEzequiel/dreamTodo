import styled from 'styled-components'

export const FormStyle = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .sign-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: none;
    height: 45px;
  }
`

export const InputStyle = styled.input`
  height: 45px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.colors.g2};
  font-size: 1.8rem;
`

export const Separator = styled.p`
  color: ${props => props.theme.colors.g1};
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 10px 0;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    border-radius: 1px;
    background: linear-gradient(
      to left,
      ${props => props.theme.colors.g1},
      ${props => props.theme.colors.g3}
    );
  }

  &::after {
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.g1},
      ${props => props.theme.colors.g3}
    );
  }
`
