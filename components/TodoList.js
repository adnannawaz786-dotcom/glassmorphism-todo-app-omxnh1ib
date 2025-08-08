import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Trash2, Edit3, Check, X, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const TodoList = ({ todos, onAddTodo, onDeleteTodo, onToggleTodo, onUpdateTodo }) => {
  const [newTodo, setNewTodo] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdateTodo(editingId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
      >
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-white">
            Todo List
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {totalCount} total
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="default" 
            className={cn(
              "transition-all duration-300",
              completedCount > 0 ? "bg-green-500/80 text-white" : "bg-white/20 text-white"
            )}
          >
            {completedCount} completed
          </Badge>
        </div>
      </motion.div>

      {/* Add Todo Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleAddTodo} className="flex space-x-3">
              <Input
                type="text"
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
              />
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Todo Items */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <div className="text-white/60 text-lg">
                No todos yet. Add one above to get started!
              </div>
            </motion.div>
          ) : (
            todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className={cn(
                  "transition-all duration-300 border-white/20 shadow-lg hover:shadow-xl",
                  todo.completed 
                    ? "bg-white/5 backdrop-blur-lg border-green-400/30" 
                    : "bg-white/10 backdrop-blur-lg hover:bg-white/15"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Checkbox */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleTodo(todo.id)}
                        className={cn(
                          "h-6 w-6 rounded-full border-2 p-0 transition-all duration-300",
                          todo.completed
                            ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
                            : "border-white/40 text-transparent hover:border-white/60 hover:bg-white/10"
                        )}
                      >
                        {todo.completed && <Check className="h-3 w-3" />}
                      </Button>

                      {/* Todo Text */}
                      <div className="flex-1">
                        {editingId === todo.id ? (
                          <div className="flex space-x-2">
                            <Input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit();
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              onClick={handleSaveEdit}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "text-white transition-all duration-300 cursor-pointer",
                              todo.completed && "line-through text-white/60"
                            )}
                            onClick={() => !todo.completed && handleStartEdit(todo)}
                          >
                            {todo.text}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      {editingId !== todo.id && (
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartEdit(todo)}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeleteTodo(todo.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Progress indicator for completed todos */}
                    {todo.completed && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="mt-2 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Progress Summary */}
      {totalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80">Progress</span>
                <span className="text-white font-semibold">
                  {completedCount} of {totalCount} completed
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                />
              </div>
              {completedCount === totalCount && totalCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mt-4 text-green-400 font-semibold"
                >
                  🎉 All todos completed! Great job!
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TodoList;