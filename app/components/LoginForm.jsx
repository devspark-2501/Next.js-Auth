'use client'

import Link from "next/link"
import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const { data: session, status } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError("All fields are necessary.");
            return;
        }

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res.error) {
            setError("Invalid email or password");
            return;
        }

        router.push("/");
    };

    if (status === "loading") {
        return <p className="text-center mt-10">Checking session...</p>;
    }

    if (session) {
        return (
            <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 text-center">
                    <h1 className="text-xl font-bold mb-4">
                        ✅ Logged in as {session.user?.email}
                    </h1>

                    <button
                        onClick={() => signOut()}
                        className="bg-red-500 text-white px-6 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Enter the Details</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />

                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />

                    <button className="bg-green-600 text-white font-bold px-6 py-2">
                        Login
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className='text-sm mt-3 text-right' href="/register">
                        Don't have an account? 
                        <span className="underline"> Register</span> 
                    </Link>
                </form> 
            </div>
        </div>
    )
}