'use client'

import { memo } from 'react'
import { formatCurrency, formatCompactNumber } from '@/lib/utils'
import { Tooltip } from '@/components/atoms/Tooltip'

interface VolumeCellProps {
  volume: number
  showFull?: boolean
}

/**
 * VolumeCell - Displays trading volume with compact notation
 * Shows full value on hover
 */
export const VolumeCell = memo(function VolumeCell({
  volume,
  showFull = false,
}: VolumeCellProps) {
  const displayValue = showFull ? formatCurrency(volume) : formatCompactNumber(volume)
  const fullValue = formatCurrency(volume)

  if (showFull) {
    return (
      <span className="font-mono text-text-primary font-medium">
        {displayValue}
      </span>
    )
  }

  return (
    <Tooltip content={`Volume: ${fullValue}`}>
      <span className="font-mono text-text-primary font-medium cursor-default">
        {displayValue}
      </span>
    </Tooltip>
  )
})
