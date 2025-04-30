'use client'
/* eslint-disable prefer-const */
import { StoreApi, UseBoundStore } from 'zustand'

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

/**
 * Auto Generating Selectors
 *
 * Usage:
 *
 * **If you have a store like this:**
 *
 * ```ts
 * interface BearState {
 *   bears: number
 *   increase: (by: number) => void
 *   increment: () => void
 * }
 *
 * const useBearStoreBase = create<BearState>()((set) => ({
 *   bears: 0,
 *   increase: (by) => set((state) => ({ bears: state.bears + by })),
 *   increment: () => set((state) => ({ bears: state.bears + 1 })),
 * }))
 * ```
 *
 * **Apply that function to your store:**
 *
 * ```ts
 * const useBearStore = createSelectors(useBearStoreBase)
 * ```
 *
 * **Now the selectors are auto generated:**
 *
 * ```ts
 * // get the property
 * const bears = useBearStore.use.bears()
 *
 * // get the action
 * const increase = useBearStore.use.increment()
 * ```
 *
 * @see https://docs.pmnd.rs/zustand/auto-generating-selectors
 *
 * @param {S} _store
 * @return {S extends {getState: () => infer T} ? (S & {use: {[K in keyof T]: () => T[K]}}) : never}
 */
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
  return store
}
