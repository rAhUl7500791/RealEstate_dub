import { useState } from 'react'
import { login } from '../api/auth'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Login(){
  const nav = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e)=>{
    const { name, value } = e.target
    setForm(prev=>({ ...prev, [name]: value }))
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await login(form)
      const next = location.state?.from || '/dashboard'
      nav(next)
    } catch (err){
      setError(err.response?.data ? JSON.stringify(err.response.data) : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto card p-8">
      <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
      <p className="text-slate-600 mb-6">Log in to your account</p>
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      <form onSubmit={onSubmit} className="grid gap-4">
        <div>
          <label className="label">Username</label>
          <input className="input" name="username" value={form.username} onChange={onChange} required />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" name="password" value={form.password} onChange={onChange} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
      </form>
      <p className="mt-4 text-sm">No account? <Link to="/signup" className="link">Sign up</Link></p>
    </div>
  )
}
