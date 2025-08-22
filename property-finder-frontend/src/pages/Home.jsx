import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="grid gap-6">
      <div className="card p-8">
        <h1 className="text-3xl font-semibold mb-2">Find your next place</h1>
        <p className="text-slate-600 mb-6">Sign up or log in to access the dashboard and manage properties.</p>
        <div className="flex gap-3">
          <Link to="/signup" className="btn btn-primary">Create account</Link>
          <Link to="/login" className="btn">I already have an account</Link>
        </div>
      </div>
    </div>
  )
}
