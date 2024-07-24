import { useState } from "react"
import { useLogin } from "../hooks/UseLogin"

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {login,isLoading,error} = useLogin()
    const handleSubmit = async(e) =>{
        e.preventDefault()
        await login(email,password)
    }

    return(
        <form className="login-form max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-4">Login</h3>
            <label className="block mb-2">Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}  
                value = {email}   
                className="block w-full p-2 border rounded mb-4" 
            />
            <label className="block mb-2">Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}  
                value = {password}  
                className="block w-full p-2 border rounded mb-4"  
            />
            <button disabled={isLoading}  className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300">Login</button>
            {error && <div className="error text-red-500 mt-4">{error}</div>} 
        </form>
    )
}

export default Login