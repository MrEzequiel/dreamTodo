import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/UserContext'

const RequiredUser: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isUser } = useAuth()
  const location = useLocation()

  if (!isUser) {
    return <Navigate to="/register" state={{ from: location }} replace />
  }

  return children
}

export default RequiredUser
