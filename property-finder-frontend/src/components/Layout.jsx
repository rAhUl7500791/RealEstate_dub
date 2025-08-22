import { Link, useNavigate } from 'react-router-dom'
import { isAuthed, logout } from '../api/auth'

export default function Layout({ children }) {
  const nav = useNavigate()
  const authed = isAuthed()
  const username = localStorage.getItem('username')

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="font-semibold text-xl">🏠 Property Finder</Link>
          <nav className="flex gap-3 items-center">
            {authed ? (
              <>
                <Link to="/dashboard" className="btn">Dashboard</Link>
                <span className="text-sm text-slate-600">Hi, {username}</span>
                <button className="btn btn-primary" onClick={()=>{ logout(); nav('/login') }}>Logout</button>
              </>
            ):(
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container py-10">{children}</main>
      <footer className="border-t mt-16 py-6 text-center text-sm text-slate-500">
        Built with React + TailwindCSS · JWT auth
      </footer>
    </div>
  )
}
