import { useState } from "react"
import { useSignup } from "../hooks/UseSignUp"

const Signup = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {signup,isLoading,error} = useSignup()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        await signup(username,email,password,confirmPassword) 
    }

    return(
        <form className="signup-form signup max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-4">Sign up</h3>
            <label className="block mb-2">Username:</label>
            <input 
                type="string" 
                onChange={(e) => setUsername(e.target.value)}  
                value = {username}  
                className="block w-full p-2 border rounded mb-4"  
            />
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
            <label className="block mb-2">Confirm Password:</label>
            <input 
                type="password" 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                value={confirmPassword} 
                className="block w-full p-2 border rounded mb-4"
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded" disabled={isLoading}>SignUp</button>
            {error && <div className="error text-red-500 mt-4">{error}</div>} 

        </form>
    )
}

export default Signup