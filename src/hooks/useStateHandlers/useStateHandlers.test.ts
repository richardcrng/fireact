import { renderHook, act } from '@testing-library/react-hooks'
import useStateHandlers from './useStateHandlers';
import { delay } from '../testUtils';

// Tests here don't seem to be behaving as expected

describe('set handler', () => {
  describe('GIVEN initial state of an array, [1, 2, 3]', () => {
    const initialState = [1, 2, 3]

    describe('WHEN useStateHandlers is passed this initialState', () => {
      const { result } = renderHook(() => useStateHandlers(initialState))

      it('THEN the first element of the array is initialState', () => {
        expect(result.current[0]).toBe(initialState)
      })

      describe('AND when the set handler is passed [1, 2, 3]', () => {
        it('THEN the first element of the array is still initialState', async () => {
          await act(async () => {
            result.current[1].set([1, 2, 3])
            await delay(100)
          })

          expect(result.current[0]).toBe(initialState)
        })
      })
    })
  })

  describe('GIVEN initial state of an object, { counter: 1, boolean: true }', () => {
    const initialState = { counter: 1, boolean: true }

    describe('WHEN useStateHandlers is passed this initialState', () => {
      const { result } = renderHook(() => useStateHandlers(initialState))

      it('THEN the first element of the array is initialState', () => {
        expect(result.current[0]).toBe(initialState)
      })

      describe('AND when the set handler is passed [1, 2, 3]', () => {
        it('THEN the first element of the array is still initialState', async () => {
          await act(async () => {
            result.current[1].set({ counter: 1, boolean: true })
            await delay(100)
          })

          expect(result.current[0]).toBe(initialState)
        })
      })
    })
  })
})


describe.skip('update handler', () => {
  describe('GIVEN initial state of an object, { counter: 1, boolean: true }', () => {
    const initialState = { counter: 1, boolean: true }

    describe('WHEN useStateHandlers is passed this initialState', () => {
      // const { result, waitForNextUpdate } = renderHook(() => useStateHandlers(initialState))

      describe('AND when the set handler is passed [1, 2, 3]', () => {
        it('THEN the first element of the array is still initialState', async () => {
          const { result, waitForNextUpdate } = renderHook(() => useStateHandlers(initialState))

          await act(async () => {
            result.current[1].update({ counter: 2 })
          })
          await waitForNextUpdate()

          expect(result.current[0]).toEqual({ counter: 2, boolean: true })
        })
      })
    })
  })
})