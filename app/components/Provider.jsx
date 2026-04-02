'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { FaGoogle, FaGithub } from "react-icons/fa"

export default function Provider() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p className="text-center mt-10">Checking session...</p>
    );
  }

  if (session) {
    return (
      <div className="grid place-items-center h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="shadow-xl p-6 rounded-2xl border border-gray-200 bg-white w-full max-w-sm text-center space-y-4">
          
          <h2 className="text-lg font-semibold">
            ✅ Logged in
          </h2>

          <p className="text-sm text-gray-600">
            {session.user?.email}
          </p>

          {session.user?.image && (
            <img
              src={session.user.image}
              alt="user"
              className="w-16 h-16 rounded-full mx-auto"
            />
          )}

          <button
            onClick={() => signOut()}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Sign Out
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="shadow-xl p-6 rounded-2xl border border-gray-200 bg-white w-full max-w-sm text-center space-y-5">

        <p className="text-gray-500 text-sm">
          Choose a provider to sign in
        </p>

        <div className="flex flex-col gap-3">
          
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition"
          >
            <FaGithub />
            Continue with GitHub
          </button>

        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

      </div>
    </div>
  )
}