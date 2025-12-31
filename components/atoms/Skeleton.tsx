'use client'

import { cn } from '@/lib/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'shimmer'
}

export function Skeleton({
  className,
  variant = 'shimmer',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-bg-tertiary',
        variant === 'shimmer' &&
          'animate-shimmer bg-gradient-to-r from-bg-tertiary via-bg-hover to-bg-tertiary bg-[length:1000px_100%]',
        className
      )}
      {...props}
    />
  )
}

/**
 * Skeleton variants for common use cases
 */
export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn('h-4 w-full', className)} />
}

export function SkeletonAvatar({ className }: { className?: string }) {
  return <Skeleton className={cn('h-10 w-10 rounded-full', className)} />
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-10 w-24 rounded-lg', className)} />
}

export function SkeletonTableRow({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-4 py-3', className)}>
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-28" />
    </div>
  )
}
