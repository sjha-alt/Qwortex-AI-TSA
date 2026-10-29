import { useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Mail } from 'lucide-react'
import { supabase } from './lib/supabase'
import { Button, Logo, PixelBot } from './components'

export function AuthPage() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submitEmail = async (event: FormEvent) => {
    event.preventDefault()
    if (!supabase) {
      setError('Authentication is not configured. Add the Supabase environment variables and restart the app.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')
    const result = mode === 'sign-in'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (result.error) {
      setError(result.error.message)
    } else if (mode === 'sign-up' && !result.data.session) {
      setMessage('Account created. Check your email to confirm your address, then sign in.')
    }
  }

  const signInWithProvider = async (provider: 'google' | 'github') => {
    if (!supabase) {
      setError('Authentication is not configured. Add the Supabase environment variables and restart the app.')
      return
    }

    setLoading(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    })
    if (authError) {
      setLoading(false)
      setError(authError.message)
    }
  }

  return <main className="auth-page">
    <div className="auth-art"><PixelBot mood="happy" /><div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" /></div>
    <section className="auth-card">
      <Logo />
      <div className="pixel-kicker"><span /> QWORTEX // ACCESS</div>
      <h1>{mode === 'sign-in' ? 'Welcome back.' : 'Join the lab.'}</h1>
      <p className="auth-intro">{mode === 'sign-in' ? 'Sign in to continue your AI learning journey.' : 'Create your account and start exploring Qwortex.'}</p>
      <div className="auth-providers">
        <Button variant="secondary" onClick={() => signInWithProvider('google')} disabled={loading}><Mail size={17} /> Continue with Google</Button>
        <Button variant="secondary" onClick={() => signInWithProvider('github')} disabled={loading}><span aria-hidden="true">GH</span> Continue with GitHub</Button>
      </div>
      <div className="auth-divider"><span>OR USE EMAIL</span></div>
      <form className="auth-form" onSubmit={submitEmail}>
        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label>
        <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" minLength={6} required /></label>
        <Button variant="primary" disabled={loading}>{loading ? 'CONNECTING...' : mode === 'sign-in' ? 'SIGN IN' : 'CREATE ACCOUNT'}</Button>
      </form>
      {error && <p className="auth-message auth-error">{error}</p>}
      {message && <p className="auth-message auth-success">{message}</p>}
      <button className="auth-switch" onClick={() => { setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in'); setError(''); setMessage('') }}>
        {mode === 'sign-in' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
      </button>
    </section>
  </main>
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  return { session, checking }
}
