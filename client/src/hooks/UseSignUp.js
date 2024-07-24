import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const useSignup = () => {
    const [error,setError] = useState(null)
    const [isLoading,setisLoading] = useState(null)
    const {dispatch} = UseAuthContext()

    const signup = async (username,email,password,confirmPassword) => {
        setisLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({username,email,password,confirmPassword})
        })

        const json = await response.json()

        if(!response.ok){
            setisLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload: json})
            setisLoading(false)
        }
    }

    return {signup,isLoading,error}
}

