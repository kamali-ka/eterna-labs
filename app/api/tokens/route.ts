import { NextResponse } from 'next/server'
import { getMockTokens } from '@/lib/mockData'
import type { GetTokensResponse } from '@/types/api'

/**
 * GET /api/tokens
 * Returns paginated token list with optional filtering
 *
 * Query params:
 * - status: Filter by token status
 * - chain: Filter by blockchain
 * - page: Page number (default: 1)
 * - pageSize: Items per page (default: 20)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const status = searchParams.get('status')
    const chain = searchParams.get('chain')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    // Get all tokens
    let tokens = getMockTokens()

    // Apply filters
    if (status) {
      tokens = tokens.filter((t) => t.status === status)
    }
    if (chain) {
      tokens = tokens.filter((t) => t.chain === chain)
    }

    // Pagination
    const total = tokens.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedTokens = tokens.slice(start, end)

    const response: GetTokensResponse = {
      success: true,
      data: {
        items: paginatedTokens,
        total,
        page,
        pageSize,
        hasMore: end < total,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: Math.random().toString(36).substring(7),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch tokens',
        },
      },
      { status: 500 }
    )
  }
}
