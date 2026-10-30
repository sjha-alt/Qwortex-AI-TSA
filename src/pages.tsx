import { useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { ArrowDown, ArrowRight, ChevronRight, Code2, Gamepad2, Radio, Sparkles, Terminal } from 'lucide-react'
import { getModule, modules } from './data'
import type { Accent, ModuleId } from './types'
import { Badge, BoardCard, Button, EmptyPage, Footer, Icon, PageHeader, PixelBot, PixelSpark, ProfileCard, WelcomeBubble, ZoneCard } from './components'

export function HomePage({ onNavigate, session }: { onNavigate: (path: string) => void; session: Session | null }) {
  return <><div className="dashboard-layout"><section className="dashboard-main"><WelcomeBubble /><div className="jump-heading"><div><div className="pixel-kicker"><span /> JUMP BACK IN</div><h1>Choose your <em>next zone.</em></h1></div><span className="tiny-status"><i /> HUB ONLINE</span></div><div className="featured-zone"><div className="featured-art"><div className="feature-cloud cloud-a" /><div className="feature-cloud cloud-b" /><div className="feature-sun" /><div className="feature-mountains" /><div className="feature-platform platform-a" /><div className="feature-platform platform-b" /><div className="feature-portal"><span>?</span></div><PixelBot mood="idle" /></div><div className="featured-overlay"><Badge accent="yellow">START HERE</Badge><span className="feature-label">THE AI LEARNING PORTAL</span><h2>Qwortex<br /><em>Foundations</em></h2><p>A blank canvas for the ideas, tools, and choices ahead.</p><Button variant="primary" onClick={() => onNavigate('/learn')}>Enter the lab <Icon name="arrow" size={15} /></Button></div><div className="featured-footer"><span><i /> ZONES QUEUED: 03</span><span>BUILD 0.1</span></div></div><section className="zone-section"><div className="section-line"><h2>EXPLORE THE LAB</h2><button onClick={() => onNavigate('/learn')}>View all zones <Icon name="arrow" size={15} /></button></div><div className="zone-grid">{modules.map((zone) => <ZoneCard key={zone.id} zone={zone} onOpen={(id) => onNavigate(`/module/${id}`)} />)}</div></section><BoardCard onNavigate={onNavigate} /></section><aside className="dashboard-side"><ProfileCard onNavigate={onNavigate} session={session} /><div className="notice-card"><div className="notice-head"><span><Radio size={14} /> NOTICE BOARD</span><button aria-label="Open notices"><ChevronRight size={16} /></button></div><div className="notice-art"><div className="notice-star">✦</div><span>THE NEXT BUILD</span><strong>Qwortex<br />is charging.</strong><small>We are preparing the next room.</small></div><button className="notice-link" onClick={() => onNavigate('/about')}>Read the brief <Icon name="arrow" size={14} /></button></div><div className="side-console"><span className="pixel-kicker"><span /> QUICK ACCESS</span><button onClick={() => onNavigate('/practice')}><Icon name="target" size={16} /><span>Practice room</span><Icon name="chevron" size={14} /></button><button onClick={() => onNavigate('/build')}><Icon name="hammer" size={16} /><span>Build station</span><Icon name="chevron" size={14} /></button><button onClick={() => onNavigate('/achievements')}><Icon name="trophy" size={16} /><span>Badge vault</span><Icon name="chevron" size={14} /></button></div></aside></div><Footer onNavigate={onNavigate} /></>
}

export function LearnPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return <><PageHeader kicker="LEARN // ZONES" title="Pick a direction." description="The lab is empty on purpose. These are the three spaces we will build together." right={<Badge accent="purple">CONTENT QUEUED: 0%</Badge>} /><div className="learn-console"><div className="console-header"><span><Terminal size={14} /> qwortex://learn</span><span>3 zones detected</span></div><div className="zone-list">{modules.map((zone) => <ZoneCard key={zone.id} zone={zone} onOpen={(id) => onNavigate(`/module/${id}`)} featured />)}</div></div><div className="page-note"><PixelSpark accent="cyan" /><p><strong>Next build:</strong> the signal map, interactive rooms, and creative tools will land here when you are ready to add content.</p></div><Footer onNavigate={onNavigate} /></>
}

export function ZonePage({ moduleId, onNavigate }: { moduleId: ModuleId; onNavigate: (path: string) => void }) {
  const zone = getModule(moduleId)
  if (!zone) return <NotFound onNavigate={onNavigate} />
  return <><button className="retro-back" onClick={() => onNavigate('/learn')}><Icon name="arrow" size={15} style={{ transform: 'rotate(180deg)' }} /> BACK TO ZONES</button><div className={`zone-empty zone-empty-${zone.accent}`}><div className="zone-empty-top"><Badge accent={zone.accent}>ZONE {zone.number}</Badge><span className="zone-coordinates">00.00° / 00.00°</span></div><div className="zone-empty-center"><div className="giant-zone-icon"><Icon name={zone.icon} size={45} /></div><div><div className="pixel-kicker"><span /> CONTENT SLOT</div><h1>{zone.title}</h1><p>{zone.description}</p></div></div><div className="zone-empty-bottom"><span><i /> STATUS: RESERVED</span><span>SLOTS: 00</span><span>SYNC: --</span></div></div><div className="blank-module-grid"><div><span className="pixel-kicker"><span /> CONTENT SLOT</span><h2>Nothing here yet.</h2><p>This page is ready for the interactive rooms, visual guides, and creative tools that will be added in the next phase.</p></div><div className="construction-card"><PixelBot mood="working" /><div><strong>WORK IN PROGRESS</strong><small>signal_map.json</small></div><span className="loading-bars"><i /><i /><i /><i /></span></div></div><Footer onNavigate={onNavigate} /></>
}

export function DashboardPage({ onNavigate, session }: { onNavigate: (path: string) => void; session: Session }) {
  const identity = session.user.user_metadata.full_name ?? session.user.user_metadata.name ?? session.user.email ?? 'Q'
  const initial = identity.trim().slice(0, 1).toUpperCase() || 'Q'
  return <><PageHeader kicker="PLAYER CONSOLE" title="Your console is ready." description="A clean starting point for the portal. Nothing is scored yet." right={<Badge accent="lime">STATUS: READY</Badge>} /><div className="console-dashboard"><div className="console-card console-card-wide"><div className="console-card-head"><span>PLAYER PROFILE</span><button><Icon name="settings" size={15} /></button></div><div className="console-profile"><div className="big-avatar">{initial}</div><div><h2>Your profile</h2><p>CURIOUS HUMAN · ID --</p><div className="command-row"><Badge accent="lime">ACTIVE</Badge><span>ready to begin</span></div></div></div><div className="console-divider" /><div className="blank-metrics"><div><span>03</span><small>zones queued</small></div><div><span>00</span><small>rooms opened</small></div><div><span>--</span><small>sync state</small></div></div></div><div className="console-card terminal-card"><div className="console-card-head"><span><Code2 size={14} /> SYSTEM LOG</span><span className="log-live"><i /> LIVE</span></div><p><b>[00:00:01]</b> portal initialized</p><p><b>[00:00:02]</b> learning zones reserved</p><p><b>[00:00:03]</b> awaiting content upload<span className="blink">_</span></p></div><div className="console-card console-card-wide empty-graph"><div className="console-card-head"><span>ACTIVITY SIGNAL</span><Badge accent="purple">NO DATA</Badge></div><div className="graph-placeholder"><div className="graph-line" /><span>Activity will appear here<br />after the first room opens.</span></div></div></div><Footer onNavigate={onNavigate} /></>
}

type PublicProfile = {
  displayName: string
  handle: string
  bio: string
  location: string
  website: string
  skills: string
  projects: string
}

const defaultProfile: PublicProfile = {
  displayName: '',
  handle: '',
  bio: '',
  location: '',
  website: '',
  skills: '',
  projects: '',
}

function profileKey(userId: string) {
  return `qwortex-profile-${userId}`
}

export function AccountPage({ session, onNavigate, onSignOut }: { session: Session; onNavigate: (path: string) => void; onSignOut: () => void }) {
  const [profile, setProfile] = useState<PublicProfile>(() => {
    const saved = localStorage.getItem(profileKey(session.user.id))
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile
  })
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(false)
  const [accounts] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('qwortex-accounts') ?? '[]') as Array<{ email: string; provider: string }>
    const provider = session.user.app_metadata.provider ?? 'email'
    const current = { email: session.user.email ?? 'Current account', provider }
    return [current, ...stored.filter((account) => account.email !== current.email)]
  })

  const update = (field: keyof PublicProfile, value: string) => setProfile((current) => ({ ...current, [field]: value }))
  const saveProfile = () => {
    localStorage.setItem(profileKey(session.user.id), JSON.stringify(profile))
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }
  const addAccount = () => {
    const current = { email: session.user.email ?? 'Current account', provider: session.user.app_metadata.provider ?? 'email' }
    const stored = JSON.parse(localStorage.getItem('qwortex-accounts') ?? '[]') as Array<{ email: string; provider: string }>
    localStorage.setItem('qwortex-accounts', JSON.stringify([current, ...stored.filter((account) => account.email !== current.email)]))
    onSignOut()
  }
  const providerName = session.user.app_metadata.provider === 'github' ? 'GitHub' : session.user.app_metadata.provider === 'google' ? 'Google' : 'Email'
  const initials = profile.displayName.slice(0, 1).toUpperCase()

  return <><PageHeader kicker="ACCOUNT // CONTROL ROOM" title="Your identity, your signal." description="Manage how you enter Qwortex and what the community sees when they discover your work." right={<Badge accent="lime">ACCOUNT ONLINE</Badge>} />
    <div className="account-shell">
      <section className="account-main">
        <div className="account-panel account-switcher">
          <div className="account-panel-head"><div><span className="pixel-kicker"><span /> LOGIN PROFILES</span><h2>Switch accounts.</h2></div><Badge accent="cyan">{accounts.length} SAVED</Badge></div>
          <p className="account-muted">Qwortex remembers account identities on this device. Credentials stay with Supabase and are never stored here.</p>
          <div className="account-list">{accounts.map((account, index) => <div className={`account-row ${index === 0 ? 'account-current' : ''}`} key={account.email}><div className="account-avatar">{account.email.slice(0, 1).toUpperCase()}</div><div><strong>{account.email}</strong><span>{index === 0 ? 'CURRENT SESSION' : `${account.provider.toUpperCase()} ACCOUNT`}</span></div>{index === 0 ? <Badge accent="lime">ACTIVE</Badge> : <span className="account-arrow">›</span>}</div>)}</div>
          <Button variant="secondary" className="account-add" onClick={addAccount}><Icon name="plus" size={16} /> Add another account</Button>
          <p className="account-hint">Adding an account signs you out safely, then opens the login screen for another profile.</p>
        </div>
        <div className="account-panel profile-editor">
          <div className="account-panel-head"><div><span className="pixel-kicker"><span /> PUBLIC PROFILE</span><h2>Tell your story.</h2></div><button className="profile-preview-toggle" onClick={() => setPreview(!preview)}>{preview ? 'EDIT PROFILE' : 'PREVIEW'}</button></div>
          {preview ? <div className="public-profile-preview"><div className="public-profile-top"><div className="public-avatar">{initials}</div><div><h2>{profile.displayName || 'Unnamed builder'}</h2><p>@{profile.handle || 'builder'}</p></div><Badge accent="cyan">QWORTEX MEMBER</Badge></div><p className="public-bio">{profile.bio || 'This builder has not written a bio yet.'}</p><div className="public-meta"><span>⌖ {profile.location || 'Location undisclosed'}</span>{profile.website && <span>↗ {profile.website}</span>}</div><div className="profile-chip-list">{profile.skills.split(',').map((skill) => skill.trim()).filter(Boolean).map((skill) => <Badge accent="purple" key={skill}>{skill}</Badge>)}</div><div className="public-projects"><span className="pixel-kicker"><span /> BUILDER LOG</span><p>{profile.projects || 'No projects listed yet.'}</p></div></div> : <div className="profile-form"><div className="profile-form-identity"><div className="public-avatar">{initials}</div><div><strong>{profile.displayName || 'Unnamed builder'}</strong><span>Public profile preview</span></div></div><label>Display name<input value={profile.displayName} onChange={(event) => update('displayName', event.target.value)} placeholder="Your name" /></label><label>Handle<input value={profile.handle} onChange={(event) => update('handle', event.target.value.replace(/\s/g, '').toLowerCase())} placeholder="your_handle" /></label><label>Bio<textarea value={profile.bio} onChange={(event) => update('bio', event.target.value)} maxLength={240} placeholder="What are you learning, making, or exploring?" /><small>{profile.bio.length}/240</small></label><div className="profile-form-grid"><label>Location<input value={profile.location} onChange={(event) => update('location', event.target.value)} placeholder="City, country" /></label><label>Website<input value={profile.website} onChange={(event) => update('website', event.target.value)} placeholder="https://" /></label></div><label>Skills <span className="label-note">comma separated</span><input value={profile.skills} onChange={(event) => update('skills', event.target.value)} placeholder="Design, research, coding" /></label><label>Projects and work<input value={profile.projects} onChange={(event) => update('projects', event.target.value)} placeholder="What have you made?" /></label><div className="profile-save-row"><Button variant="primary" onClick={saveProfile}>SAVE PROFILE <Icon name="arrow" size={14} /></Button>{saved && <span className="save-confirm">✓ PROFILE SYNCED</span>}</div></div>}
        </div>
      </section>
      <aside className="account-side">
        <div className="account-panel security-panel"><span className="pixel-kicker"><span /> AUTH STATUS</span><div className="security-user"><div className="public-avatar">{initials}</div><div><strong>{profile.displayName}</strong><span>{session.user.email}</span></div></div><div className="security-row"><span>CONNECTED VIA</span><b>{providerName}</b></div><div className="security-row"><span>SESSION</span><b className="security-live">● ACTIVE</b></div><div className="security-row"><span>USER ID</span><code>{session.user.id.slice(0, 12)}…</code></div><button className="security-signout" onClick={onSignOut}>SIGN OUT THIS ACCOUNT <Icon name="arrow" size={14} /></button></div>
        <div className="account-panel visibility-panel"><span className="pixel-kicker"><span /> VISIBILITY</span><h3>Public by design.</h3><p>Your profile is ready to become a living record of the questions you ask, the things you build, and the work you want people to find.</p><div className="visibility-status"><i /> PROFILE PREVIEW AVAILABLE</div><Button variant="ghost" onClick={() => setPreview(true)}>View public preview <Icon name="arrow" size={14} /></Button></div>
      </aside>
    </div>
    <Footer onNavigate={onNavigate} />
  </>
}

export function AchievementsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return <><PageHeader kicker="BADGE VAULT" title="The vault is empty." description="Achievements will appear when the learning system goes live. For now, there is room to make them meaningful." right={<Badge accent="yellow">BADGES: 0</Badge>} /><div className="vault-page"><div className="vault-lock"><div><Icon name="trophy" size={34} /><span>?</span></div><p>NO BADGES<br />UNLOCKED</p></div><div className="vault-grid">{['FIRST SIGNAL', 'CURIOUS BUILDER', 'CLEAR THINKER', 'RESPONSIBLE MAKER'].map((name, index) => <div className="locked-badge" key={name}><span>0{index + 1}</span><Icon name="lock" size={20} /><strong>{name}</strong><small>LOCKED</small></div>)}</div></div><Footer onNavigate={onNavigate} /></>
}

export function AboutPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const refs = ['Webmaster theme brief · AI learning portal', '2026–2027 TSA themes & design prompts', 'TSA competitions description', 'Supplied 2027–2028 Competitive Events Guide', 'React · TypeScript · Vite · custom CSS design system']
  return <><PageHeader kicker="ABOUT // QWORTEX" title="A retro learning lab for AI." description="Qwortex is a student-first portal for understanding AI, using it with intention, and making the call when the answer is not obvious." right={<Badge accent="cyan">BUILD 0.1</Badge>} /><div className="about-layout"><section className="about-card"><div className="about-pixel"><PixelBot mood="happy" /><PixelSpark accent="yellow" /></div><div><div className="pixel-kicker"><span /> THE THESIS</div><h2>Good tools need<br /><em>good questions.</em></h2><p>The visual system is inspired by retro coding games: a clear hub, playful zones, a terminal-like interface, and a little room for discovery.</p></div></section><section className="reference-card" id="references"><div className="console-card-head"><span>REFERENCE DESK</span><Icon name="file" size={15} /></div>{refs.map((item, index) => <div className="reference-row" key={item}><span>0{index + 1}</span><p>{item}</p><Icon name="external" size={14} /></div>)}<div className="reference-warning"><Icon name="info" size={15} /><span>Official required PDFs will be attached here in the submission phase.</span></div></section></div><Footer onNavigate={onNavigate} /></>
}

export function CommunityPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return <><PageHeader kicker="COMMUNITY // LOBBY" title="The lobby is quiet." description="A future space for sharing projects, questions, and discoveries with other curious builders." right={<Badge accent="lime">0 MEMBERS ONLINE</Badge>} /><div className="community-empty"><div className="community-scene"><div className="scene-screen"><span>NO SIGNAL</span><i /><i /><i /></div><PixelBot mood="idle" /></div><h2>COMMUNITY CHANNEL<br /><em>NOT CONNECTED</em></h2><p>When this room opens, you will be able to share what you are building and ask better questions together.</p><Button variant="secondary" onClick={() => onNavigate('/')}>Back to hub <Icon name="arrow" size={15} /></Button></div><Footer onNavigate={onNavigate} /></>
}

export function NotFound({ onNavigate }: { onNavigate: (path: string) => void }) {
  return <div className="not-found-retro"><PixelBot mood="working" /><div><div className="pixel-kicker"><span /> ERROR 404</div><h1>Signal lost.</h1><p>That page is not wired into the lab yet.</p><Button variant="primary" onClick={() => onNavigate('/')}>Return to hub</Button></div></div>
}

export function PracticePage({ onNavigate }: { onNavigate: (path: string) => void }) { return <EmptyPage kicker="PRACTICE ROOM" title="Practice room offline." description="A future space for prompt experiments, source checks, and responsible AI scenarios." accent="cyan" onNavigate={onNavigate} /> }
export function BuildPage({ onNavigate }: { onNavigate: (path: string) => void }) { return <EmptyPage kicker="BUILD STATION" title="Build station offline." description="A future workshop for turning AI ideas into thoughtful projects." accent="yellow" onNavigate={onNavigate} /> }

export { ArrowDown, ArrowRight, Gamepad2, Radio, Sparkles }
