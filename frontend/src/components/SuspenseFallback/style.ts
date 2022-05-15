import styled from 'styled-components'

export const SuspenseFallbackWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 480px;
  height: 80vh;
  gap: 8px;
  padding: 0 20px;
  margin: 0 auto;

  @keyframes checkmark {
    0% {
      stroke-dashoffset: 100px;
    }

    100% {
      stroke-dashoffset: 0px;
    }
  }

  .todo-svg {
    animation: checkmark 1.2s ease 0.7s infinite alternate;
  }
`
