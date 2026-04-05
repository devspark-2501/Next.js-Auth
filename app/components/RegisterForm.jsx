'use client'

import Link from "next/link"
import { useState } from "react"

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // temporary 

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !password || !email) {
            setError('All fields are necessary.');
            return;
        }

        try {
            const existRes = await fetch('/api/UserExist', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            });

            const existData = await existRes.json();

            if (existData.exists) {
                setError("User already exists");
                return;
            }

            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
            } else {
                setError(data.message || "User registration failed");
            }

        } catch (error) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Enter the Details</h1>

                <form onSubmit={HandleSubmit} className="flex flex-col gap-3">

                    <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                    />

                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                    />

                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />

                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className='text-sm mt-3 text-right' href="/">
                        Already have an account?
                        <span className="underline"> Login</span> 
                    </Link>

                </form> 
            </div>
        </div>
    )
}
