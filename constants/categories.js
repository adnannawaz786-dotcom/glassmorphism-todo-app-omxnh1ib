export const DEFAULT_CATEGORIES = [
  {
    id: 'personal',
    name: 'Personal',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    icon: 'User',
    description: 'Personal tasks and activities'
  },
  {
    id: 'work',
    name: 'Work',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    icon: 'Briefcase',
    description: 'Professional and work-related tasks'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    icon: 'ShoppingCart',
    description: 'Shopping lists and purchases'
  },
  {
    id: 'health',
    name: 'Health',
    color: 'bg-gradient-to-r from-red-500 to-orange-500',
    icon: 'Heart',
    description: 'Health and fitness related tasks'
  },
  {
    id: 'education',
    name: 'Education',
    color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    icon: 'BookOpen',
    description: 'Learning and educational activities'
  },
  {
    id: 'finance',
    name: 'Finance',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    icon: 'DollarSign',
    description: 'Financial planning and money management'
  },
  {
    id: 'home',
    name: 'Home',
    color: 'bg-gradient-to-r from-teal-500 to-green-500',
    icon: 'Home',
    description: 'Household chores and home maintenance'
  },
  {
    id: 'travel',
    name: 'Travel',
    color: 'bg-gradient-to-r from-sky-500 to-blue-500',
    icon: 'Plane',
    description: 'Travel planning and trip organization'
  }
];

export const PRIORITY_LEVELS = [
  {
    id: 'low',
    name: 'Low',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
    value: 1
  },
  {
    id: 'medium',
    name: 'Medium',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-300',
    value: 2
  },
  {
    id: 'high',
    name: 'High',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    value: 3
  },
  {
    id: 'urgent',
    name: 'Urgent',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    value: 4
  }
];

export const TODO_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const SORT_OPTIONS = [
  {
    id: 'created_desc',
    name: 'Newest First',
    value: 'created_desc'
  },
  {
    id: 'created_asc',
    name: 'Oldest First',
    value: 'created_asc'
  },
  {
    id: 'priority_desc',
    name: 'High Priority First',
    value: 'priority_desc'
  },
  {
    id: 'priority_asc',
    name: 'Low Priority First',
    value: 'priority_asc'
  },
  {
    id: 'alphabetical',
    name: 'Alphabetical',
    value: 'alphabetical'
  },
  {
    id: 'due_date',
    name: 'Due Date',
    value: 'due_date'
  }
];

export const FILTER_OPTIONS = [
  {
    id: 'all',
    name: 'All Tasks',
    value: 'all'
  },
  {
    id: 'pending',
    name: 'Pending',
    value: 'pending'
  },
  {
    id: 'in_progress',
    name: 'In Progress',
    value: 'in_progress'
  },
  {
    id: 'completed',
    name: 'Completed',
    value: 'completed'
  },
  {
    id: 'overdue',
    name: 'Overdue',
    value: 'overdue'
  },
  {
    id: 'today',
    name: 'Due Today',
    value: 'today'
  },
  {
    id: 'this_week',
    name: 'This Week',
    value: 'this_week'
  }
];

export const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
  KANBAN: 'kanban'
};

export const THEME_OPTIONS = [
  {
    id: 'default',
    name: 'Default',
    primary: 'from-blue-600 to-purple-600',
    secondary: 'from-purple-600 to-pink-600'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    primary: 'from-blue-600 to-teal-600',
    secondary: 'from-teal-600 to-cyan-600'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    primary: 'from-orange-600 to-red-600',
    secondary: 'from-red-600 to-pink-600'
  },
  {
    id: 'forest',
    name: 'Forest',
    primary: 'from-green-600 to-emerald-600',
    secondary: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    primary: 'from-gray-600 to-slate-600',
    secondary: 'from-slate-600 to-zinc-600'
  }
];

export const STORAGE_KEYS = {
  TODOS: 'glassmorphism_todos',
  CATEGORIES: 'glassmorphism_categories',
  USER_PREFERENCES: 'glassmorphism_preferences',
  THEME: 'glassmorphism_theme',
  VIEW_MODE: 'glassmorphism_view_mode',
  SORT_PREFERENCE: 'glassmorphism_sort',
  FILTER_PREFERENCE: 'glassmorphism_filter'
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

export const GLASSMORPHISM_STYLES = {
  primary: 'backdrop-blur-md bg-white/20 border border-white/30 shadow-lg',
  secondary: 'backdrop-blur-sm bg-white/10 border border-white/20 shadow-md',
  card: 'backdrop-blur-lg bg-white/25 border border-white/30 shadow-xl rounded-2xl',
  button: 'backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 transition-all duration-300',
  input: 'backdrop-blur-md bg-white/10 border border-white/20 focus:border-white/40 placeholder:text-white/60'
};