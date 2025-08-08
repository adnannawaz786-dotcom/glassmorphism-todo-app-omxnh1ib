"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

const TodoForm = ({ onAddTodo, isVisible, onToggle }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddTodo(inputValue.trim());
      setInputValue('');
      
      // Auto-hide form on mobile after adding todo
      if (window.innerWidth < 768) {
        setTimeout(() => {
          onToggle();
        }, 500);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setInputValue('');
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.div 
        className="md:hidden fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={onToggle}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label={isVisible ? "Close todo form" : "Add new todo"}
        >
          <motion.div
            animate={{ rotate: isVisible ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="h-6 w-6" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Desktop Form - Always Visible */}
      <motion.div
        className="hidden md:block mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 placeholder:text-white/60 text-white focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                disabled={isSubmitting}
                autoFocus
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isSubmitting}
                className="px-6 bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 disabled:from-gray-400/50 disabled:to-gray-500/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Mobile Form - Slide Up Modal */}
      <motion.div
        className="md:hidden fixed inset-0 z-40 pointer-events-none"
        initial={false}
        animate={{ 
          backdropFilter: isVisible ? 'blur(8px)' : 'blur(0px)',
          backgroundColor: isVisible ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)'
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 pointer-events-auto"
          initial={{ y: "100%" }}
          animate={{ y: isVisible ? 0 : "100%" }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4
          }}
        >
          <Card className="m-4 p-6 bg-white/15 backdrop-blur-xl border-white/20 shadow-2xl rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Add New Todo</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
                aria-label="Close form"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white/10 backdrop-blur-sm border-white/20 placeholder:text-white/60 text-white focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-base py-3"
                disabled={isSubmitting}
                autoFocus={isVisible}
              />
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onToggle}
                  className="flex-1 bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 disabled:from-gray-400/50 disabled:to-gray-500/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Todo
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TodoForm;