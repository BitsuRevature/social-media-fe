import "@testing-library/jest-dom/vitest"
import { afterEach} from 'vitest'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'

//this property has to be defined manually for some reason
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
})