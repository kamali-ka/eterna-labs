'use client'

import { memo } from 'react'
import { Badge } from '@/components/atoms/Badge'

interface LaunchpadBadgeProps {
  launchpad?: string
}

/**
 * LaunchpadBadge - Displays launchpad platform badge
 */
export const LaunchpadBadge = memo(function LaunchpadBadge({
  launchpad,
}: LaunchpadBadgeProps) {
  if (!launchpad) return null

  return (
    <Badge variant="default" size="sm" className="capitalize">
      {launchpad}
    </Badge>
  )
})
