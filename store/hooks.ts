import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

/**
 * Typed Redux hooks
 * Use these instead of plain `useDispatch` and `useSelector`
 *
 * @example
 * const dispatch = useAppDispatch()
 * const tokens = useAppSelector(selectAllTokens)
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
