import { useState } from 'react'
import { register } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
  const nav = useNavigate()
  const [form, setForm] = useState({ username:'', email:'', password:'', is_agent:false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e)=>{
    const { name, value, type, checked } = e.target
    setForm(prev=>({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await register(form)
      nav('/login')
    } catch (err){
      setError(err.response?.data ? JSON.stringify(err.response.data) : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto card p-8">
      <h2 className="text-2xl font-semibold mb-1">Create your account</h2>
      <p className="text-slate-600 mb-6">Register to continue</p>
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      <form onSubmit={onSubmit} className="grid gap-4">
        <div>
          <label className="label">Username</label>
          <input className="input" name="username" value={form.username} onChange={onChange} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" name="email" value={form.email} onChange={onChange} required />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" name="password" value={form.password} onChange={onChange} required />
        </div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="is_agent" checked={form.is_agent} onChange={onChange} />
          <span className="text-sm">I am an agent</span>
        </label>
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="link">Log in</Link></p>
    </div>
  )
}
