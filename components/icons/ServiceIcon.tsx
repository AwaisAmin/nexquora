/**
 * Renders the Lucide icon associated with a service by its icon-name string.
 * Extend SERVICE_ICON_MAP when new service icons are introduced in lib/data/services.ts.
 */
import {
  Brain,
  Globe,
  Smartphone,
  Cloud,
  CreditCard,
  BookOpen,
} from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'

// Keys must match the `icon` field values in lib/data/services.ts
const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Globe,
  Smartphone,
  Cloud,
  CreditCard,
  BookOpen,
}

export interface ServiceIconProps extends LucideProps {
  /** The `service.icon` string from lib/data/services.ts */
  name: string
}

export default function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = SERVICE_ICON_MAP[name]
  if (!Icon) return null
  return <Icon {...props} />
}
