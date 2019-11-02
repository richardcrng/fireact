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


describe('update handler updates properties within object state', () => {
  describe('GIVEN initial state of an object, { counter: 1, boolean: true }', () => {
    const initialState = { counter: 1, boolean: true }

    describe('WHEN useStateHandlers is passed this initialState', () => {

      describe('AND when the update handler is passed { counter: 2 }', () => {
        it('THEN the state updates appropriately', async () => {
          const { result } = renderHook(() => useStateHandlers(initialState))

          await act(async () => {
            result.current[1].update({ counter: 2 })
            await delay(1000)
          })

          expect(result.current[0]).toEqual({ counter: 2, boolean: true })
        })
      })
    })
  })
})

describe('replace handler changes the reference value of state', () => {
  describe('GIVEN initial state of an object, { counter: 1, boolean: true }', () => {
    const initialState = { counter: 1, boolean: true }

    describe('WHEN useStateHandlers is passed this initialState', () => {

      describe('AND when the update handler is passed { counter: 1, boolean: true }', () => {
        it('THEN the state is a new object with the same values', async () => {
          const { result } = renderHook(() => useStateHandlers(initialState))

          await act(async () => {
            result.current[1].replace({ counter: 1, boolean: true })
            await delay(1000)
          })

          expect(result.current[0]).not.toBe(initialState)
          expect(result.current[0]).toEqual({ counter: 1, boolean: true })
        })
      })
    })
  })
})