import type { LucideProps } from 'lucide-react'

export type ModuleId = 'fundamentals' | 'tools' | 'ethics'

export type IconName = 'sparkles' | 'book' | 'target' | 'hammer' | 'users' | 'trophy' | 'arrow' | 'chevron' | 'menu' | 'x' | 'search' | 'bell' | 'settings' | 'play' | 'lock' | 'radio' | 'terminal' | 'code' | 'gamepad' | 'plus' | 'file' | 'info' | 'external' | 'shield'

export type Accent = 'yellow' | 'cyan' | 'lime' | 'purple' | 'coral'

export interface LearningZone {
  id: ModuleId
  number: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  accent: Accent
  icon: IconName
}

export interface IconProps extends LucideProps {
  name: IconName
}
