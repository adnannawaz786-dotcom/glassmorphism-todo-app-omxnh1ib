import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage operations with React state synchronization
 * Provides automatic serialization/deserialization and error handling
 * 
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if no stored value exists
 * @returns {[*, function, function]} - [storedValue, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function to remove the value from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key from other tabs/windows
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    // Listen for storage events (changes from other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
}

/**
 * Utility function to check if localStorage is available
 * @returns {boolean} - Whether localStorage is supported and available
 */
export function isLocalStorageAvailable() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Utility function to get a value from localStorage without using the hook
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - The default value if key doesn't exist
 * @returns {*} - The stored value or default value
 */
export function getLocalStorageValue(key, defaultValue = null) {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage value for key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Utility function to set a value in localStorage without using the hook
 * @param {string} key - The localStorage key
 * @param {*} value - The value to store
 * @returns {boolean} - Whether the operation was successful
 */
export function setLocalStorageValue(key, value) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting localStorage value for key "${key}":`, error);
    return false;
  }
}

/**
 * Utility function to remove a value from localStorage
 * @param {string} key - The localStorage key to remove
 * @returns {boolean} - Whether the operation was successful
 */
export function removeLocalStorageValue(key) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage value for key "${key}":`, error);
    return false;
  }
}

/**
 * Utility function to clear all localStorage data
 * @returns {boolean} - Whether the operation was successful
 */
export function clearLocalStorage() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}