import * as s from './style'
import { FaCheckCircle } from 'react-icons/fa'

const EmptyTodo: React.FC = () => {
  return (
    <s.EmptyStyle>
      <FaCheckCircle size={30} />
      <p>You have no tasks :&#41;</p>
    </s.EmptyStyle>
  )
}

export default EmptyTodo
