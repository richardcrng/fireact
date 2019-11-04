import { renderHook, act } from '@testing-library/react-hooks'
import useStateHandlers from './useStateHandlers';
import { delay } from '../testUtils';

describe('set handler', () => {
  describe("doesn't update for value equality", () => {
    test("state refers to the same object if set is passed an array with the same values", async () => {
      const initialState = [1, 2, 3]
      const { result } = renderHook(() => useStateHandlers(initialState))

      expect(result.current[0]).toBe(initialState)

      await act(async () => {
        result.current[1].set([1, 2, 3])
        await delay(100)
      })

      expect(result.current[0]).toBe(initialState)
      expect(result.current[0]).toEqual([1, 2, 3])
    })

    test("state refers to the same object if set is passed an object with the same key-value pairs", async () => {
      const initialState = { counter: 1, boolean: true }
      const { result } = renderHook(() => useStateHandlers(initialState))

      expect(result.current[0]).toBe(initialState)

      await act(async () => {
        result.current[1].set({ counter: 1, boolean: true })
        await delay(100)
      })

      expect(result.current[0]).toBe(initialState)
      expect(result.current[0]).toEqual({ counter: 1, boolean: true })
    })
  })

  describe('updates for non-value equality', () => {
    test("state is a different array with the new values when set is passed an array with different values", async () => {
      const initialState = [1, 2, 3]
      const { result } = renderHook(() => useStateHandlers(initialState))

      expect(result.current[0]).toBe(initialState)

      await act(async () => {
        result.current[1].set([1, 2, 3, 4])
        await delay(100)
      })

      expect(result.current[0]).not.toBe(initialState)
      expect(result.current[0]).toEqual([1, 2, 3, 4])
    })

    test("state is a different array with the new values when set is passed an object with at least one different key-value pair", async () => {
      const initialState = { counter: 1, boolean: true }
      const { result } = renderHook(() => useStateHandlers(initialState))

      expect(result.current[0]).toBe(initialState)

      await act(async () => {
        result.current[1].set({ counter: 2, boolean: true })
        await delay(100)
      })

      expect(result.current[0]).not.toBe(initialState)
      expect(result.current[0]).toEqual({ counter: 2, boolean: true })
    })
  })
})


describe('update handler', () => {
  describe('updates properties within state', () => {
    test("state updates properties passed in and preserves properties not passed in", async () => {
      const nums = [1, 2, 3]
      const initialState = { counter: 1, array: nums }
      const { result } = renderHook(() => useStateHandlers<{ counter: number, array: number[] }>(initialState))

      expect(result.current[0]).toBe(initialState)

      await act(async () => {
        result.current[1].update({ counter: 2 })
        await delay(100)
      })

      expect(result.current[0]).not.toBe(initialState)
      expect(result.current[0]).toEqual({ counter: 2, array: [1, 2, 3] })
      // expect(result.current[0]).toHaveProperty('array', nums)
    })
  })
})

describe('replace handler', () => {
  describe('updates the reference even when passed something of value equality', () => {
    test("state refers to a different object if replace is passed an array with the same values", async () => {
      const initialState = [1, 2, 3]
      const { result } = renderHook(() => useStateHandlers(initialState))

      expect(result.current[0]).toBe(initialState)

      await act(async () => {
        result.current[1].replace([1, 2, 3])
        await delay(100)
      })

      expect(result.current[0]).not.toBe(initialState)
      expect(result.current[0]).toEqual([1, 2, 3])
    })

    test("state refers to a different object if replace is passed an object with the same key-value pairs", async () => {
      const initialState = { counter: 1, boolean: true }
      const { result } = renderHook(() => useStateHandlers(initialState))

      expect(result.current[0]).toBe(initialState)

      await act(async () => {
        result.current[1].replace({ counter: 1, boolean: true })
        await delay(100)
      })

      expect(result.current[0]).not.toBe(initialState)
      expect(result.current[0]).toEqual({ counter: 1, boolean: true })
    })
  })
})