import { useEffect, useState } from 'react'
import { AboutPage, AchievementsPage, AccountPage, BuildPage, CommunityPage, DashboardPage, HomePage, LearnPage, NotFound, PracticePage, ZonePage } from './pages'
import { PageFrame, PixelBot } from './components'
import type { ModuleId } from './types'
import { AuthPage, useSession } from './auth'
import { supabase } from './lib/supabase'

function currentPath() {
  if (window.location.protocol === 'file:') {
    const localRoute = window.location.hash.slice(1).split('#')[0]
    return localRoute.startsWith('/') ? localRoute : '/'
  }
  const raw = window.location.pathname.replace(/\/$/, '')
  return raw || '/'
}

export default function App() {
  const [path, setPath] = useState(currentPath)
  const { session, checking } = useSession()

  useEffect(() => {
    const onPopState = () => setPath(currentPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (next: string) => {
    const [clean, hash] = next.split('#')
    if (window.location.protocol === 'file:') {
      window.history.pushState({}, '', `${window.location.pathname}#${clean}${hash ? `#${hash}` : ''}`)
    } else {
      window.history.pushState({}, '', next)
    }
    setPath(clean)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  if (checking) return <div className="auth-loading"><PixelBot mood="working" /></div>
  if (!session) return <AuthPage />

  let content = <HomePage onNavigate={navigate} session={session} />
  if (path === '/learn') content = <LearnPage onNavigate={navigate} />
  else if (path === '/practice') content = <PracticePage onNavigate={navigate} />
  else if (path === '/build') content = <BuildPage onNavigate={navigate} />
  else if (path === '/community') content = <CommunityPage onNavigate={navigate} />
  else if (path === '/dashboard') content = <DashboardPage onNavigate={navigate} session={session} />
  else if (path === '/account') content = <AccountPage session={session} onNavigate={navigate} onSignOut={() => supabase?.auth.signOut()} />
  else if (path === '/achievements') content = <AchievementsPage onNavigate={navigate} />
  else if (path === '/about') content = <AboutPage onNavigate={navigate} />
  else if (path.startsWith('/module/')) content = <ZonePage moduleId={path.split('/')[2] as ModuleId} onNavigate={navigate} />
  else if (path !== '/') content = <NotFound onNavigate={navigate} />

  const active = path === '/' ? '/' : path.startsWith('/module/') ? '/learn' : path
  return <PageFrame active={active} onNavigate={navigate} onSignOut={() => supabase?.auth.signOut()} session={session}>{content}</PageFrame>
}
