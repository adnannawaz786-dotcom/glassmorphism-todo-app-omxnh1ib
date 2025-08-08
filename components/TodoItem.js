import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

const TodoItem = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onUpdate, 
  index 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(todo.id, editValue.trim());
      setIsEditing(false);
    } else {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleToggle = () => {
    if (!isEditing) {
      onToggle(todo.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className="group"
    >
      <Card className={cn(
        "relative overflow-hidden border-0 shadow-lg transition-all duration-300",
        "bg-white/10 backdrop-blur-md border border-white/20",
        "hover:bg-white/15 hover:shadow-xl hover:scale-[1.02]",
        "focus-within:bg-white/15 focus-within:shadow-xl focus-within:scale-[1.02]",
        todo.completed && "opacity-75 bg-white/5"
      )}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative p-4 flex items-center gap-3">
          {/* Checkbox */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggle}
              className={cn(
                "h-5 w-5 rounded-full border-2 transition-all duration-200",
                "border-white/30 data-[state=checked]:border-green-400",
                "data-[state=checked]:bg-green-400 data-[state=checked]:text-white",
                "hover:border-white/50 focus:ring-2 focus:ring-white/20"
              )}
            />
          </motion.div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1"
                >
                  <Input
                    ref={inputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={handleSave}
                    className={cn(
                      "bg-white/20 border-white/30 text-white placeholder-white/50",
                      "focus:bg-white/25 focus:border-white/50 focus:ring-white/20",
                      "h-8 px-3 text-sm"
                    )}
                    placeholder="Enter todo text..."
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="display"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "text-white text-sm font-medium leading-relaxed cursor-pointer",
                    "hover:text-white/90 transition-colors duration-200",
                    "break-words hyphens-auto",
                    todo.completed && "line-through text-white/60"
                  )}
                  onClick={handleToggle}
                >
                  {todo.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing-actions"
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="flex gap-1"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSave}
                    className={cn(
                      "h-8 w-8 p-0 hover:bg-green-500/20 hover:text-green-300",
                      "text-white/70 transition-all duration-200",
                      "focus:ring-2 focus:ring-green-400/30"
                    )}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancel}
                    className={cn(
                      "h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-300",
                      "text-white/70 transition-all duration-200",
                      "focus:ring-2 focus:ring-red-400/30"
                    )}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="default-actions"
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="flex gap-1"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEdit}
                    className={cn(
                      "h-8 w-8 p-0 hover:bg-blue-500/20 hover:text-blue-300",
                      "text-white/70 transition-all duration-200",
                      "focus:ring-2 focus:ring-blue-400/30"
                    )}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(todo.id)}
                    className={cn(
                      "h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-300",
                      "text-white/70 transition-all duration-200",
                      "focus:ring-2 focus:ring-red-400/30"
                    )}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Completion indicator */}
        <AnimatePresence>
          {todo.completed && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 origin-left"
            />
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default TodoItem;