import styled from 'styled-components'

export const FormWrapper = styled.form`
  margin-top: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  height: 60px;
  border: 2px solid #0e0e0e;
  border-radius: 10px;
  padding: 0 15px;

  transition: border-color 500ms, box-shadow 700ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    border-color: #1de;
    box-shadow: 0 0 0 4px rgba(17, 221, 238, 0.5);
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1de;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  color: #0e0e0e;
`
