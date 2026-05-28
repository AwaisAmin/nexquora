import {
  Brain,
  Globe,
  Smartphone,
  Cloud,
  CreditCard,
  BookOpen,
  Code,
  Server,
  Database,
  Shield,
  Zap,
  Layers,
  BarChart,
  Lock,
  Settings,
  Terminal,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Globe,
  Smartphone,
  Cloud,
  CreditCard,
  BookOpen,
  Code,
  Server,
  Database,
  Shield,
  Zap,
  Layers,
  BarChart,
  Lock,
  Settings,
  Terminal,
};

export interface ServiceIconProps extends LucideProps {
  name: string;
}

export default function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = SERVICE_ICON_MAP[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
