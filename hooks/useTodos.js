import { useState, useEffect } from 'react';

const STORAGE_KEY = 'glassmorphism-todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY);
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      }
    } catch (err) {
      setError('Failed to load todos from storage');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (err) {
        setError('Failed to save todos to storage');
        console.error('Error saving todos:', err);
      }
    }
  }, [todos, loading]);

  // Add a new todo
  const addTodo = (text) => {
    if (!text || text.trim() === '') {
      setError('Todo text cannot be empty');
      return false;
    }

    try {
      const newTodo = {
        id: Date.now() + Math.random(), // Simple ID generation
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setTodos(prevTodos => [newTodo, ...prevTodos]);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
      return false;
    }
  };

  // Delete a todo by ID
  const deleteTodo = (id) => {
    try {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
      return false;
    }
  };

  // Rename/update a todo's text
  const renameTodo = (id, newText) => {
    if (!newText || newText.trim() === '') {
      setError('Todo text cannot be empty');
      return false;
    }

    try {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id
            ? {
                ...todo,
                text: newText.trim(),
                updatedAt: new Date().toISOString()
              }
            : todo
        )
      );
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to rename todo');
      console.error('Error renaming todo:', err);
      return false;
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    try {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed,
                updatedAt: new Date().toISOString()
              }
            : todo
        )
      );
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
      return false;
    }
  };

  // Clear all todos
  const clearAllTodos = () => {
    try {
      setTodos([]);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to clear todos');
      console.error('Error clearing todos:', err);
      return false;
    }
  };

  // Clear completed todos
  const clearCompletedTodos = () => {
    try {
      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to clear completed todos');
      console.error('Error clearing completed todos:', err);
      return false;
    }
  };

  // Get todo statistics
  const getStats = () => {
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

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Get todos with filtering options
  const getFilteredTodos = (filter = 'all') => {
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

  return {
    // State
    todos,
    loading,
    error,
    
    // Actions
    addTodo,
    deleteTodo,
    renameTodo,
    toggleTodo,
    clearAllTodos,
    clearCompletedTodos,
    clearError,
    
    // Computed values
    stats: getStats(),
    getFilteredTodos,
    
    // Utility
    isEmpty: todos.length === 0,
    hasCompleted: todos.some(todo => todo.completed),
    hasPending: todos.some(todo => !todo.completed)
  };
}