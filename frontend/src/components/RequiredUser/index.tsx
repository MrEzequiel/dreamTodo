import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const RequiredUser: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isUser } = useUser()
  const location = useLocation()

  if (!isUser) {
    return <Navigate to="/register" state={{ from: location }} replace />
  }

  return children
}

export default RequiredUser
