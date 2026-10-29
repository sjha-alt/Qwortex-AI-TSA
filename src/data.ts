import type { LearningZone } from './types'

export const modules: LearningZone[] = [
  { id: 'fundamentals', number: '01', title: 'AI Fundamentals', shortTitle: 'Fundamentals', tagline: 'Decode the signal.', description: 'The starting zone for the ideas behind intelligent systems.', accent: 'purple', icon: 'sparkles' },
  { id: 'tools', number: '02', title: 'AI Tools & Techniques', shortTitle: 'Tools', tagline: 'Build with intention.', description: 'A future workshop for prompts, workflows, and practical experiments.', accent: 'cyan', icon: 'terminal' },
  { id: 'ethics', number: '03', title: 'Ethical & Responsible AI', shortTitle: 'Ethics', tagline: 'Make the call.', description: 'A future decision room for privacy, fairness, and human judgment.', accent: 'yellow', icon: 'shield' },
]

export const portalAreas = [
  { label: 'LEARN', path: '/learn', icon: 'book' as const, accent: 'purple' as const },
  { label: 'PRACTICE', path: '/practice', icon: 'target' as const, accent: 'cyan' as const },
  { label: 'BUILD', path: '/build', icon: 'hammer' as const, accent: 'yellow' as const },
  { label: 'COMMUNITY', path: '/community', icon: 'users' as const, accent: 'lime' as const },
]

export const boardPosts = [
  { handle: 'pixelpilot', time: '7h', channel: '# general', text: 'first day in the lab ^^', accent: 'yellow' },
  { handle: 'orbit_09', time: '19h', channel: '# ideas', text: 'what should we build next?', accent: 'cyan' },
  { handle: 'neonbyte', time: '1d', channel: '# showcase', text: 'signal received.', accent: 'purple' },
]

export const getModule = (id: string) => modules.find((module) => module.id === id)
