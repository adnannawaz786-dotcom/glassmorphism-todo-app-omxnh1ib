import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle2, RotateCcw, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import Link from 'next/link';

const CompletedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load completed todos from localStorage
    const loadCompletedTodos = () => {
      try {
        const stored = localStorage.getItem('completedTodos');
        if (stored) {
          const parsed = JSON.parse(stored);
          setCompletedTodos(parsed);
        }
      } catch (error) {
        console.error('Error loading completed todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompletedTodos();
  }, []);

  const restoreTodo = (id) => {
    try {
      // Remove from completed todos
      const updatedCompleted = completedTodos.filter(todo => todo.id !== id);
      setCompletedTodos(updatedCompleted);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompleted));

      // Add back to active todos
      const todoToRestore = completedTodos.find(todo => todo.id === id);
      if (todoToRestore) {
        const activeTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        const restoredTodo = {
          ...todoToRestore,
          completed: false,
          restoredAt: new Date().toISOString()
        };
        const updatedActive = [...activeTodos, restoredTodo];
        localStorage.setItem('todos', JSON.stringify(updatedActive));
      }
    } catch (error) {
      console.error('Error restoring todo:', error);
    }
  };

  const deletePermanently = (id) => {
    try {
      const updatedCompleted = completedTodos.filter(todo => todo.id !== id);
      setCompletedTodos(updatedCompleted);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompleted));
    } catch (error) {
      console.error('Error deleting todo permanently:', error);
    }
  };

  const clearAllCompleted = () => {
    try {
      setCompletedTodos([]);
      localStorage.removeItem('completedTodos');
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-xl"
        >
          Loading completed todos...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Completed Tasks
            </h1>
          </div>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Review your accomplished tasks and manage your completed items
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md transition-all duration-300"
            >
              ← Back to Active Todos
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              {completedTodos.length} Completed
            </Badge>
            {completedTodos.length > 0 && (
              <Button
                onClick={clearAllCompleted}
                variant="destructive"
                size="sm"
                className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-300"
              >
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {/* Completed Todos List */}
        {completedTodos.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8">
              <CheckCircle2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                No completed tasks yet
              </h3>
              <p className="text-gray-300 mb-6">
                Complete some tasks to see them here
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Go to Active Todos
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {completedTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-white mb-2 line-through opacity-75">
                            {todo.text}
                          </h3>
                          
                          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Completed: {formatDate(todo.completedAt)}</span>
                            </div>
                            {todo.createdAt && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span>Created: {formatDate(todo.createdAt)}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            onClick={() => restoreTodo(todo.id)}
                            variant="outline"
                            size="sm"
                            className="bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30 text-blue-300 transition-all duration-200"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Restore
                          </Button>
                          
                          <Button
                            onClick={() => deletePermanently(todo.id)}
                            variant="outline"
                            size="sm"
                            className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-300 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Statistics */}
        {completedTodos.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <Separator className="bg-white/20 mb-6" />
            <div className="text-center">
              <p className="text-gray-300">
                You've completed <span className="font-semibold text-green-400">{completedTodos.length}</span> task{completedTodos.length !== 1 ? 's' : ''}. Great job! 🎉
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CompletedTodos;