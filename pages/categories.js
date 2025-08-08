import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, FolderOpen, Hash, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import Head from 'next/head';
import Link from 'next/link';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#6366f1' });
  const [todos, setTodos] = useState([]);

  // Color options for categories
  const colorOptions = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#06b6d4', '#ef4444', '#84cc16'
  ];

  // Load categories and todos from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem('todo-categories');
    const savedTodos = localStorage.getItem('todo-items');
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Default categories
      const defaultCategories = [
        { id: 'personal', name: 'Personal', description: 'Personal tasks and reminders', color: '#6366f1' },
        { id: 'work', name: 'Work', description: 'Professional tasks and projects', color: '#8b5cf6' },
        { id: 'shopping', name: 'Shopping', description: 'Shopping lists and purchases', color: '#10b981' }
      ];
      setCategories(defaultCategories);
      localStorage.setItem('todo-categories', JSON.stringify(defaultCategories));
    }
    
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save categories to localStorage
  const saveCategories = (updatedCategories) => {
    setCategories(updatedCategories);
    localStorage.setItem('todo-categories', JSON.stringify(updatedCategories));
  };

  // Get todo count for a category
  const getTodoCount = (categoryId) => {
    return todos.filter(todo => todo.category === categoryId).length;
  };

  // Handle add category
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category = {
        id: Date.now().toString(),
        name: newCategory.name.trim(),
        description: newCategory.description.trim(),
        color: newCategory.color,
        createdAt: new Date().toISOString()
      };
      
      const updatedCategories = [...categories, category];
      saveCategories(updatedCategories);
      
      setNewCategory({ name: '', description: '', color: '#6366f1' });
      setIsAddDialogOpen(false);
    }
  };

  // Handle edit category
  const handleEditCategory = () => {
    if (editingCategory && editingCategory.name.trim()) {
      const updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, name: editingCategory.name.trim(), description: editingCategory.description.trim(), color: editingCategory.color }
          : cat
      );
      
      saveCategories(updatedCategories);
      setEditingCategory(null);
      setIsEditDialogOpen(false);
    }
  };

  // Handle delete category
  const handleDeleteCategory = () => {
    if (deletingCategory) {
      const updatedCategories = categories.filter(cat => cat.id !== deletingCategory.id);
      saveCategories(updatedCategories);
      
      // Remove todos in this category or move them to 'personal'
      const updatedTodos = todos.map(todo =>
        todo.category === deletingCategory.id
          ? { ...todo, category: 'personal' }
          : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todo-items', JSON.stringify(updatedTodos));
      
      setDeletingCategory(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Open edit dialog
  const openEditDialog = (category) => {
    setEditingCategory({ ...category });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (category) => {
    setDeletingCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Head>
        <title>Categories - Glassmorphism Todo App</title>
        <meta name="description" content="Manage your todo categories with glassmorphism design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        {/* Floating Background Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Todos
                  </Button>
                </Link>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Categories</h1>
                  <p className="text-white/70">Organize your todos with custom categories</p>
                </div>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/40 backdrop-blur-xl border border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Create a new category to organize your todos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        id="category-name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="Enter category name..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-description">Description (Optional)</Label>
                      <Input
                        id="category-description"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        placeholder="Enter category description..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label>Color</Label>
                      <div className="flex gap-2 mt-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            onClick={() => setNewCategory({ ...newCategory, color })}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              newCategory.color === color ? 'border-white scale-110' : 'border-white/30'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCategory} className="bg-white/20 hover:bg-white/30">
                      Add Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <div>
                            <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                            {category.description && (
                              <CardDescription className="text-white/70 text-sm mt-1">
                                {category.description}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditDialog(category)}
                            className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/20"
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openDeleteDialog(category)}
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Separator className="bg-white/20 mb-3" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/70">
                          <Hash className="w-4 h-4" />
                          <span className="text-sm">{getTodoCount(category.id)} todos</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-white/10 text-white/80 border border-white/20"
                        >
                          <FolderOpen className="w-3 h-3 mr-1" />
                          Category
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {categories.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <FolderOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />