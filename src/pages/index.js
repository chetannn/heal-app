import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
   <div className="text-center py-10">
      <h3 className="text-gray-700 mb-4">Welcome</h3>

      <Link href="/auth/login">
        <a className="text-blue-600">Login</a>
      </Link>
      <Link href="/auth/register">
        <a className="ml-4 text-blue-600">Register</a>
      </Link>
    </div>
  )
}
