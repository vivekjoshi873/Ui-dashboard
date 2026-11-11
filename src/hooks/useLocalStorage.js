import { useEffect, useState } from 'react'
import { parseStoredTasks } from '../utils/taskHelpers'

export function useLocalStorage(storageKey, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(storageKey)

      if (!item || item.trim() === '') {
        return initialValue
      }

      return parseStoredTasks(item)
    } catch (error) {
      console.warn('Could not read from localStorage:', error)
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(storedValue))
    } catch (error) {
      console.warn('Could not save to localStorage:', error)
    }
  }, [storageKey, storedValue])

  return [storedValue, setStoredValue]
}
