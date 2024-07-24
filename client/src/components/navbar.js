import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/UseLogout'
import { UseAuthContext } from '../hooks/UseAuthContext'

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = UseAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className="bg-gray-100 text-white p-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          <h1 className="text-blue-500">MERN AUTH</h1>
        </Link>
        <nav>
          {user && (
            <div className="flex items-center">
            <span className="mr-4">{user.username}</span>
            <button onClick={handleClick} className="bg-blue-500 px-4 py-2 rounded">Log Out</button>
            </div>
          )}
          {!user && (
            <div className="flex space-x-4">
            <Link to = "/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
            <Link to = "/signup" className="bg-blue-500 px-4 py-2 rounded">Signup</Link>
            </div>
          )}  
        </nav>
      </div>
    </header>
  )
}

export default Navbar