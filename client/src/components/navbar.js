import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/UseLogout'
import { UseAuthContext } from '../hooks/UseAuthContext'

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = UseAuthContext()

  const handleClick = () => {
    logout()
  }
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-gray-100 text-white p-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          <div class="flex items-center space-x-2" id="el-sxaldwdd">
                        <svg class="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" id="el-vl0pvwm4">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4z" id="el-7nt46ftk"></path>
                        </svg>
                        <span class="text-xl font-bold text-indigo-800" id="el-rnpxoqiw">MindMeld</span>
          </div>
        </Link>
        <nav>
          {user && (
            <div className="flex items-center">
            <button onClick={() => handleScroll("analytics")} className="text-gray-600 hover:text-gray-800">
                 Analytics
            </button>
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