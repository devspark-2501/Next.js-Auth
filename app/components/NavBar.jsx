import Link from "next/link"

export default function NavBar() {
    return (
        <div className="bg-gray-100 p-4 flex gap-4">
            <Link 
                href="/Auth"
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
                Provider OAuth
            </Link>
            <Link 
                href="/"
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
                Credential
            </Link>
        </div>
    )
}