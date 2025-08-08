import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'framer-motion';

const EditModal = ({ isOpen, onClose, todo, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setErrors({});
    }
  }, [todo]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (description && description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const updatedTodo = {
        ...todo,
        title: title.trim(),
        description: description.trim(),
        updatedAt: new Date().toISOString()
      };
      
      await onSave(updatedTodo);
      handleClose();
    } catch (error) {
      console.error('Error saving todo:', error);
      setErrors({ general: 'Failed to save changes. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    setIsLoading(false);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Edit Todo
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-white/90">
                Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors(prev => ({ ...prev, title: null }));
                  }
                }}
                placeholder="Enter todo title..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                autoFocus
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  id="title-error"
                  className="text-sm text-red-300"
                >
                  {errors.title}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-white/90">
                Description
              </Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) {
                    setErrors(prev => ({ ...prev, description: null }));
                  }
                }}
                placeholder="Enter description (optional)..."
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:border-white/40 focus:ring-1 focus:ring-white/20 focus:outline-none resize-none"
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  id="description-error"
                  className="text-sm text-red-300"
                >
                  {errors.description}
                </motion.p>
              )}
            </div>

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3 bg-red-500/20 border border-red-400/30 rounded-md"
              >
                <p className="text-sm text-red-200">{errors.general}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !title.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>

        <div className="text-xs text-white/60 text-center pt-2 border-t border-white/10">
          Press Ctrl+Enter to save, Escape to cancel
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;