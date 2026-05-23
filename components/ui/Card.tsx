'use client'

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type CardProps = {
  hover?:       boolean
  /** Raw hex — drives the border-glow shadow on hover */
  accentColor?: string
  className?:   string
  children:     React.ReactNode
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>

export default function Card({
  hover = false,
  accentColor,
  className,
  children,
  ...props
}: CardProps) {
  const hoverAnimation = hover
    ? {
        y: -6,
        boxShadow: accentColor
          ? `0 24px 60px -12px ${accentColor}33, 0 0 0 1px ${accentColor}22`
          : '0 24px 60px -12px rgba(0,245,255,0.15), 0 0 0 1px rgba(0,245,255,0.15)',
      }
    : {}

  return (
    <motion.div
      whileHover={hoverAnimation}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'glass-card p-6',
        hover && 'cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
