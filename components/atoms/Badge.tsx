'use client'

import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-150',
  {
    variants: {
      variant: {
        default: 'bg-bg-tertiary text-text-secondary border border-border-default',
        success: 'bg-green-500/10 text-green-500 border border-green-500/20',
        danger: 'bg-red-500/10 text-red-500 border border-red-500/20',
        warning: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
        info: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-500 border border-purple-500/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

Badge.displayName = 'Badge'
