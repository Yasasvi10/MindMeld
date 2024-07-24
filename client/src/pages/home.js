import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="home max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Hello {user.usrname}</h1>
            <h1 className="text-3xl font-bold mb-4"> welcome to the home page!</h1>
            <p className="text-gray-700">We are glad to have you here.</p>
        </div>
    )
}

export default Home
