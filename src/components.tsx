import { useState, type ReactNode, type ComponentType } from 'react'
import type { Session } from '@supabase/supabase-js'
import { ArrowDown, ArrowRight, Bell, BookOpen, ChevronDown, ChevronRight, Code2, ExternalLink, Gamepad2, Hammer, Info, LockKeyhole, Menu, Play, Plus, Radio, Search, Settings, Shield, Sparkles, Target, Terminal, Trophy, Users, WandSparkles, X, type LucideProps } from 'lucide-react'
import type { Accent, IconName, LearningZone } from './types'
import { boardPosts, modules, portalAreas } from './data'

const iconMap: Record<IconName, ComponentType<LucideProps>> = {
  sparkles: Sparkles, book: BookOpen, target: Target, hammer: Hammer, users: Users, trophy: Trophy, arrow: ArrowRight, chevron: ChevronRight, menu: Menu, x: X, search: Search, bell: Bell, settings: Settings, play: Play, lock: LockKeyhole, radio: Radio, terminal: Terminal, code: Code2, gamepad: Gamepad2, plus: Plus, file: Code2, info: Info, external: ExternalLink, shield: Shield,
}

export function Icon({ name, size = 18, strokeWidth = 1.8, ...props }: { name: IconName } & LucideProps) {
  const Component = iconMap[name] ?? Sparkles
  return <Component size={size} strokeWidth={strokeWidth} {...props} />
}

export function Logo() {
  return <div className="pixel-logo"><span className="pixel-orb">0</span><span className="pixel-word">QWORTEX</span></div>
}

export function PixelBot({ mood = 'idle' }: { mood?: 'idle' | 'happy' | 'working' }) {
  return <div className={`pixel-bot pixel-bot-${mood}`} aria-hidden="true"><div className="bot-antenna" /><div className="bot-body"><div className="bot-screen"><i /><i /><i /></div><div className="bot-panel"><b /><b /><b /></div></div><div className="bot-feet"><i /><i /></div></div>
}

export function PixelSpark({ accent = 'yellow', size = 'normal' }: { accent?: Accent; size?: 'normal' | 'small' }) {
  return <span className={`pixel-spark spark-${accent} spark-${size}`} aria-hidden="true"><i /><i /><i /><i /></span>
}

export function Badge({ children, accent = 'yellow' }: { children: ReactNode; accent?: Accent }) {
  return <span className={`retro-badge badge-${accent}`}>{children}</span>
}

export function Button({ children, variant = 'primary', onClick, className = '', disabled = false }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; onClick?: () => void; className?: string; disabled?: boolean }) {
  return <button className={`retro-button button-${variant} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
}

export function userInitial(session: Session) {
  const metadata = session.user.user_metadata
  const identity = metadata.full_name ?? metadata.name ?? session.user.email ?? 'Q'
  return identity.trim().slice(0, 1).toUpperCase() || 'Q'
}

export function TopNav({ active, onNavigate, onSignOut, session }: { active: string; onNavigate: (path: string) => void; onSignOut: () => void; session: Session }) {
  const [open, setOpen] = useState(false)
  const navItems = [{ label: 'Learn', path: '/learn' }, { label: 'Practice', path: '/practice' }, { label: 'Build', path: '/build' }, { label: 'Community', path: '/community' }]
  return <header className="retro-topnav"><div className="nav-inner"><button className="mobile-nav-button" aria-label="Open navigation" onClick={() => setOpen(true)}><Icon name="menu" /></button><button className="brand-button" onClick={() => onNavigate('/')}><Logo /></button><nav className={`retro-nav-links ${open ? 'nav-open' : ''}`}>{navItems.map((item) => <button key={item.path} className={active === item.path ? 'nav-active' : ''} onClick={() => { onNavigate(item.path); setOpen(false) }}>{item.label}{item.label !== 'Build' && <ChevronDown size={14} />}</button>)}<button className="mobile-nav-close" aria-label="Close navigation" onClick={() => setOpen(false)}><Icon name="x" /></button></nav><div className="nav-actions"><button className="nav-icon" aria-label="Search"><Icon name="search" size={18} /></button><button className="nav-icon nav-bell" aria-label="Notifications"><Icon name="bell" size={18} /><span>1</span></button><button className="mini-avatar" onClick={() => onNavigate('/account')}>{userInitial(session)}</button><Button variant="ghost" onClick={onSignOut}>SIGN OUT</Button><Button variant="primary" onClick={() => onNavigate('/about')}>JOIN THE LAB</Button></div></div></header>
}

export function PageFrame({ children, active, onNavigate, onSignOut, session }: { children: ReactNode; active: string; onNavigate: (path: string) => void; onSignOut: () => void; session: Session }) {
  return <div className="retro-app"><TopNav active={active} onNavigate={onNavigate} onSignOut={onSignOut} session={session} /><main className="retro-main">{children}</main></div>
}

export function PageHeader({ kicker, title, description, right }: { kicker: string; title: string; description: string; right?: ReactNode }) {
  return <div className="retro-page-header"><div><div className="pixel-kicker"><span /> {kicker}</div><h1>{title}</h1><p>{description}</p></div>{right}</div>
}

export function EmptyPage({ kicker, title, description, accent = 'cyan', onNavigate }: { kicker: string; title: string; description: string; accent?: Accent; onNavigate: (path: string) => void }) {
  return <><PageHeader kicker={kicker} title={title} description={description} /><div className={`empty-terminal empty-${accent}`}><div className="terminal-bar"><span /><span /><span /><b>qwortex://{kicker.toLowerCase().replaceAll(' ', '_')}</b></div><div className="terminal-content"><div className="terminal-prompt"><span>guest@qwortex</span>:~$ open <strong>{kicker.toLowerCase()}</strong></div><div className="terminal-art"><PixelBot mood="working" /><div><p className="terminal-big">CONTENT<br /><em>INCOMING</em></p><p className="terminal-muted">This zone is being wired up.<br />Check back for the next build.</p></div></div><div className="terminal-prompt terminal-dim"><span>guest@qwortex</span>:~$ <i>awaiting_input...</i><b className="terminal-cursor" /></div></div><div className="terminal-actions"><Button variant="primary" onClick={() => onNavigate('/')}>Return to hub <Icon name="arrow" size={15} /></Button><Button variant="ghost" onClick={() => onNavigate('/about')}>Read the project brief <Icon name="external" size={14} /></Button></div></div></>
}

export function ZoneCard({ zone, onOpen, featured = false }: { zone: LearningZone; onOpen: (id: string) => void; featured?: boolean }) {
  return <button className={`zone-card zone-${zone.accent} ${featured ? 'zone-featured' : ''}`} onClick={() => onOpen(zone.id)}><div className="zone-card-top"><span className="zone-number">ZONE {zone.number}</span><Badge accent={zone.accent}>COMING SOON</Badge></div><div className="zone-art"><div className="zone-art-grid" /><div className="zone-pixel-icon"><Icon name={zone.icon} size={29} /></div><PixelSpark accent={zone.accent} size="small" /></div><div className="zone-copy"><span className="zone-tagline">{zone.tagline}</span><h3>{zone.title}</h3><p>{zone.description}</p></div><span className="zone-card-arrow"><Icon name="arrow" size={16} /></span></button>
}

export function ProfileCard({ onNavigate, session }: { onNavigate: (path: string) => void; session: Session }) {
  return <aside className="profile-card"><div className="profile-top"><div className="profile-avatar"><span>{userInitial(session)}</span><i /></div><div><h3>Your profile</h3><p>Student mode</p><button onClick={() => onNavigate('/account')}>Edit profile</button></div><button className="profile-more" aria-label="Profile settings" onClick={() => onNavigate('/account')}><Icon name="settings" size={16} /></button></div><div className="profile-status"><span className="status-light" /> LAB STATUS <b>READY</b></div><div className="profile-grid"><div><span>03</span><small>zones queued</small></div><div><span>∞</span><small>ideas ahead</small></div></div><Button variant="secondary" className="button-full" onClick={() => onNavigate('/dashboard')}>View console <Icon name="arrow" size={15} /></Button></aside>
}

export function BoardCard({ onNavigate }: { onNavigate: (path: string) => void }) {
  return <section className="board-section"><div className="section-line"><h2>JOIN THE COMMUNITY</h2><button onClick={() => onNavigate('/community')}>Go to community <Icon name="arrow" size={15} /></button></div><div className="board-grid">{boardPosts.map((post) => <article key={post.handle} className="board-post"><div className={`post-avatar post-${post.accent}`}>{post.handle.slice(0, 1).toUpperCase()}</div><div className="post-meta"><strong>{post.handle}</strong><span>· {post.time}</span><small>{post.channel}</small></div><p>{post.text}</p></article>)}</div></section>
}

export function Footer({ onNavigate }: { onNavigate: (path: string) => void }) {
  return <footer className="retro-footer"><div><Logo /><p>UNDERSTAND AI · USE AI · SHAPE THE FUTURE</p></div><div><button onClick={() => onNavigate('/about')}>ABOUT</button><button onClick={() => onNavigate('/about#references')}>REFERENCES</button><span>BUILD 0.1 · 2026</span></div></footer>
}

export function WelcomeBubble() {
  return <div className="welcome-wrap"><PixelBot mood="happy" /><div className="speech-bubble"><span className="bubble-caret" /><p>Welcome back! Ready to explore?</p><span className="bubble-scan">QWORTEX // HUB</span></div></div>
}

export { ArrowDown, ArrowRight, Gamepad2, WandSparkles }
