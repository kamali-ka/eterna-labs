'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { queryClient } from '../lib/queryClient'
import { store } from '../store'

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={200}>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  )
}
