/**
 * Todo Helper Functions
 * Utility functions for todo operations, validation, and data management
 */

// Generate unique ID for new todos
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate todo text input
export const validateTodoText = (text) => {
  if (!text || typeof text !== 'string') {
    return { isValid: false, error: 'Todo text is required' };
  }
  
  const trimmedText = text.trim();
  
  if (trimmedText.length === 0) {
    return { isValid: false, error: 'Todo text cannot be empty' };
  }
  
  if (trimmedText.length > 500) {
    return { isValid: false, error: 'Todo text must be less than 500 characters' };
  }
  
  return { isValid: true, error: null };
};

// Create new todo object
export const createTodo = (text) => {
  const validation = validateTodoText(text);
  
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Update todo text
export const updateTodoText = (todo, newText) => {
  const validation = validateTodoText(newText);
  
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  
  return {
    ...todo,
    text: newText.trim(),
    updatedAt: new Date().toISOString()
  };
};

// Toggle todo completion status
export const toggleTodoCompletion = (todo) => {
  return {
    ...todo,
    completed: !todo.completed,
    updatedAt: new Date().toISOString()
  };
};

// Sort todos by various criteria
export const sortTodos = (todos, sortBy = 'createdAt') => {
  const sortedTodos = [...todos];
  
  switch (sortBy) {
    case 'createdAt':
      return sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'updatedAt':
      return sortedTodos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    case 'alphabetical':
      return sortedTodos.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
    case 'completed':
      return sortedTodos.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.completed ? 1 : -1;
      });
    default:
      return sortedTodos;
  }
};

// Filter todos by completion status
export const filterTodos = (todos, filter = 'all') => {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'pending':
      return todos.filter(todo => !todo.completed);
    case 'all':
    default:
      return todos;
  }
};

// Search todos by text content
export const searchTodos = (todos, searchTerm) => {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return todos;
  }
  
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  
  if (normalizedSearchTerm === '') {
    return todos;
  }
  
  return todos.filter(todo => 
    todo.text.toLowerCase().includes(normalizedSearchTerm)
  );
};

// Get todo statistics
export const getTodoStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    total,
    completed,
    pending,
    completionRate
  };
};

// Local storage helpers
export const saveTodosToStorage = (todos) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('glassmorphism-todos', JSON.stringify(todos));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
    return false;
  }
};

export const loadTodosFromStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('glassmorphism-todos');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

// Clear all todos from storage
export const clearTodosFromStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('glassmorphism-todos');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
    return false;
  }
};

// Export/import helpers for data backup
export const exportTodos = (todos) => {
  const exportData = {
    todos,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  
  return JSON.stringify(exportData, null, 2);
};

export const importTodos = (jsonString) => {
  try {
    const importData = JSON.parse(jsonString);
    
    if (!importData.todos || !Array.isArray(importData.todos)) {
      throw new Error('Invalid todo data format');
    }
    
    // Validate each todo item
    const validTodos = importData.todos.filter(todo => {
      return todo.id && 
             typeof todo.text === 'string' && 
             typeof todo.completed === 'boolean' &&
             todo.createdAt &&
             todo.updatedAt;
    });
    
    return validTodos;
  } catch (error) {
    throw new Error('Failed to import todos: ' + error.message);
  }
};

// Utility to check if todos array is valid
export const isValidTodosArray = (todos) => {
  return Array.isArray(todos) && todos.every(todo => 
    todo.id && 
    typeof todo.text === 'string' && 
    typeof todo.completed === 'boolean'
  );
};

// Get formatted date for display
export const formatTodoDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch (error) {
    return 'Unknown date';
  }
};

// Debounce function for search and input operations
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Animation helpers for todo interactions
export const getTodoAnimationVariants = () => {
  return {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  };
};

export const getStaggerAnimationVariants = () => {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
};